"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, User, MapPin, Mail, Phone, Building, Calendar, Lock, ListChecks, BadgeCheck, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { API_URL } from "@/config"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "basic"
  const billingCycle = searchParams.get("billing") || "monthly"
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    if (sessionId) {
      fetchPaymentIntent(sessionId);
    }
  }, []);

  const fetchPaymentIntent = async (sessionId: string) => {
    try {
      const res = await fetch(`${API_URL}/payment/session/${sessionId}`);
      if (!res.ok) throw new Error("Failed to fetch session data");

      const data = await res.json();
      setPaymentIntentId(data.paymentIntentId);
    } catch (error) {
      console.error("Error fetching payment intent:", error);
      setPaymentIntentId(null);
    }
  };

  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    license: "",
    mlsId: "",

    brokerageName: "",
    brokerName: "",
    officeEmail: "",
    officePhone: "",
    officeaddress1: "",
    officeaddress2: "",
    city: "",
    state: "",
    zipCode: "",

    primaryArea1: "",
    primaryArea2: "",
    serviceRadius: "",
    secondaryArea1: "",
    secondaryArea2: "",

  })

  const allPackages = {
    // Individual Plans
    basic: {
      name: "Go Basic",
      price: { monthly: 449, yearly: 449,  },
      description: "Perfect for individual agents getting started in real estate",
      type: "Individual",
      features: [
        { name: "Total of 15 - 20 Leads", included: true },
        { name: "Property Search", included: true },
        { name: "Priority Customer Support", included: true },
      ],
    },
    professional: {
      name: "Go Pro",
      price: { monthly: 599, yearly: 599, discount:200 },
      description: "Ideal for growing agents ready to elevate their real estate business",
      type: "Individual",
      features: [
        { name: "Total of 35 - 40 Leads", included: true },
        { name: "Property Search", included: true },
        { name: "Upload Listings", included: true },
        { name: "Priority Customer Support", included: true },
      ],
    },
    premium: {
      name: "Go Ultra",
      price: { monthly: 1099, yearly: 1099, discount:400 },
      description: "Perfect for Pro Agents looking to scale with premium tools and services",
      type: "Individual",
      features: [
        { name: "Total of 55 - 60 Leads", included: true },
        { name: "Property Search", included: true },
        { name: "Upload Listings", included: true },
        { name: "Dedicated Account Manager", included: true },
        { name: "CRM", included: true },
        { name: "Agent Profile", included: true },
      ],
    },
    // Team Plans
    "starter-team": {
      name: "Starter Team",
      price: { monthly: 1749, yearly: 1749 },
      description: "Perfect for small real estate teams getting started",
      type: "Team",
    },
    "growing-team": {
      name: "Growing Team",
      price: { monthly: 1749, yearly: 1749 },
      description: "Ideal for expanding real estate teams and agencies",
      type: "Team",
    },
    "enterprise-team": {
      name: "Enterprise Team",
      price: { monthly: 2999, yearly: 2999 },
      description: "Comprehensive solution for large real estate organizations",
      type: "Team",
    },
  }

  const selectedPackage = allPackages[planId as keyof typeof allPackages]
  const price = selectedPackage.price[billingCycle as keyof typeof selectedPackage.price]

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsProcessing(true)

  try {
    const payload = {
      ...customerInfo,
      packageName: planId, // Assuming planId from search params
      amount: selectedPackage.price.yearly, // Example logic
      isPaid: true,
      stripePaymentIntentId: paymentIntentId
    }

    const res = await fetch(`${API_URL}/pakages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error("Failed to submit package")
    }

    const data = await res.json()
    console.log("Package created:", data)

    setIsSuccess(true)

    // Clear URL params after success:
    const url = new URL(window.location.href)
    url.search = ''  // remove all query parameters
    window.history.replaceState({}, document.title, url.toString())

  } catch (error) {
    console.error("Error submitting package:", error)
    alert("Something went wrong. Please try again.")
  } finally {
    setIsProcessing(false)
  }
}

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gray-50 py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <h1 className="mb-2 text-center text-2xl font-semibold">Payment Successful!</h1>
            <p className="mb-6 text-center text-gray-600">
              Thank you for your purchase. Your subscription to the {selectedPackage.name} plan has been activated.
            </p>
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex justify-between">
                <span className="font-medium">Plan:</span>
                <span>{selectedPackage.name}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-medium">Type:</span>
                <span>{selectedPackage.type}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-medium">Billing:</span>
                <span>{billingCycle === "monthly" ? "Monthly" : "Yearly"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Amount:</span>
                <span>${price}</span>
              </div>
            </div>
            <div className="space-y-4">
              <Button className="w-full bg-amber-500 hover:bg-amber-600" asChild>
                <Link href="https://primereferral.vercel.app/">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="https://primereferral.vercel.app/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 mt-10">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-light">Complete Your Request</h1>
            {/* <div>
        <h1>Checkout Success</h1>
        {paymentIntentId ? (
          <p>Payment Intent ID: {paymentIntentId}</p>
        ) : (
          <p>Loading payment details...</p>
        )}
      </div> */}
          <p className="text-gray-600">Fill in your details and payment information to get started</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Customer Information Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                    Agent Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={customerInfo.firstName}
                        onChange={handleCustomerInfoChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={customerInfo.lastName}
                        onChange={handleCustomerInfoChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={handleCustomerInfoChange}
                          placeholder="john@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleCustomerInfoChange}
                          placeholder="+1 (555) 123-4567"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="license ">License *</Label>
                    <div className="relative">
                      <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="license"
                        name="license"
                        value={customerInfo.license}
                        onChange={handleCustomerInfoChange}
                        placeholder="1223686387"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="mlsId ">MLS ID</Label>
                    <div className="relative">
                      <ListChecks className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="mlsId"
                        name="mlsId"
                        value={customerInfo.mlsId}
                        onChange={handleCustomerInfoChange}
                        placeholder="Enter your MLS ID (e.g., 123456, 789012)"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                    Brokerage Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brokerName">Broker Name *</Label>
                      <Input
                        id="brokerName"
                        name="brokerName"
                        value={customerInfo.brokerName}
                        onChange={handleCustomerInfoChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="brokerageName">Brokerage Name *</Label>
                      <Input
                        id="brokerageName"
                        name="brokerageName"
                        value={customerInfo.brokerageName}
                        onChange={handleCustomerInfoChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="officeEmail">Office Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="officeEmail"
                          name="officeEmail"
                          type="email"
                          value={customerInfo.officeEmail}
                          onChange={handleCustomerInfoChange}
                          placeholder="john@example.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="officePhone">Office Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="officePhone"
                          name="officePhone"
                          value={customerInfo.officePhone}
                          onChange={handleCustomerInfoChange}
                          placeholder="+1 (555) 123-4567"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="officeaddress1">Office Address Line 1 *</Label>
                    <Input
                      id="officeaddress1"
                      name="officeaddress1"
                      value={customerInfo.officeaddress1}
                      onChange={handleCustomerInfoChange}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="officeaddress2">Office Address Line 2</Label>
                    <Input
                      id="officeaddress2"
                      name="officeaddress2"
                      value={customerInfo.officeaddress2}
                      onChange={handleCustomerInfoChange}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleCustomerInfoChange}
                        placeholder="San Francisco"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={customerInfo.state}
                        onChange={handleCustomerInfoChange}
                        placeholder="CA"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={customerInfo.zipCode}
                        onChange={handleCustomerInfoChange}
                        placeholder="94102"
                        required
                      />
                    </div>
                  </div>
                  
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                    Service Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryArea1">Primary Area 1 *</Label>
                      <Input
                        id="primaryArea1"
                        name="primaryArea1"
                        value={customerInfo.primaryArea1}
                        onChange={handleCustomerInfoChange}
                        placeholder="DownTown Miami"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="primaryArea2">Primary Area 2 *</Label>
                      <Input
                        id="primaryArea2"
                        name="primaryArea2"
                        value={customerInfo.primaryArea2}
                        onChange={handleCustomerInfoChange}
                        placeholder="South Beach"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="serviceRadius">Service Radius *</Label>
                    <Input
                      id="serviceRadius"
                      name="serviceRadius"
                      value={customerInfo.serviceRadius}
                      onChange={handleCustomerInfoChange}
                      placeholder="15 mi"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="secondaryArea1">Secondary Area 1 *</Label>
                      <Input
                        id="secondaryArea1"
                        name="secondaryArea1"
                        value={customerInfo.secondaryArea1}
                        onChange={handleCustomerInfoChange}
                        placeholder="DownTown Miami"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryArea2">Secondary Area 2 *</Label>
                      <Input
                        id="secondaryArea2"
                        name="secondaryArea2"
                        value={customerInfo.secondaryArea2}
                        onChange={handleCustomerInfoChange}
                        placeholder="South Beach"
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>

          {/* Order Summary & Payment */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Plan Details */}
                  <div className="rounded-lg bg-amber-50 p-4">
                    <div className="mb-2 flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{selectedPackage.name}</h3>
                        <p className="text-sm text-amber-600">{selectedPackage.type} Plan</p>
                      </div>
                      <span className="text-xl font-bold text-amber-600">${price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{selectedPackage.description}</p>
                   <div className="text-sm text-gray-500">
  {billingCycle === "monthly"
    ? "One-Time subscription"
    : "discount" in selectedPackage.price && selectedPackage.price.discount! > 0
    ? `Limited Time Discount (Save $${selectedPackage.price.discount})`
    : null}
</div>

                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">What's included:</h4>
                    <div className="space-y-1">
                      { "features" in selectedPackage && Array.isArray(selectedPackage.features) ? (
  <>
    {selectedPackage.features.map((feature: any, index: number) => (
      <div key={index} className="flex items-center gap-2 text-sm">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>{feature.name}</span>
      </div>
    ))}
  </>
) : (
  <>
    <div className="flex items-center gap-2 text-sm">
      <CheckCircle className="h-4 w-4 text-green-500" />
      <span>Team Collaboration Tools</span>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <CheckCircle className="h-4 w-4 text-green-500" />
      <span>Lead Distribution System</span>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <CheckCircle className="h-4 w-4 text-green-500" />
      <span>Team Analytics</span>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <CheckCircle className="h-4 w-4 text-green-500" />
      <span>Multiple Agent Profiles</span>
    </div>
  </>
)}

                    </div>
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
  <span>Subtotal</span>
  <span>
    $
    {(
      selectedPackage.price.yearly +
      ("discount" in selectedPackage.price ? selectedPackage.price.discount : 0)
    ).toFixed(2)}
  </span>
</div>

                  {billingCycle === "yearly" &&
  "discount" in selectedPackage.price &&
  selectedPackage.price.discount! > 0 && (
    <div className="flex justify-between text-sm text-green-600">
      <span>Limited Time Discount</span>
      <span>-${selectedPackage.price.discount}</span>
    </div>
)}


                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Paid</span>
                      <span className="text-amber-600">${price}</span>
                    </div>
                  </div>

                  {/* Complete Purchase Button */}
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 mt-6"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Processing...
                      </div>
                    ) : (
                      `Submit Details`
                    )}
                  </Button>

                  <div className="mt-4 text-center text-xs text-gray-500">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Lock className="h-3 w-3" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <p>
                      By completing your purchase, you agree to our{" "}
                      <Link href="/terms-and-conditions" className="text-amber-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy-policy" className="text-amber-600 hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
