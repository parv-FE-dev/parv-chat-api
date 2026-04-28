export const PARV_CONTEXT = {
  name: "Parv Saxena",
  role: "Senior Frontend Engineer",
  currentCompany: "Neurowyzr",
  location: "Bengaluru, India",
  email: "parvsaxena94@gmail.com",
  linkedin: "https://linkedin.com/in/parvsaxena-fe",
  github: "https://github.com/parv-FE-dev",
  yearsExperience: "4+",
  summary:
    "Frontend Engineer with 4+ years of experience building scalable, high-performance web applications using React and TypeScript. Focused on performance optimization, clean architecture, and delivering impactful, user-centric products. Currently the founding frontend engineer at Neurowyzr.",
  experience: [
    {
      company: "Neurowyzr",
      role: "Senior Frontend Engineer",
      period: "Jul 2024 - Present",
      location: "Remote",
      description:
        "Founding front-end engineer building an enterprise platform from early-stage concept to production.",
      achievements: [
        "Built multiple interactive cognitive games using a reusable game engine, contributing directly to new revenue streams",
        "Designed and shipped a role-based Admin Portal for test creation and management, improving operational efficiency by 40%",
        "Achieved zero critical/high-risk vulnerabilities in penetration testing",
        "Led a contract engineering team to deliver scalable frontend solutions across multiple client deployments",
        "Implemented modular component architecture to improve maintainability and code reusability",
      ],
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    },
    {
      company: "Lifesight",
      role: "Software Development Engineer II (Frontend)",
      period: "Jul 2023 - Jul 2024",
      location: "Bengaluru, KA",
      description:
        "Core contributor to Lifesight 3.0, a large-scale market measurement platform used by enterprise clients.",
      achievements: [
        "Replaced fragmented charting tools with a unified visualization system, reducing dashboard load time from 14s to <1s (10× improvement)",
        "Designed and shipped core modules such as Attribution and Customer Journey Analytics using React + TypeScript",
        "Built custom API integrations to improve data accuracy and optimize ad spend ROI for customers",
        "Led product-wide UI cleanup sprints to improve UX consistency and performance",
      ],
      technologies: ["React", "TypeScript", "Redux", "Data Visualization"],
    },
    {
      company: "True Sparrow Systems",
      role: "Front-end Developer",
      period: "Jul 2021 - Jun 2023",
      location: "Remote",
      description:
        "Built scalable React applications across fitness and wellness products serving thousands of users.",
      achievements: [
        "Developed an AI-powered PoC using OpenAI GPT-3 and Stable Diffusion APIs for text and image generation",
        "Built the Moxie Pass subscription bundling system to improve conversion and user retention",
        "Improved SEO and page performance, increasing organic traffic and search rankings",
        "Designed flexible booking flows with multiple payment methods",
      ],
      technologies: ["React", "JavaScript", "TypeScript", "OpenAI API", "SCSS"],
    },
  ],
  skills: {
    expert: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    proficient: ["HTML", "CSS", "Redux-Saga", "Git/GitHub", "jQuery", "REST APIs"],
    familiar: ["OpenAI API", "Stable Diffusion", "Anthropic Claude", "RAG"],
  },
  tools: [
    "VS Code",
    "Figma",
    "Git",
    "Chrome DevTools",
    "Postman",
    "Vercel",
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
  education: {
    degree: "Bachelor of Engineering in Industrial Engineering",
    institution: "Shri Ramdeobaba College of Engineering and Management",
    location: "Nagpur, MS",
    period: "Jul 2013 - May 2017",
  },
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

Education: ${ctx.education.degree}, ${ctx.education.institution} (${ctx.education.period})

Contact: ${ctx.email} | LinkedIn: ${ctx.linkedin} | GitHub: ${ctx.github}

Target: ${ctx.targetRole}
Interests: ${ctx.interests.join(", ")}

Rules:
- Only answer questions about Parv, his skills, experience, projects, education, and contact info.
- For unrelated questions, politely redirect: "I can only answer questions about Parv. Try asking about his experience, skills, or projects!"
- Never make up information not provided above. If asked something not covered, say you don't have that detail and suggest emailing Parv.
- For salary/compensation questions, redirect to email.
- Keep responses under 150 words unless the user asks for detail.`;
}
