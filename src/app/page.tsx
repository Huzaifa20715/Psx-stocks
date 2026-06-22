import Navbar from '@/components/layout/Navbar'
import HeroWrapper from '@/components/sections/HeroWrapper'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Process from '@/components/sections/Process'
import Stats from '@/components/sections/Stats'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main style={{ backgroundColor: '#050505' }}>
      <Navbar />
      <HeroWrapper />
      <Services />
      <Portfolio />
      <Process />
      <Stats />
      <Contact />
    </main>
  )
}
