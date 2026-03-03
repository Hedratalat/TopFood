import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      if (user.user.email?.toLowerCase().trim() === "admintopfood@gmail.com") {
        toast.success("Welcome Admin");
        navigate("/dashboard/productDash");
      } else {
        toast.error("You are not allowed to access this page");
        navigate("/");
      }
    } catch (error) {
      toast.error("Incorrect email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent-light px-4 font-hacen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
        autoComplete="off"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <LogIn size={40} className="text-primary" />
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold text-primary-dark mb-6">
          Admin Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-accent-dark text-sm mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-primary/30 focus:ring-2 focus:ring-primary outline-none p-2.5 w-full rounded-lg text-accent-dark"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-accent-dark text-sm mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-primary/30 focus:ring-2 focus:ring-primary outline-none p-2.5 w-full rounded-lg pr-10 text-accent-dark"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-primary hover:text-secondary"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg w-full transition-all duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
