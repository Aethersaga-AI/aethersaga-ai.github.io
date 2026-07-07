import { PageHeader } from "@/components/PageHeader";
import { getPublications } from "@/lib/content";

export const metadata = {
  title: "Publications",
};

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12 lg:px-0">
      <PageHeader
        title="Publications"
        description="Selected research outputs and peer-reviewed work."
      />

      <div className="space-y-12">
        {publications.map((group) => (
          <section key={group.year} className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-500 dark:text-slate-400">{group.year}</h2>
            <ol className="space-y-4">
              {group.entries.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60"
                >
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-medium text-slate-900">
                      {entry.title}
                    </h3>
                    {entry.selected ? (
                      <span className="text-xs uppercase tracking-wide text-slate-400">
                        Selected
                      </span>
                    ) : null}
                  </div>
                  {entry.authors ? (
                    <p className="mt-1 text-sm text-slate-600">{entry.authors}</p>
                  ) : null}
                  {entry.venue ? (
                    <p className="mt-1 text-sm text-slate-500">{entry.venue}</p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 text-sm text-slate-500">
                    {entry.url ? (
                      <a
                        href={normalizeLink(entry.url)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-900 underline underline-offset-2 hover:no-underline dark:text-slate-100"
                      >
                        View
                      </a>
                    ) : null}
                    {entry.pdf ? (
                      <a
                        href={normalizeLink(entry.pdf)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-900 underline underline-offset-2 hover:no-underline dark:text-slate-100"
                      >
                        PDF
                      </a>
                    ) : null}
                    {entry.html ? (
                      <a
                        href={normalizeLink(entry.html)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-900 underline underline-offset-2 hover:no-underline dark:text-slate-100"
                      >
                        HTML
                      </a>
                    ) : null}
                  </div>
                  {entry.extra?.abstract ? (
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                      {String(entry.extra.abstract)}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

function normalizeLink(link: string): string {
  if (link.startsWith("http")) return link;
  return link.startsWith("/") ? link : `/${link}`;
}
