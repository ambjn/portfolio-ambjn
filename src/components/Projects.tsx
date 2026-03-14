import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/content";

const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

const LINK_LABELS: Record<string, string> = {
  github: "GitHub",
  appStore: "App Store",
  testflight: "TestFlight",
  website: "Website",
};

const ProjectLinks = ({ links, size = "md" }: { links?: Record<string, string>, size?: "sm" | "md" }) => {
  if (!links) return null;
  const entries = Object.entries(links).filter(([, href]) => !!href);
  if (!entries.length) return null;

  const base = size === "sm"
    ? "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors"
    : "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-colors";

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(([key, href]) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} bg-white/10 hover:bg-white/20 text-white border-white/10 hover:border-white/20`}
        >
          {LINK_LABELS[key] ?? key} <ArrowUpRight className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
        </a>
      ))}
    </div>
  );
};

const featuredProjects = projects.filter((p: any) => p.featured);
const regularProjects = projects.filter((p: any) => !p.featured);

const FeaturedShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const active = featuredProjects[activeIndex];

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar">
          {featuredProjects.map((p: any, i: number) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                i === activeIndex ? "text-white" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {p.title}
              {i === activeIndex && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 p-7 md:p-10 items-center"
          >
            {/* Info */}
            <div className="flex flex-col justify-center items-start">
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/60 mb-3">
                {active.title}
              </h3>
              <p className="text-base text-neutral-400 leading-relaxed whitespace-pre-line mb-7">
                {active.description}
              </p>
              <ProjectLinks links={active.links} />
            </div>

            {/* Images */}
            <div className="relative w-full h-[260px] flex gap-3 overflow-x-auto no-scrollbar items-center">
              {(active.images || []).map((img: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  className="h-full shrink-0 cursor-zoom-in"
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={img}
                    alt={`${active.title} screenshot ${idx + 1}`}
                    className="h-full w-auto object-contain rounded-xl border border-white/10 bg-black/20"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out"
          >
            <motion.img
              src={selectedImage}
              alt="Project screenshot"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const RegularProject = ({ project, index }: { project: any, index: number }) => (
  <motion.div
    className="group relative px-6 py-7 flex flex-col gap-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <h3 className="text-xl font-semibold">{project.title}</h3>
    <p className="text-neutral-400 leading-relaxed text-sm whitespace-pre-line">
      {project.description}
    </p>
    <ProjectLinks links={project.links} size="sm" />
  </motion.div>
);

export default function Projects() {
  return (
    <section id="projects" className="pt-20 pb-10">
      <motion.h2
        className="text-xl sm:text-2xl font-semibold mb-8 sm:mb-10 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="w-8 h-px bg-white/20" />
        Featured Work ☆
      </motion.h2>

      <div className="flex flex-col gap-6">
        <FeaturedShowcase />

        {regularProjects.length > 0 && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {regularProjects.map((project: any, index: number) => (
              <RegularProject key={index} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
