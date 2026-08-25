import { useEffect, useId, useRef, useState } from "react";
import { projects, type Project, type ProjectLinks } from "../data/content";

const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

const LINK_LABELS: Record<keyof ProjectLinks, string> = {
  github: "GitHub",
  appStore: "App Store",
  testflight: "TestFlight",
  website: "Website",
  npm: "npm",
};

const ProjectLinks = ({ links, size = "md" }: { links?: ProjectLinks; size?: "sm" | "md" }) => {
  if (!links) return null;
  const entries = (Object.entries(links) as [keyof ProjectLinks, string | undefined][]).filter(
    (entry): entry is [keyof ProjectLinks, string] => Boolean(entry[1]),
  );
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
          {LINK_LABELS[key]} <ArrowUpRight className={size === "sm" ? "size-3" : "size-4"} />
        </a>
      ))}
    </div>
  );
};

const featuredProjects = projects.filter((project) => project.featured);
const regularProjects = projects.filter((project) => !project.featured);

const FeaturedShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const tabListId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const active = featuredProjects[activeIndex];

  useEffect(() => {
    if (!selectedImage) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedImage]);

  const selectAdjacentTab = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div id={tabListId} role="tablist" aria-label="Featured projects" className="flex snap-x snap-mandatory overflow-x-auto border-b border-white/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featuredProjects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActiveIndex(i)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") selectAdjacentTab(1);
                if (event.key === "ArrowLeft") selectAdjacentTab(-1);
              }}
              role="tab"
              aria-selected={i === activeIndex}
              aria-controls={`${tabListId}-panel`}
              tabIndex={i === activeIndex ? 0 : -1}
              className={`relative min-h-12 snap-start px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 sm:px-5 ${
                i === activeIndex ? "text-white" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {p.title}
              {i === activeIndex && <span className="absolute right-0 bottom-0 left-0 h-px bg-white" />}
            </button>
          ))}
        </div>

          <div
            id={`${tabListId}-panel`}
            role="tabpanel"
            className="grid grid-cols-1 items-center gap-6 p-5 sm:p-7 md:grid-cols-2 md:gap-8 md:p-10"
          >
            <div className="flex flex-col justify-center items-start">
              <h3 className="mb-3 bg-linear-to-r from-white to-white/60 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-4xl">
                {active.title}
              </h3>
              <p className="text-base text-neutral-400 leading-relaxed whitespace-pre-line mb-7">
                {active.description}
              </p>
              <ProjectLinks links={active.links} />
            </div>

            <div className="relative flex h-55 w-full snap-x snap-mandatory items-center gap-3 overflow-x-auto [scrollbar-width:none] sm:h-65 [&::-webkit-scrollbar]:hidden">
              {(active.images ?? []).map((img, idx) => (
                <button
                  type="button"
                  key={img}
                  className="h-full max-w-[85vw] shrink-0 snap-center cursor-zoom-in rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:max-w-none"
                  onClick={() => setSelectedImage(img)}
                  aria-label={`Open ${active.title} screenshot ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${active.title} screenshot ${idx + 1}`}
                    className="h-full max-w-full rounded-xl border border-white/10 bg-black/20 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
      </div>

      {selectedImage && (
          <div
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedImage(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Project screenshot preview"
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-4 md:p-10"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 min-h-11 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:top-4 sm:right-4"
            >
              Close <span aria-hidden="true">×</span>
            </button>
            <img
              src={selectedImage}
              alt={`${active.title} project screenshot`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
            />
          </div>
      )}
    </>
  );
};

const RegularProject = ({ project }: { project: Project }) => (
  <article
    className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-6 sm:px-6 sm:py-7"
  >
    <h3 className="text-xl font-semibold">{project.title}</h3>
    <p className="text-neutral-400 leading-relaxed text-sm whitespace-pre-line">
      {project.description}
    </p>
    <ProjectLinks links={project.links} size="sm" />
  </article>
);

export default function Projects() {
  return (
    <section id="projects" className="pt-16 pb-8 sm:pt-20 sm:pb-10">
      <h2
        className="mb-8 flex items-center gap-3 text-xl font-semibold sm:mb-10 sm:text-2xl"
      >
        <span className="h-px w-8 bg-white/20" />
        Featured Work ☆
      </h2>

      <div className="flex flex-col gap-6">
        <FeaturedShowcase />

        {regularProjects.length > 0 && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {regularProjects.map((project) => (
              <RegularProject key={project.title} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
