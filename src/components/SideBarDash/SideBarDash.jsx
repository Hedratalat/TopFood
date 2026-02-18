import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

export default function SideBarDash({ isOpen, setIsOpen }) {
  const navItems = [
    { to: "productDash", label: "Products Dashboard" },
    { to: "our-brands", label: "Our Brands" },
    { to: "messages", label: "Message" },
  ];

  return (
    <>
      {/* الخلفية الداكنة عند فتح القائمة على الموبايل */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 min-h-screen bg-black text-white shadow-lg w-64 p-6 
          flex flex-col overflow-y-auto transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        {/* زر الإغلاق في الموبايل */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold tracking-wide border-b border-primary-light mb-8 pb-4">
          Dashboard
        </h2>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg font-medium rounded-xl px-4 py-2 cursor-pointer 
                    transition-colors duration-200 ${
                      isActive
                        ? "bg-primary text-white hover:bg-primary-light"
                        : "text-white hover:bg-primary-light/70"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
