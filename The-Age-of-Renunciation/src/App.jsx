import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import HeroDetailPage from "./components/HeroDetailPage";
import Hero from "./components/Hero";
import WorldPage from "./components/WorldPage";
import Features from "./components/Features";
import Story from "./components/Story";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access"));

  const handleAuthChange = (state) => setIsAuthenticated(state);

  const handleSignOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />
      <Register onAuthChange={handleAuthChange} />

      <Routes>
        <Route path="/" element={
          <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Hero />
            <WorldPage />
            <Features />
            <Story />
          </main>
        } />
        <Route path="/hero/:id" element={<HeroDetailPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
