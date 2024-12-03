import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./Home/Home.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { LoginForm } from "./auth/LoginForm.tsx";
import { RegisterForm } from "./auth/RegisterForm.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <AuthProvider>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<LoginForm />} />
               <Route path="/register" element={<RegisterForm />} />
            </Routes>
         </BrowserRouter>
      </AuthProvider>
   </StrictMode>
);
