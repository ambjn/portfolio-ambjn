import { motion } from "framer-motion";
import { workExperience } from "../data/content";

export default function Work() {
  return (
    <section id="work" className="py-14">
      <motion.h2
        className="text-xl sm:text-2xl font-semibold mb-8 sm:mb-12 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="w-8 h-px bg-white/20" />
        Work Experience
      </motion.h2>

      <div className="relative border-l border-white/10 ml-3 space-y-12">
        {workExperience.map((job, index) => (
          <motion.div
            key={index}
            className="relative pl-8 sm:pl-12 group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-600 group-hover:bg-white group-hover:border-white transition-colors duration-300" />

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
              <h3 className="text-lg font-medium text-white group-hover:text-blue-200 transition-colors">
                {job.company}
              </h3>
              <span className="text-sm text-neutral-500 font-mono">
                {job.period}
              </span>
            </div>

            <h4 className="text-neutral-400 font-medium mb-3">{job.role}</h4>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">
              {job.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
