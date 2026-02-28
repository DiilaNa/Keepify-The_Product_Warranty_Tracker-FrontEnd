import { ElegantSpinner } from "@/components/custom/Spinner";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Register = lazy(() => import("../pages/RegisterPage"))
const LoginPage = lazy(() => import("../pages/LoginPage"))
const WelcomePage = lazy(() => import("../pages/WelcomePage"));
const UserDashBoard = lazy(() => import("../pages/UserDashBoard"));
const AdminDashBoard = lazy(() => import("../pages/AdminDashBoard"));

export default function Router(){
    return (
      <BrowserRouter>
        <Suspense fallback={<ElegantSpinner />}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserDashBoard />} />
            <Route path="/admin" element={<AdminDashBoard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
}