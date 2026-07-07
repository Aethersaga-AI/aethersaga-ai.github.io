import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { getAboutPage, getNews, getPublications } from "@/lib/content";

interface ResearchItem {
  title: string;
  description?: string;
}

export default async function Home() {
  const about = await getAboutPage();
  const aboutHtml = about?.html ?? "";
  const { title: researchTitle, items: researchItems } = parseResearchSection(
    (about?.data as { research?: unknown })?.research,
  );
  const news = about?.data.announcements?.enabled
    ? await getNews(about.data.announcements.limit ?? 5)
    : [];
  const publications = getPublications();
  const selectedPublications = publications
    .flatMap((group) => group.entries)
    .filter((entry) => entry.selected)
    .slice(0, 5);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-16 lg:px-0">
      <section className="space-y-4">
        {about?.data.subtitle ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {stripHtml(about.data.subtitle)}
          </p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {about?.data.title ?? "About"}
        </h1>
        {aboutHtml ? <Markdown html={aboutHtml} /> : null}
      </section>

      {researchItems.length > 0 ? (
        <section className="border-t border-slate-200 pt-10 dark:border-slate-800">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {researchTitle ?? "Research"}
          </h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {researchItems.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60"
              >
                <dt className="font-medium text-slate-900">{item.title}</dt>
                {item.description ? (
                  <dd className="mt-1 text-sm text-slate-600">{item.description}</dd>
                ) : null}
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section className="border-t border-slate-200 pt-10 dark:border-slate-800">
        <HeaderWithLink title="News" href="/news" />
        {news.length > 0 ? (
          <ul
            className={`mt-6 space-y-5 ${
              about?.data.announcements?.scrollable ? "max-h-80 overflow-y-auto pr-2" : ""
            }`}
          >
            {news.map((item) => (
              <li key={item.slug} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <p className="shrink-0 text-sm text-slate-500 dark:text-slate-400 sm:w-28">
                  {item.data.date ? item.data.date.toLocaleDateString() : item.year}
                </p>
                <Markdown html={item.html} className="prose-sm flex-1" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">No news to showcase yet.</p>
        )}
      </section>
      {selectedPublications.length > 0 ? (
        <section className="border-t border-slate-200 pt-10 dark:border-slate-800">
          <HeaderWithLink title="Selected Publications" href="/publications" />
          <ul className="mt-6 space-y-4">
            {selectedPublications.map((pub) => (
              <li
                key={pub.id}
                className="rounded-xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60"
              >
                <h3 className="font-medium text-slate-900">{pub.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{pub.authors}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-slate-500">
                  {pub.year ? <span>{pub.year}</span> : null}
                  {pub.venue ? <span>{pub.venue}</span> : null}
                  {pub.url ? (
                    <a
                      href={normalizeUrl(pub.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-900 underline underline-offset-2 hover:no-underline dark:text-slate-100"
                    >
                      View
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function stripHtml(input?: string) {
  if (!input) return "";
  return input.replace(/<[^>]+>/g, "").trim();
}

function normalizeUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

function parseResearchSection(input: unknown): { title?: string; items: ResearchItem[] } {
  if (!input || typeof input !== "object") {
    return { items: [] };
  }

  const title = typeof (input as { title?: unknown }).title === "string" ? (input as { title: string }).title : undefined;
  const rawItems = Array.isArray((input as { items?: unknown }).items) ? (input as { items: unknown[] }).items : [];

  const items = rawItems.reduce<ResearchItem[]>((acc, item) => {
    if (!item || typeof item !== "object") {
      return acc;
    }
    const titleValue = (item as { title?: unknown }).title;
    if (typeof titleValue !== "string" || !titleValue.trim()) {
      return acc;
    }
    const descriptionValue = (item as { description?: unknown }).description;
    acc.push({
      title: titleValue,
      description: typeof descriptionValue === "string" ? descriptionValue : undefined,
    });
    return acc;
  }, []);

  return { title, items };
}

interface HeaderWithLinkProps {
  title: string;
  href: string;
}

function HeaderWithLink({ title, href }: HeaderWithLinkProps) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{title}</h2>
      <Link
        href={href}
        className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        View all →
      </Link>
    </div>
  );
}
