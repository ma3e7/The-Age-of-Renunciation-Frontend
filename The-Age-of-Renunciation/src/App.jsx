import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Features from "./components/Features"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import WorldPage from "./components/WorldPage"
import Story from "./components/Story"
import HeroDetailPage from "./components/HeroDetailPage"

const App = () => {
  return (
    <Router>
      <Navbar />
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
      </Routes>
    </Router>
  )
}

export default App
