import { motion } from "framer-motion";
import { personalInfo } from "../data/content";

export default function Bio() {
  return (
    <motion.section
      id="about"
      className="pt-10 sm:pt-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6 bg-clip-text text-transparent bg-linear-to-b from-white via-white/90 to-white/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {personalInfo.name}
        </motion.h1>

        {personalInfo.tagline && (
          <motion.p
            className="text-lg sm:text-xl italic text-neutral-300 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {personalInfo.tagline}
          </motion.p>
        )}

        <motion.p
          className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl whitespace-pre-line"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {personalInfo.bio}
        </motion.p>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-800/20 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </motion.section>
  );
}
