import { ShieldCheck, FolderOpen, Wrench, Cloud } from "lucide-react";

export default function WhyChooseKeepify() {
  const features = [
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: "Avoid Losing Warranty Claims",
      desc: "Never miss a warranty deadline again with automated smart reminders.",
    },
    {
      icon: <FolderOpen className="h-10 w-10" />,
      title: "All Receipts in One Place",
      desc: "Store and manage all your important purchase bills securely.",
    },
    {
      icon: <Wrench className="h-10 w-10" />,
      title: "Track Repairs & Replacements",
      desc: "Monitor service history and keep track of product repairs.",
    },
    {
      icon: <Cloud className="h-10 w-10" />,
      title: "Lifetime Secure Cloud Storage",
      desc: "Your data stays encrypted, safe, and accessible anytime.",
    },
  ];

  return (
    <section id="about" className="about py-24 bg-[#0d0f12]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-14 text-white tracking-wide">
          Why Choose <span className="text-primary">Keepify?</span>
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="
                p-8 rounded-2xl
                bg-white/5 
                backdrop-blur-xl
                border border-white/10
                shadow-[0_0_20px_rgba(0,0,0,0.5)]
                hover:border-primary/40
                hover:shadow-[0_0_25px_rgba(32,150,255,0.5)]
                transition-all duration-300
              "
            >
              <div className="flex justify-center mb-6 text-primary">
                {item.icon}
              </div>

              <h3 className="font-semibold text-xl mb-3 text-white">
                {item.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
