import UserDashBoard from "@/pages/DashBoard";
import LoginPage from "@/pages/LoginPage";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Register = lazy(() => import("../pages/RegisterPage"))

export default function Router(){
    return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading ...</div>}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/user" element={<UserDashBoard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
}