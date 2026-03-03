import { FiLogOut } from "react-icons/fi";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function NavBarDash({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-black text-white z-40 shadow-md">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20">
        <button
          onClick={onMenuClick}
          className="lg:hidden bg-white p-2 rounded-md  text-black transition"
        >
          <Menu size={22} />
        </button>

        <h2 className="text-lg sm:text-2xl font-semibold">Welcome Admin</h2>

        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="flex items-center gap-2 bg-accent-light text-primary-dark px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-lg hover:bg-accent-dark hover:text-white transition"
        >
          Logout
          <FiLogOut className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </nav>
  );
}
