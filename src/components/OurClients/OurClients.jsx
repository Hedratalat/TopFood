import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { db } from "../../firebase";

export default function OurClients() {
  const [showAll, setShowAll] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(12);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(8);
      } else {
        setItemsPerView(6);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [clients, setClients] = useState([]);

  const clientsRef = collection(db, "Clients");

  useEffect(() => {
    const unsubscribe = onSnapshot(clientsRef, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

      setClients(data);
    });

    return () => unsubscribe();
  }, []);

  const visibleClients = showAll ? clients : clients.slice(0, itemsPerView);

  return (
    <section className="py-24   bg-[#fafcfb]  font-hacen overflow-hidden">
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
            {t("clients.title")}
          </h2>

          <p
            className={`text-accent-dark max-w-3xl mx-auto ${
              isArabic ? "text-2xl" : "text-lg"
            }`}
          >
            {t("clients.description")}
          </p>
        </motion.div>

        {/* Clients Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {visibleClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center justify-center group"
            >
              <div
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full
               flex items-center justify-center"
              >
                {client.image && (
                  <img
                    src={client.image}
                    alt="client"
                    className="h-28 object-contain"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {clients.length > itemsPerView && (
          <div className="text-center mt-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-primary hover:bg-primary-dark text-white px-10 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg"
            >
              {showAll ? t("clients.showLess") : t("clients.showMore")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
