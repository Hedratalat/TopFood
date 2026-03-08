import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Heart,
  ImageOff,
  PackageSearch,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import toast from "react-hot-toast";

export default function Favorites() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const sync = () => {
      try {
        setFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
      } catch {}
    };
    window.addEventListener("favoritesUpdated", sync);
    return () => window.removeEventListener("favoritesUpdated", sync);
  }, []);

  const removeFavorite = (e, id) => {
    e.stopPropagation();
    const updated = favorites.filter((f) => f.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("favoritesUpdated"));
    toast(t("products.removedFav"), { icon: <X size={18} color="red" /> });
    setFavorites(updated);
  };

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
            {t("products.favorites")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-accent-dark max-w-2xl mx-auto ${isArabic ? "text-xl" : "text-lg"}`}
          >
            {t("products.favoritesDesc")}
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
          {favorites.length === 0 ? (
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
                {t("products.noFavorites")}
              </h3>
              <p className="text-accent-dark/50 mb-8">
                {t("products.noFavoritesDesc")}
              </p>
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5"
              >
                {isArabic ? (
                  <>
                    {" "}
                    {t("products.browseFav")} <ArrowLeft size={18} />{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    {t("products.browseFav")} <ArrowRight size={18} />{" "}
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {favorites.map((prod, index) => (
                  <motion.div
                    key={prod.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                    className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 border-b-4 border-b-primary"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <button
                        onClick={(e) => removeFavorite(e, prod.id)}
                        className={`absolute top-3 z-20 ${isArabic ? "left-3" : "right-3"}`}
                      >
                        <motion.div
                          whileTap={{ scale: 0.8 }}
                          className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-primary transition-all duration-300"
                        >
                          <Heart
                            size={20}
                            className="text-white"
                            fill="white"
                          />
                        </motion.div>
                      </button>

                      <div
                        className={`absolute top-3 z-10 ${isArabic ? "right-3" : "left-3"}`}
                      >
                        <span className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md tracking-wide">
                          {prod.category}
                        </span>
                      </div>

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

              <div className="text-center mt-14">
                <button
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-10 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                >
                  {isArabic ? (
                    <>
                      {" "}
                      {t("products.browseAll")} <ArrowLeft size={20} />{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      {t("products.browseAll")} <ArrowRight size={20} />{" "}
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
