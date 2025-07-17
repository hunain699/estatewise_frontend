"use client";

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Loader2, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";
import { API_URL } from "@/config";

export default function ContactPage() {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  agreed: false, // used only for validation, not sent to API
});

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.agreed) {
    alert("You must agree to the disclaimer before submitting.");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${API_URL}/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        isResponse: false
      })
    });

    const result = await res.json();

    if (result.success) {
      alert("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        agreed: false // reset after submission
      });
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="relative h-80">
        <Image
          src="https://www.shutterstock.com/image-vector/water-surface-magic-neon-glow-600nw-2483884465.jpg"
          alt="Contact WP Residence"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-light md:text-5xl">Contact Us</h1>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <Link href="/" className="hover:text-amber-400">
                Home
              </Link>
              <span>/</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <MapPin className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Our Location</h3>
              <p className="text-gray-600">Addison IL, 60101</p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Phone className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Phone Number</h3>
              <p className="text-gray-600">(707) 555-1234</p>
              <p className="text-gray-600">(707) 555-5678</p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Mail className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Email Address</h3>
              <p className="text-gray-600">support@primereferral.us</p>
              <p className="text-gray-600">info@primereferral.us</p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Working Hours</h3>
              <p className="text-gray-600">Mon-Fri: 10am-7pm EST</p>
              <p className="text-gray-600">Sat: 10am-4pm EST, Sun: Closed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-light">Get in Touch</h2>
              <p className="mb-8 text-gray-600">
                Have questions about a property or our services? Fill out the form below and our support
                team will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Input
            placeholder="Your Name"
            className="h-12"
            value={formData.name}
            onChange={e => handleChange("name", e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            className="h-12"
            value={formData.email}
            onChange={e => handleChange("email", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Input
            type="tel"
            placeholder="Your Phone"
            className="h-12"
            value={formData.phone}
            onChange={e => handleChange("phone", e.target.value)}
            required
          />
        </div>
        <div>
          <Select
            value={formData.subject}
            onValueChange={value => handleChange("subject", value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
              <SelectItem value="Learning about Services">Learning about Services</SelectItem>
              <SelectItem value="Selling My Property">Selling My Property</SelectItem>
              <SelectItem value="Buying a Property">Buying a Property</SelectItem>
              <SelectItem value="Property Valuation">Property Valuation</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Textarea
          placeholder="Your Message"
          className="min-h-[150px]"
          value={formData.message}
          onChange={e => handleChange("message", e.target.value)}
        />
      </div>
      <div className="flex items-start space-x-3">
  <input
    type="checkbox"
    id="disclaimer"
    required
    className="mt-1"
    checked={formData.agreed || false}
    onChange={e => handleChange("agreed", e.target.checked)}
  />
  <label htmlFor="disclaimer" className="text-sm text-gray-600 leading-snug">
    I Consent to Receive SMS Notifications, Alerts, Reminders, Appointment Confirmation &
     Customer Support Communication from <strong>Estate Wise</strong>. Message frequency 
     may vary with no more than 4 messages per month. Standard message & data rates may apply. 
     Estate Wise will send text messages, phone calls, pre-recorded or artificial voice messages,
      either from their phone system or with their CRM or Automatic Telephone Dialing System (ATDS),
       regarding my submitted query. I reserve the right to unsubscribe at any time by simply texting
        the word ‘STOP’ to <strong>+1 (224) 481-0882</strong>. Text HELP to +1 (224) 481-0882 for 
        assistance. Estate Wise assures me that my privacy will always be safeguarded and respected. 
        <a href="/terms-and-conditions" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">
        Terms of Service</a> and <a href="/privacy-policy" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
  </label>
</div>


      <div>
        <Button
          type="submit"
          className="h-12 bg-amber-500 hover:bg-amber-600"
          disabled={loading}
        >
         {loading ? (
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
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </form>
            </div>

            <div>
              <div className="h-[400px] overflow-hidden rounded-lg bg-gray-200">
  <img
    src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg"
    alt="Map Image"
    className="w-full h-full object-cover"
  />
</div>


              {/* <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold">Connect With Us</h3>
                <p className="mb-6 text-gray-600">
                  Reach out to our support department at any time 
                </p>

                <div className="flex gap-4">
                  <Link href="#" className="rounded-full bg-amber-500 p-3 text-white hover:bg-amber-600">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="rounded-full bg-amber-500 p-3 text-white hover:bg-amber-600">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="rounded-full bg-amber-500 p-3 text-white hover:bg-amber-600">
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="rounded-full bg-amber-500 p-3 text-white hover:bg-amber-600">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
       <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-light">Our Offices</h2>
                  {/* <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                    Visit one of our offices to meet with our expert real estate agents.
                  </p> */}
                </div>
      
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="relative h-48">
                      <Image
                        src="https://www.hok.com/wp-content/uploads/2022/09/lg-north-america-garden-1900.jpg"
                        alt="Prime Referral Office"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold">Prime Referral Headquarters</h3>
                      <div className="mb-4 flex items-center gap-2 text-gray-600">
                        <MapPin className="h-5 w-5 text-amber-500" />
                        <span>Addison IL, 60101</span>
                      </div>
                      <div className="space-y-2 text-gray-600">
                        <p>
                          <span className="font-medium">Phone:</span> +1 217-472-2547
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> info@primereferral.us
                        </p>
                        <p>
                          <span className="font-medium">Hours:</span> Mon-Fri: 9am-6pm, Sat: 10am-4pm
                        </p>
                      </div>
                      <Button variant="outline" className="mt-4 w-full">
                        Get Consultation
                      </Button>
                    </div>
                  </div>
      
                  <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="relative h-48">
                      <Image
                        src="https://media.istockphoto.com/id/1404294992/photo/generic-small-office-buildings-enterprise.jpg?s=612x612&w=0&k=20&c=i3DS7naGl13R9YOYdf-mwXiUjcd_lin48ttHpBHui-4="
                        alt="St. Helena Office"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold">Ohio Office</h3>
                      <div className="mb-4 flex items-center gap-2 text-gray-600">
                        <MapPin className="h-5 w-5 text-amber-500" />
                        <span>Toledo OH, 43606</span>
                      </div>
                      <div className="space-y-2 text-gray-600">
                        <p>
                          <span className="font-medium">Phone:</span> +1 217-335-4846
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> info@primereferral.us
                        </p>
                        <p>
                          <span className="font-medium">Hours:</span> Mon-Fri: 9am-6pm, Sat: 10am-4pm
                        </p>
                      </div>
                      <Button variant="outline" className="mt-4 w-full">
                        Get Consultation
                      </Button>
                    </div>
                  </div>
      
                  <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="relative h-48">
                      <Image
                        src="https://media.istockphoto.com/id/145195124/photo/modern-cube-shaped-office-building-parking-lot-suburban-maryland-usa.jpg?s=612x612&w=0&k=20&c=sf9x4_0NpPjO_bQ3Ib_JpOKrm9pWcly47J59_PBWdaY="
                        alt="Sonoma Office"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold">Florida Office</h3>
                      <div className="mb-4 flex items-center gap-2 text-gray-600">
                        <MapPin className="h-5 w-5 text-amber-500" />
                        <span>Palm Bay FL, 32905</span>
                      </div>
                      <div className="space-y-2 text-gray-600">
                        <p>
                          <span className="font-medium">Phone:</span> +1 217-919-5404
                        </p>
                        <p>
                          <span className="font-medium">Email:</span>   info@primereferral.us
                        </p>
                        <p>
                          <span className="font-medium">Hours:</span> Mon-Fri: 9am-6pm, Sat: 10am-4pm
                        </p>
                      </div>
                      <Button variant="outline" className="mt-4 w-full">
                        Get Consultation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Find answers to common questions about our services and real estate properties.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">How do I schedule a property viewing?</h3>
                <p className="text-gray-600">
                  You can schedule a property viewing by contacting us through our website, calling our office, or
                  reaching out to one of our agents directly. We'll arrange a convenient time for you to visit the
                  property.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">What areas do you serve in?</h3>
                <p className="text-gray-600">
                  We serve all U.S. states except Hawaii and Alaska, with over 600 experienced agents nationwide.
                   Our goal is to help you find your niche and grow your 
                   business with exclusive opportunities and tailored support.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">How can I get a home valuation?</h3>
                <p className="text-gray-600">
                  You can request a home valuation through our website or by contacting one of our agents. We offer
                  complimentary property valuations based on current market conditions, comparable sales, and the unique
                  features of your home.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">What documents do I need to sell my property?</h3>
                <p className="text-gray-600">
                  To sell your property, you'll typically need your property deed, recent tax statements, mortgage
                  information, homeowners association documents (if applicable), and any documentation related to recent
                  improvements or repairs.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="inline-block rounded-full border-2 border-amber-500 px-8 py-3 font-medium text-amber-500 transition-colors hover:bg-amber-500 hover:text-white"
              >
                View All FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
