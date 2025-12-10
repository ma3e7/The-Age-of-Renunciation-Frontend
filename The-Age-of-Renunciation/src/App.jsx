import Features from "./components/Features"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import WorldPage from "./components/WorldPage"
import Story from "./components/Story"

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <WorldPage />
      <Features />
      <Story />
    </main>
  )
}

export default App
