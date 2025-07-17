import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqCategories = [
    {
      id: "buying",
      title: "Buying a Property",
      faqs: [
        {
          question: "What should I consider when buying a property?",
          answer:
            "When buying a property, consider factors such as location, property type, budget, financing options, and long-term goals. It's also important to research local zoning regulations, especially if you're interested in residential properties or planning renovations. Working with a real estate agent who can provide valuable insights into the local market.",
        },
        {
          question: "How do I get pre-approved for a mortgage?",
          answer:
            "To get pre-approved for a mortgage, contact a lender or mortgage broker who will review your financial information, including credit score, income, assets, and debts. They'll provide a pre-approval letter indicating how much you can borrow. This process helps you understand your budget and shows sellers you're a serious buyer. We can recommend trusted local lenders who are familiar with Real Estate properties.",
        },
        {
          question: "What is the process for making an offer on a property?",
          answer:
            "Making an offer involves submitting a purchase agreement that specifies the price, terms, contingencies, and timeline. Your real estate agent will help you determine a competitive offer based on market analysis and guide you through negotiations. Once accepted, you'll proceed with inspections, secure financing, and complete other contingencies before closing the transaction.",
        },
        {
          question: "How long does the buying process typically take?",
          answer:
            "The buying process typically takes 30-60 days from accepted offer to closing, depending on financing, inspections, and other contingencies. Cash purchases can close more quickly, while complex properties like vineyards may take longer due to additional due diligence requirements. Your agent will provide a timeline based on your specific situation.",
        },
      ],
    },
    {
      id: "selling",
      title: "Selling Your Property",
      faqs: [
        {
          question: "What is my property worth in the current market?",
          answer:
            "Your property's worth depends on location, size, condition, features, and current market conditions. Our agents provide comprehensive market analyses using recent comparable sales, current inventory, and local market trends. For a personalized valuation of your property, we offer complimentary property assessments.",
        },
        {
          question: "How should I prepare my home for sale?",
          answer:
            "Prepare your home by decluttering, deep cleaning, making necessary repairs, and enhancing curb appeal. Consider professional staging to showcase your property's potential. Our agents can provide specific recommendations for your property and connect you with trusted service providers. Strategic preparation can significantly impact your sale price and time on market.",
        },
        {
          question: "What marketing strategies will you use to sell my property?",
          answer:
            "We employ a comprehensive marketing approach including professional photography, virtual tours, targeted digital advertising, social media promotion, listing on major real estate platforms, and exposure to our extensive network of buyers and agents. For luxury and vineyard properties, we implement specialized marketing to reach qualified buyers in relevant markets.",
        },
        {
          question: "How long will it take to sell my property?",
          answer:
            "The time to sell varies based on market conditions, property type, location, condition, and pricing strategy. Homes typically sell within 30-90 days when priced appropriately. Luxury and vineyard properties may have longer marketing periods due to their specialized nature. Our agents will provide realistic expectations based on current market analysis.",
        },
      ],
    },
    {
      id: "investment",
      title: "Investment Properties",
      faqs: [
        {
          question: "Is real estate a good investment?",
          answer:
            "Real estate has historically been a strong investment due to limited supply, desirable location, and the region's reputation. Properties tend to hold value well and appreciate over time, particularly in prime locations. Vineyard and luxury properties can offer both lifestyle benefits and investment returns. Our agents can provide market analysis and investment insights based on your specific goals.",
        },
        {
          question: "What types of investment properties are available?",
          answer:
            "Various investment opportunities including residential rental properties, vacation rentals, vineyard estates, commercial buildings, and development land. Each type has different return profiles, management requirements, and regulatory considerations. Our investment specialists can help you evaluate options aligned with your investment goals and risk tolerance.",
        },
        {
          question: "What is the typical return on investment for Real Estate properties?",
          answer:
            "Returns vary by property type, location, and management strategy. Residential rentals typically yield 3-5% annual returns, while vacation rentals can generate higher returns but require more active management. Vineyard properties combine agricultural business returns with potential land appreciation. Commercial properties often offer stable returns from long-term leases. We can provide detailed analysis for specific investment opportunities.",
        },
        {
          question: "Are there special considerations for purchasing vineyard property as an investment?",
          answer:
            "Vineyard investments require understanding agricultural operations, water rights, soil quality, grape contracts, and wine industry dynamics. They typically combine agricultural business returns with real estate appreciation. These properties often have specific zoning regulations and may qualify for agricultural tax benefits. Our vineyard specialists can guide you through the unique aspects of these investments.",
        },
      ],
    },
    {
      id: "financing",
      title: "Financing & Mortgages",
      faqs: [
        {
          question: "What financing options are available for Real Estate properties?",
          answer:
            "Financing options include conventional mortgages, jumbo loans for high-value properties, FHA and VA loans for eligible buyers, and specialized agricultural loans for vineyard properties. Interest rates and terms vary by lender, property type, and borrower qualifications. We work with experienced local lenders who understand the nuances of real estate.",
        },
        {
          question: "How much down payment is typically required?",
          answer:
            "Down payment requirements vary by loan type and property. Conventional loans typically require 10-20%, while jumbo loans for luxury properties may require 20-30%. FHA loans may allow down payments as low as 3.5% for eligible buyers. Investment properties generally require larger down payments than primary residences. Our mortgage partners can provide specific guidance based on your situation.",
        },
        {
          question: "What are the current mortgage interest rates?",
          answer:
            "Mortgage rates fluctuate based on economic factors, loan type, term, and borrower qualifications. We can connect you with mortgage professionals who will provide current rates and help you understand how they apply to your specific situation. Comparing offers from multiple lenders is recommended to secure the best terms.",
        },
        {
          question: "Are there special loan programs for vineyard or agricultural properties?",
          answer:
            "Yes, specialized agricultural loans are available for vineyard properties through lenders like Farm Credit and banks with agricultural lending expertise. These loans may offer terms tailored to agricultural business cycles and may consider both the real estate value and the agricultural operation. Our vineyard specialists can connect you with lenders experienced in financing wine country properties.",
        },
      ],
    },
    {
      id: "services",
      title: "Our Services",
      faqs: [
        {
          question: "What services does Prime Referral provide?",
          answer:
            "Prime Referral offers comprehensive real estate services including property buying and selling, investment property guidance, vineyard property expertise, luxury home marketing, property management, and real estate consulting. Our team specializes in Real Estate properties and provides personalized service tailored to each client's unique needs.",
        },
        {
          question: "How do your agent commissions work?",
          answer:
            "Our commission structure is competitive with industry standards and varies based on property type, price range, and specific services required. Commission is typically paid by the seller at closing and is split between the listing and buyer's agents. We're transparent about our fee structure and will discuss details during our initial consultation.",
        },
        {
          question: "Do you offer property management services?",
          answer:
            "Yes, we offer property management services for residential rentals, vacation properties, and vineyard estates. Our services include tenant screening, rent collection, maintenance coordination, financial reporting, and compliance with local regulations. We can customize our management approach based on your property type and involvement preferences.",
        },
        {
          question: "What makes Prime Referral different from other real estate agencies?",
          answer:
            "Prime Referral distinguishes itself through deep local expertise, specialized knowledge of vineyard and luxury properties, personalized service, innovative marketing strategies, and a commitment to client satisfaction. Our agents live and work in Real Estate and bring insider knowledge that benefits our clients. We maintain high ethical standards and focus on building long-term relationships rather than just transactions.",
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="relative h-80">
        <Image
          src="https://www.shutterstock.com/image-vector/water-surface-magic-neon-glow-600nw-2483884465.jpg"
          alt="Frequently Asked Questions - Prime Referral"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-light md:text-5xl">Frequently Asked Questions</h1>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <Link href="/" className="hover:text-amber-400">
                Home
              </Link>
              <span>/</span>
              <span>FAQs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-light">How Can We Help You?</h2>
            <p className="mt-4 text-gray-600">
              Search our FAQ for answers to commonly asked questions about real estate properties.
            </p>

            <div className="mt-6 relative">
              <Input type="text" placeholder="Search for answers..." className="h-12 pl-10 pr-4" />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Button className="absolute right-0 top-0 h-full rounded-l-none bg-amber-500 hover:bg-amber-600">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {faqCategories.map((category) => (
              <div key={category.id} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-xl font-semibold">{category.title}</h3>

                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`${category.id}-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-amber-500 p-8 text-center text-white md:p-12">
            <h2 className="text-3xl font-light">Still Have Questions?</h2>
            <p className="mx-auto mt-4 max-w-2xl">
              If you couldn't find the answer to your question, our team is here to help. Contact us directly and we'll
              get back to you as soon as possible.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button className="bg-white text-amber-500 hover:bg-white/90">Contact Us</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                (224) 224-5631
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
