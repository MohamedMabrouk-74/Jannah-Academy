import Hero from '../components/Hero'
import WhyChooseUs from '../components/WhyChooseUs'
import PopularCourses from '../components/PopularCourses'
import Scholars from '../components/Scholars'
import Testimonials from '../components/Testimonials'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <PopularCourses />
      <Scholars />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  )
}
