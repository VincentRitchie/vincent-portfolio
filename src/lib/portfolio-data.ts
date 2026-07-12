/**
 * Portfolio content repository for Obasiochie Vincent Chimaobi.
 * Source: Portfolio Website Content Repository v4.1
 * This file is the single source of truth for public copy.
 */

export const profile = {
  // Primary personal identity — displayed in uppercase everywhere it appears as the main identity.
  name: "OBASIOCHIE VINCENT CHIMAOBI",
  // Homepage hero animated name only (rule: large main animated name shows only "VINCENT CHIMAOBI").
  heroName: "VINCENT CHIMAOBI",
  shortName: "OBASIOCHIE",
  initials: "OVC",
  role: "AI Evaluation & Data Annotation Specialist",
  location: "Abuja, FCT, Nigeria",
  tagline: "AI Evaluation, Prompt Engineering, Web Development & Security-Informed Digital Solutions",
  heroHeadline:
    "AI Evaluation, Prompt Engineering, Web Development, and Security-Informed Digital Solutions",
  heroIntro:
    "I help evaluate AI outputs, refine prompts, structure digital workflows, and design user-focused web experiences with a disciplined approach to evidence, clarity, quality, and long-term usability.",
  shortBio:
    "OBASIOCHIE VINCENT CHIMAOBI is an AI Evaluation and Data Annotation Specialist based in Abuja, Nigeria. His work sits at the intersection of AI response evaluation, prompt engineering, structured research, generative AI workflows, technical documentation, web development, and cybersecurity-informed analysis.",
  longBio:
    "OBASIOCHIE VINCENT CHIMAOBI is a technology professional with experience in AI response evaluation, data annotation, prompt evaluation, generative AI workflows, research, AI-assisted content systems, technical documentation, web development thinking, and security research. His professional strength is the ability to read requirements carefully, separate evidence from assumption, identify weak reasoning, and communicate findings in a structured and practical way.",
  // Professional photographs — profile-main.jpeg is the official header avatar.
  profileImage: "/images/profile-main.jpeg",
  avatar: "/images/profile-main.jpeg",
  // Premium hero/about showcase slider — exactly five professional photographs.
  gallery: [
    "/images/me_img1.jpeg",
    "/images/me_img2.jpeg",
    "/images/me_img3.jpeg",
    "/images/me_img4.jpeg",
    "/images/me_img5.jpeg",
  ],
  whatsapp: "https://wa.me/message/BS2I4XH5NM3CH1",
  email: "cyberghoxt.whitehat@gmail.com",
  publicEmail: "cyberghoxt.whitehat@gmail.com",
  phone: "",
  twitter: "cyb3rghoxt",
  github: "vin_chimaobi042",
  linkedin: null,
};

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "AI Evaluation", href: "#ai-evaluation" },
  { label: "Prompt Engineering", href: "#prompt-engineering" },
  { label: "Web Development", href: "#web-development" },
  { label: "Security Research", href: "#security-research" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Afrik-Vine", href: "#afrik-vine" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

export const selectedHighlights: string[] = [
  "AI response evaluation experience across guideline-based tasks, quality review, instruction-following analysis, hallucination detection, factual consistency checks, and comparative response judgment.",
  "Prompt engineering experience using leading generative AI tools to improve output quality, reduce ambiguity, support research, generate content, and structure workflows.",
  "Data annotation and human-in-the-loop experience involving labeling, review, consistency checks, and task-specific guideline alignment.",
  "AI content production experience, including AI-driven storytelling, video workflows, voice/image/video generation, and practical review of generated outputs for coherence and realism.",
  "Cybersecurity-informed analytical experience through authorized security research, technical evidence collection, impact analysis, and remediation-focused reporting.",
  "Web development service direction focused on modern, responsive, scalable, user-focused websites for professionals, businesses, and retail-style digital experiences.",
];

export const coreSkillCards = [
  {
    title: "AI Response Evaluation",
    icon: "ScanSearch",
    accent: "violet",
    body: "I evaluate AI responses through a structured, evidence-based process. Rather than relying on surface preference, I compare outputs against the actual task requirements, check whether the response follows instructions, examine factual reliability, identify unsupported claims, and explain the quality difference in clear professional language.",
  },
  {
    title: "Prompt Engineering",
    icon: "TerminalSquare",
    accent: "magenta",
    body: "I design and refine prompts to improve clarity, reduce ambiguity, guide model behavior, and produce more useful outputs. My prompt engineering approach begins with the intended outcome, then works backward into instructions, context, constraints, examples, and success criteria.",
  },
  {
    title: "Generative AI Workflows",
    icon: "Sparkles",
    accent: "blue",
    body: "I use generative AI systems to support research, ideation, content development, workflow automation, image generation, video production, and structured documentation. My focus is on practical value: using AI to accelerate work while still applying human review, quality control, and editorial judgment.",
  },
  {
    title: "Hallucination Detection",
    icon: "ShieldAlert",
    accent: "magenta",
    body: "I identify hallucinations by checking whether a claim is supported by available evidence, whether the response overstates certainty, whether facts conflict with known context, and whether the output introduces invented details. I treat accuracy as a professional responsibility, not a cosmetic feature.",
  },
  {
    title: "Analytical Thinking",
    icon: "BrainCircuit",
    accent: "violet",
    body: "I approach complex problems by breaking them into smaller components, identifying dependencies, testing assumptions, and tracing weak results back to their cause. This helps me work through AI outputs, prompts, technical reports, website structures, and security findings with clarity.",
  },
  {
    title: "Web Development",
    icon: "Code2",
    accent: "blue",
    body: "I approach web development as a combination of structure, usability, performance, and business purpose. A website should not only look attractive; it should guide visitors, communicate value quickly, support growth, and remain maintainable over time.",
  },
  {
    title: "Penetration Testing",
    icon: "ShieldCheck",
    accent: "magenta",
    body: "My security research approach is careful, authorized, and evidence-driven. I focus on understanding systems, identifying weaknesses, validating impact safely, documenting reproducible findings, and recommending practical remediation without exposing confidential information.",
  },
];

export const featuredProjectsPreview = [
  {
    title: "Underwater Laser Detection Security System",
    summary:
      "A final-year university project built with Raspberry Pi and Python, combining electronics, programming, and sensor-based detection logic to solve a security-focused problem.",
    tags: ["Raspberry Pi", "Python", "Electronics", "Sensor Logic"],
  },
  {
    title: "AI-Powered Community Census Application",
    summary:
      "A National Youth Service Corps Community Development Service pass-out project designed to support community-level data collection and structured information management.",
    tags: ["Data Collection", "Community Tech", "NYSC CDS"],
  },
  {
    title: "AI-Generated Video & Storytelling Projects",
    summary:
      "A collection of AI-assisted creative and documentary-style projects using prompt engineering, AI image/video generation, voice workflows, and quality review.",
    tags: ["Generative AI", "Video", "Prompt Engineering"],
  },
  {
    title: "Retail Website Demonstration Placeholder",
    summary:
      "A future demo section for showing retail and e-commerce website concepts, product presentation, search/navigation flow, category structure, and customer journey design. This is a placeholder demo and not yet a completed client project.",
    tags: ["Placeholder Demo", "E-commerce", "UX"],
    placeholder: true,
  },
];

/* ---------- About ---------- */
export const about = {
  headline: "Structured Thinking for AI, Web, and Technical Quality",
  intro:
    "I am a technology professional focused on AI evaluation, prompt engineering, data annotation, generative AI workflows, web development, and security-informed analysis. My work is built around clarity, evidence, disciplined reasoning, and practical execution.",
  aboutMe: [
    "My professional path combines several areas that may look separate at first: AI evaluation, content systems, web-focused digital thinking, technical documentation, and security research. In practice, these areas share the same foundation. They all require careful reading, structured thinking, evidence checking, and the ability to explain complex issues in a way that helps people make better decisions.",
    "I have worked on AI data annotation and evaluation tasks, supported clients with research and content workflows, built AI-assisted content projects, developed academic and community projects, and conducted authorized security research. Each experience has strengthened the same core habit: do not guess when evidence is needed; do not overstate when uncertainty exists; do not treat a polished output as correct until it has been checked against the requirement.",
  ],
  howIWork: [
    "My work begins with understanding. Before evaluating an AI response, writing a prompt, planning a website, or documenting a security issue, I first clarify the objective. What is the task asking for? What does success look like? What evidence is available? What constraints matter? What risk exists if the conclusion is wrong?",
    "From there, I break the work into manageable parts. I identify the criteria, collect or review the relevant evidence, compare alternatives, and produce an output that is not only complete but explainable. This approach helps me stay consistent in tasks that require judgment, especially where a fast answer can easily become a wrong answer.",
  ],
  professionalDirection:
    "My long-term direction is to build a strong professional presence across AI evaluation, prompt engineering, web development, and technical quality work. I am especially interested in roles and projects where human judgment improves AI systems, where structured prompts improve output reliability, where websites help businesses communicate and sell better, and where security-informed thinking reduces risk.",
  differentiators: [
    {
      title: "Evidence before confidence",
      body: "I prefer conclusions that can be supported by visible, textual, technical, or documented evidence.",
    },
    {
      title: "Structure before speed",
      body: "I move faster by first understanding the structure of the task, not by rushing into an answer.",
    },
    {
      title: "Quality before appearance",
      body: "A response, website, report, or workflow must be useful and reliable, not only attractive or fluent.",
    },
    {
      title: "Clear communication",
      body: "I aim to explain technical and AI-related work in language that is precise without becoming unnecessarily complicated.",
    },
    {
      title: "Continuous improvement",
      body: "I treat every project as a chance to refine methods, improve systems, and build stronger long-term capability.",
    },
  ],
  brandStatement:
    "I build my work around disciplined thinking, practical execution, and professional integrity. I want every visitor to this portfolio to understand not just what I do, but how I think: I read carefully, analyze deeply, verify evidence, solve problems structurally, and communicate results clearly.",
};

/* ---------- Expertise overview ---------- */
export const expertiseCards = [
  { title: "AI Response Evaluation", icon: "ScanSearch", accent: "violet", body: "Systematic review of AI outputs for instruction following, factuality, clarity, relevance, reasoning quality, hallucination risk, and overall usefulness.", href: "#ai-evaluation" },
  { title: "Data Annotation & HITL Review", icon: "Tags", accent: "blue", body: "Careful labeling, review, validation, and human judgment applied to improve AI training data and model behavior.", href: "#ai-evaluation" },
  { title: "Rubric-Based Evaluation", icon: "ListChecks", accent: "magenta", body: "Structured criteria-based judgment that makes evaluation more consistent, explainable, and fair.", href: "#ai-evaluation" },
  { title: "Prompt Engineering", icon: "TerminalSquare", accent: "violet", body: "Design and refinement of prompts that improve AI output quality, reduce ambiguity, and guide models toward specific goals.", href: "#prompt-engineering" },
  { title: "Generative AI Workflows", icon: "Sparkles", accent: "magenta", body: "Practical use of AI tools for research, content production, image/video workflows, documentation, and creative development.", href: "#prompt-engineering" },
  { title: "Hallucination Detection", icon: "ShieldAlert", accent: "blue", body: "Identification and correction of unsupported, invented, exaggerated, or inconsistent claims in AI-generated content.", href: "#ai-evaluation" },
  { title: "Analytical Thinking", icon: "BrainCircuit", accent: "violet", body: "Breaking complex problems into requirements, evidence, dependencies, risks, and practical solutions.", href: "#prompt-engineering" },
  { title: "Technical Documentation", icon: "FileText", accent: "blue", body: "Clear reports, structured explanations, process notes, and professional communication for technical and non-technical audiences.", href: "#prompt-engineering" },
  { title: "Web Development", icon: "Code2", accent: "magenta", body: "Planning and building modern, responsive, scalable websites with attention to UX, performance, SEO, maintainability, and business goals.", href: "#web-development" },
  { title: "Security Research", icon: "ShieldCheck", accent: "violet", body: "Authorized vulnerability assessment, evidence collection, impact analysis, remediation writing, and responsible disclosure.", href: "#security-research" },
];

export const expertiseIntegration =
  "My AI evaluation work improves how I judge quality. My prompt engineering work improves how I instruct AI systems. My analytical thinking helps me break down ambiguity. My technical documentation helps me explain findings clearly. My web development direction turns structure into user-facing digital experiences. My security background strengthens how I think about risk, evidence, and impact. Together, these areas form a practical professional profile for AI, web, and technical quality work.";

/* ---------- AI Evaluation ---------- */
export const aiEvaluation = {
  headline: "AI Response Evaluation Built on Evidence, Criteria, and Quality Standards",
  intro:
    "AI response evaluation is the disciplined review of model outputs to determine whether they actually satisfy the user's request, follow instructions, remain factually grounded, and provide useful value. My approach is structured, evidence-based, and designed to support reliable human judgment.",
  whatItMeans:
    "Evaluating an AI response is not the same as choosing the answer that sounds better. A polished response can still miss the instruction, invent unsupported details, use weak reasoning, ignore important constraints, or give an answer that is incomplete. My evaluation approach focuses on the relationship between the task, the expected output, and the evidence available for judgment.",
  workflow: [
    { step: "Clarify the task", body: "Identify what the prompt is asking for, what output format is expected, and what constraints control the answer." },
    { step: "Identify evaluation criteria", body: "Break the task into specific requirements that can be checked rather than relying on general preference." },
    { step: "Collect evidence", body: "Inspect the response and any provided context to determine what is actually supported." },
    { step: "Compare output to requirement", body: "Check instruction following, factual accuracy, relevance, completeness, reasoning quality, clarity, and formatting." },
    { step: "Identify weaknesses", body: "Look for missing requirements, unsupported claims, hallucinations, ambiguity, overconfidence, inconsistency, and weak reasoning." },
    { step: "Explain the judgment", body: "Communicate the result clearly, showing why the response is strong, weak, incomplete, or better than another response." },
  ],
  lookFor: [
    { label: "Instruction following", body: "Did the response answer the actual request instead of a similar but different task?" },
    { label: "Factuality", body: "Are the claims supported by evidence or reliable context?" },
    { label: "Completeness", body: "Did the response address all important parts of the prompt?" },
    { label: "Relevance", body: "Does the response stay focused on the user's need?" },
    { label: "Reasoning quality", body: "Does the explanation make sense and avoid unsupported leaps?" },
    { label: "Clarity", body: "Is the response understandable and well organized?" },
    { label: "Hallucination risk", body: "Does the model introduce invented details, false certainty, or unsupported specifics?" },
    { label: "Usefulness", body: "Would the final user be able to act on the response confidently?" },
  ],
  professionalValue:
    "Good AI evaluation improves model reliability. It helps teams identify where outputs fail, why they fail, and what needs to improve. My value is in bringing careful judgment to that process: not just marking an output as good or bad, but explaining the practical reason behind the judgment.",
  relatedExperience:
    "My AI evaluation experience includes work with Remotasks and TELUS Digital, where I contributed to data annotation, AI response evaluation, quality review, and guideline-based task execution. I also apply evaluation thinking in my generative AI content workflows, where outputs must be reviewed for coherence, realism, factual alignment, narrative quality, and audience suitability.",
};

export const dataAnnotation = {
  headline: "Data Annotation & Human Review for Better AI Training Data",
  intro:
    "AI systems improve when the data behind them is labeled, reviewed, and validated with care. My data annotation approach focuses on consistency, guideline alignment, attention to detail, and practical human judgment.",
  whyItMatters:
    "Data annotation is often invisible to end users, but it has a direct effect on how AI systems learn. If labels are inconsistent, unclear, rushed, or misapplied, the model can absorb weak patterns. If annotation is careful and consistent, it supports better model behavior, stronger evaluation, and more reliable outputs. Human-in-the-loop review remains important because AI systems still need people to interpret ambiguous cases, recognize nuance, identify edge cases, and apply judgment where automated systems may miss context.",
  approach: [
    "Study the guideline before labeling so the task is understood from the project's perspective.",
    "Identify the active category or label definition before judging an item.",
    "Separate what is directly observable from what is assumed.",
    "Apply labels consistently across similar examples.",
    "Flag uncertainty when the available evidence does not support a confident decision.",
    "Review completed work for consistency, instruction alignment, and avoidable errors.",
  ],
  principles: [
    { label: "Consistency", body: "Similar examples should be handled similarly unless a meaningful difference exists." },
    { label: "Traceability", body: "A label should be explainable by pointing back to the relevant instruction or observed evidence." },
    { label: "Adaptability", body: "When project rules change, the labeling approach must update immediately." },
    { label: "Careful uncertainty", body: "Unclear evidence should not be forced into a confident label just to finish quickly." },
    { label: "Quality control", body: "Annotation is not complete until the output has been reviewed for alignment with task requirements." },
  ],
};

export const rubricEvaluation = {
  headline: "Rubric-Based Evaluation for Fair, Consistent, Explainable AI Judgment",
  intro:
    "A good evaluation should not depend on instinct alone. Rubric-based evaluation turns broad judgment into a structured process by defining what must be checked, how fulfillment should be recognized, and why one output is stronger than another.",
  methods: [
    { label: "Rubric as Recipe for Judgment", body: "I treat each task guideline like a judgment recipe. Before rating or labeling an output, I break the instruction into requirements so the final decision follows the task instead of personal preference." },
    { label: "Rubric Concepts & Criterion Anatomy", body: "I analyze each criterion by identifying what needs to be checked, what counts as full or partial fulfillment, what would count as failure, and what evidence is required." },
    { label: "Five-Step Rubric Mindset", body: "Understand the ideal output, form an initial judgment as a hypothesis, map the criteria, compare the evidence, and finalize the rating based on guideline alignment." },
  ],
};

export const hallucinationDetection = {
  headline: "Detecting Hallucinations and Improving AI Reliability",
  intro:
    "AI hallucination detection is the process of identifying unsupported, false, exaggerated, or inconsistent claims in AI-generated outputs. My approach focuses on evidence, factuality, internal consistency, and careful uncertainty handling.",
  whyDangerous:
    "A hallucination is not always obvious. Sometimes an AI response sounds confident, polished, and professional while introducing details that were never provided or facts that are not supported. In professional settings, that can create serious problems: incorrect decisions, misleading documentation, weak training data, damaged credibility, or unsafe user guidance.",
  process: [
    "Identify the key claims that affect the answer's usefulness or correctness.",
    "Check whether each claim is supported by the prompt, provided material, visible evidence, or reliable context.",
    "Look for invented names, dates, figures, sources, relationships, features, or explanations.",
    "Compare the response against the user's actual request and any supplied documents or media.",
    "Identify contradictions inside the response or between the response and the available evidence.",
    "Remove, soften, qualify, or flag claims that cannot be verified from the available material.",
  ],
  techniques: [
    { label: "Evidence mapping", body: "Every important claim should connect to a source, prompt detail, observed fact, or known context." },
    { label: "Uncertainty control", body: "If a claim cannot be verified, the output should not pretend certainty." },
    { label: "Consistency checks", body: "A response should not contradict itself, the prompt, or the available evidence." },
    { label: "Overclaim detection", body: "A partially correct response can still fail if it presents a weak conclusion too strongly." },
    { label: "Factual restraint", body: "When evidence is limited, the correct professional move is to say less, not invent more." },
  ],
};

/* ---------- Prompt Engineering & Generative AI ---------- */
export const promptEngineering = {
  headline: "Prompt Engineering for Clearer Instructions and Better AI Outputs",
  intro:
    "Prompt engineering is the process of turning a desired result into clear, structured instructions that an AI system can follow. My approach focuses on clarity, context, constraints, examples, output structure, and quality standards.",
  understanding:
    "A prompt is not just a question. It is an instruction system. A weak prompt may leave too much room for interpretation, causing the model to produce vague, inconsistent, incomplete, or unsupported outputs. A strong prompt defines the goal, provides the right context, sets boundaries, and explains what a successful output should look like.",
  principles: [
    { label: "Define the objective", body: "The model should know the exact task and desired result." },
    { label: "Provide useful context", body: "Context helps the model understand the situation without overwhelming it with irrelevant details." },
    { label: "Set constraints clearly", body: "Good prompts explain what must be included and what should be avoided." },
    { label: "Specify output format", body: "Structured outputs are easier to review, compare, and reuse." },
    { label: "Add success criteria", body: "The prompt should make it possible to judge whether the output succeeded." },
    { label: "Iterate based on evidence", body: "Prompt refinement should respond to actual output behavior, not guesswork." },
  ],
  debugWorkflow: [
    "Review the output to identify what failed: relevance, accuracy, format, completeness, tone, or reasoning.",
    "Trace the failure back to the prompt: missing context, unclear instruction, weak constraints, or poor output guidance.",
    "Rewrite the prompt to correct the specific weakness rather than changing everything blindly.",
    "Run another output and compare whether the revised prompt improved the result.",
    "Continue refinement until the prompt reliably produces the intended quality standard.",
  ],
  useCases: [
    "AI response evaluation prompts and quality review instructions.",
    "Content development prompts for articles, scripts, summaries, and technical explanations.",
    "Visual generation prompts for image and video workflows.",
    "Workflow prompts that help organize research, extract requirements, and produce structured documentation.",
    "Debugging prompts that help refine unclear, incomplete, or inconsistent outputs.",
  ],
};

export const generativeAI = {
  headline: "Practical Generative AI Workflows for Research, Content & Digital Production",
  intro:
    "Generative AI is most useful when it is guided by clear goals, reviewed carefully, and integrated into a structured workflow. I use AI tools to support research, content production, creative development, documentation, and workflow acceleration while maintaining human quality control.",
  experience:
    "My generative AI work includes AI-assisted storytelling, Nollywood-style film concepts, documentary and reenactment-style content, image generation, voice workflows, video development, research support, and content structuring. I have used tools including ChatGPT, Claude, Gemini, Nano Banana, Veo 3.1, Midjourney, and related platforms.",
  tools: ["ChatGPT", "Claude", "Gemini", "Nano Banana", "Veo 3.1", "Midjourney"],
  workflow: [
    "Define the creative or practical objective.",
    "Identify the target audience and intended output format.",
    "Prepare the prompt, references, constraints, and success criteria.",
    "Generate the first output using the appropriate tool.",
    "Review the result for coherence, realism, consistency, factual alignment, and usefulness.",
    "Refine prompts, assets, or direction based on observed weaknesses.",
    "Finalize only after the output meets the intended standard.",
  ],
  qualityReview:
    "The important part of my workflow is not simply generating content. It is the review process that comes after generation. I check whether the output is coherent, visually consistent, factually aligned, narratively useful, and appropriate for the audience. When an output fails, I identify whether the weakness came from the prompt, the tool limitation, the reference material, or the editing process.",
  stats: [
    { value: "29,000+", label: "Subscribers on a primary AI YouTube channel" },
    { value: "2M+", label: "Views on a flagship AI storytelling channel" },
    { value: "1.5M+", label: "Views on a second AI content channel" },
  ],
};

export const aiVideo = {
  headline: "AI-Assisted Video & Storytelling Workflows",
  intro:
    "AI video content creation combines prompt engineering, visual direction, narrative planning, audio judgment, and output review. My work in this area focuses on using AI tools to develop structured creative outputs while maintaining coherence, realism, and audience value.",
  creativeDirection:
    "AI video workflows require more than writing a prompt and accepting the first result. The process begins with a clear concept: the story, tone, setting, character direction, visual style, and intended emotional effect. From there, prompts and assets must be refined until the output supports the creative goal.",
  qualityFactors: [
    "Narrative coherence and logical scene progression.",
    "Visual consistency across characters, setting, objects, and style.",
    "Realism, motion quality, and avoidance of obvious AI artifacts.",
    "Audio or voice suitability where relevant.",
    "Audience clarity and emotional impact.",
    "Alignment between prompt, generated output, and final editing direction.",
  ],
};

/* ---------- Web Development ---------- */
export const webDevelopment = {
  headline: "Web Development That Combines Design, Strategy, Performance & Maintainability",
  intro:
    "I approach web development as more than building pages. A good website should help people understand a brand, find what they need, trust the business, take action, and return when value is delivered. My web development approach combines user experience, information architecture, responsive design, performance, SEO fundamentals, maintainability, and long-term growth.",
  philosophy:
    "A website is a business tool, not just a digital decoration. Before thinking about colors, animations, or frameworks, I focus on what the website must achieve. My goal is to build websites that are beautiful, clear, fast, responsive, and useful — looking impressive while still making navigation simple, content readable, and conversion paths obvious.",
  process: [
    { step: "Discovery", body: "Understand the business, audience, goals, content, products, services, and technical constraints." },
    { step: "Information Architecture", body: "Organize pages, navigation, content hierarchy, and user journeys before development begins." },
    { step: "UX Planning", body: "Define how visitors move from first impression to deeper exploration, contact, purchase, booking, or inquiry." },
    { step: "Visual Direction", body: "Establish a design system with colors, typography, spacing, components, and interaction style." },
    { step: "Frontend Implementation", body: "Build responsive layouts that work across desktop, tablet, and mobile devices." },
    { step: "Performance & SEO", body: "Optimize structure, metadata, page speed, images, accessibility, and crawlable content." },
    { step: "Content Management", body: "Structure content so the owner can update CVs, projects, products, blogs, services, or company details later." },
    { step: "Testing & Launch", body: "Review layout, links, forms, mobile views, browser behavior, and deployment readiness." },
    { step: "Continuous Improvement", body: "Improve the site over time as new content, analytics, user feedback, or business needs emerge." },
  ],
  priorities: [
    { label: "User-focused structure", body: "Visitors should quickly understand where they are, what the site offers, and what to do next." },
    { label: "Responsive design", body: "The website must feel natural on mobile, tablet, and desktop." },
    { label: "Performance", body: "A beautiful site should still load fast and avoid unnecessary weight." },
    { label: "SEO fundamentals", body: "Pages should have clear titles, descriptions, heading hierarchy, internal links, and meaningful content." },
    { label: "Accessibility", body: "Content should remain readable, navigable, and usable for different users and devices." },
    { label: "Maintainability", body: "The site should be easy to update without breaking the design." },
    { label: "Scalability", body: "The structure should support new pages, projects, blogs, services, and updates without a complete redesign." },
    { label: "Security awareness", body: "Forms, admin access, uploads, and integrations should be planned with basic security expectations in mind." },
  ],
  serviceAreas: [
    { title: "Business Websites", icon: "Building2", body: "Professional websites for individuals, service providers, startups, and small businesses. Clear structure, credible presentation, mobile responsiveness, and content that supports real business goals." },
    { title: "Retail & E-commerce", icon: "ShoppingCart", body: "Product catalog, search, product cards, cart/order flow, inventory signals, and customer journey. Organized product discovery with trust and action paths." },
    { title: "UX & Information Architecture", icon: "Workflow", body: "Content structure, navigation design, conversion paths, and user journey planning. Layered navigation that keeps the homepage clean while allowing depth." },
    { title: "Performance, SEO & Maintenance", icon: "Gauge", body: "Speed, accessibility, metadata, maintainability, admin updates, and long-term support. Sites built to remain valuable as content grows." },
  ],
};

/* ---------- Security Research ---------- */
export const securityResearch = {
  headline: "Security Research Guided by Evidence, Responsible Testing & Clear Risk Communication",
  intro:
    "My security research approach is careful, authorized, and documentation-focused. I work to understand how systems behave, identify weaknesses, validate impact safely, and communicate findings in a way that helps teams fix issues without exposing unnecessary risk.",
  philosophy:
    "Security testing is not only about finding a technical flaw. It is about understanding the system, validating the behavior responsibly, explaining the real-world impact, and recommending a practical remediation path. My security research is shaped by responsible disclosure principles — testing within authorized scope, avoiding unnecessary disruption, protecting user data, and communicating findings through proper channels.",
  methodology: [
    { step: "Scope understanding", body: "Review the authorized asset scope, rules of engagement, permitted testing methods, and disclosure expectations." },
    { step: "Reconnaissance", body: "Identify visible assets, technologies, entry points, authentication flows, API behavior, headers, redirects, upload paths, and trust boundaries." },
    { step: "Hypothesis building", body: "Identify where security controls may be weak, inconsistent, missing, or misconfigured." },
    { step: "Safe validation", body: "Confirm the behavior using controlled testing, researcher-owned accounts, benign payloads, and minimal-impact requests." },
    { step: "Evidence collection", body: "Capture only what is necessary to prove the issue without exposing customer data or causing harm." },
    { step: "Impact analysis", body: "Explain the realistic business, user, regulatory, operational, or security consequence of the weakness." },
    { step: "Remediation writing", body: "Provide practical, technically relevant recommendations that help the team address the root cause." },
    { step: "Responsible reporting", body: "Submit findings through approved channels with clear reproduction steps, evidence references, severity reasoning, and disclosure notes." },
  ],
  interestAreas: [
    "Authentication and authorization weaknesses.",
    "Rate limiting and brute-force resistance.",
    "File upload validation and content handling controls.",
    "Cross-origin and browser trust boundary issues.",
    "Redirect validation and phishing-resistant flow design.",
    "API security misconfiguration and exposure analysis.",
    "Business impact analysis and remediation planning.",
    "Responsible disclosure reporting and evidence handling.",
  ],
  reportingStyle:
    "My reporting style focuses on clarity and usefulness: what the vulnerability is, who can trigger it, what access or impact it could create, why the organization should care, how to reproduce the issue safely, what evidence supports the finding, how severity was assessed, and what remediation steps are recommended.",
  publicNote:
    "I can discuss my general methodology, security principles, categories of testing, responsible disclosure approach, and reporting process. I do not publicly disclose confidential engagement details, affected organizations, exact assets, endpoints, screenshots, payloads, staff information, customer data, or private report content unless disclosure is explicitly authorized.",
};

/* ---------- Experience ---------- */
export const experience = [
  {
    role: "AI Data Annotation Specialist",
    org: "Remotasks",
    type: "Remote",
    period: "Oct 2020 — Jan 2022",
    summary:
      "Contributed to AI data annotation and evaluation workflows involving data labeling, review, and quality control. Required careful reading of task-specific instructions, consistent application of annotation guidelines, and attention to accuracy across remote task environments.",
    points: [
      "Labeling and reviewing data according to project instructions.",
      "Evaluating task outputs for correctness and compliance.",
      "Supporting machine learning training workflows through human-reviewed data.",
      "Adapting quickly to changing task requirements.",
    ],
    methods: [
      "Rubric as Recipe for Judgment",
      "Rubric Concepts & Criterion Anatomy",
      "Five-Step Rubric Mindset",
    ],
  },
  {
    role: "AI Evaluation Specialist",
    org: "TELUS Digital",
    type: "Remote",
    period: "Mar 2022 — Dec 2023",
    summary:
      "Evaluated AI-generated responses using project guidelines, structured criteria, and quality standards. Assessed outputs for accuracy, relevance, clarity, factual consistency, instruction following, and overall usefulness.",
    points: [
      "Reviewed AI responses to identify unsupported claims, incomplete answers, hallucination risks, weak reasoning, and guideline violations.",
      "Applied evidence-based judgment and provided structured feedback on AI outputs.",
    ],
    methods: [],
  },
  {
    role: "Freelance Virtual Assistant & Blog Content Writer",
    org: "Upwork",
    type: "Remote",
    period: "2020 — Present",
    summary:
      "Support clients with research, blog content writing, editing, administrative tasks, and AI-assisted workflows. Strengthened ability to organize information, write clearly, polish content, and support client-facing tasks remotely.",
    points: [
      "Research, editing, workflow support, and content refinement.",
      "AI-assisted productivity and review of content for factual alignment, user intent, consistency, and overall quality.",
    ],
    methods: [],
  },
  {
    role: "Generative AI Content Creator & AI Video Workflow Specialist",
    org: "Independent AI Content Projects",
    type: "Remote",
    period: "Oct 2024 — Present",
    summary:
      "Built and managed AI-driven YouTube channels focused on AI-assisted storytelling, video production, and content creation. One channel grew to over 29,000 subscribers with more than 2 million views, while another grew to more than 1.5 million views.",
    points: [
      "AI-generated Nollywood-style films, documentary and reenactment-style content.",
      "AI voice and visual workflows, prompt development, and review of generated outputs for coherence, realism, visual consistency, factual alignment, narrative quality, and audience suitability.",
    ],
    methods: [],
  },
  {
    role: "Penetration Tester & Bug Bounty Hunter",
    org: "Independent Engagements / HackerOne / Bugcrowd",
    type: "Remote",
    period: "2025 — Present",
    summary:
      "Conduct authorized security assessments and responsible disclosure research. Identify, validate, and document vulnerabilities, prepare technical findings with evidence, explain impact, and write remediation-focused reports.",
    points: [
      "Most client engagements are under non-disclosure agreements; publicly shareable information is limited.",
      "Portfolio describes the methodology and professional approach rather than exposing confidential findings.",
    ],
    methods: [],
  },
];

/* ---------- Projects ---------- */
export const projects = [
  {
    title: "Underwater Laser Detection Security System",
    category: "Hardware / Security",
    status: "Completed",
    summary:
      "A final-year university project developed using Raspberry Pi and Python, combining electronics, programming, sensor-based detection logic, and security-focused problem solving.",
    focus: ["Sensor-based detection", "Python programming", "Raspberry Pi", "Electronics", "Technical implementation"],
    value:
      "Demonstrates early technical problem-solving, practical engineering thinking, and the ability to turn a security-related concept into a working system.",
    icon: "Radar",
    accent: "blue",
  },
  {
    title: "AI-Powered Community Census Application",
    category: "Community / Data",
    status: "Completed",
    summary:
      "A National Youth Service Corps Community Development Service pass-out project developed while serving in Abinse, Guma Local Government Area, Benue State. Designed to support community-level data collection and structured information management.",
    focus: ["Data collection", "Community use", "Structured records", "Public-service support"],
    value:
      "Demonstrates the ability to think about technology in a community context and build tools that help organize information for real-world use.",
    icon: "Users",
    accent: "violet",
  },
  {
    title: "AI-Generated Video & Storytelling Projects",
    category: "Generative AI / Content",
    status: "Completed",
    summary:
      "AI-assisted storytelling, Nollywood-style video concepts, documentary and reenactment-style content, AI voice workflows, image/video generation, and prompt-based production processes.",
    focus: ["Prompt engineering", "Generative AI tools", "Video workflow planning", "AI voice/image/video systems", "Content quality review"],
    value:
      "Shows practical experience with AI tools and the ability to evaluate generated outputs for coherence, realism, visual consistency, narrative flow, and audience suitability.",
    icon: "Clapperboard",
    accent: "magenta",
  },
  {
    title: "XYZ Electronics Retail Website Demo",
    category: "Web / E-commerce",
    status: "Placeholder",
    summary:
      "A future demo that will show how a retail electronics website can organize product categories, product cards, search, pricing, stock status, hot sales, new arrivals, product detail pages, customer support, and inquiry or checkout flow.",
    focus: ["Business goal", "User journey", "Workflow", "Product catalogue design", "Admin update workflow"],
    value:
      "Planned case study structure for future client work. Not yet a completed client project.",
    icon: "ShoppingCart",
    accent: "blue",
    placeholder: true,
  },
  {
    title: "ABC Mobile Store E-commerce Demo",
    category: "Web / Retail",
    status: "Placeholder",
    summary:
      "A future demo presenting a phone retail website concept with brand filters, device categories, accessory sections, product details, price visibility, WhatsApp inquiry or cart flow, delivery information, and support contact paths.",
    focus: ["Customer problem", "Design strategy", "UX flow", "Product categorization", "Responsive layout"],
    value:
      "Planned case study structure for future client work. Not yet a completed client project.",
    icon: "Smartphone",
    accent: "violet",
    placeholder: true,
  },
];

/* ---------- Afrik-Vine Tech LTD ---------- */
export const afrikVine = {
  name: "Afrik-Vine Tech LTD",
  tagline: "Creativity · Futuristic · Legacy",
  logo: "/images/afrik-vine-logo.jpeg",
  headline: "Afrik-Vine Tech LTD: Creativity, Futuristic Thinking & Digital Legacy",
  intro:
    "Afrik-Vine Tech LTD is being developed as a forward-looking technology brand connected to my professional work in AI, web development, digital strategy, content systems, and security-informed technical services. The brand is guided by three words: Creativity, Futuristic, and Legacy.",
  positioning:
    "Afrik-Vine Tech LTD exists as the business-facing expression of my long-term technology direction. While this portfolio primarily represents me as a professional, the company section introduces the brand through which future services, projects, partnerships, and technology solutions can grow. The company is positioned around practical innovation: using modern tools, structured thinking, and creative execution to help individuals, businesses, and organizations build better digital systems.",
  mission:
    "To help individuals, businesses, and organizations build modern digital solutions that combine creativity, intelligent technology, usability, and long-term value.",
  vision:
    "To grow into a trusted African technology brand recognized for futuristic design, practical AI adoption, professional web solutions, digital creativity, and responsible technical execution.",
  values: [
    { label: "Creativity", body: "We believe digital solutions should be useful, original, and thoughtfully designed." },
    { label: "Futuristic thinking", body: "We look beyond short-term trends and build with adaptability, scalability, and future growth in mind." },
    { label: "Legacy", body: "We aim to create work that remains valuable, maintainable, and meaningful over time." },
    { label: "Integrity", body: "We do not exaggerate capabilities, fabricate results, or expose confidential information." },
    { label: "Clarity", body: "We value clear communication, structured planning, and practical execution." },
    { label: "Quality", body: "We treat every project as a system that should be useful, reliable, and professionally presented." },
  ],
  serviceAreas: [
    "Personal and business portfolio websites.",
    "Retail and e-commerce website development.",
    "AI-assisted content and workflow strategy.",
    "Prompt engineering and AI productivity support.",
    "Technical documentation and digital content structuring.",
    "Security-informed website review and risk awareness.",
    "Future AI evaluation and digital training resources.",
  ],
  engagementProcess: [
    { step: "Discovery", body: "Understand the client's business, audience, goals, content, and constraints." },
    { step: "Planning", body: "Define the sitemap, user journey, content structure, technical requirements, and success criteria." },
    { step: "Design Direction", body: "Establish the visual style, page hierarchy, interaction patterns, and brand tone." },
    { step: "Build", body: "Develop the website or digital solution with responsive design, usability, performance, and maintainability in mind." },
    { step: "Review", body: "Test content, layout, links, forms, mobile responsiveness, accessibility, and user flow." },
    { step: "Launch & Support", body: "Deploy the solution and provide a path for updates, improvements, and future expansion." },
  ],
  roadmap:
    "Afrik-Vine Tech LTD will gradually expand from a supporting professional venture within this portfolio into a broader technology company presence. The roadmap includes a dedicated company website, official company profile, service portfolio, project case studies, blog or research hub, client onboarding process, productized web development services, AI workflow resources, and future training or consulting offerings.",
  cta:
    "For now, Afrik-Vine Tech LTD is presented as a company venture behind future services and digital solutions within Obasiochie Vincent Chimaobi's personal portfolio. As the company profile develops, this section will be updated with official registration details, completed projects, client-ready service pages, and verified company information.",
};

/* ---------- Articles ---------- */
export const articles = {
  headline: "Articles, Research Notes, Tutorials & Professional Updates",
  intro:
    "This section will become the knowledge hub for AI evaluation, prompt engineering, web development, generative AI workflows, technical documentation, and security-safe educational writing.",
  comingSoon:
    "I am building a collection of articles and research notes focused on AI evaluation, prompt engineering, web development, generative AI workflows, technical documentation, and security-informed digital practice. New posts will be added gradually as this portfolio grows.",
  categories: [
    "AI Evaluation & Response Quality",
    "Prompt Engineering & Prompt Debugging",
    "Hallucination Detection & Factuality Review",
    "Generative AI Workflows & Content Systems",
    "Web Development, UX, SEO & Performance",
    "Security Research Principles & Responsible Disclosure",
    "Technical Documentation & Structured Writing",
    "Professional Growth & Remote AI Work",
  ],
  placeholders: [
    { title: "How I Evaluate AI Responses", body: "Will explain the difference between surface preference and structured evaluation — reading the prompt, identifying criteria, checking evidence, comparing outputs, detecting hallucinations, and explaining a final judgment clearly." },
    { title: "Building Better Prompts Through Clear Success Criteria", body: "Will explain how prompt engineering improves when the expected output is defined before the instruction is written — covering task goal, context, constraints, output format, examples, and prompt refinement." },
    { title: "What Makes a Retail Website Useful", body: "Will discuss product categories, search, product cards, price visibility, trust signals, checkout or inquiry paths, mobile layout, and long-term content management for retail businesses." },
  ],
};

/* ---------- Contact ---------- */
export const contact = {
  headline: "Let's Connect",
  intro:
    "If my work aligns with an opportunity, project, collaboration, or professional discussion, you can reach me through the contact details below. I am open to conversations around AI evaluation, prompt engineering, data annotation, web development, AI-assisted workflows, technical documentation, and responsible security research.",
  channels: [
    { label: "Email", value: "cyberghoxt.whitehat@gmail.com", href: "mailto:cyberghoxt.whitehat@gmail.com", icon: "Mail" },
    { label: "Location", value: "Abuja, FCT, Nigeria", href: null, icon: "MapPin" },
    { label: "X / Twitter", value: "@cyb3rghoxt", href: "https://x.com/cyb3rghoxt", icon: "Twitter" },
    { label: "GitHub", value: "@vin_chimaobi042", href: "https://github.com/vin_chimaobi042", icon: "Github" },
  ],
  whatsapp: {
    url: "https://wa.me/message/BS2I4XH5NM3CH1",
    qr: "/images/whatsapp-qr.jpeg",
    label: "Chat on WhatsApp",
    helper:
      "Prefer WhatsApp? Scan the QR code or tap the WhatsApp button to start a direct conversation.",
  },
  inquiryGuidance: [
    { type: "AI evaluation or data annotation", body: "Please include the role type, task expectations, region eligibility requirements, and any assessment or onboarding steps." },
    { type: "Web development inquiries", body: "Please include the type of website needed, target audience, preferred features, content availability, timeline, budget range if available, and whether admin editing is required." },
    { type: "Security-related discussions", body: "Please do not send sensitive credentials, private customer data, or confidential assets through an unsecured form. Use responsible disclosure channels where applicable." },
  ],
  inquiryTypes: [
    "AI Evaluation / AI Training Role",
    "Prompt Engineering Project",
    "Data Annotation Opportunity",
    "Web Development Project",
    "Afrik-Vine Tech LTD Inquiry",
    "Security Research Discussion",
    "General Professional Contact",
  ],
};

export const footer = {
  blurb:
    "AI Evaluation, Prompt Engineering, Web Development, and Security-Informed Digital Solutions.",
  ventureNote: "Professional venture: Afrik-Vine Tech LTD — Creativity · Futuristic · Legacy.",
  location: "Based in Abuja, FCT, Nigeria. Available for remote AI evaluation, prompt engineering, data annotation, web development, and professional technology opportunities.",
  links: navItems,
};
