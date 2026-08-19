import { Project, ExperienceItem, EducationItem, SkillCategory, Certification, Achievement } from '../types';

export const PERSONAL_INFO = {
  name: 'Karankumar G',
  roleTitle: 'Full Stack & AI Software Engineer',
  rolesList: [
    'Full Stack Engineer',
    'AI & RAG Systems Builder',
    'LangGraph & Agentic Workflows',
    'Django & Python Specialist',
    'Salesforce & CRM Automation',
  ],
  tagline: 'Building scalable enterprise backends, intelligent RAG pipelines, and LangGraph-driven multi-agent workflows that bridge AI with reliable software systems.',
  email: 'karankumar.g0csa@gmail.com',
  phone: '+91 9345543332',
  location: 'Chennai, India',
  coordinates: '13.0827° N, 80.2707° E',
  currentStatus: 'Currently building agentic AI systems at Data Aces',
  currentRole: 'Software Engineer @ Data Aces',
  experienceYears: '2+ Years in AI & Backend Engineering',
  github: 'https://github.com/karankumar-g',
  githubHandle: 'karankumar-g',
  linkedin: 'https://www.linkedin.com/in/karankumar-g',
  linkedinHandle: 'in/karankumar-g',
  medium: 'https://medium.com/@karankumar.g0csa',
  mediumHandle: '@karankumar.g0csa',
  bio: `I am a Full Stack & AI Software Engineer who focuses on the junction of enterprise backend reliability and modern agentic intelligence. My work centers on turning generative models and RAG systems from experimental prototypes into deterministic, fault-tolerant, and high-performance systems. At Data Aces, I design multi-agent workflows using LangGraph and Model Context Protocol (MCP), fine-tune domain-specific LLMs, and construct resilient ETL & data processing backends.`,
  funFacts: [
    { label: 'Primary Focus', value: 'Translating fuzzy LLM outputs into predictable state machines', emoji: '⚡' },
    { label: 'Favorite Stack', value: 'Event-driven LangGraph + Redis vector caching', emoji: '🧠' },
    { label: 'Fuel of Choice', value: 'Filter Coffee & Clean PostgreSQL Schemas', emoji: '☕' },
    { label: 'Work Ethic', value: 'High throughput, zero fluff, clean system design', emoji: '🔥' }
  ],
  corePhilosophy: [
    {
      title: 'Deterministic AI Systems',
      description: 'Generative models need tight boundaries. I structure multi-agent workflows with state machines (LangGraph) and MCP tool orchestration to ensure predictable, low-latency execution.',
      emoji: '🤖'
    },
    {
      title: 'Scalable Data & Analytics Pipelines',
      description: 'Quality in, quality out. Robust ETL pipelines, clean data preparation for pharma analytics, vector indexing, and rigorous automated evaluations.',
      emoji: '📊'
    },
    {
      title: 'Resilient Backend Engineering',
      description: 'Clean RESTful APIs, asynchronous message queues, containerized deployment, and resilient PostgreSQL/Redis data layers built with Django and modern Python.',
      emoji: '🏗️'
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'ace-ai',
    title: 'AceAI',
    tagline: 'Enterprise RAG Platform & Multi-Agent Intelligence Engine',
    category: 'AI & RAG Systems',
    stack: ['Django', 'LLMs', 'React', 'LangGraph', 'MCP', 'Weaviate', 'MLflow', 'AWS', 'Azure'],
    metrics: [
      {
        label: 'Context Latency',
        value: '<450ms',
        numValue: 450,
        suffix: 'ms',
        description: 'Optimized multi-turn context caching and streaming token delivery'
      }
    ],
    bullets: [
      'Engineered a RAG-based conversational AI platform with semantic search and document intelligence pipelines, enabling automated knowledge extraction and high-precision retrieval.',
      'Designed a modular, multi-cloud system supporting both AWS and Azure AI services with LangGraph-based agentic workflows and MCP orchestration, enabling flexible deployment based on client infrastructure.',
      'Integrated end-to-end evaluation workflows using MLflow to benchmark hallucination rates and semantic drift across continuous model iterations.'
    ],
    highlights: [
      'Hybrid semantic dense/sparse search with Weaviate vector indexing',
      'Cyclical multi-agent state graph routing with LangGraph',
      'Model Context Protocol (MCP) tool integration layer',
      'Automated quality regression benchmarks with MLflow'
    ],
    architectureOverview: 'Client React UI connects via WebSocket/REST to a scalable Django backend. Queries pass through a LangGraph supervisor agent that routes between document vector indices (Weaviate), MCP external tools, and fine-tuned LLM inference endpoints on AWS/Azure.',
    flowSteps: [
      { title: 'Ingestion & Vectorization', description: 'Enterprise documents parsed, chunked, and embedded into Weaviate with hybrid dense/sparse indexing.', tech: 'Weaviate & Custom Embeddings', badge: 'Step 01' },
      { title: 'Agentic Routing', description: 'LangGraph state graph evaluates intent, decides tool invocation vs direct context retrieval.', tech: 'LangGraph & MCP', badge: 'Step 02' },
      { title: 'Contextual Generation', description: 'Prompt assembly with reranked context and dynamic system instructions.', tech: 'LLMs (Azure OpenAI / AWS Bedrock)', badge: 'Step 03' },
      { title: 'Evaluation & Logging', description: 'Automated scoring for faithfulness, relevancy, and experiment tracking.', tech: 'MLflow', badge: 'Step 04' }
    ],
    gradient: 'from-violet-600/20 via-indigo-600/10 to-cyan-500/20',
    featured: true
  },
  {
    id: 'sales-automation',
    title: 'Sales Automation & WhatsApp CRM',
    tagline: 'Salesforce CRM Workflows with Real-Time WhatsApp Integration',
    category: 'CRM & Enterprise Automation',
    stack: ['Salesforce', 'WhatsApp API', 'Django', 'Python', 'Webhooks', 'REST APIs', 'PostgreSQL'],
    metrics: [
      {
        label: 'Workflow Automation',
        value: '100%',
        numValue: 100,
        suffix: '%',
        description: 'End-to-end automated follow-up sequences and lead status synchronization'
      }
    ],
    bullets: [
      'Automated sales workflows using Salesforce CRM integrated with WhatsApp for real-time customer communication and automated conversational triggers.',
      'Streamlined lead management, automatic follow-ups, and scheduled reporting while tracking customer interactions through WhatsApp for improved sales efficiency and team performance.',
      'Built bi-directional webhook synchronizations between WhatsApp Cloud API and Salesforce custom objects to maintain full audit logs and communication histories.'
    ],
    highlights: [
      'Seamless Salesforce CRM integration with WhatsApp Business API',
      'Automated multi-step follow-up sequences and lead routing',
      'Real-time conversation logging and sales telemetry dashboard',
      'Instant notification triggers for high-priority lead events'
    ],
    architectureOverview: 'Inbound WhatsApp webhook payloads are ingested by a high-throughput Django gateway, validated, and synchronized into Salesforce CRM objects via REST APIs. Automated Salesforce triggers schedule follow-ups and dispatch targeted WhatsApp communications.',
    flowSteps: [
      { title: 'Lead Ingestion & Capture', description: 'Inbound customer inquiry received via WhatsApp or web form, instantly creating Salesforce Lead records.', tech: 'WhatsApp Webhooks & Salesforce API', badge: 'Step 01' },
      { title: 'Automated Follow-Up Flow', description: 'Triggers personalized conversational sequences and notifies sales representatives in real time.', tech: 'Salesforce Flows & Django Gateway', badge: 'Step 02' },
      { title: 'Interaction Tracking', description: 'Full conversation transcripts and message delivery receipts logged directly to CRM contact timelines.', tech: 'PostgreSQL & Salesforce Custom Objects', badge: 'Step 03' },
      { title: 'Reporting & Analytics', description: 'Real-time sales velocity, response rate, and conversion pipeline dashboards.', tech: 'Salesforce Dashboards & React', badge: 'Step 04' }
    ],
    gradient: 'from-emerald-600/20 via-teal-600/10 to-cyan-500/20',
    featured: true
  },
  {
    id: 'pharma-analytics',
    title: 'Pharma Data Prep & Analytics Dashboards',
    tagline: 'Healthcare Analytics for HCP, Patient Journey & Brand Performance',
    category: 'Pharma Analytics & Data Engineering',
    stack: ['Python', 'SQL', 'DBT', 'Prefect', 'PostgreSQL', 'React', 'Tableau', 'AWS S3'],
    metrics: [
      {
        label: 'Analytics Coverage',
        value: 'Multi-Brand',
        numValue: 100,
        suffix: '',
        description: 'Comprehensive reporting across HCP engagement, patient drop-offs, and market trends'
      }
    ],
    bullets: [
      'Specialized in pharmaceutical data processing, managing rigorous data preparation pipelines and constructing custom multi-dimensional analytical dashboards.',
      'Designed domain-specific dashboards focusing on Healthcare Professional (HCP) prescribing trends, Patient longitudinal journeys, and Brand performance KPIs.',
      'Built scalable data transformation layers using SQL and DBT orchestrated with Prefect, ensuring clinical-grade data accuracy and automated compliance reporting.'
    ],
    highlights: [
      'Comprehensive data preparation and cleansing for complex healthcare & pharma datasets',
      'Specialized dashboards for HCP engagement, Patient treatment journeys, and Brand analytics',
      'Automated data transformation pipelines and cohort aggregations with DBT & Prefect',
      'Interactive executive and field-level visual reporting consoles'
    ],
    architectureOverview: 'Raw pharmaceutical datasets stored in S3/cloud storage are ingested and transformed through DBT models with Prefect DAG orchestration into partitioned analytical schemas in PostgreSQL/Warehouse, feeding responsive custom React and Tableau reporting dashboards.',
    flowSteps: [
      { title: 'Data Ingestion & Staging', description: 'Ingests multi-source pharma feeds, prescription data, and HCP rosters into cloud staging partitions.', tech: 'Python SDKs & AWS S3', badge: 'Step 01' },
      { title: 'Data Prep & Transformation', description: 'Cleanses, anonymizes, and models data into HCP, Patient, and Brand analytical schemas.', tech: 'DBT & SQL Models', badge: 'Step 02' },
      { title: 'Orchestration & Validation', description: 'Automated DAG execution with built-in data quality assertions and discrepancy alerts.', tech: 'Prefect Workflows', badge: 'Step 03' },
      { title: 'Interactive Dashboards', description: 'Visualizes HCP prescribing patterns, patient journey stages, and brand market share.', tech: 'React & Tableau BI', badge: 'Step 04' }
    ],
    gradient: 'from-cyan-600/20 via-teal-600/10 to-emerald-500/20',
    featured: true
  },
  {
    id: 'proctor-point',
    title: 'Proctor Point',
    tagline: 'Computer Vision AI Proctoring & Secure Assessment Platform',
    category: 'Computer Vision & Security',
    stack: ['Django', 'React', 'Computer Vision', 'YOLOv8', 'Face Recognition', 'OpenCV', 'WebSockets', 'PostgreSQL'],
    metrics: [
      {
        label: 'Concurrent Streams',
        value: '500+',
        numValue: 500,
        suffix: '+',
        description: 'Simultaneous low-latency video streams monitored without frame drops'
      }
    ],
    bullets: [
      'Developed a full-scale AI proctoring system using face recognition and YOLO-based detection, enabling real-time monitoring and accurate identification of unauthorized activities.',
      'Engineered a secure, scalable exam management platform with role-based access control (RBAC), automated scheduling, and instant anomaly notifications, supporting reliable concurrent assessments.',
      'Integrated client-side lightweight frame sampling with backend GPU inference clustering to maintain 30 FPS telemetry with minimal network overhead.'
    ],
    highlights: [
      'Real-time YOLOv8 object detection for prohibited devices (phones, tablets, books)',
      'Facial recognition and gaze trajectory tracking using OpenCV & FaceNet',
      'High-throughput WebSocket streaming with Django Channels',
      'Role-based exam administration with instant anomaly flags'
    ],
    architectureOverview: 'WebRTC video streams sent from student React clients are sampled and processed by a YOLOv8 and FaceNet inference pipeline. Real-time flags and infractions are pushed via Django Channels/WebSockets to proctor dashboards.',
    flowSteps: [
      { title: 'Identity Verification', description: 'Pre-exam biometric facial embedding match against registered identity.', tech: 'FaceNet & OpenCV', badge: 'Step 01' },
      { title: 'Real-time YOLO Detection', description: 'Detects prohibited objects (phones, notes, multiple persons in frame).', tech: 'YOLOv8 & PyTorch', badge: 'Step 02' },
      { title: 'Gaze & Head Pose Tracking', description: 'Calculates yaw, pitch, roll angles to detect sustained off-screen attention.', tech: 'MediaPipe / OpenCV', badge: 'Step 03' },
      { title: 'Audit Trail & Incident Log', description: 'Timestamped video snippets and confidence scores logged in PostgreSQL.', tech: 'Django REST & WebSockets', badge: 'Step 04' }
    ],
    gradient: 'from-amber-600/20 via-rose-600/10 to-violet-500/20',
    featured: true
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'data-aces',
    role: 'Software Engineer',
    company: 'Data Aces',
    location: 'Chennai, India',
    period: '05/2025 – Present',
    statusChip: '🟢 Active Role',
    summary: 'Driving backend engineering, AI system design, CRM sales automation, and specialized pharma data pipelines across enterprise client platforms. Specializing in RAG pipelines, LangGraph-based agentic workflows, Salesforce integrations, and scalable analytical infrastructure.',
    responsibilities: [
      {
        point: 'Built scalable backend systems and RESTful APIs for AI-driven applications, integrating RAG pipelines, LLM fine-tuning, and automated evaluation workflows to ensure high response quality and system performance.',
        tags: ['Django REST', 'RAG', 'MLflow', 'Fine-tuning', 'PostgreSQL'],
        impactMetric: 'High-Precision Context Retrieval'
      },
      {
        point: 'Built real-time conversational AI systems with LangGraph-based agentic workflows and Model Context Protocol (MCP) tool orchestration, enabling multi-turn interactions, dynamic reasoning, and low-latency user experiences.',
        tags: ['LangGraph', 'MCP', 'Agentic AI', 'WebSockets', 'Redis', 'Python'],
        impactMetric: '<450ms Multi-Turn Latency'
      },
      {
        point: 'Implemented Sales Automation workflows using Salesforce CRM integrated with WhatsApp for real-time customer communication, streamlined lead management, and automated follow-up reporting.',
        tags: ['Salesforce', 'WhatsApp API', 'Webhooks', 'CRM Automation', 'Python'],
        impactMetric: 'Automated Lead & Follow-Up Sync'
      },
      {
        point: 'Specialized in pharma data preparation and custom dashboard creation focusing on Healthcare Professionals (HCP), Patient treatment journeys, and Brand analytics.',
        tags: ['Pharma Analytics', 'DBT', 'Prefect', 'SQL', 'Tableau / React Dashboards'],
        impactMetric: 'Multi-Brand Health Insights'
      }
    ],
    techStack: [
      'Python', 'Django', 'Django REST Framework', 'LangGraph', 'MCP', 
      'RAG', 'MLflow', 'Salesforce', 'WhatsApp API', 'PostgreSQL', 'Redis', 'Weaviate', 'DBT', 'Prefect', 'AWS', 'Azure'
    ],
    keyWins: [
      'Engineered enterprise RAG platform adopted across multi-tenant clients',
      'Built automated Salesforce CRM & WhatsApp real-time sales communication integration',
      'Developed specialized pharma analytics dashboards for HCP and patient journey intelligence'
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'mca',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Dwaraka Doss Goverdhan Doss Vaishnav College',
    location: 'Chennai, India',
    period: '06/2023 – 04/2025',
    score: 'Distinction',
    scoreLabel: 'Degree: MCA (Distinction)',
    highlight: 'Distinction / High Standing',
    coursework: [
      'Advanced Data Structures & Algorithms',
      'Distributed Systems & Cloud Computing',
      'Machine Learning & Artificial Intelligence',
      'Advanced Database Management Systems (PostgreSQL, NoSQL)',
      'Enterprise Application with Python & React'
    ]
  },
  {
    id: 'bsc-cs',
    degree: 'Bachelor of Science in Computer Science (B.Sc CS)',
    institution: 'Thiruthangal Nadar College',
    location: 'Chennai, India',
    period: '04/2020 – 04/2023',
    score: 'First Class',
    scoreLabel: 'Degree: B.Sc CS (First Class with Distinction)',
    highlight: 'First Class with Distinction',
    coursework: [
      'Object Oriented Programming (Python, Java, C++)',
      'Relational Database Systems (SQL)',
      'Computer Networks & Web Technologies',
      'Operating Systems & Linux Systems Programming',
      'Software Engineering Methodologies'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    description: 'Core programming languages for backend logic, data transformation, and frontend',
    skills: [
      { name: 'Python', level: 'Expert', highlight: true, description: 'Backend services, AI pipelines, async programming', percentage: 95 },
      { name: 'JavaScript', level: 'Expert', description: 'Modern ES6+, DOM manipulation, event loops', percentage: 90 },
      { name: 'TypeScript', level: 'Advanced', highlight: true, description: 'Type-safe frontend and Node tool integrations', percentage: 88 },
      { name: 'SQL', level: 'Expert', highlight: true, description: 'Complex joins, window functions, indexing', percentage: 92 }
    ]
  },
  {
    category: 'Frameworks & Web',
    description: 'Web frameworks and frontend component libraries',
    skills: [
      { name: 'Django', level: 'Expert', highlight: true, description: 'ORM, auth, middleware, scalable services', percentage: 94 },
      { name: 'Django REST Framework', level: 'Expert', highlight: true, description: 'High-throughput RESTful APIs, serializers', percentage: 95 },
      { name: 'React', level: 'Advanced', highlight: true, description: 'Hooks, state management, real-time UIs', percentage: 88 },
      { name: 'Flask', level: 'Advanced', description: 'Lightweight microservices, inference APIs', percentage: 85 }
    ]
  },
  {
    category: 'AI & Agentic Systems',
    description: 'Agentic workflows, RAG, LLM fine-tuning, and evaluation',
    skills: [
      { name: 'LangGraph', level: 'Expert', highlight: true, description: 'Multi-agent state machines, supervisor flows', percentage: 94 },
      { name: 'RAG Systems', level: 'Expert', highlight: true, description: 'Dense/sparse hybrid retrieval, re-ranking', percentage: 96 },
      { name: 'MCP (Model Context Protocol)', level: 'Expert', highlight: true, description: 'Standardized tool and context orchestration', percentage: 92 },
      { name: 'LLM Fine-tuning', level: 'Advanced', description: 'LoRA/QLoRA domain adaptation, prompt alignment', percentage: 85 },
      { name: 'MLflow', level: 'Advanced', description: 'Experiment tracking, model registry', percentage: 88 },
      { name: 'AI Evaluation & Benchmarking', level: 'Advanced', description: 'Faithfulness, relevancy, hallucination metrics', percentage: 89 }
    ]
  },
  {
    category: 'Databases & Vector Stores',
    description: 'Relational, NoSQL, in-memory caching, and vector engines',
    skills: [
      { name: 'PostgreSQL', level: 'Expert', highlight: true, description: 'ACID, pgvector, query optimization', percentage: 92 },
      { name: 'Weaviate', level: 'Advanced', highlight: true, description: 'Vector DB, hybrid search, multi-tenant', percentage: 90 },
      { name: 'Redis', level: 'Advanced', highlight: true, description: 'Caching, session store, pub/sub', percentage: 88 },
      { name: 'MongoDB', level: 'Proficient', description: 'Document stores, aggregation pipelines', percentage: 82 },
      { name: 'Cassandra', level: 'Proficient', description: 'Distributed columnar database', percentage: 80 }
    ]
  },
  {
    category: 'Tools & Orchestration',
    description: 'Workflow orchestrators, pharma data prep tools, testing, and cloud',
    skills: [
      { name: 'Prefect', level: 'Advanced', highlight: true, description: 'Modern workflow orchestration, DAGs', percentage: 90 },
      { name: 'DBT', level: 'Advanced', highlight: true, description: 'Data modeling, transformation, data prep', percentage: 90 },
      { name: 'Git & GitHub', level: 'Expert', description: 'Branching, GitHub Actions CI/CD', percentage: 95 },
      { name: 'Playwright', level: 'Advanced', description: 'Browser automation, E2E testing', percentage: 86 },
      { name: 'N8N Automation', level: 'Advanced', description: 'Node-based workflows and webhooks', percentage: 85 },
      { name: 'Docker / Cloud (AWS/Azure)', level: 'Proficient', description: 'Containerization, serverless compute', percentage: 84 }
    ]
  },
  {
    category: 'CRM & Enterprise',
    description: 'Salesforce CRM, WhatsApp sales automation, and enterprise platforms',
    skills: [
      { name: 'Salesforce CRM & Automation', level: 'Expert', highlight: true, description: 'Workflows, custom objects, lead management', percentage: 94 },
      { name: 'WhatsApp Business API', level: 'Expert', highlight: true, description: 'Real-time customer communication & webhook bots', percentage: 92 },
      { name: 'Salesforce Agentforce', level: 'Advanced', highlight: true, description: 'Autonomous enterprise AI agents', percentage: 90 }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'agentforce',
    title: 'Salesforce Certified Agentforce Specialist',
    issuer: 'Salesforce',
    badgeType: 'Agentforce',
    skillsLearned: ['Autonomous AI Agents', 'Prompt Builder', 'Action Triggers', 'Enterprise CRM']
  },
  {
    id: 'nptel-python',
    title: 'The Joy of Computing using Python',
    issuer: 'NPTEL',
    badgeType: 'Python',
    skillsLearned: ['Data Structures', 'Algorithmic Thinking', 'Recursion', 'Problem Solving']
  },
  {
    id: 'postman-expert',
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    badgeType: 'API',
    skillsLearned: ['REST APIs', 'Request Chaining', 'Automated Tests', 'API Docs']
  },
  {
    id: 'spoken-tutorial-python',
    title: 'Python – Spoken Tutorial',
    issuer: 'IIT Bombay',
    badgeType: 'Python',
    skillsLearned: ['Core Syntax', 'File I/O', 'OOP', 'Standard Libraries']
  },
  {
    id: 'meta-django',
    title: 'Django Web Framework',
    issuer: 'Meta',
    badgeType: 'Meta',
    skillsLearned: ['Django Architecture', 'ORM Models', 'Views', 'Authentication']
  },
  {
    id: 'meta-apis',
    title: 'APIs & Backend Development',
    issuer: 'Meta',
    badgeType: 'Meta',
    skillsLearned: ['DRF Serializers', 'Pagination', 'Auth Tokens', 'API Security']
  },
  {
    id: 'hackerrank-sql',
    title: 'SQL (Advanced / Intermediate)',
    issuer: 'HackerRank',
    badgeType: 'Data',
    skillsLearned: ['Subqueries', 'Window Functions', 'Indexing', 'Grouping Sets']
  },
  {
    id: 'tableau-bi',
    title: 'Tableau for Business Intelligence',
    issuer: 'BI Academy',
    badgeType: 'Data',
    skillsLearned: ['Visualization', 'Dashboards', 'Calculated Fields', 'Trends']
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'academic-excellence',
    title: 'Academic Distinction in Computing Systems',
    organization: 'Thiruthangal Nadar College, Chennai',
    period: 'B.Sc Computer Science',
    description: 'Consistently achieved distinction and top standing across core computing subjects including Data Structures, Algorithms, and Database Management Systems.',
    badgeText: 'Distinction Standing',
    highlightNumber: '95%'
  }
];

export const TIMELINE_JOURNEY = [
  {
    year: '2020 – 2023',
    title: 'Foundations & Core Computer Science',
    institution: 'Thiruthangal Nadar College (B.Sc Computer Science)',
    badge: 'First Class with Distinction',
    narrative: 'Began my formal computing journey with a rigorous foundation in algorithms, data structures, and relational databases while building early Python and web prototypes.',
    accentColor: '#F59E0B'
  },
  {
    year: '2023 – 2025',
    title: 'Master of Computer Applications & Applied AI',
    institution: 'Dwaraka Doss Goverdhan Doss Vaishnav College (MCA)',
    badge: 'Postgraduate Distinction',
    narrative: 'Advanced into distributed systems, enterprise backend engineering, and applied AI. Built full-stack Django/React applications, AI proctoring systems with Computer Vision, and multi-source ETL pipelines.',
    accentColor: '#22D3EE'
  },
  {
    year: '05/2025 – Present',
    title: 'Software Engineer @ Data Aces',
    institution: 'Data Aces, Chennai',
    badge: 'Enterprise AI, CRM & Backend Systems',
    narrative: 'Building high-throughput RAG platforms, Salesforce WhatsApp sales automation, LangGraph-driven multi-agent systems, and specialized pharma data preparation dashboards for enterprise clients.',
    accentColor: '#7C3AED'
  }
];
