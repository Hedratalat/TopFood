import { FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher({ size = "md" }) {
  const { i18n } = useTranslation();
  const otherLang = i18n.language === "ar" ? "en" : "ar";
  const currentLang = otherLang === "en" ? "ar" : "en";
  const isLg = size === "lg";

  return (
    <button
      onClick={() => i18n.changeLanguage(otherLang)}
      className={`relative flex items-center rounded-full bg-accent-dark border-2 border-accent-dark transition-all duration-300 hover:opacity-90 active:scale-95 ${
        isLg ? "w-40 h-10" : "w-32 h-8"
      }`}
      aria-label="Toggle language"
    >
      <span
        className={`absolute rounded-full bg-white shadow-md transition-all duration-300 ${
          isLg ? "w-[4.5rem] h-8" : "w-14 h-6"
        } ${
          currentLang === "en"
            ? "left-0.5"
            : isLg
              ? "left-[4.6rem]"
              : "left-[3.75rem]"
        }`}
      />
      <span
        className={`absolute left-0 text-center font-bold font-hacen transition-colors duration-300 ${
          isLg ? "w-[4.5rem] text-sm" : "w-14 text-xs"
        } ${currentLang === "en" ? "text-accent-dark" : "text-white"}`}
      >
        English
      </span>
      <span
        className={`absolute right-0 text-center font-bold font-hacen transition-colors duration-300 ${
          isLg ? "w-[4.5rem] text-base" : "w-14 text-sm"
        } ${currentLang === "ar" ? "text-accent-dark" : "text-white"}`}
      >
        عربي
      </span>
    </button>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { name: t("nav.home"), id: "home" },
    { name: t("nav.about"), id: "about" },
    { name: t("nav.products"), id: "products" },
    { name: t("nav.features"), id: "features" },
    { name: t("nav.contact"), id: "contact" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar?.offsetHeight || 80;
    if (section) {
      const offsetTop =
        section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-accent-light/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-300">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="group cursor-pointer flex items-center"
            onClick={() => scrollToSection("home")}
          >
            <img
              src="/Logo1.png"
              alt="Top Food Logo"
              className="h-28 lg:h-32 w-auto transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-7 xl:gap-8 font-hacen font-bold text-accent-dark text-lg xl:text-xl absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-accent-dark hover:text-primary transition-colors"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button
              className="text-primary-dark hover:text-red-600 hover:scale-105 transition-all duration-300"
              aria-label="Favorites"
            >
              <FaHeart size={30} />
            </button>
            <LanguageSwitcher size="lg" />
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              className="text-primary-dark hover:text-red-600 hover:scale-105 transition-all duration-300"
              aria-label="Favorites"
            >
              <FaHeart size={26} />
            </button>
            <LanguageSwitcher size="md" />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-accent-dark hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-5 py-6 bg-accent-light rounded-xl mt-2 font-hacen font-semibold text-accent-dark text-xl">
            {navLinks.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-accent-dark hover:text-primary transition-colors py-1"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
