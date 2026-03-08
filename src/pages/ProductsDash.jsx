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

export default function ProductsDash() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [order, setOrder] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const productRef = collection(db, "Product");

  const fetchProducts = async () => {
    const snapshot = await getDocs(productRef);
    const data = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category) {
      toast.error("Please enter both name and category");
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        const productDoc = doc(db, "Product", editingId);
        await updateDoc(productDoc, {
          category,
          name,
          order: order !== "" ? Number(order) : 999,
          price: price !== "" ? Number(price) : null,
          ...(imageUrl && { image: imageUrl }),
        });
        setEditingId(null);
        toast.success("Product updated successfully");
      } else {
        await addDoc(productRef, {
          category,
          name,
          image: imageUrl,
          order: order !== "" ? Number(order) : 999,
          price: price !== "" ? Number(price) : null,
        });
        toast.success("Product added successfully");
      }
      setCategory("");
      setName("");
      setImageUrl("");
      setOrder("");
      setPrice("");
      fetchProducts();
    } catch (err) {
      console.error("err");
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const productDoc = doc(db, "Product", deleteId);
      await deleteDoc(productDoc);
      setDeleteId(null);
      fetchProducts();
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("err");
      toast.error("Failed to delete product");
    }
  };

  const startEdit = (product) => {
    setCategory(product.category);
    setName(product.name);
    setImageUrl(product.image || "");
    setOrder(product.order ?? "");
    setPrice(product.price ?? "");
    setEditingId(product.id);
  };

  return (
    <div className="p-6 font-hacen">
      <h2 className="text-2xl font-bold mb-6 text-primary-dark">
        Products Management
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-primary-light/30"
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            type="number"
            placeholder="Order (1 = first)"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            min="1"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-white p-4 rounded-xl shadow-lg border border-primary-light/30 flex flex-col items-center"
          >
            {prod.image && (
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            )}
            {/* Order Badge */}
            <span className="text-xs text-white bg-primary px-3 py-1 rounded-full mb-2 self-start">
              Order: {prod.order ?? "—"}
            </span>
            <h3 className="font-bold text-primary-dark text-lg">{prod.name}</h3>
            <p className="text-accent-dark">{prod.category}</p>
            {prod.price != null && (
              <p className="text-primary font-bold mt-1">{prod.price} EGP</p>
            )}
            <div className="flex gap-2 mt-3 flex-wrap justify-center">
              <button
                onClick={() => startEdit(prod)}
                className="flex items-center gap-1 px-3 py-1 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition"
              >
                <FiEdit /> Edit
              </button>
              <button
                onClick={() => setDeleteId(prod.id)}
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
                Do you want to delete this product?
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
