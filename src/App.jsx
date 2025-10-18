import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/usercontext"; 
import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import HeroSection from "./pages/herosection";
import CategorySection from "./pages/categorysection";
import Enhance from "./pages/enhance";
import Explore from "./pages/explore";
import Login from "./pages/login";
import { useAuth } from "./context/authcontext";

export default function App() {
  const { user } = useAuth();
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("");

  return (
    <UserProvider>
      <Router>
        <Header search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <HeroSection />
        <CategorySection />
        <Enhance />
        <Explore search={search} sort={sort} />
        <Footer />
      </Router>
    </UserProvider>
  );
}
