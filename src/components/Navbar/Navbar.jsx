import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Language Switcher Component - Show only the other language
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const otherLang = i18n.language === "ar" ? "en" : "ar";

  return (
    <button
      onClick={() => i18n.changeLanguage(otherLang)}
      className="w-11 h-11 rounded-full flex items-center justify-center border-2 bg-accent-dark text-white border-accent-dark font-hacen font-bold text-lg"
    >
      {otherLang === "en" ? (
        "EN"
      ) : (
        <span className="text-2xl leading-none">ع</span>
      )}
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

    // نجيب ارتفاع الـ Navbar
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar?.offsetHeight || 80;

    if (section) {
      const offsetTop =
        section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-accent-light/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-300">
        <div className="flex items-center justify-between h-20 ">
          {/* Logo */}
          <div
            className="group cursor-pointer flex items-center"
            onClick={() => scrollToSection("home")}
          >
            <img
              src="/Logo1.png"
              alt="Top Food Logo"
              className="h-32 w-auto transition-transform duration-300 group-hover:scale-110 "
            />
          </div>

          {/* Desktop Links */}
          <ul
            className="hidden lg:flex items-center gap-7 xl:gap-5 font-hacen font-bold text-accent-dark text-lg 
          xl:text-xl"
          >
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
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
          {/* Mobile Button */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher />
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
