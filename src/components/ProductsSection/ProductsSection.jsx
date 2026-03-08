import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";
import { Heart, ImageOff, ArrowLeft, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductsSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    try {
      const localFav = JSON.parse(localStorage.getItem("favorites") || "[]");
      return localFav.reduce(
        (acc, item) => ({
          ...acc,
          [item.id ?? item]: true,
        }),
        {},
      );
    } catch {
      return {};
    }
  });

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

  useEffect(() => {
    const sync = () => {
      try {
        const localFav = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(
          localFav.reduce(
            (acc, item) => ({
              ...acc,
              [item.id ?? item]: true,
            }),
            {},
          ),
        );
      } catch {}
    };
    window.addEventListener("favoritesUpdated", sync);
    return () => window.removeEventListener("favoritesUpdated", sync);
  }, []);

  const toggleFavorite = (e, prod) => {
    e.stopPropagation();
    const currentFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isAlreadyFav = currentFavs.some((f) => f.id === prod.id);

    let newFavs;
    if (isAlreadyFav) {
      newFavs = currentFavs.filter((f) => f.id !== prod.id);
    } else {
      newFavs = [
        ...currentFavs,
        {
          id: prod.id,
          name: prod.name,
          image: prod.image,
          price: prod.price,
          category: prod.category,
        },
      ];
    }

    localStorage.setItem("favorites", JSON.stringify(newFavs));
    window.dispatchEvent(new Event("favoritesUpdated"));

    isAlreadyFav
      ? toast(t("products.removedFav"), { icon: <X size={20} color="red" /> })
      : toast.success(t("products.addedFav"));

    setFavorites(
      newFavs.reduce((acc, item) => ({ ...acc, [item.id]: true }), {}),
    );
  };

  const visibleProducts = products.slice(0, 6);

  return (
    <section
      id="products"
      className="py-24 bg-accent-light font-hacen overflow-hidden"
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
            className={`text-accent-dark max-w-3xl mx-auto ${isArabic ? "text-2xl" : "text-lg"}`}
          >
            {t("products.description")}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleProducts.map((prod, index) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 border-b-4 border-b-primary"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Favorite */}
                <button
                  onClick={(e) => toggleFavorite(e, prod)}
                  className={`absolute top-3 z-20 ${isArabic ? "left-3" : "right-3"}`}
                >
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                      favorites[prod.id]
                        ? "bg-primary"
                        : "bg-white/95 hover:bg-white"
                    }`}
                  >
                    <Heart
                      size={20}
                      className={
                        favorites[prod.id]
                          ? "text-white"
                          : "text-gray-400 group-hover:text-primary transition-colors"
                      }
                      fill={favorites[prod.id] ? "white" : "none"}
                    />
                  </motion.div>
                </button>

                {/* Category Badge */}
                <div
                  className={`absolute top-3 z-10 ${isArabic ? "right-3" : "left-3"}`}
                >
                  <span className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md tracking-wide">
                    {prod.category}
                  </span>
                </div>

                {/* Image */}
                {prod.image ? (
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-accent-light flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-sm">
                      <ImageOff size={36} className="text-primary/50" />
                    </div>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-5 flex justify-between items-center gap-3">
                <h3
                  className={`font-bold text-primary-dark group-hover:text-primary transition-colors duration-300 leading-snug ${isArabic ? "text-xl" : "text-lg"}`}
                >
                  {prod.name}
                </h3>

                {prod.price != null && (
                  <div className="shrink-0 flex items-baseline gap-1.5 bg-primary/10 border border-primary/20 rounded-xl px-3 py-2">
                    <span className="text-primary font-bold text-lg leading-none">
                      {prod.price}
                    </span>
                    <span className="text-primary/60 text-xs font-bold">
                      {t("products.currency") || "EGP"}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse Products Button */}
        {products.length > 0 && (
          <div className="text-center mt-14">
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-10 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              {isArabic ? (
                <>
                  {t("products.browseAll")}
                  <ArrowLeft size={20} />
                </>
              ) : (
                <>
                  {t("products.browseAll")}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
