export const PARV_CONTEXT = {
  name: "Parv Saxena",
  role: "Senior Frontend Engineer",
  currentCompany: "Neurowyzr",
  location: "Bengaluru, India",
  email: "parvsaxena94@gmail.com",
  linkedin: "https://linkedin.com/in/parvsaxena-fe",
  github: "https://github.com/parv-FE-dev",
  yearsExperience: "5+",
  summary:
    "Senior Frontend Engineer with 5+ years of experience building high-performance, AI-powered web applications. Specializing in React, TypeScript, and Next.js. Currently at Neurowyzr building AI-powered healthcare interfaces.",
  experience: [
    {
      company: "Neurowyzr",
      role: "Software Engineer (Frontend)",
      period: "2023 - Present",
      description:
        "Building AI-powered healthcare and neuroscience platform interfaces.",
      achievements: [
        "Reduced initial page load time by 65% through code splitting and lazy loading",
        "Architected reusable component library used across 8+ product teams",
        "Implemented real-time data visualization dashboard handling 1M+ data points",
        "Mentored 5 junior developers in React best practices",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Next.js",
        "Redux",
        "Tailwind CSS",
        "OpenAI API",
      ],
    },
    {
      company: "True Sparrow",
      role: "Frontend Developer",
      period: "Jun 2021 - Dec 2022",
      achievements: [
        "Built 12+ production-ready web applications from scratch",
        "Achieved 98+ Lighthouse scores across all projects",
        "85% code coverage with comprehensive testing",
      ],
      technologies: ["React", "JavaScript", "SCSS", "Jest", "Webpack"],
    },
    {
      company: "Freelance",
      role: "Full-Stack Developer",
      period: "Jan 2020 - May 2021",
      achievements: [
        "Completed 20+ projects with 100% client satisfaction",
        "Specialized in JAMstack architecture",
      ],
      technologies: ["React", "JavaScript", "Node.js", "Next.js"],
    },
  ],
  skills: {
    expert: ["React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS"],
    proficient: [
      "OpenAI API",
      "RAG",
      "Redux-Saga",
      "Git/GitHub",
      "REST APIs",
    ],
    familiar: [
      "Vector Databases",
      "Node.js",
      "AWS",
      "Storybook",
      "Docker",
    ],
  },
  tools: [
    "VS Code",
    "Figma",
    "Git",
    "Chrome DevTools",
    "Postman",
    "Jira",
    "Vercel",
    "Docker",
  ],
  projects: [
    {
      name: "ResumeAI",
      description:
        "AI-powered resume analyzer with match scoring and bullet rewriting using Claude AI.",
      tech: ["Next.js", "TypeScript", "Anthropic Claude", "Tailwind CSS"],
      url: "https://resume-ai-seven-omega.vercel.app",
      github: "https://github.com/parv-FE-dev/resume-ai",
    },
    {
      name: "ChatPDF",
      description:
        "Document intelligence app using RAG pipeline. Upload PDFs and chat with cited answers.",
      tech: ["Next.js", "TypeScript", "RAG", "TF-IDF", "Anthropic Claude"],
      url: "https://chat-with-pdf-mu.vercel.app",
      github: "https://github.com/parv-FE-dev/chat-with-pdf",
    },
  ],
  targetRole: "Senior Frontend Engineer at AI-first companies",
  interests: [
    "AI/ML integration in frontend",
    "Performance optimization",
    "Component architecture",
  ],
};

export function buildSystemPrompt(): string {
  const ctx = PARV_CONTEXT;
  const exp = ctx.experience
    .map(
      (e) =>
        `${e.role} at ${e.company} (${e.period}): ${e.achievements.join("; ")}`
    )
    .join("\n");
  const projects = ctx.projects
    .map((p) => `${p.name}: ${p.description} [${p.tech.join(", ")}] ${p.url}`)
    .join("\n");
  const skills = `Expert: ${ctx.skills.expert.join(", ")}. Proficient: ${ctx.skills.proficient.join(", ")}. Familiar: ${ctx.skills.familiar.join(", ")}.`;

  return `You are an AI assistant on Parv Saxena's portfolio website. Answer ONLY questions about Parv. Be concise, professional, and friendly. Use 2-3 sentences max unless detail is requested.

Profile: ${ctx.name}, ${ctx.role} with ${ctx.yearsExperience} years experience. Based in ${ctx.location}. ${ctx.summary}

Experience:
${exp}

Skills: ${skills}
Tools: ${ctx.tools.join(", ")}

Projects:
${projects}

Contact: ${ctx.email} | LinkedIn: ${ctx.linkedin} | GitHub: ${ctx.github}

Target: ${ctx.targetRole}
Interests: ${ctx.interests.join(", ")}

Rules:
- Only answer questions about Parv, his skills, experience, projects, and contact info.
- For unrelated questions, politely redirect: "I can only answer questions about Parv. Try asking about his experience, skills, or projects!"
- Never make up information not provided above.
- For salary/compensation questions, redirect to email.
- Keep responses under 150 words unless the user asks for detail.`;
}
