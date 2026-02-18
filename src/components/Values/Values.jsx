import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Award, ShieldCheck, Truck, Handshake } from "lucide-react";

export default function Values() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const values = [
    {
      icon: <Award size={32} />,
      title: t("values.quality"),
    },
    {
      icon: <ShieldCheck size={32} />,
      title: t("values.transparency"),
    },
    {
      icon: <Truck size={32} />,
      title: t("values.fastSupply"),
    },
    {
      icon: <Handshake size={32} />,
      title: t("values.longRelations"),
    },
  ];

  return (
    <section
      id="values"
      className="py-16  bg-[#fafcfb] font-hacen overflow-hidden"
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
          <h2 className="font-bold text-primary-dark text-4xl md:text-5xl mb-6">
            {t("values.title")}
          </h2>

          <p
            className={`text-accent-dark max-w-2xl mx-auto ${
              isArabic ? "text-2xl" : "text-lg"
            }`}
          >
            {t("values.subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-primary-light/20 hover:shadow-2xl transition-all duration-300 text-center"
            >
              <div className="bg-primary text-white w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-4 shadow-md">
                {item.icon}
              </div>

              <h3
                className={`font-bold text-primary-dark ${
                  isArabic ? "text-xl" : "text-lg"
                }`}
              >
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
