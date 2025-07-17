"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PaymentFormProps {
  amount: number
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function PaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // This would normally call your payment processing API
      // For demo purposes, we're just simulating a successful payment
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      if (onError) {
        onError("Payment processing failed. Please try again.")
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Cardholder Name</Label>
        <Input id="name" name="name" placeholder="John Doe" value={cardDetails.name} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="number">Card Number</Label>
        <Input
          id="number"
          name="number"
          placeholder="4242 4242 4242 4242"
          value={cardDetails.number}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            name="expiry"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="cvc">CVC</Label>
          <Input id="cvc" name="cvc" placeholder="123" value={cardDetails.cvc} onChange={handleChange} required />
        </div>
      </div>

      <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600" disabled={isProcessing}>
        <CreditCard className="mr-2 h-4 w-4" />
        {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  )
}
