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
  const allEntries = publications.flatMap((g) => g.entries);
  const selectedPublications = allEntries.filter((e) => e.selected).slice(0, 5);
  const totalPublications = allEntries.length;

  return (
    <div className="w-full">

      {/* ═══ HERO ═══ */}
      <section className="cosmic-hero relative overflow-hidden px-4 py-24 lg:px-0">
        <div className="relative mx-auto flex w-full max-w-5xl flex-col-reverse items-start gap-12 md:flex-row md:items-center">

          {/* ── Text ── */}
          <div className="flex-1 space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
              Research Group · Sister Nivedita University
            </div>

            <div>
              <h1 className="text-6xl font-black leading-none tracking-tight text-slate-900 dark:text-white lg:text-7xl">
                <span className="block">AETHER</span>
                <span className="gradient-text-animated block">SAGA</span>
              </h1>
              <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                AI &nbsp;·&nbsp; Machine Learning &nbsp;·&nbsp; NLP
              </p>
            </div>

            <div className="max-w-md text-[0.9rem] leading-relaxed text-slate-600 dark:text-slate-300 [&_p]:mb-3 last:[&_p]:mb-0">
              <Markdown html={aboutHtml} />
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/publications" className="btn-primary">
                View Research
              </Link>
              <Link href="/people" className="btn-secondary">
                Meet the Team
              </Link>
            </div>
          </div>

          {/* ── Profile Image ── */}
          <div className="relative flex flex-shrink-0 items-center justify-center self-center md:w-80">
            <div className="profile-ring-outer" />
            <div className="profile-ring-inner" />
            {about?.data.profile?.image ? (
              <div className="profile-glow relative z-10 overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/${(about.data.profile.image as string).replace(/^\//, "")}`}
                  alt={about.data.title ?? "AetherSaga"}
                  className="h-60 w-60 object-cover lg:h-72 lg:w-72"
                />
              </div>
            ) : (
              <div className="cosmic-placeholder-img relative z-10 flex h-60 w-60 items-center justify-center rounded-2xl lg:h-72 lg:w-72">
                <span className="gradient-text text-7xl font-black">AS</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <div className="stat-bar border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="mx-auto flex w-full max-w-5xl divide-x divide-slate-200/50 px-4 dark:divide-slate-800/50 lg:px-0">
          {[
            { label: "Research Areas", value: String(researchItems.length || 6) },
            { label: "Publications",   value: totalPublications > 0 ? `${totalPublications}+` : "10+" },
            { label: "Team Members",   value: "10+" },
            { label: "Since",          value: "2024" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-1 flex-col items-center gap-0.5 px-2 py-4 sm:px-6">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                {stat.value}
              </span>
              <span className="text-center text-[0.65rem] font-semibold uppercase tracking-widest text-slate-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-4 py-20 lg:px-0">

        {/* ── Research Grid ── */}
        {researchItems.length > 0 && (
          <section>
            <SectionHeader eyebrow="What we study" title={researchTitle ?? "Research Focus"} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {researchItems.map((item, i) => (
                <div key={`${item.title}-${i}`} className="research-card group">
                  <span className="research-card-number">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="relative z-10 mt-3 text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="relative z-10 mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── News + Publications ── */}
        <div className="grid gap-14 lg:grid-cols-5">

          {/* News — 2 cols */}
          <section className="lg:col-span-2">
            <SectionHeaderWithLink eyebrow="Latest" title="News" href="/news" />
            {news.length > 0 ? (
              <ul className="mt-6 space-y-3">
                {news.map((item) => (
                  <li key={item.slug} className="news-card">
                    <span className="news-date">
                      {item.data.date
                        ? item.data.date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
                        : item.year}
                    </span>
                    <Markdown html={item.html} className="prose-sm text-slate-600 dark:text-slate-300" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-slate-400">No news yet — check back soon.</p>
            )}
          </section>

          {/* Publications — 3 cols */}
          {selectedPublications.length > 0 && (
            <section className="lg:col-span-3">
              <SectionHeaderWithLink eyebrow="Featured work" title="Publications" href="/publications" />
              <ul className="mt-6 space-y-3">
                {selectedPublications.map((pub) => (
                  <li key={pub.id} className="pub-card">
                    <h3 className="text-sm font-semibold leading-snug text-slate-900 dark:text-white">
                      {pub.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">{pub.authors}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      {pub.year  && <span className="pub-badge pub-badge-year">{pub.year}</span>}
                      {pub.venue && <span className="pub-badge pub-badge-venue">{pub.venue}</span>}
                      {pub.url && (
                        <a
                          href={normalizeUrl(pub.url)}
                          target="_blank"
                          rel="noreferrer"
                          className="pub-link"
                        >
                          Paper →
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

      </div>
    </div>
  );
}

/* ─── Utilities ─── */

function normalizeUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

function parseResearchSection(input: unknown): { title?: string; items: ResearchItem[] } {
  if (!input || typeof input !== "object") return { items: [] };
  const title =
    typeof (input as { title?: unknown }).title === "string"
      ? (input as { title: string }).title
      : undefined;
  const rawItems = Array.isArray((input as { items?: unknown }).items)
    ? (input as { items: unknown[] }).items
    : [];
  const items = rawItems.reduce<ResearchItem[]>((acc, item) => {
    if (!item || typeof item !== "object") return acc;
    const titleValue = (item as { title?: unknown }).title;
    if (typeof titleValue !== "string" || !titleValue.trim()) return acc;
    const descriptionValue = (item as { description?: unknown }).description;
    acc.push({
      title: titleValue,
      description: typeof descriptionValue === "string" ? descriptionValue : undefined,
    });
    return acc;
  }, []);
  return { title, items };
}

/* ─── Section Header Components ─── */

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="space-y-1">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
    </div>
  );
}

function SectionHeaderWithLink({
  eyebrow,
  title,
  href,
}: {
  eyebrow: string;
  title: string;
  href: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="space-y-1">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      </div>
      <Link href={href} className="pub-link mb-1">
        View all →
      </Link>
    </div>
  );
}
