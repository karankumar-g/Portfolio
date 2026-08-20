import { Project, ExperienceItem, EducationItem, SkillCategory, Certification, Achievement } from '../types';

export const PERSONAL_INFO = {
  name: 'Karankumar G',
  roleTitle: 'Full Stack & AI Engineer',
  rolesList: [
    'Full Stack Engineer',
    'AI & RAG Systems Developer',
    'Django & Python Specialist',
    'Salesforce & CRM Automation',
  ],
  tagline: 'Full Stack and AI Engineer crafting reliable web backends, generative AI workflows, and data pipelines.',
  email: 'karankumar.g0csa@gmail.com',
  phone: '+91 9345543332',
  location: 'Chennai, India',
  coordinates: '13.0827° N, 80.2707° E',
  currentStatus: 'Software Engineer @ Data Aces',
  currentRole: 'Software Engineer @ Data Aces',
  experienceYears: '2+ Years Experience',
  github: 'https://github.com/karankumar-g',
  githubHandle: 'karankumar-g',
  linkedin: 'https://www.linkedin.com/in/karankumar-g',
  linkedinHandle: 'in/karankumar-g',
  medium: 'https://medium.com/@karankumar.g0csa',
  mediumHandle: '@karankumar.g0csa',
  bio: `I am a Full Stack and AI Engineer based in Chennai. I specialize in building robust Python & Django backends, conversational AI and RAG systems using LangGraph, CRM sales automations with Salesforce & WhatsApp, and data engineering pipelines.`,
  quickHighlights: [
    { label: 'Core Backend', value: 'Python, Django & PostgreSQL', icon: '⚡' },
    { label: 'AI & LLMs', value: 'LangGraph, RAG & MCP Tooling', icon: '🤖' },
    { label: 'Enterprise & CRM', value: 'Salesforce & WhatsApp API', icon: '☁️' },
    { label: 'Data & ETL', value: 'DBT, Prefect & Cloud SDKs', icon: '📊' }
  ],
  corePillars: [
    {
      title: 'Practical AI & Agents',
      description: 'Building reliable RAG pipelines and multi-step agents with LangGraph that connect to databases and external tools.',
      icon: '🤖'
    },
    {
      title: 'Scalable Backends & APIs',
      description: 'Developing clean REST APIs, database schemas, and background tasks using Django, Python, and PostgreSQL.',
      icon: '⚙️'
    },
    {
      title: 'Data & CRM Automation',
      description: 'Automating sales flows with Salesforce & WhatsApp, and preparing healthcare & pharma datasets for custom dashboards.',
      icon: '📊'
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'ace-ai',
    title: 'AceAI',
    tagline: 'Enterprise Document Intelligence & Conversational RAG Platform',
    category: 'AI & RAG Systems',
    stack: ['Python', 'Django', 'React', 'LangGraph', 'Weaviate', 'MCP', 'AWS', 'Azure'],
    metrics: [
      {
        label: 'Search Mode',
        value: 'Hybrid',
        numValue: 1,
        suffix: '',
        description: 'Dense vector search paired with keyword retrieval for accurate context'
      }
    ],
    bullets: [
      'Built a RAG platform that enables users to upload enterprise documents and ask natural-language questions with accurate source citations.',
      'Designed multi-agent workflows using LangGraph and Model Context Protocol (MCP) to route queries between vector search and internal tools.',
      'Created a responsive React interface with real-time streaming answers and conversation history.'
    ],
    highlights: [
      'Hybrid semantic search with Weaviate vector database',
      'Multi-step routing with LangGraph state graphs',
      'Model Context Protocol (MCP) for tool execution',
      'Multi-cloud support across AWS and Azure'
    ],
    architectureOverview: 'React frontend sends queries to a Django REST backend. A LangGraph workflow retrieves context from Weaviate vector collections, invokes MCP tools if needed, and streams answers back to the user.',
    flowSteps: [
      { title: 'Document Ingestion', description: 'Parses PDFs, docs, and text into chunks and generates vector embeddings.', tech: 'Weaviate & Python', badge: '01' },
      { title: 'Query Routing', description: 'Evaluates intent and routes between knowledge search or tool execution.', tech: 'LangGraph', badge: '02' },
      { title: 'Response Generation', description: 'Assembles retrieved context and generates answer with source references.', tech: 'LLMs (OpenAI / Azure)', badge: '03' },
      { title: 'User Delivery', description: 'Streams formatted responses with citations directly to the React UI.', tech: 'Django REST & WebSockets', badge: '04' }
    ],
    gradient: 'from-violet-600/20 via-indigo-600/10 to-cyan-500/20',
    featured: true
  },
  {
    id: 'ace-etl',
    title: 'ACE-ETL',
    tagline: 'Cloud Data Ingestion & Automated DBT Transformation Pipelines',
    category: 'Data Engineering & ETL',
    stack: ['Python', 'Django', 'React', 'DBT', 'Prefect', 'Azure Blob', 'AWS S3', 'PostgreSQL'],
    metrics: [
      {
        label: 'Pipeline Type',
        value: 'Automated',
        numValue: 1,
        suffix: '',
        description: 'Scheduled batch extraction and schema transformation workflows'
      }
    ],
    bullets: [
      'Engineered cloud data pipelines using Python SDKs to ingest data from Azure Blob Storage and AWS S3 into PostgreSQL warehouses.',
      'Automated DBT data modeling and transformation scripts with Prefect DAG scheduling to maintain clean relational tables.',
      'Built a React dashboard to track pipeline health, run history, and data ingestion status.'
    ],
    highlights: [
      'Multi-cloud data extraction using AWS & Azure SDKs',
      'Automated DBT data modeling and SQL transformations',
      'Prefect workflow orchestration with automated retries',
      'Real-time pipeline monitoring dashboard in React'
    ],
    architectureOverview: 'Prefect orchestrates Python workers that fetch files from cloud storage, load raw tables into PostgreSQL, run DBT models for data modeling, and report status to the Django/React console.',
    flowSteps: [
      { title: 'Data Extraction', description: 'Pulls structured and semi-structured files from AWS S3 and Azure Blob.', tech: 'Cloud SDKs', badge: '01' },
      { title: 'Staging & Schema Mapping', description: 'Stages raw records into PostgreSQL with schema validation.', tech: 'PostgreSQL & Python', badge: '02' },
      { title: 'DBT Transformation', description: 'Runs DBT models to transform raw records into analytics-ready schemas.', tech: 'DBT & SQL', badge: '03' },
      { title: 'Orchestration & Logs', description: 'Monitors DAG execution, logs run metrics, and alerts on failure.', tech: 'Prefect Workflows', badge: '04' }
    ],
    gradient: 'from-cyan-600/20 via-teal-600/10 to-emerald-500/20',
    featured: true
  },
  {
    id: 'sales-automation',
    title: 'Salesforce & WhatsApp Automation',
    tagline: 'Salesforce CRM Workflows with Real-Time WhatsApp Integration',
    category: 'CRM & Enterprise Automation',
    stack: ['Salesforce', 'WhatsApp Cloud API', 'Django', 'Python', 'Webhooks', 'PostgreSQL'],
    metrics: [
      {
        label: 'Integration',
        value: 'Real-Time',
        numValue: 1,
        suffix: '',
        description: 'Two-way synchronization between WhatsApp chats and CRM records'
      }
    ],
    bullets: [
      'Automated sales workflows by connecting Salesforce CRM with WhatsApp Business API for instant customer communication.',
      'Built automated lead capture, follow-up sequences, and CRM status updates whenever a customer messages.',
      'Created custom Django webhook services to sync chat logs, message receipts, and task reminders directly into Salesforce.'
    ],
    highlights: [
      'Two-way WhatsApp Cloud API & Salesforce CRM integration',
      'Automated lead creation and smart follow-up triggers',
      'Real-time conversation history logged to CRM contacts',
      'Instant notifications for sales representatives'
    ],
    architectureOverview: 'Inbound WhatsApp webhook events hit a Django service that validates payloads, updates PostgreSQL logs, and syncs Lead/Contact records in Salesforce via REST APIs.',
    flowSteps: [
      { title: 'Inbound Lead Trigger', description: 'Customer messages on WhatsApp; webhook captures phone and query.', tech: 'WhatsApp Cloud API', badge: '01' },
      { title: 'CRM Sync', description: 'Django service creates or updates Lead record in Salesforce.', tech: 'Django & Salesforce REST', badge: '02' },
      { title: 'Automated Follow-Up', description: 'Triggers automated response template and notifies assigned sales rep.', tech: 'Salesforce Flows', badge: '03' },
      { title: 'Activity Logging', description: 'Logs full interaction timestamps and receipts to contact history.', tech: 'PostgreSQL & CRM Objects', badge: '04' }
    ],
    gradient: 'from-emerald-600/20 via-teal-600/10 to-cyan-500/20',
    featured: true
  },
  {
    id: 'pharma-analytics',
    title: 'Pharma Data Prep & Analytics',
    tagline: 'Healthcare Analytics for HCPs, Patient Journeys & Brand Performance',
    category: 'Pharma Analytics & Data Engineering',
    stack: ['Python', 'SQL', 'DBT', 'Prefect', 'PostgreSQL', 'React', 'Tableau'],
    metrics: [
      {
        label: 'Domain',
        value: 'Healthcare',
        numValue: 1,
        suffix: '',
        description: 'Structured reporting across HCP prescribing, patient stages, and brand metrics'
      }
    ],
    bullets: [
      'Prepared and transformed healthcare and pharmaceutical datasets into structured analytics tables using SQL and DBT.',
      'Built custom interactive dashboards to track Healthcare Professional (HCP) prescribing trends, Patient treatment journeys, and Brand performance.',
      'Orchestrated automated data quality checks and aggregation pipelines with Prefect.'
    ],
    highlights: [
      'Data preparation and cleaning for pharmaceutical datasets',
      'Dedicated dashboards for HCP trends, Patient journey drop-offs, and Brand KPIs',
      'Automated SQL data modeling with DBT and Prefect',
      'Clear visual reporting built with React and Tableau'
    ],
    architectureOverview: 'Pharmaceutical data is ingested and cleansed through DBT models in PostgreSQL. Aggregate metrics feed custom React dashboards and Tableau reports for business decision-makers.',
    flowSteps: [
      { title: 'Data Cleaning & Prep', description: 'Cleanses raw pharma data, normalizes codes, and handles missing records.', tech: 'Python & SQL', badge: '01' },
      { title: 'Cohort Modeling', description: 'Transforms patient journeys and HCP prescribing activity into analytical schemas.', tech: 'DBT Models', badge: '02' },
      { title: 'Pipeline Scheduling', description: 'Schedules recurring data refreshes with automated validation checks.', tech: 'Prefect', badge: '03' },
      { title: 'Dashboard Presentation', description: 'Renders intuitive visual summaries for brand and field teams.', tech: 'React & Tableau', badge: '04' }
    ],
    gradient: 'from-cyan-600/20 via-teal-600/10 to-emerald-500/20',
    featured: true
  },
  {
    id: 'proctor-point',
    title: 'Proctor Point',
    tagline: 'Computer Vision AI Proctoring & Secure Exam Management',
    category: 'Computer Vision & Security',
    stack: ['Python', 'Django', 'React', 'YOLOv8', 'OpenCV', 'Face Recognition', 'WebSockets', 'PostgreSQL'],
    metrics: [
      {
        label: 'Detection',
        value: 'Real-Time',
        numValue: 1,
        suffix: '',
        description: 'Live video stream analysis for unauthorized items and face verification'
      }
    ],
    bullets: [
      'Developed an online exam proctoring platform with real-time facial verification and prohibited object detection.',
      'Trained and integrated YOLOv8 models to detect mobile phones, notes, and multiple people in webcam feeds.',
      'Built a live proctor monitoring dashboard using WebSockets and Django Channels for real-time infraction alerts.'
    ],
    highlights: [
      'YOLOv8 object detection for unauthorized devices',
      'Facial verification and head pose estimation using OpenCV',
      'Real-time WebSocket alerts with Django Channels',
      'Role-based exam administration and incident logs'
    ],
    architectureOverview: 'Webcam video frames from student React clients are analyzed by a backend OpenCV/YOLOv8 pipeline. Detected infractions trigger instant alerts on proctor supervisor screens via WebSockets.',
    flowSteps: [
      { title: 'Face Verification', description: 'Verifies student identity against registered photo before exam begins.', tech: 'OpenCV & FaceNet', badge: '01' },
      { title: 'Live Object Detection', description: 'Scans webcam stream for prohibited items like phones or secondary persons.', tech: 'YOLOv8', badge: '02' },
      { title: 'Gaze & Pose Check', description: 'Flags prolonged attention away from the screen.', tech: 'OpenCV & MediaPipe', badge: '03' },
      { title: 'Proctor Alerting', description: 'Pushes timestamped incident clips directly to the proctor dashboard.', tech: 'Django WebSockets', badge: '04' }
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
    statusChip: 'Current Role',
    summary: 'Developing backend systems, conversational AI applications, and enterprise data solutions.',
    responsibilities: [
      {
        point: 'Building backend APIs and RAG pipelines in Django and Python to enable fast semantic search and document question-answering.',
        tags: ['Django', 'Python', 'RAG', 'PostgreSQL']
      },
      {
        point: 'Developing conversational AI systems using LangGraph multi-agent workflows and Model Context Protocol (MCP) for tool integrations.',
        tags: ['LangGraph', 'MCP', 'Agentic AI', 'Weaviate']
      },
      {
        point: 'Creating data ingestion and transformation pipelines using Python cloud SDKs (AWS/Azure) and DBT scheduled with Prefect.',
        tags: ['DBT', 'Prefect', 'Cloud SDKs', 'PostgreSQL']
      },
      {
        point: 'Implementing Salesforce CRM workflows integrated with WhatsApp Business API for real-time customer communication and automated lead tracking.',
        tags: ['Salesforce', 'WhatsApp API', 'CRM Automation']
      },
      {
        point: 'Preparing pharmaceutical datasets and building custom analytical dashboards for HCP, patient journey, and brand metrics.',
        tags: ['Pharma Analytics', 'SQL', 'React', 'Tableau']
      }
    ],
    techStack: [
      'Python', 'Django', 'Django REST Framework', 'LangGraph', 'MCP', 
      'RAG', 'Salesforce', 'WhatsApp API', 'PostgreSQL', 'Redis', 'Weaviate', 'DBT', 'Prefect', 'AWS', 'Azure'
    ],
    keyWins: [
      'Built production RAG platform with LangGraph agentic tool execution',
      'Automated sales workflows integrating Salesforce CRM with WhatsApp',
      'Engineered cloud SDK data pipelines and DBT transformation models',
      'Delivered pharma data preparation dashboards for HCP and patient analytics'
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'mca',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Dwaraka Doss Goverdhan Doss Vaishnav College',
    location: 'Chennai, India',
    period: '2023 – 2025',
    score: 'Distinction',
    scoreLabel: 'Postgraduate Distinction',
    highlight: 'Distinction',
    coursework: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Distributed Systems & Cloud',
      'Machine Learning & Applied AI',
      'Full Stack Web Development'
    ]
  },
  {
    id: 'bsc-cs',
    degree: 'B.Sc in Computer Science',
    institution: 'Thiruthangal Nadar College',
    location: 'Chennai, India',
    period: '2020 – 2023',
    score: 'First Class',
    scoreLabel: 'First Class with Distinction',
    highlight: 'First Class with Distinction',
    coursework: [
      'Object Oriented Programming (Python, C++)',
      'Relational Databases & SQL',
      'Computer Networks & Web Basics',
      'Operating Systems & Linux'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    description: 'Core programming languages',
    skills: [
      { name: 'Python', level: 'Expert', highlight: true, description: 'Backend APIs, AI pipelines, scripts', percentage: 95 },
      { name: 'JavaScript', level: 'Advanced', description: 'Frontend interfaces, modern ES6+', percentage: 90 },
      { name: 'TypeScript', level: 'Advanced', highlight: true, description: 'Type-safe web apps & integrations', percentage: 88 },
      { name: 'SQL', level: 'Expert', highlight: true, description: 'Queries, joins, indexing, data modeling', percentage: 92 }
    ]
  },
  {
    category: 'Frameworks & Web',
    description: 'Web development and API frameworks',
    skills: [
      { name: 'Django', level: 'Expert', highlight: true, description: 'ORM, authentication, scalable APIs', percentage: 94 },
      { name: 'Django REST Framework', level: 'Expert', highlight: true, description: 'High-performance REST APIs & serializers', percentage: 95 },
      { name: 'React', level: 'Advanced', highlight: true, description: 'Interactive web UIs & dashboard consoles', percentage: 88 },
      { name: 'Flask', level: 'Advanced', description: 'Lightweight microservices & endpoints', percentage: 85 }
    ]
  },
  {
    category: 'AI & Agentic Systems',
    description: 'LLM agents, RAG, and tool orchestration',
    skills: [
      { name: 'LangGraph', level: 'Expert', highlight: true, description: 'Multi-agent routing & workflows', percentage: 94 },
      { name: 'RAG Systems', level: 'Expert', highlight: true, description: 'Document retrieval & semantic search', percentage: 96 },
      { name: 'MCP (Model Context Protocol)', level: 'Expert', highlight: true, description: 'Standardized tool integration', percentage: 92 },
      { name: 'Weaviate', level: 'Advanced', highlight: true, description: 'Vector indexing & hybrid search', percentage: 90 },
      { name: 'MLflow', level: 'Advanced', description: 'Experiment tracking & model logging', percentage: 88 }
    ]
  },
  {
    category: 'Databases',
    description: 'Relational, analytical, and vector data stores',
    skills: [
      { name: 'PostgreSQL', level: 'Expert', highlight: true, description: 'Relational data modeling & optimization', percentage: 92 },
      { name: 'Snowflake', level: 'Expert', highlight: true, description: 'Cloud data warehousing & analytics', percentage: 94 },
      { name: 'Redis', level: 'Advanced', highlight: true, description: 'In-memory caching & session store', percentage: 88 },
      { name: 'MongoDB', level: 'Proficient', description: 'Document storage & collections', percentage: 82 }
    ]
  },
  {
    category: 'Cloud & DevOps',
    description: 'Cloud infrastructure, data pipelines, and version control',
    skills: [
      { name: 'AWS & Azure', level: 'Proficient', highlight: true, description: 'Cloud storage SDKs & compute', percentage: 86 },
      { name: 'DBT', level: 'Advanced', highlight: true, description: 'SQL data transformations & modeling', percentage: 90 },
      { name: 'Prefect', level: 'Advanced', highlight: true, description: 'DAG workflow scheduling', percentage: 90 },
      { name: 'Git & GitHub', level: 'Expert', description: 'Version control & repository management', percentage: 95 }
    ]
  },
  {
    category: 'CRM & Enterprise',
    description: 'Salesforce CRM and messaging automations',
    skills: [
      { name: 'Salesforce CRM & Automation', level: 'Expert', highlight: true, description: 'Workflows, objects & lead tracking', percentage: 94 },
      { name: 'WhatsApp Business API', level: 'Expert', highlight: true, description: 'Webhook messaging & automated replies', percentage: 92 },
      { name: 'Salesforce Agentforce', level: 'Advanced', highlight: true, description: 'Certified Agentforce Specialist', percentage: 90 }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'agentforce',
    title: 'Salesforce Certified Agentforce Specialist',
    issuer: 'Salesforce',
    badgeType: 'Agentforce',
    skillsLearned: ['Agentforce Agents', 'Prompt Builder', 'CRM Actions']
  },
  {
    id: 'meta-django',
    title: 'Django Web Framework',
    issuer: 'Meta',
    badgeType: 'Meta',
    skillsLearned: ['Django Architecture', 'ORM Models', 'Views & Auth']
  },
  {
    id: 'meta-apis',
    title: 'APIs & Backend Development',
    issuer: 'Meta',
    badgeType: 'Meta',
    skillsLearned: ['REST APIs', 'DRF Serializers', 'Authentication']
  },
  {
    id: 'postman-expert',
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    badgeType: 'API',
    skillsLearned: ['API Testing', 'Chaining Requests', 'API Documentation']
  },
  {
    id: 'nptel-python',
    title: 'The Joy of Computing using Python',
    issuer: 'NPTEL',
    badgeType: 'Python',
    skillsLearned: ['Algorithms', 'Data Structures', 'Problem Solving']
  },
  {
    id: 'spoken-tutorial-python',
    title: 'Python Programming',
    issuer: 'IIT Bombay',
    badgeType: 'Python',
    skillsLearned: ['Core Python', 'File Handling', 'OOP Concepts']
  },
  {
    id: 'hackerrank-sql',
    title: 'SQL (Advanced & Intermediate)',
    issuer: 'HackerRank',
    badgeType: 'Data',
    skillsLearned: ['Complex Joins', 'Subqueries', 'Window Functions']
  },
  {
    id: 'tableau-bi',
    title: 'Tableau for Business Intelligence',
    issuer: 'BI Academy',
    badgeType: 'Data',
    skillsLearned: ['Visual Dashboards', 'Calculated Fields', 'Reporting']
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'academic-excellence',
    title: 'Academic Distinction in Computer Science',
    organization: 'Thiruthangal Nadar College, Chennai',
    period: 'B.Sc Computer Science',
    description: 'Awarded First Class with Distinction across core computing coursework including Algorithms, Database Systems, and Programming.',
    badgeText: 'First Class with Distinction'
  }
];

export const TIMELINE_JOURNEY = [
  {
    year: '2020 – 2023',
    title: 'B.Sc Computer Science',
    institution: 'Thiruthangal Nadar College, Chennai',
    badge: 'First Class with Distinction',
    narrative: 'Built a strong foundation in core computer science, algorithms, database design, and object-oriented programming with Python and SQL.',
    accentColor: '#F59E0B'
  },
  {
    year: '2023 – 2025',
    title: 'Master of Computer Applications (MCA)',
    institution: 'DG Vaishnav College, Chennai',
    badge: 'Postgraduate Distinction',
    narrative: 'Expanded into distributed backend architecture, AI proctoring systems with Computer Vision, and full-stack web applications.',
    accentColor: '#22D3EE'
  },
  {
    year: '05/2025 – Present',
    title: 'Software Engineer',
    institution: 'Data Aces, Chennai',
    badge: 'Current Role',
    narrative: 'Building production RAG platforms, LangGraph agent workflows, Salesforce WhatsApp integrations, and specialized healthcare data pipelines.',
    accentColor: '#7C3AED'
  }
];
