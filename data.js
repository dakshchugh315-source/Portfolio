// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your portfolio. Everything on the
//  site (projects, experience, achievements, skills, links) is
//  read from here. Lines marked TODO still need your details.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Daksh Chugh",
  roles: ["AI / ML Developer", "CRM Builder @ Elegant Technologies", "UI / UX Designer", "Hackathon Competitor"],
  tagline:
    "I build intelligent systems — deepfake detectors, satellite super-resolution, autonomous agents — and right now, a CRM for Elegant Technologies.",
  location: "India", // TODO: your city
  email: "", // TODO: your contact email (leave "" to hide)
  resume: "", // TODO: link to resume PDF (e.g. "resume.pdf")
  current: { company: "Elegant Technologies", what: "building their CRM" },
  highlights: ["🏆 SIH · Rank #52", "🥇 IIT Delhi · Top 10", "📜 2× IIT Delhi certified", "🎓 B.Tech AI/ML · Bennett University"],
  links: {
    github: "https://github.com/dakshchugh315-source",
    linkedin: "https://www.linkedin.com/in/daksh-chugh-5175a8439/",
  },
  about: [
    "I'm a 2nd-year B.Tech student specialising in AI & ML at Bennett University, and a developer who turns research ideas into working products. Most of my work sits where machine learning meets real users — computer-vision models with a clean interface, NLP pipelines you can talk to, and agents that make decisions under a budget.",
    "I'm certified by IIT Delhi in both AI/ML and UI/UX, so I care as much about how a product feels as how the model scores. Today I'm building a CRM at Elegant Technologies, and on weekends you'll find me at hackathons.",
  ],
};

// Big animated numbers in the Achievements section
export const stats = [
  { value: 52, prefix: "#", label: "Smart India Hackathon rank", sub: "Top 100 nationally" },
  { value: 10, prefix: "Top ", label: "IIT Delhi hackathon", sub: "Battle Arena problem" },
  { value: 2, suffix: "×", label: "IIT Delhi certifications", sub: "AI/ML · UI/UX" },
  { value: 9, suffix: "+", label: "Projects shipped", sub: "AI, web & mobile" },
];

export const achievements = [
  {
    icon: "🏆",
    title: "Smart India Hackathon — Rank #52",
    detail: "Placed inside the national Top 100. The next round is in progress.",
    live: true,
  },
  {
    icon: "🥇",
    title: "Top 10 — IIT Delhi Hackathon",
    detail: "Battle Arena problem statement: built an autonomous agent that competed live against other teams.",
  },
  {
    icon: "🧠",
    title: "AI / ML Certification — IIT Delhi",
    detail: "Machine learning, deep learning and applied AI.", // TODO: year / course name
  },
  {
    icon: "🎨",
    title: "UI / UX Design Certification — IIT Delhi",
    detail: "User research, wireframing, prototyping and interface design.", // TODO: year / course name
  },
];

export const projects = [
  {
    title: "CRM_ETPL — Enterprise CRM",
    badge: "Live at Elegant Technologies",
    category: "Full-Stack",
    summary:
      "A robust enterprise management system with role-based access control and real-time cost sheet tracking — built to stay secure, fast and highly scalable.",
    points: [
      "Role-based access control (RBAC) so every team sees exactly what it should",
      "Real-time cost sheet tracking backed by Supabase PostgreSQL",
      "React frontend designed for a fast, scalable day-to-day workflow",
    ],
    tech: ["React", "Supabase", "PostgreSQL", "RBAC"],
    note: "Company project · private repo",
    color: "#38bdf8",
  },
  {
    title: "OrbitVision AI",
    badge: "Space Tech · ML",
    category: "Computer Vision",
    summary:
      "An advanced satellite-data analysis system that uses machine learning and telemetry analysis to process satellite imagery and track earth-observation signals in real time.",
    points: [
      "ML pipeline that processes satellite imagery for earth observation",
      "Telemetry analysis to track environmental change such as deforestation",
      "Built for accurate, real-time monitoring and analysis",
    ],
    tech: ["Machine Learning", "Satellite Imagery", "Telemetry", "Earth Observation"],
    note: "Repo coming soon", // TODO: add repo: "https://github.com/..." when public
    color: "#818cf8",
  },
  {
    title: "Battle Arena Hiring Agent",
    badge: "Top 10 · IIT Delhi",
    category: "AI Agents",
    summary:
      "An autonomous Python agent that competes in a live, credit-metered hiring market — searching, scoring, verifying and signing candidates faster than rival teams.",
    points: [
      "Budget-aware strategy: every spend must beat expected points × penalty factor",
      "Skill normalisation, fraud & duplicate detection, verified-assessment overrides",
      "Parallel offers under a team-wide 8.5 req/s throttle with automatic fallbacks",
      "Built a full mock arena simulator to test strategy without spending real credits",
    ],
    tech: ["Python", "REST APIs", "Agents", "Simulation"],
    repo: "https://github.com/dakshchugh315-source/IITD_Problem_statment_top5",
    color: "#7c5cff",
  },
  {
    title: "Super-Resolution Mapping (SRM)",
    badge: "Deep Learning · GIS",
    category: "Computer Vision",
    summary:
      "A deep-learning platform that reconstructs finer spatial detail from medium-resolution satellite imagery while preserving spectral consistency.",
    points: [
      "Upload, enhance, compare (before/after slider), history and analytics workspaces",
      "Validation with PSNR, SSIM, RMSE and SAM metrics",
      "Interactive 3D Earth hero built with React Three Fiber",
    ],
    tech: ["Deep Learning", "Next.js", "TypeScript", "Three.js"],
    repo: "https://github.com/dakshchugh315-source/Deep-Learning-Based-Super-Resolution-Mapping-SRM-",
    color: "#22d3ee",
  },
  {
    title: "Sentinel Forensics",
    badge: "Deepfake Detection",
    category: "Computer Vision",
    summary:
      "AI-driven synthetic media detection — a CNN trained on CIFake that tells real photos from AI-generated images in real time.",
    points: [
      "Convolutional neural network built and trained with TensorFlow / Keras",
      "Forensic web suite for instant image authenticity verification",
      "Polished Streamlit UI with confidence scoring",
    ],
    tech: ["Python", "TensorFlow", "CNN", "Streamlit"],
    repo: "https://github.com/dakshchugh315-source/Sentinel-Forensics-AI-Driven-Synthetic-Media-Detection-using-Deep-Learning",
    color: "#f43f5e",
  },
  {
    title: "Cameloku",
    badge: "Mobile Game",
    category: "App Dev",
    summary:
      "A brain-teasing grid logic puzzle in Flutter — Sudoku meets Star Battle, with camels. Co-built with Gunaj Chugh.",
    points: [
      "Backtracking algorithm validates every move instantly",
      "Multi-level progression from 4×4 warm-ups to boss grids, 3-life system",
      "Fully responsive layout across Android, iOS, web and desktop",
    ],
    tech: ["Flutter", "Dart", "Algorithms"],
    repo: "https://github.com/dakshchugh315-source/Camel-Grid",
    color: "#f59e0b",
  },
  {
    title: "Dream Analyzer",
    badge: "NLP",
    category: "Machine Learning",
    summary:
      "An NLP app that reads a dream description and predicts its emotion and theme, flags nightmares and suggests wellbeing tips.",
    points: [
      "Two TF-IDF + classifier pipelines (emotion and theme) trained on a balanced dream dataset",
      "Nightmare keyword detection, word clouds and downloadable PDF reports",
      "Deployed as an interactive Streamlit app",
    ],
    tech: ["Python", "scikit-learn", "NLP", "Streamlit"],
    repo: "https://github.com/dakshchugh315-source/dream-analyzer",
    color: "#a78bfa",
  },
  {
    title: "FarmVision",
    badge: "AgriTech",
    category: "Computer Vision",
    summary:
      "AI-assisted cattle & buffalo breed classification for field workers — snap a photo, get the breed, confidence and foreign-breed flags.",
    points: [
      "Classifier, live camera, health scan and history modules",
      "Designed for low-end phones with explainable, audit-friendly results",
    ],
    tech: ["HTML", "JavaScript", "Tailwind", "Computer Vision"],
    repo: "https://github.com/dakshchugh315-source/Farm-Vision",
    color: "#22c55e",
  },
  {
    title: "Daksh Hub",
    badge: "Web",
    category: "Web Dev",
    summary:
      "A personal smart link hub with a cyber-themed glass UI, light/dark modes and animated link cards.",
    points: ["Hand-written HTML/CSS/JS, no framework", "Theme switching and responsive card layout"],
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/dakshchugh315-source/daksh-hub",
    color: "#84cc16",
  },
];

// type: "work" | "hackathon" | "education" | "certification"
export const experience = [
  {
    type: "work",
    current: true,
    title: "Developer — CRM_ETPL", // TODO: your exact job title
    org: "Elegant Technologies",
    period: "Present", // TODO: start month, e.g. "Aug 2026 – Present"
    description:
      "Building CRM_ETPL, the company's enterprise management system, with React and Supabase PostgreSQL — role-based access control and real-time cost sheet tracking.",
  },
  {
    type: "hackathon",
    current: true,
    title: "Rank #52 — Smart India Hackathon",
    org: "Government of India · National level",
    period: "2026 · ongoing",
    description: "Placed in the national Top 100 (rank 52). Currently competing in the next round.",
  },
  {
    type: "hackathon",
    title: "Top 10 — Battle Arena Problem Statement",
    org: "IIT Delhi Hackathon · Team Confused Devs",
    period: "2026", // TODO: exact month
    description:
      "Designed and shipped an autonomous hiring agent that competed live against other teams in a credit-metered API market, finishing in the top 10.",
  },
  {
    type: "certification",
    title: "AI / ML & UI / UX Certifications",
    org: "IIT Delhi",
    period: "", // TODO: year
    description: "Completed IIT Delhi certification programmes in Artificial Intelligence & Machine Learning and in UI/UX Design.",
  },
  {
    type: "education",
    current: true,
    title: "B.Tech — Artificial Intelligence & Machine Learning",
    org: "Bennett University",
    period: "2025 – 2029 · 2nd year", // TODO: correct years if different
    description: "Currently in 2nd year, specialising in AI & ML.", // TODO: add CGPA, coursework, clubs
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "Dart", "HTML/CSS", "SQL"] },
  { group: "AI / ML", items: ["TensorFlow", "Keras", "scikit-learn", "CNNs", "NLP", "Computer Vision", "AI Agents"] },
  { group: "Web & Apps", items: ["Next.js", "React", "Three.js", "Tailwind", "Flutter", "Streamlit", "CRM Systems"] },
  { group: "Design", items: ["UI / UX", "Wireframing", "Prototyping", "Design Systems"] },
  { group: "Tools", items: ["Git", "GitHub", "REST APIs", "Pandas", "NumPy", "VS Code"] },
];
