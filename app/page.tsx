"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import {
  Moon,
  Sun,
  Mail,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  ArrowUpRight,
  ArrowDown,
  Download,
  Copy,
  Check,
} from "lucide-react"
import styles from "./portfolio.module.css"

const CursorFollower = dynamic(() => import("./components/CursorFollower"), { ssr: false })

// Structured Data for Rich Snippets
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abdullah Usama",
    "jobTitle": "AI Engineer & Software Developer",
    "description": "Final-year Software Engineering student at NUST specializing in AI Agents, Machine Learning, Computer Vision, and Full-Stack Development",
    "url": "https://abdullahusama.site",
    "image": "https://abdullahusama.site/me.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/abdullahusama/",
      "https://github.com/AbdullahUsama",
      "https://huggingface.co/abdullah1027"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "National University of Sciences and Technology (NUST)",
      "department": "School of Electrical Engineering and Computer Science (SEECS)",
      "degree": "Bachelor of Software Engineering"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "AI Engineer",
      "occupationLocation": {
        "@type": "Place",
        "name": "Pakistan"
      },
      "skills": ["Machine Learning", "Computer Vision", "AI Agents", "Deep Learning", "Full-Stack Development", "Python", "React", "Next.js"]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-308-8404523",
      "contactType": "professional",
      "email": "ausama.bese22seecs@seecs.edu.pk"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://abdullahusama.site#website",
    "url": "https://abdullahusama.site",
    "name": "Abdullah Usama Portfolio",
    "description": "Professional portfolio showcasing AI engineering projects and software development work",
    "author": {
      "@type": "Person",
      "name": "Abdullah Usama"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://abdullahusama.site" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://abdullahusama.site#about" },
      { "@type": "ListItem", "position": 3, "name": "Experience", "item": "https://abdullahusama.site#experience" },
      { "@type": "ListItem", "position": 4, "name": "Projects", "item": "https://abdullahusama.site#projects" },
      { "@type": "ListItem", "position": 5, "name": "Skills", "item": "https://abdullahusama.site#skills" },
      { "@type": "ListItem", "position": 6, "name": "Contact", "item": "https://abdullahusama.site#contact" }
    ]
  }
];

const projects = [
  {
    title: "News AI Agent",
    description:
      "An intelligent agent that helps students decode editorial and opinion pieces from DAWN, The Tribune, and ParadigmShift — topic search, article scraping, and key-information extraction in one assistant.",
    tech: ["FastAPI", "LangChain", "Next.js", "Gemini 2.0"],
    github: "https://github.com/AbdullahUsama/dawn-ai-agent",
    demo: "https://dawn-ai-frontend.vercel.app/",
    featured: true,
    tag: "AI Agent",
  },
  {
    title: "Pakistan Penal Code RAG Chatbot",
    description:
      "A Retrieval-Augmented Generation chatbot for the Pakistan Penal Code — hybrid chunking, Weaviate vector search, Cohere embeddings, and Gemini for accurate, natural-language legal answers.",
    tech: ["RAG", "Weaviate", "Cohere", "Gemini", "Streamlit", "Python"],
    github: "https://github.com/AbdullahUsama/Pakistan-Penal-Code-RAG-Chatbot",
    demo: "https://pakistan-penal-code-rag-chatbot.streamlit.app/",
    featured: true,
    tag: "RAG System",
  },
  {
    title: "Fine-tuned Mistral-7B",
    description:
      "Mistral-7B-Instruct fine-tuned with LoRA to write opinion pieces in the distinctive style of diplomat and political scientist Maleeha Lodhi. 50+ downloads on Hugging Face.",
    tech: ["Mistral-7B", "PEFT", "LoRA", "Hugging Face"],
    github: "https://github.com/AbdullahUsama/mistral-7b-finetune",
    demo: "https://huggingface.co/abdullah1027/mistral-7b-instruct-finetuned-maleeha-lodhi-style",
    featured: true,
    tag: "LLM Fine-tuning",
  },
  {
    title: "Bounding Box Refinement Pipeline",
    description:
      "A SAM-powered pipeline that tightens loose YOLO bounding boxes, sharpening localization quality across entire datasets.",
    tech: ["YOLO", "SAM", "Computer Vision", "Python"],
    github: "https://github.com/AbdullahUsama/fixing-loose-bounding-boxes",
    demo: "https://medium.com/@ausama.bese22seecs/fixing-loose-bounding-boxes-a-sam-powered-approach-for-yolo-datasets-ea96836a5730",
    tag: "Computer Vision",
  },
  {
    title: "Transformer From Scratch",
    description:
      "The 'Attention Is All You Need' architecture rebuilt from zero in PyTorch — attention, positional encoding, multi-head mechanisms, encoder-decoder.",
    tech: ["PyTorch", "NLP", "Deep Learning"],
    github: "https://github.com/AbdullahUsama/transformer-from-scratch",
    tag: "Deep Learning",
  },
  {
    title: "Football Video Analysis",
    description:
      "Match analysis system with player tracking, distance estimation, and possession analysis from raw broadcast footage.",
    tech: ["YOLO", "OpenCV", "SORT", "Python"],
    github: "https://github.com/AbdullahUsama/football-video-analysis",
    tag: "Computer Vision",
  },
  {
    title: "Video-Stream App",
    description:
      "Cloud-native video streaming with a microservices backend, secure auth, and real-time media processing on Google Cloud.",
    tech: ["React", "Cloud Run", "Firebase", "JWT"],
    github: "https://github.com/AbdullahUsama/video-stream-app",
    demo: "https://video-stream-app-delta.vercel.app/",
    tag: "Cloud",
  },
  {
    title: "Plant E-Commerce App",
    description:
      "Full-stack e-commerce platform with secure authentication, multilingual support, and Stripe payments.",
    tech: ["MERN", "Stripe", "Clerk", "i18n"],
    github: "https://github.com/AbdullahUsama/plant-ecommerce-app",
    tag: "Full-Stack",
  },
  {
    title: "Hand Gesture Volume Control",
    description:
      "Real-time hands-free volume control driven by dynamic hand gestures, with MediaPipe landmark detection and Pycaw audio integration.",
    tech: ["MediaPipe", "OpenCV", "Pycaw"],
    github: "https://github.com/AbdullahUsama/hand-volume-control",
    tag: "Computer Vision",
  },
]

const experience = [
  {
    date: "Oct 2025 — Present",
    role: "LLM & AI Engineer",
    company: "Rapids AI",
    points: [
      "Designing autonomous AI agents for complex task automation and decision-making",
      "Building LLM-powered automation workflows that cut manual intervention",
      "Developing multi-agent systems with tool integration and orchestration",
    ],
  },
  {
    date: "May 2025 — Present",
    role: "Freelance AI Developer",
    company: "Fiverr",
    points: [
      "Shipped RAG chatbots with enhanced query responses for client products",
      "Built intelligent AI agents for automated customer solutions and workflows",
    ],
  },
  {
    date: "Jun 2025 — Sep 2025",
    role: "AI Intern",
    company: "Crimson Labs, SEECS",
    points: [
      "Fine-tuned LLMs and built AI chatbots for education",
      "Developed RAG-based systems for learning",
    ],
  },
  {
    date: "Apr 2025 — Jun 2025",
    role: "ML Intern",
    company: "OneScreen Solutions · San Diego (Remote)",
    points: [
      "Worked with Vision Transformers (ViT-32) and VLMs like PaLI-Gemma",
      "Achieved 7–10% higher mAP by reducing label noise and improving localization",
      "Built an end-to-end pipeline fusing SAM pixel masks with YOLO annotations",
    ],
  },
  {
    date: "Jun 2024 — Aug 2024",
    role: "Computer Vision Intern",
    company: "MachVis Lab, SEECS",
    points: [
      "Engineered CV pipelines for real-time object detection and tracking",
      "Implemented feature extraction with ORB and optical flow",
      "Built real-time tracking with SORT and Kalman Filters",
    ],
  },
]

const skills = [
  { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "C++", "SQL"] },
  { category: "AI / ML / CV", items: ["PyTorch", "TensorFlow", "LangChain", "LangSmith", "OpenCV", "YOLO", "MediaPipe"] },
  { category: "Web", items: ["React", "Next.js", "Node.js", "Express", "FastAPI", "Tailwind CSS", "REST APIs"] },
  { category: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Weaviate", "ChromaDB", "Pinecone"] },
  { category: "Cloud & DevOps", items: ["Docker", "Google Cloud", "Vercel", "Render"] },
  { category: "Tools", items: ["Git", "GitHub", "Clerk", "Stripe", "Hugging Face"] },
]

const marqueeItems = [
  "AI Agents",
  "RAG Systems",
  "LLM Fine-tuning",
  "Computer Vision",
  "Multi-Agent Orchestration",
  "Vision-Language Models",
  "Full-Stack Development",
  "Deep Learning",
]

const stats = [
  { value: "05", label: "Roles & internships" },
  { value: "09", label: "Projects shipped" },
  { value: "50+", label: "Hugging Face downloads" },
  { value: "7–10%", label: "mAP gain delivered" },
]

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <Reveal>
      <div className={styles.sectionHeading}>
        <span className={styles.sectionIndex}>{index}</span>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <span className={styles.sectionRule} />
      </div>
    </Reveal>
  )
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const [phoneCopied, setPhoneCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light")
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
      const sections = ["hero", "about", "experience", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const copyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText("03088404523")
      setPhoneCopied(true)
      setTimeout(() => setPhoneCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy phone number: ", err)
    }
  }

  const nameLine1 = "ABDULLAH"
  const nameLine2 = "USAMA"

  const letterVariants = {
    hidden: { y: "110%", rotate: 4 },
    visible: (i: number) => ({
      y: "0%",
      rotate: 0,
      transition: { duration: 0.9, delay: 0.06 * i + 0.2, ease: [0.22, 1, 0.36, 1] as const },
    }),
  }

  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className={styles.container}>
        <CursorFollower />
        <div className={styles.grain} aria-hidden="true" />

        {/* Navigation */}
        <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
          <div className={styles.navContent}>
            <button onClick={() => scrollToSection("hero")} className={styles.navBrand}>
              AU<span className={styles.navBrandDot}>.</span>
            </button>

            <div className={styles.navLinks}>
              {["About", "Experience", "Projects", "Skills", "Contact"].map((item, i) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`${styles.navLink} ${activeSection === item.toLowerCase() ? styles.navLinkActive : ""}`}
                >
                  <span className={styles.navLinkIndex}>0{i + 1}</span>
                  {item}
                </button>
              ))}
            </div>

            <div className={styles.navActions}>
              <a href="/Abdullah_Usama_CV.pdf" download className={styles.navCv}>
                CV <Download size={13} />
              </a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={styles.themeToggle}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section id="hero" ref={heroRef} className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />

          <motion.div
            className={styles.heroContent}
            style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              className={styles.heroOverline}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className={styles.availabilityDot} />
              AI Engineer — Open to opportunities
            </motion.div>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroLine}>
                {nameLine1.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    className={styles.heroChar}
                    custom={i}
                    variants={letterVariants}
                    initial={reduce ? "visible" : "hidden"}
                    animate="visible"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
              <span className={`${styles.heroLine} ${styles.heroLineOutline}`}>
                {nameLine2.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    className={styles.heroChar}
                    custom={i + nameLine1.length}
                    variants={letterVariants}
                    initial={reduce ? "visible" : "hidden"}
                    animate="visible"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.div
              className={styles.heroMeta}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <p className={styles.heroSubtitle}>
                I build <em>AI agents</em>, <em>RAG systems</em>, and{" "}
                <em>computer-vision pipelines</em> that ship — from fine-tuned LLMs to
                full-stack products. Software Engineering @ NUST.
              </p>

              <div className={styles.heroActions}>
                <button onClick={() => scrollToSection("projects")} className={styles.ctaPrimary}>
                  See the work <ArrowDown size={16} />
                </button>
                <button onClick={() => scrollToSection("contact")} className={styles.ctaGhost}>
                  Get in touch <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.heroStats}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {stats.map((s) => (
              <div key={s.label} className={styles.statBlock}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Marquee */}
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[0, 1].map((dup) => (
              <div key={dup} className={styles.marqueeGroup}>
                {marqueeItems.map((item) => (
                  <span key={item} className={styles.marqueeItem}>
                    {item} <span className={styles.marqueeStar}>✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <section id="about" className={styles.section}>
          <SectionHeading index="01" title="About" />
          <div className={styles.aboutGrid}>
            <Reveal delay={0.1}>
              <p className={styles.aboutLead}>
                Final-year Software Engineering student at{" "}
                <span className={styles.accentText}>NUST</span>, working at the edge of
                applied AI — fine-tuning LLMs and VLMs, building autonomous agents, and
                turning research into products people actually use.
              </p>
            </Reveal>
            <div className={styles.aboutCards}>
              <Reveal delay={0.15}>
                <div className={styles.infoCard}>
                  <span className={styles.infoCardLabel}>Education</span>
                  <p className={styles.infoCardTitle}>B.E. Software Engineering</p>
                  <p className={styles.infoCardSub}>
                    National University of Sciences & Technology (NUST) — SEECS, Islamabad
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className={styles.infoCard}>
                  <span className={styles.infoCardLabel}>Focus</span>
                  <p className={styles.infoCardTitle}>Applied AI Engineering</p>
                  <p className={styles.infoCardSub}>
                    LLM agents & automation · Computer vision · Full-stack AI products
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className={styles.section}>
          <SectionHeading index="02" title="Experience" />
          <div className={styles.timeline}>
            {experience.map((job, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDate}>{job.date}</div>
                  <div className={styles.timelineBody}>
                    <h3 className={styles.timelineRole}>{job.role}</h3>
                    <p className={styles.timelineCompany}>{job.company}</p>
                    <ul className={styles.timelinePoints}>
                      {job.points.map((point, j) => (
                        <li key={j}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className={styles.section}>
          <SectionHeading index="03" title="Selected Work" />

          <div className={styles.featuredGrid}>
            {featured.map((project, i) => (
              <Reveal key={project.title} delay={0.08 * i} className={styles.featuredRevealCell}>
                <a
                  href={project.demo || project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.featuredCard}
                >
                  <div className={styles.featuredTop}>
                    <span className={styles.projectTag}>{project.tag}</span>
                    <ArrowUpRight className={styles.featuredArrow} size={22} />
                  </div>
                  <h3 className={styles.featuredTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectFooter}>
                    <div className={styles.projectTech}>
                      {project.tech.map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <div className={styles.projectList}>
            {rest.map((project, i) => (
              <Reveal key={project.title} delay={0.04 * i}>
                <div className={styles.projectRow}>
                  <span className={styles.projectRowIndex}>
                    {String(i + featured.length + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.projectRowMain}>
                    <h3 className={styles.projectRowTitle}>{project.title}</h3>
                    <p className={styles.projectRowDesc}>{project.description}</p>
                    <div className={styles.projectTech}>
                      {project.tech.map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.projectRowLinks}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                      aria-label={`${project.title} on GitHub`}
                    >
                      <Github size={17} />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        aria-label={`${project.title} live demo`}
                      >
                        <ExternalLink size={17} />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className={styles.section}>
          <SectionHeading index="04" title="Stack" />
          <div className={styles.skillsGrid}>
            {skills.map((group, i) => (
              <Reveal key={group.category} delay={0.05 * i}>
                <div className={styles.skillGroup}>
                  <h3 className={styles.skillCategory}>{group.category}</h3>
                  <div className={styles.skillChips}>
                    {group.items.map((skill) => (
                      <span key={skill} className={styles.skillChip}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={styles.contact}>
          <Reveal>
            <p className={styles.contactKicker}>05 — Contact</p>
            <h2 className={styles.contactTitle}>
              Let&apos;s build
              <br />
              something <span className={styles.contactTitleAccent}>smart.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="mailto:ausama.bese22seecs@seecs.edu.pk" className={styles.contactEmail}>
              ausama.bese22seecs@seecs.edu.pk
              <ArrowUpRight className={styles.contactEmailArrow} />
            </a>
          </Reveal>

          <Reveal delay={0.25}>
            <div className={styles.contactLinks}>
              <a href="mailto:ausama.bese22seecs@seecs.edu.pk" className={styles.contactChip}>
                <Mail size={16} /> Email
              </a>
              <button onClick={copyPhoneNumber} className={styles.contactChip}>
                <Phone size={16} /> 0308 8404523{" "}
                {phoneCopied ? <Check size={14} className={styles.copiedIcon} /> : <Copy size={14} />}
              </button>
              <a
                href="https://www.linkedin.com/in/abdullahusama/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactChip}
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/AbdullahUsama"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactChip}
              >
                <Github size={16} /> GitHub
              </a>
              <a href="/Abdullah_Usama_CV.pdf" download className={styles.contactChip}>
                <Download size={16} /> Download CV
              </a>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Abdullah Usama</p>
          <p className={styles.footerMeta}>Islamabad, Pakistan — Built with Next.js</p>
        </footer>
      </div>
    </>
  )
}
