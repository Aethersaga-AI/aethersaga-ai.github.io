import { PageHeader } from "@/components/PageHeader";
import { Markdown } from "@/components/Markdown";
import { getNews } from "@/lib/content";

export const metadata = {
  title: "News",
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-16 lg:px-0">
      <PageHeader title="News" description="Highlights and announcements." />

      <ul className="divide-y divide-slate-200 border-t border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {news.map((item) => (
          <li key={item.slug} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-4">
            <p className="shrink-0 text-sm text-slate-500 dark:text-slate-400 sm:w-28">
              {item.data.date ? item.data.date.toLocaleDateString() : item.year}
            </p>
            <Markdown html={item.html} className="prose-sm flex-1" />
          </li>
        ))}
      </ul>
    </div>
  );
}
