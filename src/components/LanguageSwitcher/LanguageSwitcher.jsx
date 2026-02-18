import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  // ✅ جوه الكومبوننت
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="flex gap-2">
      {/* English Circle */}
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition ${
          !isArabic
            ? "bg-accent-dark text-white border-accent-dark"
            : "bg-white text-accent-dark border-accent-dark"
        }`}
      >
        EN
      </button>

      {/* Arabic Circle */}
      <button
        onClick={() => i18n.changeLanguage("ar")}
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition ${
          isArabic
            ? "bg-accent-dark text-white border-accent-dark"
            : "bg-white text-accent-dark border-accent-dark"
        }`}
      >
        ع
      </button>
    </div>
  );
}
