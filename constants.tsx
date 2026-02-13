
import { Project, Experience, SkillGroup, GithubRepo } from './types';

export const PERSONAL_INFO = {
  name: "Vikas",
  roles: ["Software Engineer", "AI Systems Developer", "Data-Driven Problem Solver"],
  tagline: "Building intelligent systems that solve real-world problems through scalable engineering and AI.",
  email: "vikas260804@gmail.com",
  phone: "+91-7701851290",
  github: "https://github.com/vikas0026",
  linkedin: "https://www.linkedin.com/in/vikas-%E2%80%8E-1b40a9294/",
  location: "Delhi, India"
};

export const EDUCATION = {
  institution: "Maharaja Surajmal Institute of Technology, GGSIPU",
  degree: "Bachelor of Science in Computer Science",
  duration: "2022 - 2026",
  cgpa: "8.20 / 10.00",
  location: "Delhi",
  coursework: ["Data Structures and Algorithms", "Object-Oriented Programming", "Database Management", "AI and Machine Learning", "System Design", "Software Development"],
};

export const EXPERIENCES: Experience[] = [
  {
    role: "AI Contributor",
    company: "Outlier AI",
    duration: "May 2024 – Sept 2025",
    location: "Remote",
    tech: ["Python", "ML Workflows", "Prompt Engineering"],
    bullets: [
      "Contributed to AI-driven solutions by building, testing, and refining machine learning workflows and prompt-based intelligence systems.",
      "Assisted in data preprocessing, model evaluation, and deployment-ready optimizations for real-world AI use cases.",
      "Collaborated with cross-functional teams to improve AI response accuracy and performance."
    ]
  },
  {
    role: "Data Analyst Intern",
    company: "IBM SkillBuild",
    duration: "Jun 2025 – Aug 2025",
    location: "Hybrid",
    tech: ["Python", "Excel", "A/B Testing", "Tableau"],
    bullets: [
      "Performed advanced exploratory data analysis (EDA) using Python to extract critical business insights.",
      "Designed and executed A/B testing experiments and applied statistical techniques to validate hypotheses.",
      "Automated reporting dashboards and translated analytical results into actionable business recommendations."
    ]
  },
  {
    role: "Software Development Engineer Intern",
    company: "Innovate",
    duration: "Sep 2025 – Jan 2026",
    location: "Hybrid",
    tech: ["NodeJS", "ExpressJS", "MongoDB", "Microservices"],
    bullets: [
      "Designed and built a microservices-based application with secure authentication and RESTful APIs.",
      "Worked on scalable application modules and performance optimization in collaborative agile teams.",
      "Implemented industry best practices for secure auth/auth and persistent storage."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "EchoClean",
    description: "AI-powered real-time toxic speech filter for voice chats.",
    longDescription: [
      "Designed an AI-powered real-time voice moderation system to detect and mitigate toxic speech during live voice chats.",
      "Implemented a speech-to-text pipeline using Whisper/Vosk followed by transformer-based toxicity classification.",
      "Developed a monitoring dashboard to visualize flagged speech and system activity."
    ],
    tech: ["Python", "Whisper", "Vosk", "Transformers", "NLP"],
    github: "https://github.com/vikas0026/EchoClean-AI",
    image: "echoclean.png"
  },
  {
    title: "NetGuard",
    description: "AI-based secure self-recovering communication system.",
    longDescription: [
      "Built a secure peer-to-peer communication system supporting encrypted text messaging.",
      "Trained a Random Forest classifier to classify network states (normal, congestion, instability) from live telemetry data.",
      "Enabled autonomous self-recovery by dynamically adapting transmission strategies based on AI predictions."
    ],
    tech: ["Java", "Python", "AES", "RSA", "ML", "Networking"],
    github: "https://github.com/vikas0026/NetGuard",
    image: "netguard.png"
  }
];

export const REPOS: GithubRepo[] = [
  { name: "Tripcasa", description: "Travel planning platform with personalized recommendations.", language: "JavaScript", stars: 10, url: "https://github.com/vikas0026/Tripcasa" },
  { name: "Lung_Cancer_Analysis", description: "Comprehensive data analysis and prediction for lung cancer datasets.", language: "Python", stars: 12, url: "https://github.com/vikas0026/Lung_Cancer_Analysis" },
  { name: "Gyani-AI", description: "Smart AI assistant for educational support and query resolution.", language: "JavaScript", stars: 8, url: "https://github.com/vikas0026/Gyani-AI" },
  { name: "Royal-Feast", description: "Restaurant Management System (Python + Tkinter) This is a desktop-based Restaurant Management System built using Python and Tkinter.", language: "Python", stars: 15, url: "https://github.com/vikas0026/Royal-Feast" },
  
  { name: "Loan-prediction", description: "ML model to predict loan eligibility based on user profile.", language: "Python", stars: 22, url: "https://github.com/vikas0026/Loan-prediction" },
  {name: "BitCheck",description:"BitCheck is your go-to destination for tracking cryptocurrency prices in real-time.",language: "HTML/CSS/JS",stars:2,url:"https://github.com/vikas0026/BitCheck"},
  {name:"AccuWeather", description:"AccuWeather is a comprehensive weather application designed to provide users with accurate and up-to-date weather information at their fingertips", language:"HTML/CSS/JS/Bootstrap",stras:2,url:"https://github.com/vikas0026/AccuWeather"}
];

export const SKILL_GROUPS: SkillGroup[] = [
  { category: "Programming", skills: ["Java", "C++", "Python", "SQL", "JavaScript", "HTML"] },
  { category: "Web & Backend", skills: ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "REST APIs"] },
  { category: "Data & AI", skills: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn", "EDA", "A/B Testing","Data Mining"] },
  { category: "Tools & Concepts", skills: ["Git", "GitHub", "VS Code", "Jupyter", "DSA", "System Design", "Software Development"] }
];

export const CERTIFICATIONS = [
  { title: "IBM AI Internship", issuer: "IBM", year: "2024" },
  { title: "Data Analytics Simulation", issuer: "Deloitte", year: "2025" },
  { title: "Data Analytics Simulation", issuer: "TATA", year: "2025" },
  { title: "Strategic Analytics", issuer: "Quantium", year: "2025" }
];
