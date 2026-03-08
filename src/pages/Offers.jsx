import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { useTranslation } from "react-i18next";
import { Tag, PackageSearch } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function Offers() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Offers"), (snap) => {
      const data = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setOffers(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-accent-light font-hacen"
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Hero */}
        <div className="bg-accent-light py-10 sm:py-14 px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7 }}
            className={`font-bold text-primary mb-3 ${isArabic ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"}`}
          >
            {t("offers.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-accent-dark max-w-2xl mx-auto ${isArabic ? "text-xl" : "text-lg"}`}
          >
            {t("offers.description")}
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16">
          {offers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-28 text-center"
            >
              <div className="bg-white rounded-full p-8 shadow-sm mb-5">
                <PackageSearch size={48} className="text-primary/30" />
              </div>
              <h3
                className={`font-bold text-accent-dark mb-2 ${isArabic ? "text-2xl" : "text-xl"}`}
              >
                {t("offers.noOffers")}
              </h3>
              <p className="text-accent-dark/50">{t("offers.noOffersDesc")}</p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-6">
              {offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 border-b-4 border-b-primary"
                >
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/5] overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {offer.badge && (
                      <div
                        className={`absolute top-4 ${isArabic ? "right-4" : "left-4"}`}
                      >
                        <span className="bg-secondary text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md flex items-center gap-1.5">
                          <Tag size={14} />
                          {offer.badge}
                        </span>
                      </div>
                    )}
                    <div
                      className={`absolute bottom-5 ${isArabic ? "right-5" : "left-5"}`}
                    >
                      {offer.title && (
                        <h3
                          className={`font-bold text-white drop-shadow-lg ${isArabic ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
                        >
                          {offer.title}
                        </h3>
                      )}
                      {offer.subtitle && (
                        <p
                          className={`text-white/80 mt-1 drop-shadow ${isArabic ? "text-base" : "text-sm"}`}
                        >
                          {offer.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
