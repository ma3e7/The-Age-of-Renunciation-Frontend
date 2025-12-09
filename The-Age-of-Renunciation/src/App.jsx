import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import WorldPage from "./components/WorldPage"

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <WorldPage />
    </main>
  )
}

export default App
