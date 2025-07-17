"use client"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, XCircle, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { API_URL } from "@/config"
import { LinkButton } from "@/components/ui/linkbutton";

export default function PackagesPage() {
  const teamPackages = [
    // {
    //   id: "starter-team",
    //   name: "Starter Team",
    //   price: {
    //     monthly: 1749,
    //     yearly: 1749,
    //   },
    //   description: "Perfect for small real estate teams getting started",
    //   features: [
    //     { name: "11% Referral Fee", included: true },
    //     { name: "Upto 3 Agents", included: true },
    //     { name: "Upto 5 Scheduled Appointments", included: true },
    //     { name: "4 Zip / 2 Cities / 2 Countries", included: true },
    //     { name: "S.E.O Profile", included: true },
    //     { name: "1 CRM Account", included: true },
    //     { name: "Dedicated Team Manager", included: true },
    //   ],
    // },
    {
      id: "growing-team",
      name: "Growing Team",
      price: {
        monthly: 1749,
        yearly: 1749,
      },
      stripePriceId: "prod_SP3CSKZ8af13Gv",
      description: "Perfect for small real estate teams getting started",
      popular: true,
      features: [
        { name: "12% Referral Fee", included: true },
        { name: "Upto 5 Agents", included: true },
        { name: "Live Transfer", included: true },
        { name: "Desired Areas", included: true },
        { name: "S.E.O Profile", included: true },
        { name: "1 CRM Account", included: true },
        { name: "Customer Support", included: true },
      ],
    },
    {
      id: "enterprise-team",
      name: "Enterprise Team",
      price: {
        monthly: 2999,
        yearly: 2999,
      },
      stripePriceId: "prod_SP3Hst06pLVSbS",
      description: "Comprehensive solution for large real estate organizations",
      features: [
        { name: "10% Referral Fee", included: true },
        { name: "Upto 7 Agents", included: true },
        { name: "Live Transfer", included: true },
        { name: "Exclusive Areas", included: true },
        { name: "S.E.O Profile", included: true },
        { name: "6 CRM Accounts with 1 Master Access", included: true },
        { name: "Dedicated Team Manager", included: true },
      ],
    },
  ]

  const yearlyPackages = [
    {
      id: "basic",
      name: "Go Basic",
      price: {
        monthly: 449,
        yearly: 449,
      },
      stripePriceId: "price_1QsG7UJM9A8ABnWIGngDlmkD",
      description: "Perfect for individual agents getting started in real estate",
      features: [
        { name: "20% Referral Fee", included: true },
        { name: "Total of 15 - 20 Leads", included: true },
        { name: "Desired Areas", included: true },
        { name: "AI Verified Leads", included: true },
        { name: "Pre-Screened Leads", included: true },
        { name: "Exclusive Leads", included: true },
        { name: "Customer Support", included: true },
        { name: "Upload Listing", included: false },
        { name: "Customized Marketing Campaign", included: false },
        { name: "CRM", included: false },
        { name: "Dedicated Account Manager", included: false },
      ],
    },
    {
      id: "professional",
      name: "Go Pro",
      price: {
        monthly: 599,
        yearly: 599,
        discount: 200,
      },
      stripePriceId: "price_1QsG8mJM9A8ABnWINN8kgfNk",
      description: "Ideal for growing agents ready to elevate their real estate business",
      popular: true,
      features: [
        { name: "15% Referral Fee", included: true },
        { name: "Total of 35 - 40 Leads", included: true },
        { name: "Desired Areas", included: true },
        { name: "ISA Verified Leads", included: true },
        { name: "Scheduled Appointments", included: true },
        { name: "Exclusive Leads", included: true },
        { name: "Priority Customer Support", included: true },
        { name: "Upload Listing", included: true },
        { name: "Customized Marketing Campaign", included: false },
        { name: "CRM", included: false },
        { name: "Dedicated Account Manager", included: false },
      ],
    },
    {
      id: "premium",
      name: "Go Ultra",
      price: {
        monthly: 1099,
        yearly: 1099,
        discount: 400,
      },
      stripePriceId: "price_1QsG9RJM9A8ABnWIbQqfj2k8",
      description: "Perfect for Pro Agents looking to scale with premium tools and services",
      features: [
        { name: "10% Referral Fee", included: true },
        { name: "Total of 55 - 60 Leads", included: true },
        { name: "Exclusive Areas", included: true },
        { name: "ISA Verified Leads", included: true },
        { name: "Scheduled Appointments", included: true },
        { name: "Live Transfer", included: true },
        { name: "Exclusive Leads", included: true },
        { name: "Upload Listings", included: true },
        { name: "Customized Marketing Campaign", included: true },
        { name: "CRM", included: true },
        { name: "Dedicated Account Manager", included: true },
      ],
    },
  ]
  const handleCheckout = async (pkg: any, billing: string) => {
  const price = billing === "yearly" ? pkg.price.yearly : pkg.price.monthly;

  const res = await fetch(`${API_URL}/payment/checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: pkg.name,
      amount: price,
      planId: pkg.id,
      billing,
      stripePriceId: pkg.stripePriceId, // 🟢 Added line
    }),
  });

  const data = await res.json();

  if (data.url) {
    window.location.href = data.url;
  }
};

  const renderPackageCard = (pkg: any, billing: string) => (
  <div
    key={pkg.id}
    className={`relative rounded-lg border w-full sm:max-w-md mx-auto
      ${pkg.popular ? "border-amber-500 hover:border-amber-600" : "border-gray-200 hover:border-gray-400"} 
      bg-white shadow-sm transition-all hover:shadow-2xl`}
  >
    {pkg.popular && (
      <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-amber-500 px-4 py-1 text-sm font-medium text-white">
        Most Popular
      </div>
    )}

    <div className="p-5 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-semibold">{pkg.name}</h3>

      <div className="mt-4">
        {/* Crossed out price */}
        {pkg.price.discount && pkg.price.discount > 0 && (
  <div className="text-red-700 line-through text-sm font-bold">
    ${(pkg.price.yearly + pkg.price.discount).toFixed(2)}
  </div>
)}
        {/* Actual price */}
        <span className="text-3xl sm:text-4xl font-bold">
          ${(billing === "yearly" ? pkg.price.yearly : pkg.price.monthly).toFixed(2)}
        </span>
        <span className="text-gray-500">/{billing === "yearly" ? "year" : "One-Time"}</span>
      </div>

      <p className="mt-2 text-sm sm:text-base text-gray-600">{pkg.description}</p>

      <div className="mt-6 space-y-3">
        {pkg.features.map((feature: any) => (
          <div key={feature.name} className="flex items-center gap-2">
            {feature.included ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-gray-300" />
            )}
            <span className={feature.included ? "text-gray-700" : "text-gray-400"}>{feature.name}</span>
          </div>
        ))}
      </div>

      {/* <div className="mt-8">
        <Link
          href={`/packages/checkout?plan=${pkg.id}&billing=${billing}`}
          className="block w-full rounded-lg border border-amber-500 py-3 text-center font-medium text-amber-500 hover:bg-amber-50 transition"
        >
          Select Plan
        </Link>
      </div> */}
      <div className="mt-8">
      <LinkButton
  onClick={() => handleCheckout(pkg, billing)}
  className="block w-full rounded-lg border border-amber-500 py-3 text-center font-medium text-amber-500 hover:bg-amber-50 transition"
>
  Select Plan
</LinkButton>
</div>  

    </div>
  </div>
);


  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="relative h-80 sm:h-96 md:h-[28rem]">
  <Image
    src="https://www.shutterstock.com/image-vector/water-surface-magic-neon-glow-600nw-2483884465.jpg"
    alt="Packages - WP Residence"
    fill
    priority
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black/40" />
  <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-white">
    <div>
      <h1 className="text-3xl font-light md:text-5xl">Our Packages</h1>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
        <Link href="/" className="hover:text-amber-400 transition">
          Home
        </Link>
        <span>/</span>
        <span>Packages</span>
      </div>
    </div>
  </div>
</section>


      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
  <div className="container mx-auto max-w-7xl">
    <div className="mb-12 text-center px-2 sm:px-0">
      <h2 className="text-2xl sm:text-3xl font-light">Choose the Perfect Plan for Your Real Estate Business</h2>
      <p className="mx-auto mt-4 max-w-xl text-gray-600 text-sm sm:text-base">
        Select from our individual plans or team solutions designed to meet the needs of agents, teams, and
        brokerages of all sizes.
      </p>
    </div>

    <Tabs defaultValue="yearly" className="mx-auto mb-12 w-full max-w-md sm:max-w-fit">
      <TabsList className="grid grid-cols-2 text-center w-full max-w-md sm:w-80 bg-gray-100 rounded-lg overflow-x-auto no-scrollbar">
        <TabsTrigger
          value="yearly"
          className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md transition-colors data-[state=active]:bg-amber-500 data-[state=active]:text-white whitespace-nowrap"
        >
          <Calendar className="h-4 w-4" />
          Individual Plans
        </TabsTrigger>
        <TabsTrigger
          value="team"
          className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md transition-colors data-[state=active]:bg-amber-500 data-[state=active]:text-white whitespace-nowrap"
        >
          <Users className="h-4 w-4" />
          Team Plans
        </TabsTrigger>
      </TabsList>

      <TabsContent value="team" className="mt-8">
        <div className="mb-4 text-center px-2">
          <p className="text-lg font-medium text-amber-600">Team Collaboration Solutions</p>
          <p className="text-gray-600 text-sm sm:text-base">Perfect for real estate teams and agencies</p>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-2">
          {teamPackages.map((pkg) => renderPackageCard(pkg, "monthly"))}
        </div>
      </TabsContent>

      <TabsContent value="yearly" className="mt-8">
        <div className="mb-4 text-center px-2">
          <p className="text-lg font-medium text-amber-600">Individual Agent Plans</p>
          <p className="text-gray-600 text-sm sm:text-base mb-4">Limited-time offer — Secure Your Areas now and save big!</p>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-2">
          {yearlyPackages.map((pkg) => renderPackageCard(pkg, "yearly"))}
        </div>
      </TabsContent>
    </Tabs>


<p className="mt-2 text-[#32c96a] text-lg sm:text-xl md:text-2xl font-bold text-center mb-10">
  Cherry On Top — Your Signup Fee is 100% Reimbursable!
</p>

    <div className="mx-auto max-w-3xl rounded-lg bg-gray-50 p-6 text-center shadow-sm">
      <h3 className="text-xl font-semibold">Need a Custom Solution?</h3>
      <p className="mt-2 text-gray-600 text-sm sm:text-base">
        Contact us for custom enterprise solutions tailored to your specific business needs.
      </p>
      <Button className="mt-4 bg-amber-500 hover:bg-amber-600 transition">Contact Sales</Button>
    </div>
  </div>
</section>


      {/* Features Comparison */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
         <div className="mb-12 text-center px-4 sm:px-0">
  <h2 className="text-2xl sm:text-3xl font-light">Features Comparison</h2>
  <p className="mx-auto mt-4 max-w-xs sm:max-w-2xl text-gray-600 text-sm sm:text-base">
    Compare our packages to find the perfect fit for your real estate business.
  </p>
</div>


          <Tabs defaultValue="individual" className="mx-auto">
            <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
              <TabsTrigger value="individual">Individual Plans</TabsTrigger>
              <TabsTrigger value="team">Team Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="individual">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse rounded-lg bg-white shadow-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left">Features</th>
                      <th className="p-4 text-center">Go Basic</th>
                      <th className="p-4 text-center">Go Pro</th>
                      <th className="p-4 text-center">Go Ultra</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium">No. of Leads</td>
                      <td className="p-4 text-center">15 - 20 Leads</td>
                      <td className="p-4 text-center">35 - 40 Leads</td>
                      <td className="p-4 text-center">55 - 60 Leads</td>
                    </tr>
                     <tr className="border-b">
                      <td className="p-4 font-medium">Human Verified Leads</td>
                       <td className="p-4 text-center">
                        <XCircle className="mx-auto h-5 w-5 text-gray-300" />
                      </td>
                       <td className="p-4 text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                       <td className="p-4 text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Average Conversion Ratio</td>
                      <td className="p-4 text-center font-medium">5 - 10%</td>
                      <td className="p-4 text-center font-medium">15%</td>
                      <td className="p-4 text-center font-medium">15%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Scheduled Appointment</td>
                       <td className="p-4 text-center">
                        <XCircle className="mx-auto h-5 w-5 text-gray-300" />
                      </td>
                       <td className="p-4 text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                       <td className="p-4 text-center">
                        + Live Transfers
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Property Listings</td>
                      <td className="p-4 text-center">
                        <XCircle className="mx-auto h-5 w-5 text-gray-300" />
                      </td>
                      <td className="p-4 text-center">25 Listings</td>
                      <td className="p-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">CRM</td>
                      <td className="p-4 text-center">
                        <XCircle className="mx-auto h-5 w-5 text-gray-300" />
                      </td>
                      <td className="p-4 text-center">
                        <XCircle className="mx-auto h-5 w-5 text-gray-300" />
                      </td>
                      <td className="p-4 text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Support</td>
                      <td className="p-4 text-center">Email</td>
                      <td className="p-4 text-center">Email & Phone</td>
                      <td className="p-4 text-center">24/7 Priority</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse rounded-lg bg-white shadow-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left">Features</th>
                      <th className="p-4 text-center">Growing Team</th>
                      <th className="p-4 text-center">Enterprise Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Team Members</td>
                      <td className="p-4 text-center">Up to 5</td>
                      <td className="p-4 text-center">Up to 7</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Property Listings</td>
                      <td className="p-4 text-center">60 Listings</td>
                      <td className="p-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Team Collaboration</td>
                      <td className="p-4 text-center">Advanced Tools</td>
                      <td className="p-4 text-center">Enterprise Tools</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Custom Branding</td>
                      <td className="p-4 text-center">
                        <XCircle className="mx-auto h-5 w-5 text-gray-300" />
                      </td>
                      <td className="p-4 text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Support</td>
                      <td className="p-4 text-center">Email & Phone</td>
                      <td className="p-4 text-center">24/7 + Account Manager</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-12 sm:py-16">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mb-8 sm:mb-12 text-center px-2 sm:px-0">
      <h2 className="text-2xl sm:text-3xl font-light">Frequently Asked Questions</h2>
      <p className="mx-auto mt-3 max-w-xs sm:max-w-2xl text-gray-600 text-sm sm:text-base">
        Find answers to common questions about our packages and subscription plans.
      </p>
    </div>

    <div className="mx-auto max-w-full sm:max-w-3xl px-2 sm:px-0">
      <div className="space-y-4 sm:space-y-6">
        <div className="rounded-lg bg-gray-50 p-4 sm:p-6 shadow-sm">
          <h3 className="mb-1 sm:mb-2 text-base sm:text-lg font-semibold">Can I upgrade or downgrade my plan?</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the
            prorated difference for the remainder of your billing cycle. When downgrading, the changes will take
            effect at the start of your next billing cycle.
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 sm:p-6 shadow-sm">
          <h3 className="mb-1 sm:mb-2 text-base sm:text-lg font-semibold">What's the difference between Team and Individual plans?</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Team plans are designed for real estate agencies and teams with multiple agents. They include
            collaboration tools, lead distribution, and team management features. Individual plans are perfect for
            solo agents and small operations.
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 sm:p-6 shadow-sm">
          <h3 className="mb-1 sm:mb-2 text-base sm:text-lg font-semibold">Is there a contract or commitment?</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            There are no long-term contracts or commitments. Monthly plans can be canceled at any time. Yearly
            plans offer a discount but are paid upfront for the full year. We offer a 30-day money-back guarantee
            for all new subscriptions.
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 sm:p-6 shadow-sm">
          <h3 className="mb-1 sm:mb-2 text-base sm:text-lg font-semibold">Do you offer custom enterprise solutions?</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Yes, we offer custom enterprise solutions for larger brokerages and real estate companies with
            specific needs. Please contact our sales team to discuss your requirements and receive a tailored
            quote.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

    </main>
  )
}
