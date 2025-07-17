"use client";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/config";

export default function StripeLayout({ children }: { children: React.ReactNode }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
