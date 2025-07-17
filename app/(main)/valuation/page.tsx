"use client";
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import TestimonialsSection from "@/components/testimonials-section";
import { API_URL } from '@/config'

export default function ValuationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    timeframe: '',
    property_address: '',
    city: '',
    property_type: '',
    message: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('${API_URL}/inquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        alert('Inquiry submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          timeframe: '',
          property_address: '',
          city: '',
          property_type: '',
          message: ''
        });
      } else {
        alert('Submission failed.');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Server error.');
    }
    finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="relative h-80">
        <Image
          src="https://www.shutterstock.com/image-vector/water-surface-magic-neon-glow-600nw-2483884465.jpg"
          alt="Home Valuation - WP Residence"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-light md:text-5xl">Home Valuation</h1>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <Link href="/" className="hover:text-amber-400">
                Home
              </Link>
              <span>/</span>
              <span>Valuation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-light">Get Your Home's Value</h2>
              <p className="mb-4 text-gray-600">
                Curious about your home's current market value? Our free home valuation service provides you with an
                accurate estimate based on recent sales data, market trends, and the unique features of your property.
              </p>
              <p className="mb-6 text-gray-600">
                Whether you're considering selling, refinancing, or just want to stay informed about your investment,
                our expert agents will provide you with a comprehensive valuation report.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-amber-500" />
                  <div>
                    <h3 className="font-semibold">Accurate Market Analysis</h3>
                    <p className="text-sm text-gray-600">
                      Based on recent comparable sales and current market conditions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-amber-500" />
                  <div>
                    <h3 className="font-semibold">Personalized Evaluation</h3>
                    <p className="text-sm text-gray-600">
                      Takes into account your home's unique features and improvements
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-amber-500" />
                  <div>
                    <h3 className="font-semibold">Expert Local Insights</h3>
                    <p className="text-sm text-gray-600">
                      Provided by agents who know the Real Estate market intimately
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-amber-500" />
                  <div>
                    <h3 className="font-semibold">No Obligation</h3>
                    <p className="text-sm text-gray-600">
                      Receive your valuation with no pressure or commitment to sell
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-6 text-xl font-semibold">Request Your Free Home Valuation</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Your Name*" name="name" value={formData.name} onChange={handleChange} required />
            <Input type="email" placeholder="Your Email*" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input type="tel" placeholder="Your Phone*" name="phone" value={formData.phone} onChange={handleChange} required />
            <Select onValueChange={(value) => handleSelect('timeframe', value)}>
              <SelectTrigger><SelectValue placeholder="Timeframe to Sell" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Immediate">Immediate (0-3 months)</SelectItem>
                <SelectItem value="Soon">Soon (3-6 months)</SelectItem>
                <SelectItem value="Future">Future (6+ months)</SelectItem>
                <SelectItem value="Just-Curious">Just curious</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input placeholder="Property Address*" name="property_address" value={formData.property_address} onChange={handleChange} required />

          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="City*" name="city" value={formData.city} onChange={handleChange} required />
            <Select onValueChange={(value) => handleSelect('property_type', value)}>
              <SelectTrigger><SelectValue placeholder="Property Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Single-Family">Single Family Home</SelectItem>
                <SelectItem value="Townhouse">Condo/Townhouse</SelectItem>
                <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                <SelectItem value="Land">Land/Lot</SelectItem>
                <SelectItem value="Vineyard">Vineyard Property</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Textarea
            name="message"
            placeholder="Additional information about your property (recent upgrades, special features, etc.)"
            className="min-h-[100px]"
            value={formData.message}
            onChange={handleChange}
          />

          <Button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-amber-500 hover:bg-amber-600 flex justify-center items-center ${
            isLoading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="mr-2 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Valuation Request"
          )}
        </Button>
        </form>
      </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-light">How Our Valuation Process Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Our comprehensive home valuation process is designed to provide you with an accurate assessment of your
              property's current market value.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-500">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Submit Your Request</h3>
              <p className="text-gray-600">
                Fill out our valuation form with details about your property, including location, size, features, and
                condition.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-500">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Property Analysis</h3>
              <p className="text-gray-600">
                Our expert agents analyze your property details, research comparable sales, and evaluate current market
                conditions.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-500">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Receive Your Valuation</h3>
              <p className="text-gray-600">
                Within 48 hours, you'll receive a comprehensive valuation report with our professional assessment of
                your property's value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
                 <TestimonialsSection />
     

      {/* CTA Section */}
      <section className="bg-amber-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-light">Ready to Know Your Home's Value?</h2>
            <p className="mt-4">
              Whether you're planning to sell, refinance, or simply stay informed about your investment, our expert
              valuation will provide you with the insights you need.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button className="gap-2 bg-white text-amber-500 hover:bg-white/90">
                Request Valuation Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
