import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function OurClientsDash() {
  const [clients, setClients] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [order, setOrder] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const clientRef = collection(db, "Clients");

  const fetchClients = async () => {
    const snapshot = await getDocs(clientRef);
    const data = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

    setClients(data);
  };

  useEffect(() => {
    fetchClients();
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
        const clientDoc = doc(db, "Clients", editingId);

        await updateDoc(clientDoc, {
          image: imageUrl,
          order: order !== "" ? Number(order) : 999,
        });

        setEditingId(null);
        toast.success("Client updated successfully");
      } else {
        await addDoc(clientRef, {
          image: imageUrl,
          order: order !== "" ? Number(order) : 999,
        });

        toast.success("Client added successfully");
      }

      setImageUrl("");
      setOrder("");
      fetchClients();
    } catch (err) {
      console.error("err");
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const clientDoc = doc(db, "Clients", deleteId);
      await deleteDoc(clientDoc);
      setDeleteId(null);
      fetchClients();
      toast.success("Client deleted successfully");
    } catch (err) {
      console.error("err");
      toast.error("Failed to delete client");
    }
  };

  const startEdit = (client) => {
    setImageUrl(client.image || "");
    setOrder(client.order ?? "");
    setEditingId(client.id);
  };

  return (
    <div className="p-6 font-hacen">
      <h2 className="text-2xl font-bold mb-6 text-primary-dark">
        Clients Management
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-primary-light/30"
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="url"
            placeholder="Client Image URL"
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
          {editingId ? "Update Client" : "Add Client"}
        </button>
      </form>

      {/* Clients Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white p-4 rounded-xl shadow-lg border border-primary-light/30 flex flex-col items-center"
          >
            {client.image && (
              <img
                src={client.image}
                alt="client"
                className="w-full h-40 object-contain rounded-lg mb-3"
              />
            )}

            <span className="text-xs text-white bg-primary px-3 py-1 rounded-full mb-2 self-start">
              Order: {client.order ?? "—"}
            </span>

            <div className="flex gap-2 mt-3 flex-wrap justify-center">
              <button
                onClick={() => startEdit(client)}
                className="flex items-center gap-1 px-3 py-1 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition"
              >
                <FiEdit /> Edit
              </button>

              <button
                onClick={() => setDeleteId(client.id)}
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
                Do you want to delete this client?
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
