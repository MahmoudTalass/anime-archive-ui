import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { Home } from "./home/Home.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { LoginForm } from "./auth/LoginForm.tsx";
import { RegisterForm } from "./auth/RegisterForm.tsx";
import { PageLayout } from "./PageLayout.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <AuthProvider>
         <BrowserRouter>
            <Routes>
               <Route element={<PageLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
               </Route>
            </Routes>

         </BrowserRouter>
      </AuthProvider>
   </StrictMode>
);
