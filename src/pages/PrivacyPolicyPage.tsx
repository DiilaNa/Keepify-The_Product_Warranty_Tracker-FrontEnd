import { NavBarComponent } from "@/components/custom/NavBar";

const sections = [
  {
    title: "Information We Collect",
    body: "We may collect information that you voluntarily provide through contact forms, such as your name and email address.",
  },
  {
    title: "Cookies and Advertising",
    body: "This website may use cookies and third-party services, including Google AdSense, to display advertisements and improve user experience.",
  },
  {
    title: "Third-Party Services",
    body: "Third-party services may collect information in accordance with their own privacy policies.",
  },
  {
    title: "Data Security",
    body: "We take reasonable measures to protect your information, but no method of transmission over the Internet is completely secure.",
  },
  {
    title: "Contact",
    body: "If you have any questions about this Privacy Policy, please contact us through the Contact page.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col relative overflow-hidden">
      <NavBarComponent />

      <div className="space-bg">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <main className="relative z-10 flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                Privacy Policy
              </p>
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                Privacy Policy
              </h1>
              <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                Last Updated: June 20, 2026
              </p>
              <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                This website is operated by Dilan
                Liyanaarachchi.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:gap-5">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 transition-transform duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-slate-950/70"
                >
                  <h2 className="text-lg font-semibold text-cyan-200 sm:text-xl">
                    {section.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
