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

export interface AutomationTool {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  metrics: Record<string, string>;
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
      "Production-grade AI chatbot with Retrieval-Augmented Generation architecture handling ~500 req/s with intelligent context retrieval.",
    icon: "🤖",
    metrics: [
      { label: "Throughput", value: "~500 req/s" },
      { label: "Architecture", value: "RAG" },
      { label: "Uptime", value: "99.9%" },
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
      { label: "Latency", value: "<2s" },
      { label: "Success Rate", value: "98%" },
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
  {
    id: "smart-loan",
    title: "Smart Loan Advisor",
    subtitle: "RBAC Financial Engine",
    description:
      "Intelligent loan advisory system with role-based access control and automated risk assessment pipelines.",
    icon: "🏦",
    metrics: [
      { label: "Security", value: "RBAC" },
      { label: "Processing", value: "Real-time" },
      { label: "Coverage", value: "Full-stack" },
    ],
    tech: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "JWT/RBAC",
      "Celery",
      "Redis",
    ],
    features: [
      "Role-based access control",
      "Automated risk scoring",
      "Document processing",
      "Compliance engine",
    ],
  },
];

export const platformAutomation: AutomationTool[] = [
  {
    id: "social-interactions",
    title: "Social Interaction Automation",
    subtitle: "Views, Likes, Comments",
    description:
      "Small automation scripts for common social actions such as viewing posts, liking content, preparing comments, and checking profile activity across Instagram, Facebook, X, and similar platforms.",
    tech: ["Python", "Playwright", "Selenium", "Session Handling"],
    metrics: { scope: "Support tool", actions: "View/Like/Comment", review: "Manual" },
    features: [
      "View and reaction flows",
      "Comment draft preparation",
      "Basic account/session handling",
      "Manual review before sensitive actions",
    ]
  },
  {
    id: "social-monitoring",
    title: "Social Activity Helper",
    subtitle: "Queues & Follow-Ups",
    description:
      "Utility workflows for monitoring simple engagement queues, collecting recent activity, and organizing follow-up tasks without replacing manual control.",
    tech: ["FastAPI", "Celery", "Redis", "OpenAI API"],
    metrics: { queue: "Lightweight", status: "Tracked", usage: "Internal" },
    features: [
      "Mention/comment queue",
      "Simple follow-up notes",
      "Scheduled task list",
      "CSV/log export",
    ]
  },
];

export const webScraping: AutomationTool[] = [
  {
    id: "website-data-scraper",
    title: "Website Data Scraper",
    subtitle: "Public Data Collection",
    description:
      "Scrapers for collecting product, listing, or article data from websites and converting it into structured JSON, CSV, or Excel outputs.",
    tech: ["Python", "Scrapy", "BeautifulSoup4", "Requests"],
    metrics: { output: "JSON/CSV/XLSX", mode: "Batch", checks: "Validated" },
    features: [
      "HTML and JSON parsing",
      "Pagination handling",
      "Data cleanup and validation",
      "CSV/Excel export",
    ]
  },
  {
    id: "scraping-pipeline",
    title: "Scraping Pipeline",
    subtitle: "Cleanup & Storage",
    description:
      "Basic pipeline for retrying failed requests, cleaning duplicated records, and storing scraped data for later use.",
    tech: ["Python AsyncIO", "Pandas", "MongoDB", "PostgreSQL"],
    metrics: { retries: "Backoff", storage: "DB/Files", quality: "Cleaned" },
    features: [
      "Retry and cooldown rules",
      "Duplicate removal",
      "Schema normalization",
      "Database or file storage",
    ]
  },
];

export const automationTools = [...platformAutomation, ...webScraping];


export const personalInfo = {
  name: "NGUYEN",
  role: "Fullstack Software Engineer",
  experience: "3+ Years",
  specialization: "FastAPI (Python) & React/Next.js",
  systemVersion: "NGUYEN-OS v3.2.1",
  status: "ONLINE",
  location: "Ho Chi Minh City, Vietnam",
  contact: {
    phone: "0395162022",
    email: "vannguyen.tran.164@gmail.com",
    github: "github.com/nguyen-gb",
  },
};
