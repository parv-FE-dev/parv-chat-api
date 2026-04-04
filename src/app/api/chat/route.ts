import { NextRequest, NextResponse } from "next/server";
import { findFAQMatch } from "@/lib/faq-cache";
import { getCached, setCache } from "@/lib/chat-cache";
import { buildSystemPrompt } from "@/lib/parv-context";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { response: "Please send a valid message.", source: "fallback" as const },
        { status: 400, headers: corsHeaders }
      );
    }

    // Layer 1: FAQ match
    const faqAnswer = findFAQMatch(message);
    if (faqAnswer) {
      return NextResponse.json(
        { response: faqAnswer, source: "faq" as const },
        { headers: corsHeaders }
      );
    }

    // Layer 2: Response cache
    const cached = getCached(message);
    if (cached) {
      return NextResponse.json(
        { response: cached, source: "cache" as const },
        { headers: corsHeaders }
      );
    }

    // Layer 3: Claude AI
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          response:
            "AI is currently unavailable. Please reach out to Parv directly at parvsaxena94@gmail.com!",
          source: "fallback" as const,
        },
        { headers: corsHeaders }
      );
    }

    const anthropicResponse = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-20250414",
          max_tokens: 300,
          system: buildSystemPrompt(),
          messages: [{ role: "user", content: message }],
        }),
      }
    );

    if (!anthropicResponse.ok) {
      throw new Error(`Anthropic API error: ${anthropicResponse.status}`);
    }

    const data = await anthropicResponse.json();
    const aiResponse =
      data.content?.[0]?.text ||
      "Sorry, I couldn't generate a response. Please try again!";

    // Cache the AI response
    setCache(message, aiResponse);

    return NextResponse.json(
      { response: aiResponse, source: "ai" as const },
      { headers: corsHeaders }
    );
  } catch {
    // Layer 4: Fallback
    return NextResponse.json(
      {
        response:
          "I'm having trouble right now. Please reach out to Parv directly at parvsaxena94@gmail.com!",
        source: "fallback" as const,
      },
      { headers: corsHeaders }
    );
  }
}
