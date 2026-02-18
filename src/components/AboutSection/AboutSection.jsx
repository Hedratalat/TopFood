import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Target, Rocket, Users, Award } from "lucide-react";

export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const stats = [
    {
      icon: <Award size={32} />,
      number: "5+",
      label: t("stats.yearsExperience"),
    },
    {
      icon: <Users size={32} />,
      number: "50+",
      label: t("stats.clients"),
    },
    {
      icon: <Target size={32} />,
      number: "100+",
      label: t("stats.products"),
    },
  ];

  return (
    <section
      id="about"
      className="py-16 bg-[#fafcfb]  font-hacen overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2
            className={`font-bold text-primary-dark mb-6 ${
              isArabic ? "text-4xl md:text-5xl" : "text-4xl md:text-5xl"
            }`}
          >
            {t("about.title")}
          </h2>
          <p
            className={`text-accent-dark max-w-2xl mx-auto ${
              isArabic ? "text-2xl" : "text-lg"
            }`}
          >
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-4 border border-primary-light/20">
              <img
                src="/public/Logo1.png"
                alt="Top Food"
                className="w-full h-[400px] object-cover rounded-2xl"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-3 left-8 bg-primary text-white px-6 py-3 rounded-xl shadow-lg font-bold text-lg">
                {t("stats.since")} 2020
              </div>
            </div>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <p
              className={`text-accent-dark leading-relaxed ${
                isArabic ? "text-xl" : "text-lg"
              }`}
              dir={isArabic ? "rtl" : "ltr"}
              style={{ unicodeBidi: "plaintext" }}
            >
              {t("about.intro")}
            </p>
            <p
              className={`text-accent-dark leading-relaxed ${
                isArabic ? "text-xl" : "text-lg"
              }`}
              dir={isArabic ? "rtl" : "ltr"}
              style={{ unicodeBidi: "plaintext" }}
            >
              {t("about.description")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-accent-light rounded-xl border-2 border-primary-light/30 hover:border-primary transition-all"
                >
                  <div className="text-primary flex justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="font-bold text-2xl text-primary-dark mb-1">
                    {stat.number}
                  </div>
                  <div
                    className={`text-accent-dark font-semibold ${
                      isArabic ? "text-sm" : "text-xs"
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission - New Design */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white p-8 md:p-12
           rounded-3xl shadow-lg border border-primary-light/20 hover:shadow-2xl transition-all duration-300"
        >
          <div className="space-y-6">
            {/* Vision */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="bg-primary text-white p-4 rounded-2xl shadow-lg">
                  <Target size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h3
                  className={`font-bold text-primary-dark mb-4 ${
                    isArabic ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  }`}
                >
                  {t("about.visionTitle")}
                </h3>
                <p
                  className={`text-accent-dark leading-relaxed ${
                    isArabic ? "text-lg" : "text-base"
                  }`}
                  dir={isArabic ? "rtl" : "ltr"}
                  style={{ unicodeBidi: "plaintext" }}
                >
                  {t("about.vision")}
                </p>
                <p
                  className={`text-accent-dark leading-relaxed mt-3 ${
                    isArabic ? "text-lg" : "text-base"
                  }`}
                  dir={isArabic ? "rtl" : "ltr"}
                  style={{ unicodeBidi: "plaintext" }}
                >
                  {t("about.partner")}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-primary-light/20"></div>

            {/* Mission */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="bg-primary text-white p-4 rounded-2xl shadow-lg">
                  <Rocket size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h3
                  className={`font-bold text-primary-dark mb-4 ${
                    isArabic ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  }`}
                >
                  {t("about.missionTitle")}
                </h3>
                <p
                  className={`text-accent-dark leading-relaxed ${
                    isArabic ? "text-lg" : "text-base"
                  }`}
                  dir={isArabic ? "rtl" : "ltr"}
                  style={{ unicodeBidi: "plaintext" }}
                >
                  {t("about.mission")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
