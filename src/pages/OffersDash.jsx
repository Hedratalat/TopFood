import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function OffersDash() {
  const [offers, setOffers] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [badge, setBadge] = useState("");
  const [order, setOrder] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const offersRef = collection(db, "Offers");

  const fetchOffers = async () => {
    const snapshot = await getDocs(offersRef);
    const data = snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    setOffers(data);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setImageUrl("");
    setBadge("");
    setOrder("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      toast.error("Please enter title and image URL");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        title,
        subtitle,
        image: imageUrl,
        badge,
        order: order !== "" ? Number(order) : 999,
      };
      if (editingId) {
        await updateDoc(doc(db, "Offers", editingId), payload);
        toast.success("Offer updated successfully");
      } else {
        await addDoc(offersRef, payload);
        toast.success("Offer added successfully");
      }
      resetForm();
      fetchOffers();
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteDoc(doc(db, "Offers", deleteId));
      setDeleteId(null);
      fetchOffers();
      toast.success("Offer deleted successfully");
    } catch {
      toast.error("Failed to delete offer");
    }
  };

  const startEdit = (offer) => {
    setTitle(offer.title || "");
    setSubtitle(offer.subtitle || "");
    setImageUrl(offer.image || "");
    setBadge(offer.badge || "");
    setOrder(offer.order ?? "");
    setEditingId(offer.id);
  };

  return (
    <div className="p-6 font-hacen">
      <h2 className="text-2xl font-bold mb-6 text-primary-dark">
        Offers Management
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-primary-light/30"
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Badge (مثال: خصم 20%)"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <input
            type="number"
            placeholder="Order (1 = first)"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            min="1"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition"
          >
            {editingId ? "Update Offer" : "Add Offer"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Offers Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-xl shadow-lg border border-primary-light/30 overflow-hidden"
          >
            {offer.image && (
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-40 object-cover"
                />
                {offer.badge && (
                  <span className="absolute top-2 left-2 bg-secondary text-white text-xs px-3 py-1 rounded-full font-bold">
                    {offer.badge}
                  </span>
                )}
              </div>
            )}
            <div className="p-4">
              <span className="text-xs text-white bg-primary px-3 py-1 rounded-full mb-2 inline-block">
                Order: {offer.order ?? "—"}
              </span>
              <h3 className="font-bold text-primary-dark text-lg mt-2">
                {offer.title}
              </h3>
              {offer.subtitle && (
                <p className="text-accent-dark text-sm mt-1">
                  {offer.subtitle}
                </p>
              )}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => startEdit(offer)}
                  className="flex items-center gap-1 px-3 py-1 bg-primary-dark text-white rounded-lg hover:bg-primary transition text-sm"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => setDeleteId(offer.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500 transition text-sm"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Popup */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-xl shadow-lg w-80 text-center"
            >
              <h3 className="font-bold text-primary-dark mb-4">
                Are you sure?
              </h3>
              <p className="text-accent-dark mb-6">
                Do you want to delete this offer?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
