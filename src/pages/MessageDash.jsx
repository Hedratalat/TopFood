import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function MessageDash() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesRef = collection(db, "Messages");
        const q = query(messagesRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="p-6 font-hacen">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <h2 className="text-2xl font-bold text-primary-dark">
          Messages Management
        </h2>
        {!loading && messages.length > 0 && (
          <span className="ml-auto text-xs font-semibold px-3 py-1 rounded-full bg-primary-light/10 text-primary-dark border border-primary-light/20">
            {messages.length} message{messages.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* States */}
      {loading ? (
        <div className="flex items-center gap-3 text-accent-dark">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span>Loading messages...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-accent-dark/50">
          <svg
            className="w-12 h-12 mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <p className="text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative bg-white rounded-2xl border border-primary-light/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary-dark via-primary-light to-transparent" />

              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Avatar + Name */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-dark/10 flex items-center justify-center text-primary-dark font-bold text-base shrink-0">
                    {msg.fullName?.charAt(0)?.toUpperCase() ?? "?"}
                  </div>
                  <div>
                    <p className="font-bold text-primary-dark leading-tight">
                      {msg.fullName}
                    </p>
                    <p className="text-xs text-accent-dark/60">{msg.email}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-primary-light/10" />

                {/* Meta info */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-accent-dark">
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    {msg.phone}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-accent-dark">
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    {msg.placeType}
                  </div>
                </div>

                {/* Message body */}
                <div className="bg-primary-light/5 rounded-xl p-3 flex-1">
                  <p className="text-sm text-accent-dark leading-relaxed line-clamp-4">
                    {msg.message}
                  </p>
                </div>

                {/* Timestamp */}
                <p className="text-xs text-accent-dark/40 text-right">
                  {new Date(msg.createdAt.seconds * 1000).toLocaleString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
