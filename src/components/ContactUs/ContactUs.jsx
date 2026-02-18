import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "validation.fullName.min")
    .max(40, "validation.fullName.max")
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, "validation.fullName.regex"),
  email: z
    .string()
    .trim()
    .email("validation.email.invalid")
    .max(100, "validation.email.max"),
  placeType: z
    .string()
    .refine((val) => ["restaurant", "hotel", "cafe"].includes(val), {
      message: "validation.placeType.invalid",
    }),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{11}$/, "validation.phone.regex"),
  message: z
    .string()
    .trim()
    .min(10, "validation.message.min")
    .max(500, "validation.message.max"),
});

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { placeType: "" },
  });

  const onSubmit = async (data) => {
    try {
      const messagesRef = collection(db, "Messages");
      const q = query(messagesRef, where("email", "==", data.email));
      const snapshot = await getDocs(q);

      if (snapshot.size >= 2) {
        toast.error(t("contact.form.limitError"));
        return;
      }

      await addDoc(messagesRef, {
        ...data,
        createdAt: new Date(),
      });

      toast.success(t("contact.form.success"));
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(t("contact.form.error"));
    }
  };

  const infoCards = [
    {
      icon: <Phone size={20} />,
      label: t("contact.info.phone.label"),
      value: t("contact.info.phone.value1"),
      value2: t("contact.info.phone.value2"),
    },
    {
      icon: <Mail size={20} />,
      label: t("contact.info.email.label"),
      value: t("contact.info.email.value"),
    },
    {
      icon: <MapPin size={20} />,
      label: t("contact.info.address.label"),
      value: t("contact.info.address.value"),
    },
    {
      icon: <Clock size={20} />,
      label: t("contact.info.hours.label"),
      value: t("contact.info.hours.value"),
      extra: t("contact.info.hours.extra"),
    },
  ];

  const inputClass = (hasError) =>
    `w-full border-b-2 bg-transparent px-1 py-2 text-sm text-accent-dark placeholder-accent-dark/40 focus:outline-none transition-colors duration-200 font-hacen ${
      hasError
        ? "border-secondary"
        : "border-primary-light/40 focus:border-primary"
    }`;

  return (
    <section
      id="contact"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative py-24 bg-accent-light font-hacen overflow-hidden scroll-mt-20"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2
            className={`font-bold text-primary-dark mb-6 ${isArabic ? "text-4xl md:text-5xl" : "text-4xl md:text-5xl"}`}
          >
            {t("contact.title.part1")}
          </h2>
          <p
            className={`text-accent-dark max-w-3xl mx-auto ${isArabic ? "text-2xl" : "text-lg"}`}
          >
            {t("contact.subtitle")}
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-10 items-start ">
          {/* LEFT: Form — wider */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3 bg-white rounded-3xl shadow-xl p-8 md:p-10 flex flex-col justify-between  order-2 lg:order-1"
          >
            <div>
              <p
                className={`font-bold text-primary-dark mb-8 ${isArabic ? "text-2xl" : "text-xl"}`}
              >
                {t("contact.form.title")}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    className={`font-bold uppercase tracking-widest text-primary mb-2 block ${isArabic ? "text-base" : "text-xs"}`}
                  >
                    {t("contact.form.fullName")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("contact.form.fullNamePlaceholder")}
                    data-gramm="false"
                    {...register("fullName")}
                    className={inputClass(errors.fullName)}
                  />
                  {errors.fullName && (
                    <p className="text-secondary text-xs mt-1">
                      {t(errors.fullName.message)}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    className={`font-bold uppercase tracking-widest text-primary mb-2 block ${isArabic ? "text-base" : "text-xs"}`}
                  >
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("contact.form.emailPlaceholder")}
                    data-gramm="false"
                    {...register("email")}
                    className={inputClass(errors.email)}
                  />
                  {errors.email && (
                    <p className="text-secondary text-xs mt-1">
                      {t(errors.email.message)}
                    </p>
                  )}
                </div>

                {/* Place Type */}
                <div>
                  <label
                    className={`font-bold uppercase tracking-widest text-primary mb-2 block ${isArabic ? "text-base" : "text-xs"}`}
                  >
                    {t("contact.form.placeType")}
                  </label>
                  <select
                    {...register("placeType")}
                    onInvalid={(e) => e.preventDefault()}
                    className={inputClass(errors.placeType)}
                  >
                    <option value="" disabled>
                      {t("contact.form.placeTypePlaceholder")}
                    </option>
                    <option value="restaurant">
                      {t("contact.form.restaurant")}
                    </option>
                    <option value="hotel">{t("contact.form.hotel")}</option>
                    <option value="cafe">{t("contact.form.cafe")}</option>
                  </select>
                  {errors.placeType && (
                    <p className="text-secondary text-xs mt-1">
                      {t(errors.placeType.message)}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    className={`font-bold uppercase tracking-widest text-primary mb-2 block ${isArabic ? "text-base" : "text-xs"}`}
                  >
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    placeholder={t("contact.form.phonePlaceholder")}
                    data-gramm="false"
                    {...register("phone")}
                    className={inputClass(errors.phone)}
                  />
                  {errors.phone && (
                    <p className="text-secondary text-xs mt-1">
                      {t(errors.phone.message)}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    className={`font-bold uppercase tracking-widest text-primary mb-2 block ${isArabic ? "text-base" : "text-xs"}`}
                  >
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    rows="4"
                    placeholder={t("contact.form.messagePlaceholder")}
                    data-gramm="false"
                    {...register("message")}
                    className={inputClass(errors.message)}
                  />
                  {errors.message && (
                    <p className="text-secondary text-xs mt-1">
                      {t(errors.message.message)}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl px-8 py-3 text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60"
                >
                  <Send
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                  {isSubmitting
                    ? t("contact.form.sending")
                    : t("contact.form.send")}
                </button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT: Info panel — narrower */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-5 order-1 lg:order-2"
          >
            {/* Info cards */}
            <div className="grid grid-cols-1 gap-4 ">
              {infoCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-primary-light/20 hover:border-primary/40"
                >
                  <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <p
                      className={`font-bold text-primary-dark ${isArabic ? "text-base" : "text-sm"}`}
                    >
                      {card.label}
                    </p>
                    <p
                      className={`text-accent-dark ${isArabic ? "text-base" : "text-sm"}`}
                    >
                      {card.value}
                    </p>{" "}
                    {card.value2 && (
                      <p
                        className={`text-accent-dark ${isArabic ? "text-base" : "text-sm"}`}
                      >
                        {card.value2}
                      </p>
                    )}
                    {card.extra && (
                      <p
                        className={`text-accent-dark ${isArabic ? "text-base" : "text-sm"}`}
                      >
                        {card.extra}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-primary-light/20">
              <p
                className={`font-bold text-primary-dark mb-4 ${isArabic ? "text-lg" : "text-base"}`}
              >
                {t("contact.social.title")}
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/topfood.trading.supplies/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/topfood.trading.supplies?igsh=MWl5dHlkd3JkMDFzaA%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://wa.me/201020264100"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-primary-light/20 flex-1 min-h-[180px]">
              <iframe
                title="location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.003207463586!2d31.2357113!3d30.0444196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c7e6e6a3df%3A0x123456789abcdef!2sCairo%20Tower!5e0!3m2!1sen!2seg!4v1699999999999!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "180px" }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
