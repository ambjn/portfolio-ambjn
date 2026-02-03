import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/content";

const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

const FeaturedProject = ({ project, index }: { project: any, index: number }) => {
  const images = project.images || [];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <motion.div
        className="col-span-1 md:col-span-2 relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 group"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10 items-center">
          <div className="flex flex-col justify-center items-start">
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/60 mb-4">
              {project.title}
            </h3>
            <p className="text-lg text-neutral-400 leading-relaxed whitespace-pre-line mb-8">
              {project.description}
            </p>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10 hover:border-white/20"
            >
              Visit Project <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="relative w-full h-[300px] flex gap-4 overflow-x-auto no-scrollbar items-center mask-linear-to-r">
            {images.length > 0 ? (
              images.map((img: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="h-full shrink-0 cursor-zoom-in"
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="h-full w-auto object-contain rounded-lg border border-white/10 bg-black/20"
                  />
                </motion.div>
              ))
            ) : (
              <div className="w-full h-full bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-xl" />
            )}
          </div>
        </div>
      </motion.div>

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
              alt="Project visualization"
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
  <motion.a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative px-6 py-8 md:px-8 md:py-10 min-h-[250px] flex flex-col justify-between rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div>
      <div className="flex justify-between items-start gap-4 mb-6">
        <h3 className="text-xl md:text-2xl font-semibold group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <div className="shrink-0 p-2 rounded-full bg-white/5 group-hover:bg-white/10 group-hover:rotate-45 transition-all duration-300 text-neutral-400 group-hover:text-white">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
      <p className="text-neutral-400 leading-relaxed text-base whitespace-pre-line">
        {project.description}
      </p>
    </div>
  </motion.a>
);

export default function Projects() {
  return (
    <section id="projects" className="pt-20 pb-10">
      <motion.h2
        className="text-xl sm:text-2xl font-semibold mb-8 sm:mb-12 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="w-8 h-px bg-white/20" />
        Featured Work ☆
      </motion.h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {projects.map((project: any, index) =>
          project.featured ? (
            <FeaturedProject key={index} project={project} index={index} />
          ) : (
            <RegularProject key={index} project={project} index={index} />
          )
        )}
      </div>
    </section>
  );
}
