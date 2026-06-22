import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import Services from '@/components/Services'
import About from '@/components/About'
import Process from '@/components/Process'
import CaseStudies from '@/components/CaseStudies'
import Testimonials from '@/components/Testimonials'
import Blog from '@/components/Blog'
import Team from '@/components/Team'
import CTABanner from '@/components/CTABanner'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import HeroSkeleton from '@/components/skeletons/HeroSkeleton'
import SectionSkeleton from '@/components/skeletons/SectionSkeleton'
import CardGridSkeleton from '@/components/skeletons/CardGridSkeleton'

export const revalidate = 3600

export default function Page() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<HeroSkeleton />}><Hero /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><TrustStrip /></Suspense>
      <Suspense fallback={<CardGridSkeleton cols={2} />}><Services /></Suspense>
      <About />
      <Process />
      <Suspense fallback={<CardGridSkeleton cols={3} />}><CaseStudies /></Suspense>
      <Suspense fallback={<CardGridSkeleton cols={3} />}><Testimonials /></Suspense>
      <Suspense fallback={<CardGridSkeleton cols={3} />}><Blog /></Suspense>
      <Suspense fallback={<CardGridSkeleton cols={4} />}><Team /></Suspense>
      <Suspense fallback={<SectionSkeleton />}><CTABanner /></Suspense>
      <Contact />
      <Footer />
    </>
    
  )
}
// 