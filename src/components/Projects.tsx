import { motion } from "framer-motion";
import { projects } from "../data/content";

const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export default function Projects() {
  return (
    <section id="projects" className="pt-14">
      <motion.h2
        className="text-2xl font-semibold mb-12 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="w-8 h-px bg-white/20" />
        Featured Work ☆
      </motion.h2>

      <div className="grid gap-6 grid-cols-2">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-12 min-h-[300px] flex flex-col rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-semibold group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300 text-neutral-400 group-hover:text-white">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
            <p className="text-neutral-400 leading-relaxed text-lg">
              {project.description}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
