import { motion } from "motion/react";

export function TrustStrip() {
  const logos = [
    { name: "Airbnb", logo: "airbnb" },
    { name: "Amazon", logo: "amazon" },
    { name: "FedEx", logo: "fedex" },
    { name: "Google", logo: "google" },
    { name: "Microsoft", logo: "microsoft" },
    { name: "Slack", logo: "slack" },
  ];

  return (
    <section className="relative py-12 bg-white/60 backdrop-blur-md border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Label */}
          <div className="shrink-0 text-center md:text-left">
            <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">
              Flexibility for Companies
            </p>
          </div>

          {/* Logo List */}
          <div className="w-full flex flex-wrap items-center justify-center md:justify-end gap-8 md:gap-12 lg:gap-16">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="cursor-pointer text-slate-500 font-extrabold text-xl md:text-2xl select-none tracking-tight flex items-center gap-1.5 transition-all duration-300"
              >
                {logo.name === "Google" && (
                  <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent opacity-80 hover:opacity-100">
                    Google
                  </span>
                )}
                {logo.name === "Microsoft" && (
                  <span className="text-[#737373] hover:text-[#f25022] flex items-center gap-1">
                    <span className="grid grid-cols-2 gap-0.5 w-4 h-4 shrink-0">
                      <span className="bg-[#f25022] w-1.5 h-1.5" />
                      <span className="bg-[#7fba00] w-1.5 h-1.5" />
                      <span className="bg-[#00a4ef] w-1.5 h-1.5" />
                      <span className="bg-[#ffb900] w-1.5 h-1.5" />
                    </span>
                    <span className="font-semibold text-lg tracking-normal">Microsoft</span>
                  </span>
                )}
                {logo.name === "Airbnb" && (
                  <span className="text-[#FF5A5F] flex items-center gap-1 font-semibold text-lg tracking-normal">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 32 32">
                      <path d="M16 1c-2.007 0-3.612 1.48-3.957 3.447L1.134 23.36C.422 24.633 0 26.068 0 27.5 0 29.986 2.014 32 4.5 32c1.785 0 3.393-.974 4.195-2.523L16 13.91l7.305 15.567C24.107 31.026 25.715 32 27.5 32c2.486 0 4.5-2.014 4.5-4.5 0-1.432-.422-2.867-1.134-4.14L20.04 4.417C19.684 2.463 18.04 1 16 1zm0 2c1.233 0 2.274.954 2.457 2.195l10.876 18.91C29.67 24.78 30 25.898 30 27.5c0 1.383-1.117 2.5-2.5 2.5-1.023 0-1.928-.553-2.39-1.436L16 10.74 6.89 28.564C6.428 29.447 5.523 30 4.5 30 3.117 30 2 28.883 2 27.5c0-1.602.33-2.72.667-3.395l10.876-18.91C13.726 3.954 14.767 3 16 3zm0 8.243c.966 0 1.75.784 1.75 1.75s-.784 1.75-1.75 1.75-1.75-.784-1.75-1.75.784-1.75 1.75-1.75z" />
                    </svg>
                    <span>airbnb</span>
                  </span>
                )}
                {logo.name === "Amazon" && (
                  <span className="text-[#111111] hover:text-[#FF9900] font-bold text-lg tracking-tight">
                    amazon
                  </span>
                )}
                {logo.name === "FedEx" && (
                  <span className="text-[#4D148C] font-extrabold text-xl italic tracking-tighter">
                    Fed<span className="text-[#FF6600]">Ex</span>
                  </span>
                )}
                {logo.name === "Slack" && (
                  <span className="text-slate-800 hover:text-[#4A154B] flex items-center gap-1 font-bold text-lg">
                    <span className="w-4 h-4 rounded bg-[#4A154B] inline-block shrink-0" />
                    <span>slack</span>
                  </span>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
