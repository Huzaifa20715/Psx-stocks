'use client'

import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false })

export default function HeroWrapper() {
  return <Hero />
}
