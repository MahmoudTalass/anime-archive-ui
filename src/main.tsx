import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { FrontPage } from "./frontPage/FrontPage.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { LoginForm } from "./auth/LoginForm.tsx";
import { RegisterForm } from "./auth/RegisterForm.tsx";
import { PageLayout } from "./PageLayout.tsx";
import { BrowseAnimesPage } from "./browsePage/BrowseAnimesPage.tsx";
import { AnimePage } from "./anime/AnimePage.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<BrowseAnimesPage />} />
          <Route path="/animes/:malId" element={<AnimePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  // </StrictMode>
);
