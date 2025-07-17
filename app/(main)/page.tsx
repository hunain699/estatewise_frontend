"use client"

import Image from "next/image"
import { Search, Award, MapPin, HomeIcon, Group, UserRoundCheck, ActivityIcon } from "lucide-react"
import { Users, Clock, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CategoryIcon from "@/components/category-icon"
import FeaturedProperties from "@/components/featured-properties"
import TestimonialsSection from "@/components/testimonials-section"
import BlogSection from "@/components/blog-section"
import NewsletterSection from "@/components/newsletter-section"
import { useRouter } from "next/navigation"
import StatCard from "@/components/StatCard"

export default function Home() {
  const router = useRouter()

  const handleSearch = () => {
    router.push("/properties")
  }
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Prime Referral"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
            Estate Wise
            <br />
            The Finest Real Estate Partners
          </h1>
          

          <div className="mt-8 w-full max-w-4xl rounded-lg md:rounded-full bg-white p-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <Input
                type="text"
                placeholder="Search Desired Property"
                className="flex-1 rounded-full border-none text-black shadow-none focus-visible:ring-0"
              />
              <Select>
            <SelectTrigger className="w-full rounded-full border-none text-black md:w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full rounded-full border-none text-black md:w-[180px]">
              <SelectValue placeholder="Sell or Rent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sell">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleSearch}
            className="w-full md:w-auto rounded-full bg-amber-500 px-6 hover:bg-amber-600"
          >
            <Search className="mr-2 h-4 w-4" /> SEARCH
          </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex flex-wrap justify-center gap-4 px-4 text-white text-center text-xs sm:text-sm">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-amber-400"></div>
        <span>1,000+ SOLD HOMES</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-amber-400"></div>
        <span>MILLIONS OF $ IN SALES</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-amber-400"></div>
        <span>1,000+ SATISFIED CUSTOMERS</span>
      </div>
    </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="mb-10 text-center">
      <h2 className="text-3xl sm:text-4xl font-light">Why Choose Estate Wise</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-gray-600 px-2 sm:px-0">
        With over 6 years of experience in real estate marketing, we offer unparalleled expertise and
        personalized service to help you find your dream property or <span className="font-semibold">to Elevate Your Real Estate Business.</span>
      </p>
    </div>

    {/* Feature Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {[
        {
          icon: <UserRoundCheck className="h-8 w-8 text-amber-500" />,
          title: "Get Human Verified Leads",
          text: "Pre-screened by professional Inside Sales Agents, our leads are motivated, ready, and verified so you spend less time chasing and more time closing.",
        },
        {
          icon: <Group className="h-8 w-8 text-amber-500" />,
          title: "Pay Per Lead",
          text: "Get Verified Leads — Pay Only After You’ve Spoken to the Prospect. No upfront risk. Real conversations. Real opportunities.",
        },
        {
          icon: <ActivityIcon className="h-8 w-8 text-amber-500" />,
          title: "Marketing Partners",
          text: "We specialize in digital marketing to grow your business. From Facebook ads to SEO, we drive traffic, generate leads, and boost results.",
        },
        {
          icon: <HomeIcon className="h-8 w-8 text-amber-500" />,
          title: "Exclusive Properties",
          text: "Access the most exclusive residential and luxury properties by Prime Referral, many not available on the open market.",
        },
        {
          icon: <Award className="h-8 w-8 text-amber-500" />,
          title: "Expert Guidance",
          text: "Our team of experienced agents provides expert guidance through every step of your real estate journey.",
        },
        {
          icon: <MapPin className="h-8 w-8 text-amber-500" />,
          title: "Local Knowledge",
          text: "Deep understanding of Prime Referral’s neighborhoods and market trends helps you make informed decisions.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-lg bg-white p-6 text-center shadow-sm hover:shadow-xl transition-shadow"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            {item.icon}
          </div>
          <h3 className="mb-2 text-lg sm:text-xl font-semibold">{item.title}</h3>
          <p className="text-sm sm:text-base text-gray-600">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Property Categories Section */}
      <section className="py-16">
  <div className="container mx-auto px-4">
    {/* Heading */}
    <div className="mb-10 flex flex-col items-center text-center relative">
      <h2 className="text-3xl sm:text-4xl font-light">Best Listings Available</h2>

          </div>

          <div className="grid grid-cols-3 gap-8 md:grid-cols-5 lg:grid-cols-9">
            <CategoryIcon icon="home" label="For Sale" href="/properties?type=sale" />
            <CategoryIcon icon="key" label="For Rent" href="/properties?type=rent" />
            <CategoryIcon icon="house" label="Residential" href="/properties?category=residential" />
            <CategoryIcon icon="building" label="Apartments" href="/properties?category=apartments" />
            <CategoryIcon icon="villa" label="Single Homes" href="/properties?category=single-homes" />
            <CategoryIcon icon="studio" label="Studios" href="/properties?category=studios" />
            <CategoryIcon icon="condo" label="Condos" href="/properties?category=condos" />
            <CategoryIcon icon="office" label="Commercial" href="/properties?category=commercial" />
            <CategoryIcon icon="shop" label="Shops" href="/properties?category=shops" />
          </div>
        </div>
      </section>
       
      

      {/* Featured Properties */}
      <FeaturedProperties />
      <section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-light">How It Works</h2>
      <p className="mx-auto mt-4 max-w-2xl text-gray-600">
        Simple. Effective. Here’s how you can start closing more deals and growing your real estate business—step by step.
      </p>
    </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Define Your Ideal Market */}
  <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
      {/* Map Pin Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-amber-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 21s8-4.5 8-10.5S16.5 2 12 2 4 6 4 10.5 12 21 12 21z"
        />
      </svg>
    </div>
    <h3 className="mb-2 text-xl font-semibold">Define Your Ideal Market</h3>
    <p className="text-gray-600">
      Kickstart your journey by choosing the ZIP codes, cities, or counties 
      you want to work in—so every lead you get matches your local expertise and target clientele.
    </p>
  </div>

  {/* Capture High-Intent Leads */}
  <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
      {/* Target Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-amber-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6l4 2"
        />
      </svg>
    </div>
    <h3 className="mb-2 text-xl font-semibold">Capture High-Intent Leads</h3>
    <p className="text-gray-600">
      Our team actively sources motivated buyers and sellers in your selected areas, 
      using advanced marketing strategies to attract clients who are ready to take action.
    </p>
  </div>

  {/* Qualify and Nurture */}
  <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
      {/* Clipboard Check Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-amber-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m1-7H8a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2z"
        />
      </svg>
    </div>
    <h3 className="mb-2 text-xl font-semibold">Qualify and Nurture</h3>
    <p className="text-gray-600">
      We pre-screen every lead to ensure they’re serious and ready. Our team nurtures 
      each prospect with follow-ups and appointment scheduling—so you only engage with high-quality opportunities.
    </p>
  </div>

  {/* Schedule Appointments */}
  <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
      {/* Calendar Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-amber-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <h3 className="mb-2 text-xl font-semibold">Schedule Appointments</h3>
    <p className="text-gray-600">
      After vetting, we deliver ready-to-go leads straight to you via text, email, 
      or live transfer—complete with all the details you need to make a strong first impression.
    </p>
  </div>

  {/* Seize the Moment to Excel */}
  <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
      {/* Star Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-amber-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.094 6.462a1 1 0 00.95.69h6.8c.969 0 1.371 1.24.588 1.81l-5.507 4.006a1 1 0 00-.364 1.118l2.094 6.463c.3.922-.755 1.688-1.54 1.118L12 17.347l-5.507 4.005c-.784.57-1.838-.196-1.54-1.118l2.094-6.463a1 1 0 00-.364-1.118L1.176 11.89c-.783-.57-.38-1.81.588-1.81h6.8a1 1 0 00.95-.69l2.094-6.463z"
        />
      </svg>
    </div>
    <h3 className="mb-2 text-xl font-semibold">Seize the Moment to Excel</h3>
    <p className="text-gray-600">
      Now’s your moment to shine. Leverage your skills to create genuine
       connections with referred clients, transforming leads into long-lasting relationships.
    </p>
  </div>

  {/* Pay Only for Success */}
 <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
    {/* Updated Currency Dollar Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 text-amber-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  </div>
  <h3 className="mb-2 text-xl font-semibold">Pay Only for Success</h3>
  <p className="text-gray-600">
    You pay exclusively for leads that turn into completed transactions. We’re committed to results-driven partnerships, 
    ensuring your investment aligns directly with your success.
  </p>
</div>

</div>

  </div>
</section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Agents Section */}
      {/* <AgentsSection /> */}
      <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                <StatCard
                  icon={<Users className="h-8 w-8 text-amber-500 mx-auto" />}
                  end={1000}
                  label="Properties Sold"
                  suffix="+"
                />
                <StatCard
                  icon={<Users className="h-8 w-8 text-amber-500 mx-auto" />}
                  end={600}
                  label="Expert Agents"
                  suffix="+"
                />
                <StatCard
                  icon={<Award className="h-8 w-8 text-amber-500 mx-auto" />}
                  end={15}
                  label="Industry Awards"
                  suffix="+"
                />
                <StatCard
                  icon={<Clock className="h-8 w-8 text-amber-500 mx-auto" />}
                  end={24}
                  label="Customer Support"
                  suffix="/7"
                />
                <StatCard
                  icon={<Handshake className="h-8 w-8 text-amber-500 mx-auto" />}
                  end={30}
                  label="Brokerages Partnered with"
                  suffix="+"
                />
              </div>
            </div>
          </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  )
}
