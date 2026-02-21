import {
  Facebook,
  Instagram,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const navbarHeight = 80;
    if (section) {
      const offsetTop =
        section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/topfood.trading.supplies/",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/topfood.trading.supplies?igsh=MWl5dHlkd3JkMDFzaA%3D%3D",
      label: "Instagram",
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/201020264100",
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* عن الشركة */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-semibold mb-2 text-white transition-colors">
            {t("footer.brand")}
          </h3>
          <p className="text-white text-base leading-relaxed mb-3">
            {t("hero.description")}
          </p>

          <div className="hidden md:block">
            <p className="font-medium text-white mb-2">
              {t("contact.social.title")}
            </p>
            <div className="flex justify-start space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-primary transition-colors"
                >
                  <Icon className="w-7 h-7 text-white hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* روابط سريعة */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white transition-colors">
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-1 text-white text-base">
            {Object.entries(t("nav", { returnObjects: true })).map(
              ([key, value]) => (
                <li key={key}>
                  <button
                    onClick={() => scrollToSection(key)}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    {value}
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* قيمنا / خدماتنا */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white transition-colors">
            {t("values.title")}
          </h3>
          <ul className="space-y-1 text-white text-base">
            <li>{t("values.quality")}</li>
            <li>{t("values.fastSupply")}</li>
            <li>{t("values.transparency")}</li>
            <li>{t("values.longRelations")}</li>
          </ul>
        </div>

        {/* التواصل */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white transition-colors">
            {t("contact.title.part1")}
          </h3>
          <div className="space-y-3 text-white text-base">
            {/* العنوان */}
            <div className="flex justify-center md:justify-start items-start gap-1">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-white hover:text-primary transition-colors" />
              <span dir={dir}>{t("contact.info.address.value")}</span>
            </div>

            {/* الهاتف */}
            <div className="flex flex-col items-center md:items-start gap-1">
              <a
                href={`tel:${t("contact.info.phone.value1")}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5 shrink-0 text-white hover:text-primary transition-colors" />
                <span>{t("contact.info.phone.value1")}</span>
              </a>
              <a
                href={`tel:${t("contact.info.phone.value2")}`}
                className="flex items-center gap-2 hover:text-primary transition-colors md:pl-7"
              >
                <Phone className="w-5 h-5 shrink-0 text-white hover:text-primary transition-colors md:hidden" />
                <span>{t("contact.info.phone.value2")}</span>
              </a>
            </div>

            {/* الإيميل */}
            <a
              href={`mailto:${t("contact.info.email.value")}`}
              className="flex justify-center md:justify-start items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5 shrink-0 text-white hover:text-primary transition-colors" />
              <span className="break-all">{t("contact.info.email.value")}</span>
            </a>

            {/* ساعات العمل */}
            <div className="flex justify-center md:justify-start items-start gap-2">
              <Clock className="w-5 h-5 mt-0.5 shrink-0 text-white hover:text-primary transition-colors" />
              <div>
                <p>{t("contact.info.hours.value")}</p>
                <p>{t("contact.info.hours.extra")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* نسخة الموبايل من السوشيال */}
      <div className="block md:hidden text-center mt-4">
        <p className="font-medium text-white mb-2">
          {t("contact.social.title")}
        </p>
        <div className="flex justify-center space-x-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-primary transition-colors"
            >
              <Icon className="w-7 h-7 text-white hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* الخط السفلي */}
      <div className="border-t border-white/40 text-center py-3 mt-4" dir={dir}>
        <p className="text-white text-sm md:text-base">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
