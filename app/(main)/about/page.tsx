import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Users, Award, Home, Clock, MapPin, Handshake } from "lucide-react"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import AgentsSection from "@/components/agents-section"
import TestimonialsSection from "@/components/testimonials-section"
import StatCard from "@/components/StatCard"
export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Page Header */}
<section className="relative h-60 sm:h-80">
  <Image
    src="https://www.shutterstock.com/image-vector/water-surface-magic-neon-glow-600nw-2483884465.jpg"
    alt="About WP Residence"
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black/40" />

  <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
    <div className="text-white">
      <h1 className="text-3xl font-light sm:text-4xl md:text-5xl">About Us</h1>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm">
        <Link href="/" className="hover:text-amber-400">Home</Link>
        <span>/</span>
        <span>About</span>
      </div>
    </div>
  </div>
</section>

{/* About Us Section */}
<section className="py-12 sm:py-16">
  <div className="container mx-auto px-4">
    <div className="grid gap-12 md:grid-cols-2">
      {/* Left Text Section */}
      <div>
        <h2 className="mb-6 text-2xl font-light sm:text-3xl">
          Welcome to Estate Wise — Your Trusted Partner in Real Estate Growth
        </h2>

        <div className="space-y-4 text-gray-600 text-sm sm:text-base">
          <p>
            Headquartered in Illinois and proudly serving professionals nationwide, Estate Wise is a premier real estate referral and lead generation agency committed to helping agents close more deals, grow their businesses, and deliver better experiences to clients. With over six years in the industry, we've built a solid reputation as a results-driven partner for real estate professionals across the United States.
          </p>

          <h3 className="font-semibold">Our Mission</h3>
          <p>
            At Estate Wise, our mission is simple: to empower real estate professionals with high-quality opportunities that convert...
          </p>

          <h3 className="font-semibold">What We Do</h3>
          <p>
            We don’t just send you names — we deliver qualified, pre-screened buyer and seller inquiries...
          </p>

          <h4 className="font-semibold">We specialize in:</h4>
          <div className="mt-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {/* Reusable Feature Blocks */}
            {[
              {
                title: "High-Converting Lead Generation",
                desc: "Through a multi-channel approach — including paid ads, outreach, and SEO — we generate and vet serious inquiries.",
              },
              {
                title: "Virtual Assistant Support",
                desc: "Skilled VAs manage follow-ups, CRM, and coordination so you focus on deals.",
              },
              {
                title: "Responsive Web Development",
                desc: "We build optimized IDX-ready sites for real estate pros.",
              },
              {
                title: "Mortgage Broker Referrals",
                desc: "We connect you with trusted mortgage pros for a smooth client journey.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h4 className="mt-6 font-semibold">How We Work:</h4>
          <div className="mt-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {[
              {
                title: "Multi-Channel Marketing Strategy",
                desc: "We use data-driven campaigns (Google, FB, email, landing pages) to attract prospects.",
              },
              {
                title: "Advanced Qualification Process",
                desc: "ISAs vet prospects by verifying ownership, budget, and readiness.",
              },
              {
                title: "Secure, Seamless Client Matching",
                desc: "User-friendly and data-secure platforms simplify agent-client connections.",
              },
              {
                title: "Exclusive Leads & Areas",
                desc: "We assign exclusive areas and leads to boost your conversion rate.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button className="bg-amber-500 hover:bg-amber-600 w-full sm:w-auto">Contact Us</Button>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="relative">
        <div className="relative h-72 sm:h-[400px] w-full overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716"
            alt="WP Residence Office"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute -bottom-4 sm:-bottom-6 sm:-left-6 left-2 h-32 w-32 sm:h-48 sm:w-48 rounded-lg bg-amber-500 p-4 sm:p-6 text-white">
          <div className="mb-1 text-2xl sm:text-4xl font-bold">6+</div>
          <div className="text-sm sm:text-lg">Years of Experience</div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Stats Section */}
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          <StatCard
            icon={<Home className="h-8 w-8 text-amber-500 mx-auto" />}
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

      {/* Our Values */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-light">Our Values</h2>
      <p className="mx-auto mt-4 max-w-2xl text-gray-600">
        At Prime Referral, our core values guide everything we do and shape how we serve our clients.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Integrity */}
      <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg className="h-7 w-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold">Integrity</h3>
        <p className="text-gray-600">
          We conduct our business with the highest ethical standards, ensuring transparency and honesty in every
          transaction and client interaction.
        </p>
      </div>

      {/* Excellence */}
      <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg className="h-7 w-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold">Excellence</h3>
        <p className="text-gray-600">
          We strive for excellence in everything we do, from the properties we represent to the service we provide
          to our valued clients.
        </p>
      </div>

      {/* Client Focus */}
      <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg className="h-7 w-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold">Client Focus</h3>
        <p className="text-gray-600">
          Our client's needs and goals are at the center of everything we do. We're committed to providing
          personalized service that exceeds expectations.
        </p>
      </div>

      {/* Performance Driven Model */}
      <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg className="h-7 w-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold">Performance Driven Model</h3>
        <p className="text-gray-600">
          You only pay a 10–20% referral fee — no monthly charges, no pay-per-lead pricing.
        </p>
      </div>

      {/* Innovation */}
      <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg className="h-7 w-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold">Innovation</h3>
        <p className="text-gray-600">
          We embrace innovative technologies and marketing strategies to provide the best possible service and
          results for our clients.
        </p>
      </div>

      {/* Community */}
      <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg className="h-7 w-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold">Community</h3>
        <p className="text-gray-600">
          We're committed to giving back to the Prime Referral community that has supported us, through charitable
          initiatives and local partnerships.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Our Story */}
     <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Image Grid */}
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 overflow-hidden rounded-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                    alt="WP Residence History"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b"
                    alt="WP Residence Team"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d"
                    alt="Prime Referral Property"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 overflow-hidden rounded-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
                    alt="Luxury Home"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h2 className="mb-6 text-3xl font-light">Let's Grow Together</h2>

            <div className="space-y-4 text-gray-600">
              <p>
                At Estate Wise, we’re more than a referral network —
                we’re a partner in your success. Whether you're a solo agent,
                growing a team, or managing a brokerage, we’re here to help you win more listings,
                close more deals, and build lasting relationships with serious clients.
              </p>
              <p>
                With over six years in the industry, we've
                helped hundreds of agents nationwide grow their business through exclusive,
                pre-screened buyer and seller opportunities. Our performance-based model means you only
                pay a referral fee at closing — so we only succeed when you do.
              </p>
              <p>
                Ready to take the next step? Reach out to us today at <a href="mailto:support@primereferral.us" className="text-amber-500 font-medium">support@primereferral.us</a> or
                fill out the contact form to learn how Estate Wise can become a driving
                force in your real estate growth story.
              </p>
              <p>
                Welcome to Estate Wise — where success starts with trust, quality, and results.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-block rounded-full border-2 border-amber-500 px-8 py-3 font-medium text-amber-500 transition-colors hover:bg-amber-500 hover:text-white"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Our Locations */}
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
                  alt="Estate Wise Office"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">Estate Wise Headquarters</h3>
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

      {/* Our Team */}
      {/* <AgentsSection /> */}

      {/* Testimonials */}
      <TestimonialsSection />
    </main>
  )
}
