import Hero from "@/components/Hero"
import Projects from "@/components/Project"
import Navbar from "@/components/Navbar"
import Skills from "@/components/Skills"

export default function Home(){
  return (
    <main className="bg-[#0f0f0f] text-white">
      <Navbar/>
      <Hero />
      <Projects/>
      <Skills/>
    </main>
  )
}
