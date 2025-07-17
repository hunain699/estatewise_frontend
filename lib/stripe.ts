// lib/stripe.ts
import { STRIPE_PUBLIC_KEY } from "@/config";
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
    