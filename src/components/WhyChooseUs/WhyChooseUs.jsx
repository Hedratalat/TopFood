import { Store, BadgeCheck, Truck, Handshake, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function WhyChooseUs() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const features = [
    {
      icon: <Store size={26} />,
      title: t("whyUs.feature1.title"),
      desc: t("whyUs.feature1.desc"),
    },
    {
      icon: <BadgeCheck size={26} />,
      title: t("whyUs.feature2.title"),
      desc: t("whyUs.feature2.desc"),
    },
    {
      icon: <Truck size={26} />,
      title: t("whyUs.feature3.title"),
      desc: t("whyUs.feature3.desc"),
    },
    {
      icon: <Handshake size={26} />,
      title: t("whyUs.feature4.title"),
      desc: t("whyUs.feature4.desc"),
    },
    {
      icon: <Headphones size={26} />,
      title: t("whyUs.feature5.title"),
      desc: t("whyUs.feature5.desc"),
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-accent-light font-hacen overflow-hidden "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-20"
        >
          <h2
            className={`font-bold text-primary-dark mb-6 ${
              isArabic ? "text-4xl md:text-5xl" : "text-4xl md:text-5xl"
            }`}
          >
            {t("whyUs.title")}
          </h2>

          <p
            className={`text-accent-dark max-w-3xl mx-auto ${
              isArabic ? "text-2xl" : "text-lg"
            }`}
          >
            {t("whyUs.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features */}
          <div className="space-y-5">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-primary-light/20"
              >
                <div className="text-primary mt-1">{item.icon}</div>

                <div>
                  <h3
                    className={`font-bold mb-2 text-primary-dark ${
                      isArabic ? "text-xl" : "text-lg"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-accent-dark leading-relaxed ${
                      isArabic ? "text-lg" : "text-base"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <img
              src="/public/Logo1.png"
              alt="Restaurant Supply"
              className="rounded-3xl shadow-2xl w-full object-cover border-4 border-primary-light"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
