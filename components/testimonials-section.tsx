"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { API_URL } from '@/config'

// Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

interface Feedback {
  _id: string
  name: string
  email: string
  rating: number
  comment: string
  status: "Pending" | "Published"
  createdAt?: string // in case not defined in interface
}

export default function TestimonialsSection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`${API_URL}/feedbacks/`)
        const data = await res.json()

        const published = data.filter((f: Feedback) => f.status === "Published")
        const latestThree = published
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 10) // Get 10 latest
        setFeedbacks(latestThree)
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedbacks()
  }, [])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center mb-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center px-2">
          <h2 className="text-3xl sm:text-4xl font-light">What Our Clients Say</h2>
          <div className="mx-auto mt-4 max-w-xl text-gray-600 text-sm sm:text-base">
            Hear from our satisfied clients about their experience working with Prime Referral to find their perfect Real Estate referral.
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback._id}>
              <div className="rounded-lg bg-white p-5 sm:p-6 shadow-sm h-full">
                {/* Stars */}
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < feedback.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="mb-6 text-gray-600 text-sm sm:text-base">"{feedback.comment}"</p>

                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full">
                    <Image
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${feedback.name}`}
                      alt={feedback.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold">{feedback.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500">{feedback.email}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
