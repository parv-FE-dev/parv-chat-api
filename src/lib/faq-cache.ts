import { PARV_CONTEXT } from "./parv-context";

interface FAQEntry {
  keywords: string[];
  answer: string;
}

const ctx = PARV_CONTEXT;

const FAQ_ENTRIES: FAQEntry[] = [
  {
    keywords: ["hi", "hello", "hey", "greetings", "howdy", "sup"],
    answer: `Hey there! 👋 I'm Parv's AI assistant. I can tell you about his experience, skills, projects, or how to get in touch. What would you like to know?`,
  },
  {
    keywords: ["who is", "tell me about", "about parv", "who are you", "introduce"],
    answer: `${ctx.name} is a ${ctx.role} with ${ctx.yearsExperience} years of experience, currently at ${ctx.currentCompany}. ${ctx.summary}`,
  },
  {
    keywords: ["experience", "career", "work history", "background", "worked at", "jobs"],
    answer: `Parv has ${ctx.yearsExperience} years of experience:\n\n- **${ctx.experience[0].role}** at ${ctx.experience[0].company} (${ctx.experience[0].period}) — ${ctx.experience[0].description}\n- **${ctx.experience[1].role}** at ${ctx.experience[1].company} (${ctx.experience[1].period}) — ${ctx.experience[1].description}\n- **${ctx.experience[2].role}** at ${ctx.experience[2].company} (${ctx.experience[2].period}) — ${ctx.experience[2].description}`,
  },
  {
    keywords: ["skills", "tech stack", "technologies", "languages", "frameworks", "what can"],
    answer: `Parv's tech stack:\n\n- **Expert:** ${ctx.skills.expert.join(", ")}\n- **Proficient:** ${ctx.skills.proficient.join(", ")}\n- **Familiar:** ${ctx.skills.familiar.join(", ")}\n\nTools: ${ctx.tools.join(", ")}`,
  },
  {
    keywords: ["projects", "built", "portfolio", "what has he built", "showcase"],
    answer: `Here's a snapshot of what Parv has shipped across his roles:\n\n- **${ctx.experience[0].company}** — ${ctx.experience[0].achievements[0]}\n- **${ctx.experience[1].company}** — ${ctx.experience[1].achievements[0]}\n- **${ctx.experience[2].company}** — ${ctx.experience[2].achievements[0]}\n\nFor the full picture, ask about his experience or reach out at **${ctx.email}**.`,
  },
  {
    keywords: ["contact", "email", "reach", "hire", "get in touch", "connect"],
    answer: `You can reach Parv at:\n\n- **Email:** ${ctx.email}\n- **LinkedIn:** [${ctx.linkedin}](${ctx.linkedin})\n- **GitHub:** [${ctx.github}](${ctx.github})`,
  },
  {
    keywords: ["current role", "neurowyzr", "currently", "working on", "present"],
    answer: `Parv is currently a **${ctx.experience[0].role}** at **${ctx.experience[0].company}** (${ctx.experience[0].period}). ${ctx.experience[0].description} Key achievements include shipping interactive cognitive games that drive new revenue streams, building a role-based Admin Portal that improved operational efficiency by 40%, and achieving zero critical/high-risk vulnerabilities in penetration testing.`,
  },
  {
    keywords: ["react", "typescript", "frontend framework"],
    answer: `React and TypeScript are Parv's core expertise. He has ${ctx.yearsExperience} years building production apps with React, and TypeScript is part of his daily workflow at ${ctx.currentCompany}. He's also proficient with Next.js, Redux, and Tailwind CSS.`,
  },
  {
    keywords: ["ai", "machine learning", "ml", "artificial intelligence", "openai", "claude", "llm"],
    answer: `Parv has hands-on AI/ML integration experience:\n\n- At **True Sparrow**, developed an AI-powered PoC using OpenAI GPT-3 and Stable Diffusion APIs for text and image generation\n- At **Neurowyzr**, builds interactive AI-driven cognitive assessment games as the founding frontend engineer\n- Familiar with RAG patterns and modern LLM tooling (Anthropic Claude, OpenAI, Vercel AI SDK)`,
  },
  {
    keywords: ["resume", "cv", "download"],
    answer: `For Parv's detailed resume or CV, please reach out via email at **${ctx.email}** or connect on [LinkedIn](${ctx.linkedin}).`,
  },
  {
    keywords: ["location", "where", "based", "city", "country"],
    answer: `Parv is based in **${ctx.location}**.`,
  },
  {
    keywords: ["salary", "compensation", "pay", "rate", "cost", "pricing"],
    answer: `For compensation-related discussions, please reach out directly to Parv at **${ctx.email}**. He'd be happy to discuss!`,
  },
  {
    keywords: ["availability", "open to", "looking for", "job", "opportunities", "hiring"],
    answer: `Parv is open to opportunities as a **${ctx.targetRole}**. His interests include ${ctx.interests.join(", ")}. Feel free to reach out at **${ctx.email}**!`,
  },
  {
    keywords: ["why hire", "strengths", "why parv", "what makes", "stand out"],
    answer: `Here's why Parv stands out:\n\n- **Performance impact** — Cut Lifesight dashboard load time from 14s to <1s (10× faster) by replacing fragmented charting with a unified visualization layer\n- **0 → 1 builder** — Founding frontend engineer at Neurowyzr; took the platform from concept to production\n- **AI integration** — Shipped an AI-powered content PoC with GPT-3 + Stable Diffusion at True Sparrow; builds AI-driven cognitive games at Neurowyzr\n- **Operational impact** — Admin Portal at Neurowyzr improved ops efficiency by 40%\n- **Security** — Zero critical/high-risk vulnerabilities in penetration testing\n- **Leadership** — Led a contract engineering team across multiple client deployments`,
  },
  {
    keywords: ["education", "degree", "university", "college", "school", "study"],
    answer: `Parv holds a **${ctx.education.degree}** from **${ctx.education.institution}** (${ctx.education.location}), ${ctx.education.period}.`,
  },
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Word-boundary match: ensures keyword "hi" matches "Hi there" but not "his"
// or "history". When no entry matches confidently, returns null so route.ts
// falls through to the Claude AI layer.
export function findFAQMatch(query: string): string | null {
  const normalized = query.toLowerCase().trim();

  let bestMatch: FAQEntry | null = null;
  let bestScore = 0;

  for (const entry of FAQ_ENTRIES) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const pattern = new RegExp(`\\b${escapeRegex(keyword)}\\b`);
      if (pattern.test(normalized)) {
        score += keyword.split(" ").length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore >= 1 ? bestMatch!.answer : null;
}
