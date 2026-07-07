import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Join Aethersaga AI",
  description: "Be part of cutting-edge research that shapes the future of artificial intelligence and machine learning.",
};

const APPLICATION_STEPS = [
  {
    title: "Submit Application",
    description: "Send your CV, research statement, and relevant documents to our recruitment team.",
  },
  {
    title: "Initial Review",
    description: "Our faculty review applications and shortlist candidates based on qualifications and fit.",
  },
  {
    title: "Interview Process",
    description: "Selected candidates participate in technical interviews and research discussions.",
  },
  {
    title: "Final Decision",
    description: "Successful candidates receive offers and begin their journey with us.",
  },
];

const BENEFITS = [
  {
    title: "World-Class Research",
    description: "Work alongside leading researchers on cutting-edge projects with global impact.",
  },
  {
    title: "Collaborative Environment",
    description: "Open, supportive culture that encourages innovation and cross-disciplinary collaboration.",
  },
  {
    title: "Growth Opportunities",
    description: "Professional development, conference attendance, and career advancement support.",
  },
];

export default function JoinPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-16 lg:px-0">
      <PageHeader
        title="Join Aethersaga AI"
        description="Be part of cutting-edge research that shapes the future of artificial intelligence and machine learning."
      />

      <section className="grid gap-6 border-t border-slate-200 pt-10 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <p className="leading-relaxed text-slate-600">
            We are scouting bold thinkers, builders, and researchers who care about trustworthy AI. Whether you&apos;re
            interested in designing neuro-symbolic systems, stress testing agents, or bringing responsible AI into
            production workflows, there&apos;s room to grow with us.
          </p>
          <p className="leading-relaxed text-slate-600">
            Applications are reviewed on a rolling basis. Early submissions receive priority so we can match your
            interests with ongoing initiatives.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60">
          <h3 className="font-medium text-slate-900">Ready to Apply?</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Send your application materials to our recruitment team. Include a CV, research statement, and any project
            highlights that showcase your fit.
          </p>
          <a
            href="mailto:aethersaga.ai@gmail.com"
            className="mt-4 inline-block text-sm text-slate-900 underline underline-offset-2 hover:no-underline"
          >
            aethersaga.ai@gmail.com
          </a>
        </div>
      </section>

      <section className="border-t border-slate-200 pt-10">
        <h2 className="text-xl font-semibold text-slate-900">Application Process</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {APPLICATION_STEPS.map((step, index) => (
            <div
              key={step.title}
              className="rounded-xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60"
            >
              <span className="text-sm tabular-nums text-slate-400">{index + 1}.</span>
              <h3 className="mt-1 font-medium text-slate-900">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 pt-10">
        <h2 className="text-xl font-semibold text-slate-900">Why Join Aethersaga AI?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60"
            >
              <h3 className="font-medium text-slate-900">{benefit.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
