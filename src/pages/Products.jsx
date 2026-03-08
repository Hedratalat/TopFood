import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { useTranslation } from "react-i18next";
import {
  Heart,
  Search,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  X,
  PackageSearch,
} from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

export default function Products() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
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

  const productsPerPage = 6;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Product"), (snap) => {
      const cats = [];
      const data = snap.docs
        .map((d) => {
          const prod = d.data();
          if (prod.category) cats.push(prod.category);
          return { id: d.id, ...prod };
        })
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setProducts(data);
      setCategories([...new Set(cats)]);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, setUser);
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
    const updated = { ...favorites, [prod.id]: !favorites[prod.id] };

    const currentFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavs;
    if (updated[prod.id]) {
      const alreadyExists = currentFavs.find((f) => f.id === prod.id);
      newFavs = alreadyExists
        ? currentFavs
        : [
            ...currentFavs,
            {
              id: prod.id,
              name: prod.name,
              image: prod.image,
              price: prod.price,
              category: prod.category,
            },
          ];
    } else {
      newFavs = currentFavs.filter((f) => f.id !== prod.id);
    }

    localStorage.setItem("favorites", JSON.stringify(newFavs));
    window.dispatchEvent(new Event("favoritesUpdated"));

    if (user)
      updateDoc(doc(db, "Users", user.uid), {
        favorites: newFavs.map((f) => f.id),
      }).catch(() => {});

    updated[prod.id]
      ? toast.success(t("products.addedFav"))
      : toast(t("products.removedFav"), { icon: <X size={20} color="red" /> });

    setFavorites(updated);
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const currentProducts = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

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
            {t("products.titleTwo")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-accent-dark max-w-2xl mx-auto ${isArabic ? "text-xl" : "text-lg"}`}
          >
            {t("products.descriptionTwo")}
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
          {/* Search + Categories */}
          <div className="flex flex-col gap-3 mb-8">
            {/* Search */}
            <div className="relative w-full">
              <Search
                size={18}
                className={`absolute top-1/2 -translate-y-1/2 text-primary/60 ${isArabic ? "right-4" : "left-4"}`}
              />
              <input
                type="text"
                placeholder={t("products.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full bg-white border-2 border-gray-100 focus:border-primary rounded-2xl py-3 text-accent-dark placeholder-accent-dark/40 focus:outline-none transition-colors font-hacen ${isArabic ? "pr-12 pl-10" : "pl-12 pr-10"}`}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary ${isArabic ? "left-4" : "right-4"}`}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-1 mb-1">
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl font-bold text-base transition-all duration-200 ${
                    categoryFilter === cat
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "bg-white text-accent-dark border-2 border-gray-100 hover:border-primary/40"
                  }`}
                >
                  {cat === "All" ? t("products.allCategories") : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {currentProducts.length === 0 ? (
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
                {t("products.noResults")}
              </h3>
              <p className="text-accent-dark/50">{t("products.tryAgain")}</p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {currentProducts.map((prod, index) => (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 border-b-4 border-b-primary"
                >
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

                    {/* Category */}
                    <div
                      className={`absolute top-3 z-10 ${isArabic ? "right-3" : "left-3"}`}
                    >
                      <span className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
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
                          <ImageOff size={36} className="text-primary/40" />
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
                          EGP
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-14 pb-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border-2 border-gray-100 text-accent-dark disabled:opacity-40 hover:border-primary hover:text-primary transition-all"
              >
                {isArabic ? (
                  <ChevronRight size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-200 ${
                      page === currentPage
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "bg-white border-2 border-gray-100 text-accent-dark hover:border-primary/40"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border-2 border-gray-100 text-accent-dark disabled:opacity-40 hover:border-primary hover:text-primary transition-all"
              >
                {isArabic ? (
                  <ChevronLeft size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
