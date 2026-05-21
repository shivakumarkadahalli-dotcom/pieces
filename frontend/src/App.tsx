import { Routes, Route } from "react-router-dom";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Feature from "@/pages/Feature";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feature" element={<Feature />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
