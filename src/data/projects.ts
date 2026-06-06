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
    role: "Frontend implementation",
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
    role: "Frontend implementation",
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
    role: "Frontend implementation",
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
    role: "Frontend implementation",
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
      "Large-scale healthcare enterprise website with multi-location support, appointment systems, and CMS integration.",
    image: "/images/projects/hoan-my.jpg",
    url: "https://hoanmy.com/",
    tech: ["WordPress", "Custom PHP", "MySQL", "REST API"],
    role: "Web platform development",
    focus: ["CMS integration", "Multi-location content", "Responsive frontend"],
    status: "live",
  },
  {
    id: "kodo",
    title: "Kodo",
    subtitle: "Corporate Business Platform",
    description:
      "Professional corporate website with custom theme development, advanced WooCommerce integration, and SEO optimization.",
    image: "/images/projects/kodo.jpg",
    url: "https://kodo.vn/",
    tech: ["WordPress", "WooCommerce", "Custom Themes", "Linux"],
    role: "WordPress development",
    focus: ["Custom theme UI", "Commerce integration", "SEO foundations"],
    status: "live",
  },
  {
    id: "nhac-cu-minh-phung",
    title: "Nhac Cu Minh Phung",
    subtitle: "E-Commerce Music Store",
    description:
      "Feature-rich e-commerce platform for musical instruments with inventory management and payment gateways.",
    image: "/images/projects/nhac-cu-minh-phung.jpg",
    url: "https://nhaccuminhphung.com/",
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    role: "E-commerce development",
    focus: ["Product catalog UI", "Commerce flows", "Responsive storefront"],
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
    role: "Full-stack product development",
    focus: ["Interactive React UI", "Real-time audio flow", "API integration"],
    status: "live",
    features: [
      "AI conversation partner",
      "Audio processing",
      "Progress tracking",
      "Adaptive difficulty",
    ],
  },
  {
    id: "nhcinema",
    title: "NHCinema",
    subtitle: "Real-time Ticket Booking Platform",
    description:
      "Full-stack movie booking ecosystem with real-time seat selection via WebSockets, spanning Web and Mobile platforms with admin dashboard.",
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
    role: "Cross-platform frontend development",
    focus: ["Real-time seat UI", "Shared product flows", "State management"],
    status: "scanning",
    features: [
      "Real-time seat booking",
      "WebSocket sync",
      "Cross-platform UI",
      "Admin analytics",
    ],
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
  contact: {
    email: "vannguyen.tran.164@gmail.com",
    github: "github.com/nguyen-gb",
  },
};
