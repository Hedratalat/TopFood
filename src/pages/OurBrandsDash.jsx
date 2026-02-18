import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function OurBrandsDash() {
  const [brands, setBrands] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [order, setOrder] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const brandRef = collection(db, "Brands");

  const fetchBrands = async () => {
    const snapshot = await getDocs(brandRef);
    const data = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    setBrands(data);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.error("Please enter image URL");
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        const brandDoc = doc(db, "Brands", editingId);
        await updateDoc(brandDoc, {
          image: imageUrl,
          order: order !== "" ? Number(order) : 999,
        });
        setEditingId(null);
        toast.success("Brand updated successfully");
      } else {
        await addDoc(brandRef, {
          image: imageUrl,
          order: order !== "" ? Number(order) : 999,
        });
        toast.success("Brand added successfully");
      }

      setImageUrl("");
      setOrder("");
      fetchBrands();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const brandDoc = doc(db, "Brands", deleteId);
      await deleteDoc(brandDoc);
      setDeleteId(null);
      fetchBrands();
      toast.success("Brand deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete brand");
    }
  };

  const startEdit = (brand) => {
    setImageUrl(brand.image || "");
    setOrder(brand.order ?? "");
    setEditingId(brand.id);
  };

  return (
    <div className="p-6 font-hacen">
      <h2 className="text-2xl font-bold mb-6 text-primary-dark">
        Brands Management
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-primary-light/30"
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="url"
            placeholder="Brand Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
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

        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition"
        >
          {editingId ? "Update Brand" : "Add Brand"}
        </button>
      </form>

      {/* Brands Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white p-4 rounded-xl shadow-lg border border-primary-light/30 flex flex-col items-center"
          >
            {brand.image && (
              <img
                src={brand.image}
                alt="brand"
                className="w-full h-40 object-contain rounded-lg mb-3"
              />
            )}

            <span className="text-xs text-white bg-primary px-3 py-1 rounded-full mb-2 self-start">
              Order: {brand.order ?? "—"}
            </span>

            <div className="flex gap-2 mt-3 flex-wrap justify-center">
              <button
                onClick={() => startEdit(brand)}
                className="flex items-center gap-1 px-3 py-1 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition"
              >
                <FiEdit /> Edit
              </button>

              <button
                onClick={() => setDeleteId(brand.id)}
                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
              >
                <FiTrash2 /> Delete
              </button>
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
                Do you want to delete this brand?
              </p>

              <div className="flex justify-center gap-4 flex-wrap">
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
