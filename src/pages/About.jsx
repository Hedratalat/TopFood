import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Target, Rocket, Users, Award } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function About() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const stats = [
    {
      icon: <Award size={28} />,
      number: "5+",
      label: t("stats.yearsExperience"),
    },
    { icon: <Users size={28} />, number: "50+", label: t("stats.clients") },
    { icon: <Target size={28} />, number: "100+", label: t("stats.products") },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen font-hacen">
        {/* ───── Hero ───── */}
        <div className="relative min-h-[520px] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/cover2.jfif')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 w-full py-20">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="inline-block border border-primary/60 bg-primary/20 text-accent-light text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase backdrop-blur-sm"
              >
                {t("stats.since")} 2020
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className={`font-bold text-white mb-4 leading-tight drop-shadow-lg ${
                  isArabic ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"
                }`}
              >
                {t("about.title")}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                className={`text-white/80 leading-relaxed drop-shadow ${
                  isArabic ? "text-xl" : "text-lg"
                }`}
              >
                {t("about.subtitle")}
              </motion.p>
            </div>
          </div>
        </div>

        {/* ───── Stats - كاردات منفصلة فوق الـ intro ───── */}
        <div className="bg-accent-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-4 -mt-3 relative z-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="bg-white rounded-2xl px-6 py-5 shadow-lg border-b-4 border-primary flex flex-col items-center gap-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-primary">{stat.icon}</div>
                  <div className="text-primary-dark font-bold text-3xl leading-none">
                    {stat.number}
                  </div>
                  <div className="text-accent-dark/70 text-sm text-center">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ───── Intro ───── */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <p
                className={`text-accent-dark leading-relaxed mb-4 ${isArabic ? "text-xl" : "text-lg"}`}
                dir={isArabic ? "rtl" : "ltr"}
              >
                {t("about.intro")}
              </p>
              <p
                className={`text-accent-dark leading-relaxed ${isArabic ? "text-xl" : "text-lg"}`}
                dir={isArabic ? "rtl" : "ltr"}
              >
                {t("about.description")}
              </p>
            </motion.div>

            {/* ───── Vision & Mission ───── */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 border border-gray-100"
              >
                <div className="h-2 bg-gradient-to-r from-primary-dark via-primary to-primary-light" />

                <div className="p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary p-3 rounded-xl">
                      <Target size={28} />
                    </div>
                    <h3
                      className={`font-bold text-primary-dark ${isArabic ? "text-2xl" : "text-xl"}`}
                    >
                      {t("about.visionTitle")}
                    </h3>
                  </div>

                  <div className="w-12 h-0.5 bg-primary rounded-full" />

                  <p
                    className={`text-accent-dark/80 leading-relaxed ${isArabic ? "text-lg" : "text-base"}`}
                    dir={isArabic ? "rtl" : "ltr"}
                  >
                    {t("about.vision")}
                  </p>
                  <p
                    className={`text-accent-dark/80 leading-relaxed ${isArabic ? "text-lg" : "text-base"}`}
                    dir={isArabic ? "rtl" : "ltr"}
                  >
                    {t("about.partner")}
                  </p>
                </div>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 border border-gray-100"
              >
                <div className="h-2 bg-gradient-to-r from-primary-dark via-primary to-primary-light" />

                <div className="p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary p-3 rounded-xl">
                      <Rocket size={28} />
                    </div>
                    <h3
                      className={`font-bold text-primary-dark  ${isArabic ? "text-2xl" : "text-xl"}`}
                    >
                      {t("about.missionTitle")}
                    </h3>
                  </div>

                  <div className="w-12 h-0.5 bg-primary rounded-full" />

                  <p
                    className={`text-accent-dark/80 leading-relaxed ${isArabic ? "text-lg" : "text-base"}`}
                    dir={isArabic ? "rtl" : "ltr"}
                  >
                    {t("about.mission")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
