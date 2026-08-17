import {
  ArrowRight,
  Github,
  ChevronUp,
  Star,
  Sparkles,
  Zap,
  Eye,
  Play,
  X,
} from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const projects = [
  {
    id: 8,
    title: "GenAxis",
    category: "AI SaaS",
    description:
      "Open-source AI workspace built with the PERN stack and Gemini — generate images, drafts, and resume reviews from one place.",
    image: "/projects/project8.png",
    video: "/projects/videos/genaxix-demo.mp4",
    tags: ["PERN", "Clerk", "Gemini", "Billing"],
    demoUrl: "https://genaxis.vercel.app",
    githubUrl: "https://github.com/tomas0502",
    featured: true,
    accentColor: "from-emerald-500 to-teal-600",
    status: "Live",
    highlights: ["Image generation", "Article writer", "Resume reviewer"],
  },
  {
    id: 9,
    title: "Ntro.io",
    category: "Hiring",
    description:
      "AI-powered hiring platform that streamlines job matching, candidate tracking, and application management.",
    image: "/projects/project9.png",
    video: "/projects/videos/ntro-demo.mp4",
    tags: ["Webflow", "MongoDB", "JavaScript", "AI"],
    demoUrl: "https://www.ntro.io/",
    githubUrl: "#",
    featured: true,
    accentColor: "from-orange-500 to-red-600",
    status: "Live",
    highlights: ["Job matching", "Candidate tracking", "Application flow"],
  },
  {
    id: 1,
    title: "Vante & Co.",
    category: "E-commerce",
    description:
      "Fashion marketplace with product recommendations and a smooth checkout experience.",
    image: "/projects/project1.png",
    video: "/projects/videos/vante-demo.mp4",
    tags: ["React", "Node.js", "Stripe", "Redis"],
    demoUrl: "https://e-commerce-website-4w6a.vercel.app",
    githubUrl: "https://github.com/tomas0502/E-commerce-website",
    featured: true,
    accentColor: "from-violet-500 to-indigo-600",
    status: "Live",
    highlights: ["Catalog", "Cart", "Payments"],
  },
  {
    id: 2,
    title: "Converse Pro",
    category: "Realtime",
    description:
      "Chat platform with realtime messaging, media sharing, and authentication.",
    image: "/projects/project2.png",
    video: "/projects/videos/converse-demo.mp4",
    tags: ["Socket.IO", "MongoDB", "React", "WebRTC"],
    demoUrl: "https://converse-pro-frontend.vercel.app",
    githubUrl: "https://github.com/tomas0502/converse-pro",
    featured: true,
    accentColor: "from-blue-500 to-cyan-600",
    status: "Live",
    highlights: ["Realtime chat", "Media sharing", "Auth"],
  },
  {
    id: 3,
    title: "Blogni AI",
    category: "AI",
    description:
      "AI-powered content generation platform with multi-language support.",
    image: "/projects/project3.png",
    video: "/projects/videos/blogni-demo.mp4",
    tags: ["Next.js", "Gemini", "Clerk", "Redis"],
    demoUrl: "https://blogni.vercel.app",
    githubUrl: "https://github.com/tomas0502/Blogni",
    accentColor: "from-amber-500 to-orange-600",
    status: "Live",
    highlights: ["AI drafting", "Multi-language", "Accounts"],
  },
  {
    id: 4,
    title: "Spendlix",
    category: "FinTech",
    description:
      "Personal finance tracker with expense management and budgeting views.",
    image: "/projects/project4.png",
    video: "/projects/videos/spendlix-demo.mp4",
    tags: ["React", "Chart.js", "Node.js", "Firebase"],
    demoUrl: "https://spendlix.vercel.app/login",
    githubUrl: "https://github.com/tomas0502/Spendlix",
    accentColor: "from-rose-500 to-pink-600",
    status: "Live",
    highlights: ["Expense tracking", "Charts", "Budgets"],
  },
  {
    id: 5,
    title: "Eattoo",
    category: "Food",
    description:
      "Food delivery experience with restaurant listings and order management.",
    image: "/projects/project5.png",
    video: "/projects/videos/eattoo-demo.mp4",
    tags: ["React", "Redux", "Mapbox", "Stripe"],
    demoUrl: "https://eattoo-food-delivery-website-frontend.onrender.com/",
    githubUrl: "https://github.com/tomas0502/Eattoo-food-delivery-website",
    accentColor: "from-violet-500 to-purple-600",
    status: "Live",
    highlights: ["Listings", "Orders", "Maps"],
  },
  {
    id: 6,
    title: "JobQue",
    category: "HR Tech",
    description:
      "Job matching platform with candidate tracking and application management.",
    image: "/projects/project6.png",
    video: "/projects/videos/jobque-demo.mp4",
    tags: ["Next.js", "PostgreSQL", "Redis", "AI"],
    demoUrl: "#",
    githubUrl: "#",
    accentColor: "from-orange-500 to-red-600",
    status: "In progress",
    highlights: ["Matching", "Pipeline", "Applications"],
  },
];

export const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setShowAll(false);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section id="projects" className="relative py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Selected work"
          title="Products I've"
          highlight="helped bring to life."
          description="A mix of SaaS, marketplaces, and realtime products — each built to ship, not just to demo."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeFilter === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group bg-card border border-border rounded-3xl overflow-hidden flex flex-col text-left hover:border-primary/30 transition-colors"
              >
                <div className="relative h-52 overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-background/80 backdrop-blur border border-border">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur border ${
                        project.status === "Live"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25"
                          : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedVideo(project)}
                    className="cursor-pointer absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/35 transition-colors"
                    aria-label={`Play ${project.title} demo`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity h-12 w-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                      <Play className="h-5 w-5 ml-0.5" />
                    </span>
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                        <Star size={12} className="fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Sparkles className="h-3 w-3 text-primary shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-muted text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-2 pt-4 border-t border-border">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => project.demoUrl === "#" && e.preventDefault()}
                      className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        project.demoUrl === "#"
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      <Eye size={15} />
                      {project.demoUrl === "#" ? "Coming soon" : "Live demo"}
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => project.githubUrl === "#" && e.preventDefault()}
                      className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium border transition-colors ${
                        project.githubUrl === "#"
                          ? "bg-muted text-muted-foreground cursor-not-allowed border-border"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <Github size={15} />
                      Code
                    </a>
                  </div>
                </div>
                <div className={`h-1 bg-linear-to-r ${project.accentColor}`} />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="cursor-pointer cosmic-button"
            >
              {showAll ? (
                <>
                  Show less
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  View more work
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}

        <div className="mt-16 bg-card border border-border rounded-3xl p-8 md:p-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-medium mb-5">
            <Zap className="h-3.5 w-3.5" />
            Next project
          </div>
          <h3 className="text-2xl md:text-3xl font-serif italic mb-3">
            Have something in mind?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            I&apos;m available for full-stack product work, frontend leadership, and focused builds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="#contact" className="cosmic-button">
              Start a conversation
              <ArrowRight size={16} />
            </a>
            <a
              href="https://github.com/tomas0502"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="relative bg-card rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-border text-left">
                <div>
                  <h3 className="text-lg font-semibold">{selectedVideo.title}</h3>
                  <p className="text-muted-foreground text-sm">{selectedVideo.category}</p>
                </div>
                <button
                  onClick={handleCloseVideo}
                  className="cursor-pointer p-2 rounded-full hover:bg-muted"
                  aria-label="Close demo"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={selectedVideo.video}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onEnded={handleCloseVideo}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
