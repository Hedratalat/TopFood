import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";

export default function ProductsSection() {
  const [showAll, setShowAll] = useState(false);

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productRef = collection(db, "Product");

    const unsubscribe = onSnapshot(productRef, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setProducts(data);
    });

    return () => unsubscribe();
  }, []);

  const visibleProducts = showAll ? products : products.slice(0, 6);

  return (
    <section
      id="products"
      className="py-24 bg-accent-light font-hacen overflow-hidden "
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
            {t("products.title")}
          </h2>

          <p
            className={`text-accent-dark max-w-3xl mx-auto ${
              isArabic ? "text-2xl" : "text-lg"
            }`}
          >
            {t("products.description")}
          </p>
        </motion.div>
        {/* Products Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleProducts.map((prod, index) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative mb-5 overflow-hidden rounded-3xl shadow-xl">
                {/* Category Badge */}
                <div
                  className={`absolute top-5 z-10 ${
                    isArabic ? "right-5" : "left-5"
                  }`}
                >
                  <span
                    className="bg-white/95 backdrop-blur-sm text-primary px-5 py-2 
                    rounded-full text-base font-bold shadow-lg"
                  >
                    {prod.category}
                  </span>
                </div>

                {/* Product Image */}
                {prod.image && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>

              {/* Product Name */}
              <div className="text-center px-2">
                <h3 className="text-2xl font-bold text-primary-dark group-hover:text-primary transition-colors duration-300">
                  {prod.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More / Less Button */}
        {products.length > 6 && (
          <div className="text-center mt-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-primary hover:bg-primary-dark text-white px-10 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg"
            >
              {showAll ? t("products.showLess") : t("products.showMore")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
