import { PageHeader } from "@/components/PageHeader";
import { getProjects } from "@/lib/content";

export const metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-16 lg:px-0">
      <PageHeader
        title="Projects"
        description="Active collaborations, prototypes, and data resources from the Aethersaga AI lab."
      />

      <section className="space-y-6 border-t border-slate-200 pt-10 dark:border-slate-800">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Featured Projects</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Brief snapshots from the lab highlighting ongoing storytelling and health-tech efforts.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60"
            >
              {project.data.img ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-slate-200">
                  <img
                    src={`/${project.data.img?.replace(/^\//, "")}`}
                    alt={project.data.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
              <div className="space-y-1">
                <h3 className="font-medium text-slate-900">{project.data.title}</h3>
                {project.data.description ? (
                  <p className="text-sm text-slate-600">{project.data.description}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t border-slate-200 pt-10 dark:border-slate-800">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Datasets</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Coming soon.</p>
      </section>
    </div>
  );
}
