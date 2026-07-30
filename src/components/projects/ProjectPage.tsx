import { useParams, useNavigate } from "react-router-dom";
import { projectData } from "./project.data";
import { usePageMeta } from "@/hooks/usePageMeta";

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll reset is handled globally by <ScrollToTop /> in main.tsx.
  const project = projectData.find((p) => p.slug === slug);

  usePageMeta({
    title: project
      ? `${project.title} | Levan Mosiashvili`
      : "Project not found | Levan Mosiashvili",
    description: project?.description ?? "Frontend Developer Portfolio of Levan Mosiashvili",
    path: `/projects/${slug ?? ""}`,
  });

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-2xl font-semibold">Project not found.</p>
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-[#d8a013] text-black font-semibold rounded-sm cursor-pointer">
          Back to Home
        </button>
      </div>
    );
  }

  const { review } = project;

  return (
    <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-5 py-10 lg:p-10 flex flex-col gap-12">

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 w-fit text-lg 2xl:text-xl font-semibold text-[#25282B]/50 hover:text-[#25282B] duration-200 cursor-pointer group"
      >
        <span className="flex items-center justify-center w-10 h-10 2xl:w-12 2xl:h-12 rounded-full border-2 border-[#25282B]/20 group-hover:border-[#25282B]/50 duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 2xl:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </span>
        Back to Projects
      </button>

      {/* Note callout */}
      {review?.note && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-sm border border-[#d8a013]/40 bg-[#d8a013]/10">
          <span className="text-[#d8a013] font-bold text-sm mt-0.5 shrink-0">Note:</span>
          <p className="text-sm 2xl:text-base text-[#25282B]/80">{review.note}</p>
        </div>
      )}

      {/* Hero + info side by side */}
      <div className="flex flex-col sm:flex-row gap-8 2xl:gap-12">
        <picture className="w-full sm:w-1/2 flex-shrink-0">
          {project.imageWebp && <source srcSet={project.imageWebp} type="image/webp" />}
          <img
            src={project.image}
            alt={project.title}
            className="w-full max-h-72 2xl:max-h-96 object-cover rounded-sm"
          />
        </picture>

        <div className="flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-extrabold text-4xl sm:text-5xl 2xl:text-6xl leading-tight">
              {project.title}
            </h1>
            <p className="text-base 2xl:text-lg leading-relaxed text-[#25282B]/80">
              {review ? review.overview : project.details}
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <a href={project.webLink} target="_blank" rel="noopener noreferrer"
              className="text-sm 2xl:text-base font-semibold px-4 py-2 rounded-sm bg-[#d8a013] text-black hover:brightness-110 duration-200">
              Live Site
            </a>
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm 2xl:text-base font-semibold px-4 py-2 rounded-sm border border-[#25282B]/30 text-[#25282B]/70 hover:text-[#25282B] hover:border-[#25282B]/60 duration-200">
                <svg className="w-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_iconCarrier"><g stroke="none" strokeWidth="1" fillRule="evenodd"><g transform="translate(-140,-7559)" fill="currentColor"><g transform="translate(56,160)"><path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" /></g></g></g></g>
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <Section title="Tech Stack">
        {review ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm 2xl:text-base border-collapse">
              <thead>
                <tr className="bg-[#25282B] text-white">
                  <th className="text-start px-4 py-3 font-semibold w-1/3">Layer</th>
                  <th className="text-start px-4 py-3 font-semibold">Technology</th>
                </tr>
              </thead>
              <tbody>
                {review.techStack.map((row, i) => (
                  <tr key={row.layer} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f5f5]"}>
                    <td className="px-4 py-2.5 font-medium text-[#25282B]/70">{row.layer}</td>
                    <td className="px-4 py-2.5 text-[#25282B]">{row.technology}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {project.techstack.split(", ").map((tech) => (
              <span key={tech} className="text-sm 2xl:text-base font-semibold px-3 py-1.5 rounded-sm bg-[#d8a013] text-black">
                {tech}
              </span>
            ))}
          </div>
        )}
      </Section>

      {/* Pages */}
      {review && (
        <Section title="Pages">
          <div className="flex flex-col gap-4">
            {review.pages.map((page) => (
              <div key={page.name} className="border-l-4 border-[#d8a013] pl-5 flex flex-col gap-2">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-semibold text-lg 2xl:text-xl">{page.name}</h3>
                  <span className="text-xs 2xl:text-sm font-mono text-[#25282B]/50">{page.path}</span>
                </div>
                <ul className="flex flex-col gap-1">
                  {page.features.map((f) => (
                    <li key={f} className="text-sm 2xl:text-base text-[#25282B]/70 flex gap-2">
                      <span className="text-[#d8a013] mt-0.5">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Architecture */}
      {review && (
        <Section title="Architecture">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 2xl:gap-7">
            {review.architecture.map((item) => (
              <div key={item.title} className="flex flex-col gap-2 p-5 2xl:p-6 bg-[#25282B] rounded-sm border-l-4 border-[#d8a013]">
                <h3 className="font-semibold text-base 2xl:text-lg text-white">{item.title}</h3>
                <p className="text-sm 2xl:text-base text-white/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* DB Tables */}
      {review?.dbTables && (
        <Section title="Database Tables">
          <div className="overflow-x-auto">
            <table className="w-full text-sm 2xl:text-base border-collapse">
              <thead>
                <tr className="bg-[#25282B] text-white">
                  <th className="text-start px-4 py-3 font-semibold w-1/4">Table</th>
                  <th className="text-start px-4 py-3 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {review.dbTables.map((row, i) => (
                  <tr key={row.table} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f5f5]"}>
                    <td className="px-4 py-2.5 font-mono font-medium text-[#d8a013]">{row.table}</td>
                    <td className="px-4 py-2.5 text-[#25282B]/80">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* i18n */}
      {review?.i18n && (
        <Section title="Internationalization">
          <p className="text-base 2xl:text-lg leading-relaxed text-[#25282B]/80 max-w-4xl">{review.i18n.overview}</p>
          {review.i18n.namespaces && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm 2xl:text-base border-collapse">
                <thead>
                  <tr className="bg-[#25282B] text-white">
                    <th className="text-start px-4 py-3 font-semibold w-1/4">Namespace</th>
                    <th className="text-start px-4 py-3 font-semibold">Page / Feature</th>
                  </tr>
                </thead>
                <tbody>
                  {review.i18n.namespaces.map((row, i) => (
                    <tr key={row.namespace} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f5f5]"}>
                      <td className="px-4 py-2.5 font-mono font-medium text-[#d8a013]">{row.namespace}</td>
                      <td className="px-4 py-2.5 text-[#25282B]/80">{row.page}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      )}

      {/* Deployment */}
      {review?.deployment && (
        <Section title="Deployment">
          <ul className="flex flex-col gap-3">
            {review.deployment.map((item) => (
              <li key={item} className="flex gap-2 text-sm 2xl:text-base text-[#25282B]/80">
                <span className="text-[#d8a013] font-bold mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* UI Patterns */}
      {review?.uiPatterns && (
        <Section title="Key UI Patterns">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {review.uiPatterns.map((pattern) => (
              <li key={pattern} className="flex gap-2 text-sm 2xl:text-base text-[#25282B]/80">
                <span className="text-[#d8a013] font-bold mt-0.5">•</span>
                {pattern}
              </li>
            ))}
          </ul>
        </Section>
      )}

    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-5">
    <h2 className="font-extrabold text-2xl sm:text-3xl 2xl:text-4xl border-b-3 border-[#d8a013] w-fit pb-1">
      {title}
    </h2>
    {children}
  </div>
);

export default ProjectPage;
