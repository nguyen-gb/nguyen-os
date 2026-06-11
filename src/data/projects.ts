export type ProjectStatus = "live" | "scanning";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tech: string[];
  status: ProjectStatus;
  url?: string;
  links?: ProjectLink[];
  features?: string[];
  role?: string;
  focus?: string[];
  icon?: string;
  projectType?: "Personal product" | "Team project" | "Client work";
  caseStudy?: {
    challenge: string;
    approach: string[];
    outcome: string[];
  };
}

export interface PythonSystem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  metrics: Array<{ label: string; value: string }>;
  tech: string[];
  features: string[];
}

export const landingProjects: PortfolioProject[] = [
  {
    id: "monrei-sai-gon",
    title: "Monrei Sai Gon",
    subtitle: "Luxury Hospitality Platform",
    description:
      "High-end hospitality brand landing page with immersive visual storytelling and optimized load performance.",
    image: "/images/projects/monrei-sai-gon.jpg",
    url: "https://monrei-sai-gon.vn/",
    tech: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
    role: "Independent frontend delivery",
    projectType: "Client work",
    focus: ["Responsive layout", "Visual storytelling", "Performance-minded UI"],
    status: "live",
  },
  {
    id: "lusso-saigon",
    title: "Lusso Saigon Residences",
    subtitle: "Premium Real Estate Landing",
    description:
      "Luxury real estate showcase with interactive floor plans, gallery systems, and lead generation forms.",
    image: "/images/projects/lusso-saigon.jpg",
    url: "https://lussosaigonresidences.com/",
    tech: ["HTML5", "CSS3", "JavaScript", "SEO Optimization"],
    role: "Independent frontend delivery",
    projectType: "Client work",
    focus: ["Interactive content", "Lead-generation flow", "Responsive UI"],
    status: "live",
  },
  {
    id: "vinhomes-saigon-park",
    title: "Vinhomes Saigon Park",
    subtitle: "Real Estate Marketing Page",
    description:
      "Modern real estate marketing platform with dynamic content sections and conversion-optimized layouts.",
    image: "/images/projects/vinhomes-saigon-park.jpg",
    url: "https://vinhomes-saigon-park-page.com/",
    tech: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
    role: "Independent frontend delivery",
    projectType: "Client work",
    focus: ["Content hierarchy", "Responsive sections", "Conversion-oriented UI"],
    status: "live",
  },
  {
    id: "the-win-long-an",
    title: "The Win Long An",
    subtitle: "Real Estate Landing Page",
    description:
      "High-converting residential marketing landing page with interactive section modules and optimized fast-loading assets.",
    image: "/images/projects/the-win-long-an.jpg",
    url: "https://thewinlongan.online/",
    tech: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "SEO"],
    role: "Independent frontend delivery",
    projectType: "Client work",
    focus: ["Reusable sections", "Mobile experience", "Asset optimization"],
    status: "live",
  },
];

export const wordpressProjects: PortfolioProject[] = [
  {
    id: "hoan-my",
    title: "Hoan My",
    subtitle: "Enterprise Healthcare Platform",
    description:
      "Ongoing updates and maintenance for a large healthcare website with multi-location content and appointment journeys.",
    image: "/images/projects/hoan-my.jpg",
    url: "https://hoanmy.com/",
    tech: ["WordPress", "PHP", "MySQL", "REST API"],
    role: "Website updates and maintenance",
    projectType: "Team project",
    focus: ["Content updates", "Issue resolution", "Ongoing maintenance"],
    status: "live",
  },
  {
    id: "kodo",
    title: "Kodo",
    subtitle: "Corporate Business Platform",
    description:
      "Production support and content updates for a corporate WordPress website with commerce and SEO requirements.",
    image: "/images/projects/kodo.jpg",
    url: "https://kodo.vn/",
    tech: ["WordPress", "WooCommerce", "PHP", "Linux"],
    role: "Website updates and maintenance",
    projectType: "Client work",
    focus: ["Content updates", "Issue resolution", "Ongoing maintenance"],
    status: "live",
  },
  {
    id: "nhac-cu-minh-phung",
    title: "Nhac Cu Minh Phung",
    subtitle: "E-Commerce Music Store",
    description:
      "Updates and ongoing maintenance for a musical-instrument store with product catalog and commerce workflows.",
    image: "/images/projects/nhac-cu-minh-phung.jpg",
    url: "https://nhaccuminhphung.com/",
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    role: "Website updates and maintenance",
    projectType: "Client work",
    focus: ["Catalog updates", "Issue resolution", "Ongoing maintenance"],
    status: "live",
  },
];

export const reactProjects: PortfolioProject[] = [
  {
    id: "onlyspeak",
    title: "OnlySpeak",
    subtitle: "Fullstack AI Language Platform",
    description:
      "Production-grade interactive platform for conversational speech practice with AI-powered feedback and real-time audio processing.",
    image: "/images/projects/onlyspeak.jpg",
    url: "https://onlyspeak.online/",
    links: [{ label: "Live App", url: "https://onlyspeak.online/" }],
    tech: ["Next.js", "React", "FastAPI (Python)", "Audio APIs", "WebSockets"],
    role: "Sole product developer",
    projectType: "Personal product",
    focus: ["Interactive React UI", "Real-time audio flow", "API integration"],
    status: "live",
    features: [
      "AI conversation partner",
      "Audio processing",
      "Progress tracking",
      "Adaptive difficulty",
    ],
    caseStudy: {
      challenge:
        "Create a speaking-practice product where the interface, audio capture, AI response, and feedback loop feel like one continuous conversation.",
      approach: [
        "Built the product interface with Next.js and React around short, focused practice flows.",
        "Connected real-time audio and AI services through FastAPI, WebSockets, and browser audio APIs.",
        "Designed clear loading, listening, speaking, and feedback states so users always understand what the system is doing.",
      ],
      outcome: [
        "Independently delivered the live product from frontend experience through backend and AI integration.",
        "Combined frontend product work with practical API and real-time audio integration.",
        "Created a reusable foundation for progress tracking and adaptive practice features.",
      ],
    },
  },
  {
    id: "nhcinema",
    title: "NHCinema",
    subtitle: "Real-time Ticket Booking Platform",
    description:
      "Web, mobile, and admin frontend for a movie booking platform with real-time seat selection via WebSockets.",
    image: "/images/projects/nhcinema.jpg",
    links: [
      { label: "User Frontend", url: "https://github.com/nguyen-gb/NHCinema" },
      {
        label: "Admin Dashboard",
        url: "https://github.com/nguyen-gb/Admin-NHCinema",
      },
      { label: "Mobile App", url: "https://github.com/nguyen-gb/cinema" },
    ],
    tech: ["React", "Next.js", "React Native", "WebSockets", "Redux", "JWT"],
    role: "Frontend developer for web, mobile, and admin",
    projectType: "Team project",
    focus: [
      "Web frontend",
      "Mobile app frontend",
      "Admin dashboard frontend",
    ],
    status: "scanning",
    features: [
      "Real-time seat booking",
      "WebSocket sync",
      "Cross-platform UI",
      "Customer and admin workflows",
    ],
    caseStudy: {
      challenge:
        "Keep seat availability and booking interactions consistent across customer web, mobile, and administration experiences.",
      approach: [
        "Designed shared booking flows around real-time seat updates delivered through WebSockets.",
        "Built customer-facing booking interfaces for the web and mobile application.",
        "Built the administration dashboard for managing the cinema platform.",
        "Used centralized state management for authentication, booking progress, and synchronized seat data across the frontend applications.",
      ],
      outcome: [
        "Delivered the web, mobile, and admin frontend portions of a larger team project.",
        "Demonstrated real-time UI, cross-platform frontend work, and state-management experience.",
        "Published the frontend implementations as source code for technical review.",
      ],
    },
  },
];

export const pythonSystems: PythonSystem[] = [
  {
    id: "ai-chatbot",
    title: "AI Chatbot Platform",
    subtitle: "RAG Architecture Engine",
    description:
      "AI chatbot platform using Retrieval-Augmented Generation for contextual answers, streaming responses, and multi-tenant workflows.",
    icon: "🤖",
    metrics: [
      { label: "Response", value: "Streaming" },
      { label: "Architecture", value: "RAG" },
      { label: "Scope", value: "Multi-tenant" },
    ],
    tech: [
      "Python",
      "FastAPI",
      "LangChain",
      "Vector DB",
      "Redis",
      "Docker",
    ],
    features: [
      "Retrieval-Augmented Generation",
      "Context window management",
      "Streaming responses",
      "Multi-tenant support",
    ],
  },
  {
    id: "ai-calling",
    title: "AI Calling System",
    subtitle: "Real-time VoIP Engine",
    description:
      "Real-time voice AI system with WebSocket/SIP protocol integration for automated intelligent phone conversations.",
    icon: "📡",
    metrics: [
      { label: "Protocol", value: "SIP/WebSocket" },
      { label: "Audio", value: "TTS/STT" },
      { label: "Processing", value: "Real-time" },
    ],
    tech: [
      "Python",
      "FastAPI",
      "WebSockets",
      "SIP Protocol",
      "TTS/STT",
      "AsyncIO",
    ],
    features: [
      "Real-time voice processing",
      "SIP trunk integration",
      "Conversation flow engine",
      "Analytics dashboard",
    ],
  },
];

export const personalInfo = {
  name: "NGUYEN",
  role: "Frontend-focused Software Engineer",
  experience: "3+ Years",
  specialization: "React / Next.js / TypeScript",
  systemVersion: "NGUYEN-OS v3.2.1",
  status: "ONLINE",
  location: "Ho Chi Minh City, Vietnam",
  summary:
    "I turn product requirements into responsive interfaces and complete features, from interaction design and frontend architecture to API and real-time integration.",
  contact: {
    email: "vannguyen.tran.164@gmail.com",
    github: "github.com/nguyen-gb",
    githubUrl: "https://github.com/nguyen-gb",
  },
};
