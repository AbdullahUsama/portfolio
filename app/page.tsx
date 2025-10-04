"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Mail, Phone, Github, Linkedin, ExternalLink, ArrowRight, Download, Copy, Check } from "lucide-react"
import styles from "./portfolio.module.css"
import Image from "next/image";
import BackgroundPaths from "./components/BackgroundPaths";
import Galaxy from "./components/Galaxy";
import Aurora from './components/ether';
import Threads from "./components/Threads";
import CursorFollower from "./components/CursorFollower"
import GlareHover from "./components/GlareHover";
import SplitText from "./components/SplitText";
// import { Download } from ""; // Import Download icon


export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const [phoneCopied, setPhoneCopied] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light")
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const copyPhoneNumber = async () => {
    const phoneNumber = "03088404523"
    try {
      await navigator.clipboard.writeText(phoneNumber)
      setPhoneCopied(true)
      setTimeout(() => setPhoneCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy phone number: ', err)
    }
  }

  const projects = [
    {
      title: "News AI Agent",
      description:
        "The Pakistan News AI Assistant is an intelligent agent designed to help students and aspirants understand editorial and opinion articles from DAWN (Editorial & Op-Ed), The Tribune (Editorial), and ParadigmShift (National & International Relations) newspapers. It provides various functionalities, including getting all the articles related to a certain topic, scraping articles, extracting key information. ",
      tech: ["FastAPI", "LangChain", "Next.js", "Gemini 2.0"],
      github: "https://github.com/AbdullahUsama/dawn-ai-agent",
      demo: "https://dawn-ai-frontend.vercel.app/",
    },
    {
  title: "Pakistan Penal Code RAG Chatbot",
  description:
    "A sophisticated Retrieval-Augmented Generation (RAG) chatbot for the Pakistan Penal Code featuring hybrid chunking, vector embeddings, and AI-powered legal assistance. Combines Weaviate vector database, Cohere embeddings, and Gemini AI for accurate legal information retrieval and natural language responses.",
  tech: ["RAG", "Weaviate", "Cohere", "Gemini AI", "Streamlit", "Python", "Vector Database"],
  github: "https://github.com/AbdullahUsama/Pakistan-Penal-Code-RAG-Chatbot",
  demo: "https://pakistan-penal-code-rag-chatbot.streamlit.app/",
},
    {
      title: "Bounding Box Refinement Pipeline",
      description:
        "Pipeline to make YOLO bounding boxes more precise and tight around the target objects. Making the data more precise and improving localization.",
      tech: ["YOLO", "SAM", "Computer Vision", "Python", "Masking"],
      github: "https://github.com/AbdullahUsama/fixing-loose-bounding-boxes",
      demo: "https://medium.com/@ausama.bese22seecs/fixing-loose-bounding-boxes-a-sam-powered-approach-for-yolo-datasets-ea96836a5730",
    },
    {
      title: "Finetuned Mistral-7b (25+ Downloads on Hugging Face)",
      description:
        "A fine-tuned Mistral-7B-Instruct-v0.3 model capable of generating opinion-style text in the distinctive writing style of Pakistani diplomat, journalist, and political scientist, Maleeha Lodhi.",
      tech: ["Mistral-7B", "LLM", "Fine-tuning", "PEFT", "LoRA", "Python", "Hugging Face"],
      github: "https://github.com/AbdullahUsama/mistral-7b-finetune", 
      demo: "https://huggingface.co/abdullah1027/mistral-7b-instruct-finetuned-maleeha-lodhi-style", 
    },
    {
      title: "Football Video Analysis",
      description:
        "Comprehensive football match analysis system with player tracking, distance estimation, and possession analysis.",
      tech: ["YOLO", "OpenCV", "SORT Tracking", "Python"],
      github: "https://github.com/AbdullahUsama/football-video-analysis",
    },
    {
      title: "Plant E-Commerce App",
      description:
        "Full-stack e-commerce platform with secure authentication, multilingual support, and payment integration.",
      tech: ["MERN", "Stripe", "Clerk.com", "React-i18n"],
      github: "https://github.com/AbdullahUsama/plant-ecommerce-app",
      // demo: "#",
    },
    {
  title: "Hand Gesture Volume Control",
  description:
    "Real-time hands-free volume control system using dynamic hand gestures, leveraging MediaPipe and Pycaw for precise landmark detection and system audio integration.",
  tech: ["MediaPipe", "OpenCV", "Pycaw", "NumPy", "Computer Vision"],
  github: "https://github.com/AbdullahUsama/hand-volume-control", // Replace with actual URL
  // demo: "#",
},
{
  title: "Video-Stream App",
  description:
    "Cloud-based video streaming application with microservices architecture, secure authentication, scalable backend, and real-time media processing on Google Cloud.",
  tech: ["React.js", "Google Cloud Run", "Clerk.com", "JWT", "Firebase", "GCS", "API Gateway"],
  github: "https://github.com/AbdullahUsama/video-stream-app", // Replace with actual URL
  demo: "https://video-stream-app-delta.vercel.app/",
},
{
  title: "Transformer From Scratch",
  description:
    "Educational implementation of the Transformer architecture based on the 'Attention Is All You Need' paper. Built from scratch in PyTorch to understand attention, positional encoding, multi-head mechanisms, and encoder-decoder structure.",
  tech: ["PyTorch", "Python", "NLP", "Deep Learning", "Attention", "Positional Encoding"],
  github: "https://github.com/AbdullahUsama/transformer-from-scratch", // Replace with your actual GitHub repo URL
}


  ]

const skills = [
  { category: "Programming Languages", items: ["JavaScript", "Python", "C++", "SQL"] },
  { category: "Web Development", items: ["React.js", "Next.js", "Tailwind CSS", "TypeScript","Node.js", "Express.js", "FastAPI", "RESTful APIs"] },
  { category: "AI/ML & Computer Vision", items: ["TensorFlow","PyTorch", "OpenCV", "YOLO", "MediaPipe", "LangChain", "LangSmith"] },
  { category: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL", "Weaviate", "ChromaDB", "Pinecone"] },
  { category: "Cloud & Deployment", items: ["Docker", "Vercel", "Render", "Google Cloud"] },
  { category: "Tools & Platforms", items: ["Git", "GitHub", "Clerk.com", "Stripe", "Pycaw", "React-i18n"] },
];

  return (
    <div className={styles.container}>
      <CursorFollower />
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.navBrand}>Abdullah Usama</div>

          <div className={styles.navLinks}>
            {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`${styles.navLink} ${activeSection === item.toLowerCase() ? styles.navLinkActive : ""}`}
              >
                {item}
              </button>
            ))}
          </div>

          <button onClick={toggleDarkMode} className={styles.themeToggle}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>
      
{/* Hero Section */}
{/* test */}
      <section id="hero" className={styles.hero}>
        {darkMode && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 0 }}>
            <Aurora
              colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
              blend={0.8}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
        )}
        {!darkMode && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 0 }}>
            <Threads
              color={[0.2, 0.7, 1]}
              amplitude={2}
              distance={0.6}
              enableMouseInteraction={true}
            />
          </div>
        )}
        <BackgroundPaths />
  <div className={styles.heroContentCentered} style={{ position: 'relative', zIndex: 10 }}>
    <div className={styles.heroText}>
      <SplitText
        text="Abdullah Usama"
        className={styles.heroTitle}
        tag="h1"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
      {/* <div className={styles.heroDivider} /> */}
<p className={styles.heroSubtitle}>
  <span className={styles.heroSubtitleDesktop}>Passionate Software Engineer expert in Machine Learning, Deep Learning, Computer Vision and LLMs</span>
  <span className={styles.heroSubtitleMobile}>AI Engineer • ML • DL<br/>Computer Vision</span>
</p>

    </div>
   
    <div className={styles.heroActions}>
      <button onClick={() => scrollToSection("contact")} className={styles.ctaButton}>
        <span>Get In Touch</span>
        <ArrowRight size={16} />
      </button>
      {/* New Download CV Button */}
      <a href="/Abdullah_Usama_CV.pdf" download className={styles.ctaButton}> {/* Assuming your CV is in the public folder as Abdullah_Usama_CV.pdf */}
        <span>Download CV</span>
        <Download size={16} />
      </a>
    </div>
  </div>
</section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h2 className={styles.sectionTitle}>About</h2>
            <div className={styles.sectionDivider} />

            <div className={styles.aboutDescription}>
              <p>
                I'm a final-year Software Engineering student at the National University of Sciences and Technology
                (NUST), with a experience in AI Agents, Automations and Web Development.
              </p>
              <p>
                I have worked on fine-tuning Large Language Models (LLMs) and Vision-Language Models (VLMs), 
                developing intelligent AI agents, creating automation solutions, and building scalable web applications. 
                I'm passionate about using cutting-edge AI technologies to solve real life problems.
              </p>
            </div>
          </div>

          <div className={styles.aboutDetails}>
            <GlareHover
              width="100%"
              height="auto"
              background="var(--bg-secondary, #181818)"
              borderRadius="8px"
              borderColor="var(--border-color, #333)"
              glareColor="#ffffff"
              glareOpacity={0.1}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              style={{ padding: 0, display: 'block' }}
            >
              <div className={styles.educationCard}>
                <h3 className={styles.detailTitle}>Education</h3>
                <div className={styles.detailContent}>
                  <p className={styles.detailMain}>Bachelor of Software Engineering</p>
                  <p className={styles.detailSub}>National University of Sciences and Technology (NUST), H-12, Islamabad</p>
                  <p className={styles.detailSmall}>School of Electrical Engineering and Computer Science (SEECS)</p>
                </div>
              </div>
            </GlareHover>

            <GlareHover
              width="100%"
              height="auto"
              background="var(--bg-secondary, #181818)"
              borderRadius="8px"
              borderColor="var(--border-color, #333)"
              glareColor="#ffffff"
              glareOpacity={0.1}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              style={{ padding: 0, display: 'block' }}
            >
              <div className={styles.focusAreaCard}>
                <h3 className={styles.detailTitle}>Focus Areas</h3>
                <div className={styles.detailContent}>
                  <p>Machine Learning & Computer Vision</p>
                  <p>Full-Stack Web Development</p>
                  <p>AI-Powered Applications</p>
                </div>
              </div>
            </GlareHover>
          </div>
        </div>
      </section>

      <section id="experience" className={styles.experience}>
  <div className={styles.experienceContent}>
    <h2 className={styles.sectionTitle}>Experience</h2>

    <div className={styles.experienceList}>
      <div className={styles.experienceItem}>
        <div className={styles.experienceDate}>
          <p>May 2025 – Present</p>
        </div>
        <div className={styles.experienceDetails}>
          <h3 className={styles.experienceTitle}>Freelancer</h3>
          <p className={styles.experienceCompany}>Fiverr</p>
          <ul className={styles.experienceDescription}>
            <li> - Developed chatbots using RAG architecture for enhanced query responses</li>
            <li> - Built intelligent AI agents for automated customer solutions and workflows</li>
            <li> - Implemented LLM-powered systems for various client AI automation needs</li>
          </ul>
        </div>
      </div>

      <div className={styles.experienceDivider} />

      <div className={styles.experienceItem}>
        <div className={styles.experienceDate}>
          <p>June 2025 – Present</p>
        </div>
        <div className={styles.experienceDetails}>
          <h3 className={styles.experienceTitle}>AI Intern</h3>
          <p className={styles.experienceCompany}>Crimson Labs, SEECS</p>
          <ul className={styles.experienceDescription}>
            <li> - Working on finetuning LLMs</li>
            <li> - Creating AI Chatbots for Education</li>
            <li> - RAG - Based Systems for Learning</li>
          </ul>
        </div>
      </div>

      <div className={styles.experienceDivider} />

      <div className={styles.experienceItem}>
        <div className={styles.experienceDate}>
          <p>April 2025 – June 2025</p>
        </div>
        <div className={styles.experienceDetails}>
          <h3 className={styles.experienceTitle}>ML Intern</h3>
          <p className={styles.experienceCompany}>OneScreen Solutions, San Diego, California (Remote)</p>
          <ul className={styles.experienceDescription}>
            <li> - Worked with Vision Transformers (ViT-32) and Vision-Language Models (VLMs) like PaLI-Gemma</li>
            <li> - Achieved 7-10% higher mAP by reducing label noise and improving object localization</li>
            <li> - Developed end-to-end pipeline combining SAM's pixel-level masks with YOLO annotations</li>
          </ul>
        </div>
      </div>

      <div className={styles.experienceDivider} />

      <div className={styles.experienceItem}>
        <div className={styles.experienceDate}>
          <p>June 2024 – Aug 2024</p>
        </div>
        <div className={styles.experienceDetails}>
          <h3 className={styles.experienceTitle}>Computer Vision Intern</h3>
          <p className={styles.experienceCompany}>Machine Vision & Intelligent Systems Lab (MachVis), SEECS</p>
          <ul className={styles.experienceDescription}>
            <li> - Engineered computer vision pipelines for real-time object detection and tracking</li>
            <li> - Implemented robust feature extraction methods including ORB and optical flow</li>
            <li> - Developed real-time tracking systems using SORT and Kalman Filters</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Projects Section */}
      <section id="projects" className={styles.projects}>
        <div className={styles.projectsContent}>
          <h2 className={styles.sectionTitle}>Selected Projects</h2>

          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.projectLinks}>
                <a
                  href={project.github}
                  className={styles.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
            <Github size={16} />
          </a>
          {project.demo && (
            <a
              href={project.demo}
              className={styles.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} />
            </a>
          )}
                </div>
              </div>

              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.projectTech}>
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={styles.skills}>
        <div className={styles.skillsContent}>
          <h2 className={styles.sectionTitle}>Skills & Technologies</h2>

          <div className={styles.skillsGrid}>
            {skills.map((skillGroup, index) => (
              <div key={index} className={styles.skillGroup}>
                <h3 className={styles.skillCategory}>{skillGroup.category}</h3>
                <div className={styles.skillList}>
                  {skillGroup.items.map((skill, skillIndex) => (
                    <p key={skillIndex} className={styles.skillItem}>
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <div className={styles.contactContent}>
          <h2 className={styles.sectionTitle}>Let's Connect</h2>

          <div className={styles.contactText}>
            <p>
              I'm always interested in discussing new opportunities, collaborations, or innovative projects. Feel free
              to reach out if you'd like to connect.
            </p>
          </div>

          <div className={styles.contactGrid}>
            <a href="mailto:ausama.bese22seecs@seecs.edu.pk" className={styles.contactCard}>
              <Mail size={24} />
              <span>Email</span>
            </a>

            <div 
              className={`${styles.contactCard} ${styles.phoneCard}`} 
              onClick={copyPhoneNumber}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <Phone size={24} />
              <span>Phone - 03088404523</span>
              <div className={styles.copyIcon}>
                {phoneCopied ? <Check size={16} /> : <Copy size={16} />}
              </div>
            </div>

            <a href="https://www.linkedin.com/in/abdullahusama/" className={styles.contactCard}>
              <Linkedin size={24} />
              <span>LinkedIn</span>
            </a>

            <a href="https://github.com/AbdullahUsama" className={styles.contactCard}>
              <Github size={24} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>Made by Abdullah Usama </p>
          <p></p>
        </div>
      </footer>
    </div>
  )
}
