export const personalInfo = {
  name: "Ishant Goyal",
  shortName: "Ishant",
  titles: ["Full Stack Developer", "Software Developer", "AI Specialist"],
  location: "Jaipur, Rajasthan, India",
  phone: "+91 63670 10131",
  phoneRaw: "+916367010131",
  email: "ishantgoyal932@gmail.com",
  photo: "/images/ishant-photo.png",
  resume: "/resume/Ishant_Goyal_Resume.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/ishant-goyal-740b31290",
    github: "https://github.com/Ishant932",
    leetcode: "https://leetcode.com/u/Ishant__goyal/",
    whatsapp: "https://wa.me/916367010131",
    instagram: "https://www.instagram.com/ishantgoyal932/",
  },
  summary:
    "Ambitious and results-oriented Computer Science undergraduate specializing in Full Stack Development, intelligent automation, and AI-powered digital products. I architect scalable web ecosystems — from responsive frontends and secure APIs to payment flows, admin dashboards, and multilingual platforms — while integrating AI for personalization, automation, and operational efficiency.",
};

export const aboutContent = {
  intro:
    "Hi, I'm Ishant — a Full Stack Developer, Software Developer, and AI Specialist based in Jaipur, Rajasthan. I blend code, creativity, and artificial intelligence to build high-performance digital experiences that feel human, fast, and future-ready.",
  paragraphs: [
    "I'm a Computer Science student at Poornima College of Engineering (2023–27) who builds full products — from pixel-perfect frontends to secure APIs, databases, payments, and cloud deployments.",
    "As an AI Specialist, I integrate LLMs, multi-agent systems, and workflow automation into real platforms — consultation engines, CRMs, e-commerce, and rental marketplaces that run live in production.",
    "Recognized through Smart India Hackathon selection and a 4th rank at GIT Hackathon, I obsess over speed, accessibility, and clean architecture — and I sharpen my craft daily on LeetCode and AI tooling.",
  ],
  traits: [
    { label: "Problem Solver", value: "300+ DSA problems on LeetCode" },
    { label: "Ship Fast", value: "15+ production-grade projects" },
    { label: "AI-First", value: "10+ AI integrations in production" },
    { label: "Cloud Native", value: "Vercel · Render · AWS · Railway" },
  ],
  stats: [
    { label: "Projects Built", value: "15+" },
    { label: "Users Served", value: "750+" },
    { label: "Internships", value: "3" },
    { label: "Hackathon Wins", value: "2" },
  ],
  services: [
    {
      title: "Full Stack Development",
      description:
        "End-to-end web apps with React, Next.js, Node.js, MongoDB & SQL — from pixel-perfect UIs to scalable APIs.",
      icon: "code",
      gradient: "from-cyan-500 to-blue-700",
    },
    {
      title: "AI & Automation",
      description:
        "LLM integrations, multi-agent systems, N8N workflows, and intelligent assistants that automate real operations.",
      icon: "brain",
      gradient: "from-fuchsia-600 to-purple-700",
    },
    {
      title: "Software Engineering",
      description:
        "Clean architecture, REST APIs, authentication, testing, performance tuning, and maintainable production code.",
      icon: "cpu",
      gradient: "from-amber-500 to-orange-700",
    },
    {
      title: "Deployments",
      description:
        "Smooth, uptime-focused launches on Vercel, Netlify, Render, Railway, DigitalOcean & AWS with fast pipelines.",
      icon: "rocket",
      gradient: "from-emerald-500 to-teal-700",
    },
  ],
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  workType?: "office" | "remote" | "hybrid";
  highlights: string[];
  companyAbout?: string;
  tech?: string[];
  color: string;
};

export const experience: Experience[] = [
  {
    id: "dream-mantra",
    company: "Dream Mantra",
    role: "Senior Full Stack Developer & AI Specialist",
    period: "June 2026",
    duration: "3 Months Internship",
    location: "Jaipur, Rajasthan",
    workType: "office",
    companyAbout:
      "Dream Mantra is a growing education & career counselling and wellness brand helping students and professionals discover the right career paths. Working directly from their office, I was part of the core tech team driving the company's entire digital presence.",
    highlights: [
      "Owned end-to-end development of the brand website (dreammantra.in) and the production CRM Platform, working on-site with founders and business teams every day.",
      "Designed and shipped multi-role dashboards, lead pipeline tracking, and partner management flows used by the company's counselling operations.",
      "Engineered AI-powered lead scoring, automated follow-up suggestions, and content assistance to supercharge the counselling team's daily workflow.",
      "Managed production deployments on Render, monitored uptime, and iterated rapidly based on real user feedback from live operations.",
    ],
    color: "#7c3aed",
  },
  {
    id: "lohiya",
    company: "Lohiya Suppliers Pvt. Ltd.",
    role: "Software Developer",
    period: "July 2025",
    duration: "45 Days Internship",
    location: "Jaipur, Rajasthan",
    highlights: [
      "Developed and maintained lohiyas.com — a B2B industrial supplier platform with catalog management and inquiry systems.",
      "Built responsive product pages, admin panels, and SEO-optimized structures for industrial supply workflows.",
      "Implemented secure authentication, form handling, and performance optimizations for high-traffic pages.",
      "Collaborated on deployment, content management, and cross-browser compatibility testing.",
    ],
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "REST APIs"],
    color: "#0891b2",
  },
  {
    id: "bussi-bees",
    company: "Bussi Bees EdTech Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Aug 2024",
    duration: "1 Month Internship",
    location: "Jaipur, Rajasthan",
    highlights: [
      "Engineered a high-performance Flipkart-inspired e-commerce platform using React.js and Node.js.",
      "Strengthened frontend responsiveness with Tailwind CSS ensuring seamless cross-device experience.",
      "Optimized backend data flow and API response time improving system scalability.",
      "Implemented product catalog, cart flows, and REST API integrations for EdTech commerce.",
    ],
    tech: ["React", "Node.js", "Express", "Tailwind CSS", "MongoDB"],
    color: "#ea580c",
  },
];

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tech: string[];
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  features: string[];
  gradient: string;
  accent: string;
  category: "fullstack" | "ai" | "web";
  screenshots: string[];
  video: string;
  highlights?: string[];
};

export const projects: Project[] = [
  {
    id: "online-clock",
    title: "Online World Clock",
    subtitle: "Real-time Global Timezone Dashboard",
    description:
      "An elegant, real-time world clock application displaying multiple timezones with live updates, sleek UI, and smooth animations.",
    longDescription:
      "Online World Clock is a beautifully crafted web application that lets users track time across the globe in real-time. Built with modern JavaScript, it features dynamic timezone selection, live clock updates every second, responsive design for all devices, and a minimalist aesthetic perfect for productivity dashboards and travel planning. It's a zero-dependency, lightning-fast tool that runs anywhere.",
    tech: ["HTML5", "CSS3", "JavaScript", "Date API", "Responsive Design"],
    links: {
      live: "https://online-clock-9o3g.vercel.app/",
      github: "https://github.com/Ishant932/Online_Clock",
    },
    features: [
      "Live multi-timezone display",
      "Auto-updating clocks every second",
      "Timezone search & selection",
      "Responsive mobile-first UI",
      "Zero-dependency vanilla JS",
    ],
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    accent: "#22d3ee",
    category: "web",
    screenshots: [
      "/images/projects/online-clock/shot-1.png",
      "/images/projects/online-clock/shot-2.png",
      "/images/projects/online-clock/shot-3.png",
      "/images/projects/online-clock/shot-4.png",
      "/images/projects/online-clock/full.png",
    ],
    video: "/videos/online-clock.mp4",
  },
  {
    id: "multi-agent",
    title: "Multi-Agent Task Coordination",
    subtitle: "Office Automation with AI Agents",
    description:
      "A multi-agent architecture where specialized AI agents handle task allocation, monitoring, and execution with a real-time dashboard.",
    longDescription:
      "This full-stack office automation platform deploys multiple intelligent agents — each responsible for specific roles like task allocation, progress monitoring, and execution. The dashboard provides real-time visibility into agent performance, task statuses, and workflow bottlenecks, enabling teams to automate repetitive office operations with AI-driven coordination. It's a production-grade demonstration of how agentic AI can transform daily workflows.",
    tech: ["React", "Node.js", "Express", "MongoDB", "AI Agents", "WebSockets", "REST API"],
    links: {
      live: "https://multi-agent-task-coordination-for-o.vercel.app/",
      github: "https://github.com/Ishant932",
    },
    features: [
      "Multi-agent orchestration",
      "Real-time task monitoring",
      "Agent performance analytics",
      "Role-based task allocation",
      "Automated workflow execution",
    ],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    accent: "#a855f7",
    category: "ai",
    screenshots: [
      "/images/projects/multi-agent/shot-1.png",
      "/images/projects/multi-agent/shot-2.png",
      "/images/projects/multi-agent/shot-3.png",
      "/images/projects/multi-agent/shot-4.png",
      "/images/projects/multi-agent/full.png",
    ],
    video: "/videos/multi-agent.mp4",
  },
  {
    id: "room-sathi",
    title: "Room Sathi",
    subtitle: "Room Rental Platform (MERN)",
    description:
      "Dual-portal MERN rental platform for tenants and owners with payments, referrals, reviews, and Smart India Hackathon selection.",
    longDescription:
      "Room Sathi is a comprehensive room rental marketplace featuring separate portals for tenants and property owners. Built on the MERN stack, it includes secure JWT authentication, role-based access control, Razorpay payment gateway integration, referral & review systems, and advanced search filters for city & location. Selected for the Internal Smart India Hackathon for its innovative approach to solving urban housing discovery in India.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Razorpay", "Tailwind CSS"],
    links: {
      live: "https://web-production-aeb8ba.up.railway.app/rooms?city=Jaipur&location=Gopalpura",
      github: "https://github.com/Ishant932",
    },
    features: [
      "Dual tenant/owner portals",
      "Razorpay payment gateway",
      "Referral & review system",
      "Smart India Hackathon selected",
      "Role-based authentication",
      "City & location search filters",
    ],
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    accent: "#34d399",
    category: "fullstack",
    screenshots: [
      "/images/projects/room-sathi/shot-1.png",
      "/images/projects/room-sathi/shot-2.png",
      "/images/projects/room-sathi/shot-3.png",
      "/images/projects/room-sathi/shot-4.png",
      "/images/projects/room-sathi/full.png",
    ],
    video: "/videos/room-sathi.mp4",
  },
  {
    id: "astroknowledge",
    title: "AstroKnowledge",
    subtitle: "Vedic Astrology & Wellness Platform",
    description:
      "Full-stack spiritual wellness platform with consultation booking, e-commerce, courses, multilingual support, and AI integration.",
    longDescription:
      "AstroKnowledge is a production-grade Vedic astrology platform serving 750+ clients. I architected the entire ecosystem — consultation engine, product catalog, course management, admin dashboards, payment flows, multilingual content (EN/HI), and custom domain infrastructure. The platform blends spiritual authenticity with modern web performance, SEO, and AI-powered personalization — and my personal studio page is live on the platform.",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "AI Integration", "Razorpay"],
    links: {
      live: "https://astroknowledge.in",
      demo: "https://astroknowledge.in/studio/ishant-goyal",
    },
    features: [
      "Consultation booking engine",
      "E-commerce & courses catalog",
      "Multilingual EN/HI support",
      "Admin dashboard & CMS",
      "750+ client platform",
      "AI-powered personalization",
    ],
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    accent: "#f59e0b",
    category: "fullstack",
    screenshots: [
      "/images/projects/astroknowledge/shot-1.png",
      "/images/projects/astroknowledge/shot-2.png",
      "/images/projects/astroknowledge/shot-3.png",
      "/images/projects/astroknowledge/shot-4.png",
      "/images/projects/astroknowledge/full.png",
    ],
    video: "/videos/astroknowledge.mp4",
  },
  {
    id: "lohiya-suppliers",
    title: "Lohiya Suppliers",
    subtitle: "B2B Industrial Supply Platform",
    description:
      "Professional B2B supplier website with product catalog, inquiry management, and SEO-optimized industrial commerce flows.",
    longDescription:
      "Lohiya Suppliers is a full-featured B2B platform for industrial supply chain management — live at lohiyas.com. Features include dynamic product catalogs for industrial abrasives & tools, inquiry forms, responsive design for business clients, admin content management, and performance-optimized pages built for high conversion and search visibility across Rajasthan and beyond.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "SEO", "REST API"],
    links: {
      live: "https://lohiyas.com/",
    },
    features: [
      "B2B product catalog",
      "Inquiry management system",
      "SEO-optimized structure",
      "Responsive business UI",
      "Admin content panel",
    ],
    gradient: "from-slate-500 via-zinc-600 to-stone-700",
    accent: "#94a3b8",
    category: "fullstack",
    screenshots: [
      "/images/projects/lohiya-suppliers/shot-1.png",
      "/images/projects/lohiya-suppliers/shot-2.png",
      "/images/projects/lohiya-suppliers/shot-3.png",
      "/images/projects/lohiya-suppliers/shot-4.png",
      "/images/projects/lohiya-suppliers/full.png",
    ],
    video: "/videos/lohiya-suppliers.mp4",
  },
  {
    id: "dream-mantra",
    title: "Dream Mantra",
    subtitle: "Education & Career Counselling Brand Platform",
    description:
      "Full-stack platform for a leading education & career counselling brand — services, consultation booking, and AI-enhanced experiences.",
    longDescription:
      "Dream Mantra is a comprehensive education & career counselling brand platform featuring service listings, consultation booking, and AI-powered content assistance. Built with a modern full-stack architecture and shipped directly from the company's office in Jaipur, it delivers fast, accessible experiences optimized for mobile users across India — helping students discover the right career paths.",
    tech: ["Next.js", "React", "Node.js", "MongoDB", "AI Integration", "Tailwind CSS"],
    links: {
      live: "https://dreammantra.in/",
    },
    features: [
      "Education & career counselling services",
      "Consultation booking flows",
      "AI content assistance",
      "Mobile-first design",
      "Performance optimized",
    ],
    gradient: "from-pink-500 via-rose-500 to-red-600",
    accent: "#ec4899",
    category: "fullstack",
    screenshots: [
      "/images/projects/dream-mantra/shot-1.png",
      "/images/projects/dream-mantra/shot-2.png",
      "/images/projects/dream-mantra/shot-3.png",
      "/images/projects/dream-mantra/shot-4.png",
      "/images/projects/dream-mantra/full.png",
    ],
    video: "/videos/dream-mantra.mp4",
  },
  {
    id: "dream-mantra-crm",
    title: "CRM Platform",
    subtitle: "Partner & Lead Management Portal",
    description:
      "Production CRM portal for partner management, lead tracking, and automated workflows with role-based dashboards.",
    longDescription:
      "The CRM Platform is a full-stack partner and lead management system deployed on Render for Dream Mantra's counselling operations. It features multi-role authentication, lead pipeline tracking, partner dashboards, analytics views, and AI-assisted follow-up suggestions. Designed for operational efficiency, it turns raw leads into organized, actionable pipelines for the sales & counselling teams.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Render", "AI Automation"],
    links: {
      live: "https://dreammantra-crm.onrender.com/",
    },
    features: [
      "Partner & lead management",
      "Multi-role dashboards",
      "Lead pipeline tracking",
      "AI follow-up suggestions",
      "Cloud deployment on Render",
    ],
    gradient: "from-indigo-500 via-blue-500 to-violet-600",
    accent: "#818cf8",
    category: "fullstack",
    screenshots: [
      "/images/projects/dream-mantra-crm/shot-1.png",
      "/images/projects/dream-mantra-crm/shot-2.png",
      "/images/projects/dream-mantra-crm/shot-3.png",
      "/images/projects/dream-mantra-crm/shot-4.png",
      "/images/projects/dream-mantra-crm/full.png",
    ],
    video: "/videos/dream-mantra-crm.mp4",
  },
];

export type SkillCategory = {
  title: string;
  skills: string[];
  icon: string;
  gradient: string;
  blurb?: string;
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["C", "C++", "JavaScript (ES6+)", "TypeScript", "Python"],
    icon: "code",
    gradient: "from-cyan-500 to-blue-700",
  },
  {
    title: "Frontend",
    skills: ["HTML5", "CSS3", "React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Framer Motion"],
    icon: "layout",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST API", "Authentication", "WebSockets"],
    icon: "server",
    gradient: "from-amber-500 to-orange-700",
  },
  {
    title: "Database",
    skills: ["MongoDB", "Mongoose", "SQL", "Supabase", "AWS Cloud"],
    icon: "database",
    gradient: "from-emerald-500 to-teal-700",
  },
  {
    title: "Software Development",
    skills: [
      "Debugging",
      "Code Optimization",
      "API Integration",
      "System Design",
      "Agile/SDLC",
      "Testing",
      "Performance Tuning",
      "Version Control",
      "Documentation",
    ],
    icon: "cpu",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Cline", "Roo", "OpenRouter"],
    icon: "wrench",
    gradient: "from-slate-500 to-slate-700",
  },
  {
    title: "Hosting & Deployment",
    skills: ["Vercel", "Netlify", "Render", "Railway", "Digital Ocean", "Heroku"],
    icon: "cloud",
    gradient: "from-sky-500 to-indigo-700",
  },
  {
    title: "Payment Gateway",
    skills: ["Razorpay", "PhonePe", "Stripe"],
    icon: "credit-card",
    gradient: "from-lime-500 to-emerald-700",
  },
  {
    title: "Core CS",
    skills: ["Data Structures", "Algorithms", "OOP", "Computer Networks"],
    icon: "book",
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "AI Tools",
    skills: [
      "Claude",
      "Cursor",
      "Antigravity",
      "N8N Workflow",
      "Codex",
      "Blackbox AI",
      "Kiwi",
      "Twilio",
      "Hermes Agent",
      "OpenAI",
      "LangChain",
      "CrewAI",
      "Hugging Face",
      "GitHub Copilot",
      "LiveKit",
      "Zapier",
      "Freebuff",
    ],
    icon: "brain",
    gradient: "from-fuchsia-600 to-purple-700",
    blurb: "My AI-first superpower — agents, workflows & copilots",
  },
];

export const achievements = [
  {
    title: "GIT Hackathon — Winner",
    rank: "4th Rank",
    description:
      "Secured 4th Rank in the GIT Hackathon with a full-stack innovative project, competing against strong teams.",
    year: "2024",
    icon: "trophy",
  },
  {
    title: "Smart India Hackathon",
    rank: "Selected",
    description:
      "Selected participant for Room Sathi — an innovative rental platform solving urban housing discovery.",
    year: "2024",
    icon: "rocket",
  },
  {
    title: "Google Cloud Certificate",
    rank: "Cloud Foundations",
    description:
      "Cloud Computing Foundations — infrastructure, deployment, and cloud fundamentals certified by Google.",
    year: "2024",
    icon: "cloud",
  },
  {
    title: "LeetCode Problem Solver",
    rank: "300+ Problems",
    description:
      "Consistent DSA practice building strong algorithmic foundations — solving daily, improving weekly.",
    year: "Ongoing",
    icon: "code",
  },
  {
    title: "Production Projects",
    rank: "15+ Shipped",
    description:
      "From e-commerce and rental marketplaces to AI CRMs and wellness platforms — all live in production.",
    year: "2024–26",
    icon: "sparkles",
  },
  {
    title: "AI Integrations",
    rank: "10+ Live",
    description:
      "LLMs, multi-agent systems, and workflow automation embedded in production web platforms.",
    year: "2025",
    icon: "brain",
  },
];

export const education = [
  {
    degree: "BTech in Computer Science",
    institution: "Poornima College of Engineering",
    period: "2023 – 2027",
    details: "Specializing in Full Stack Development & AI Integration",
  },
  {
    degree: "CBSE Class XII",
    institution: "Mahaveer Public School",
    period: "Completed",
    details: "Science Stream",
  },
  {
    degree: "CBSE Class X",
    institution: "Mahaveer Public School",
    period: "Completed",
    details: "Academic Excellence",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const marqueeSkills = [
  "React.js",
  "Next.js",
  "Node.js",
  "TypeScript",
  "MongoDB",
  "Supabase",
  "AWS Cloud",
  "AI Agents",
  "N8N",
  "LangChain",
  "Claude",
  "Cursor",
  "Razorpay",
  "Stripe",
  "Vercel",
  "Render",
  "REST APIs",
  "Tailwind CSS",
  "Python",
  "GitHub",
];
