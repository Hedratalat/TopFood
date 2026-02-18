import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const DashBoardLayout = lazy(
  () => import("./components/DashboardLayout/DashboardLayout"),
);
const ProductsDash = lazy(() => import("./pages/ProductsDash"));
const OurBrandsDash = lazy(() => import("./pages/OurBrandsDash"));
const MessageDash = lazy(() => import("./pages/MessageDash"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-accent-light">
    <div className="relative flex flex-col items-center gap-6">
      {/* Spinning ring */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-secondary animate-spin [animation-duration:0.6s]" />
      </div>

      {/* Dots */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
        <div className="w-2 h-2 rounded-full bg-primary-light animate-bounce [animation-delay:150ms]" />
        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <>
      <HashRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="admin-login11" element={<AdminLogin />} /> */}

            <Route
              path="/dashboard"
              element={
                // <ProtectedRoute>
                <DashBoardLayout />
                // </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="productDash" replace />} />
              <Route path="productDash" element={<ProductsDash />} />
              <Route path="our-brands" element={<OurBrandsDash />} />
              <Route path="messages" element={<MessageDash />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
