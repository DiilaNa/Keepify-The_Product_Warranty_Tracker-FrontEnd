import UserDashBoard from "@/pages/UserDashBoard";
import LoginPage from "@/pages/LoginPage";
import WelcomePage from "@/pages/WelcomePage";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashBoard from "@/pages/AdminDashBoard";

const Register = lazy(() => import("../pages/RegisterPage"))

export default function Router(){
    return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading ...</div>}>
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