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
    answer: `Parv has ${ctx.yearsExperience} years of experience:\n\n- **${ctx.experience[0].role}** at ${ctx.experience[0].company} (${ctx.experience[0].period}) — ${ctx.experience[0].description}\n- **${ctx.experience[1].role}** at ${ctx.experience[1].company} (${ctx.experience[1].period}) — Built 12+ production apps with 98+ Lighthouse scores\n- **${ctx.experience[2].role}** (${ctx.experience[2].period}) — Completed 20+ projects with 100% client satisfaction`,
  },
  {
    keywords: ["skills", "tech stack", "technologies", "languages", "frameworks", "what can"],
    answer: `Parv's tech stack:\n\n- **Expert:** ${ctx.skills.expert.join(", ")}\n- **Proficient:** ${ctx.skills.proficient.join(", ")}\n- **Familiar:** ${ctx.skills.familiar.join(", ")}\n\nTools: ${ctx.tools.join(", ")}`,
  },
  {
    keywords: ["projects", "built", "portfolio", "what has he built", "showcase"],
    answer: `Parv has built some cool projects:\n\n- **${ctx.projects[0].name}** — ${ctx.projects[0].description} [Live](${ctx.projects[0].url})\n- **${ctx.projects[1].name}** — ${ctx.projects[1].description} [Live](${ctx.projects[1].url})`,
  },
  {
    keywords: ["contact", "email", "reach", "hire", "get in touch", "connect"],
    answer: `You can reach Parv at:\n\n- **Email:** ${ctx.email}\n- **LinkedIn:** [${ctx.linkedin}](${ctx.linkedin})\n- **GitHub:** [${ctx.github}](${ctx.github})`,
  },
  {
    keywords: ["current role", "neurowyzr", "currently", "working on", "present"],
    answer: `Parv is currently a **${ctx.experience[0].role}** at **${ctx.experience[0].company}** (${ctx.experience[0].period}). ${ctx.experience[0].description} Key achievements include reducing page load by 65%, architecting a component library used by 8+ teams, and building a dashboard handling 1M+ data points.`,
  },
  {
    keywords: ["react", "typescript", "frontend framework"],
    answer: `React and TypeScript are Parv's core expertise. He has ${ctx.yearsExperience} years building production apps with React, and TypeScript is part of his daily workflow at ${ctx.currentCompany}. He's also proficient with Next.js, Redux, and Tailwind CSS.`,
  },
  {
    keywords: ["ai", "machine learning", "ml", "artificial intelligence", "openai", "claude", "llm"],
    answer: `Parv has hands-on AI/ML integration experience:\n\n- Built **ResumeAI** using Anthropic Claude for resume analysis\n- Built **ChatPDF** with RAG pipeline and TF-IDF for document intelligence\n- Works with OpenAI API at ${ctx.currentCompany} for healthcare AI interfaces\n- Proficient with RAG and vector databases`,
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
    answer: `Here's why Parv stands out:\n\n- **Performance expert** — 65% load time reduction, 98+ Lighthouse scores\n- **AI integration** — Hands-on experience with Claude, OpenAI, RAG pipelines\n- **Scale** — Built dashboards handling 1M+ data points, component libraries for 8+ teams\n- **Leadership** — Mentored 5 junior developers\n- **Reliability** — 100% client satisfaction as a freelancer, 20+ successful projects`,
  },
  {
    keywords: ["education", "degree", "university", "college", "school", "study"],
    answer: `I don't have specific education details on file. For information about Parv's educational background, please reach out at **${ctx.email}** or check his [LinkedIn](${ctx.linkedin}).`,
  },
];

export function findFAQMatch(query: string): string | null {
  const normalized = query.toLowerCase().trim();

  let bestMatch: FAQEntry | null = null;
  let bestScore = 0;

  for (const entry of FAQ_ENTRIES) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword)) {
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
