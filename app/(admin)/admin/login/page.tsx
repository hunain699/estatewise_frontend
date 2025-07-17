"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { API_URL } from '@/config'

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save token in localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminAuthenticated", "true");

      // You can also store name and email if needed
      localStorage.setItem("adminName", data.name);
      localStorage.setItem("adminEmail", data.email);

      // Option 1: Pass name and email via query params
      router.push(`/admin/dashboard?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}`);

      // Option 2 (preferred in complex apps): use context/global state instead of query params
    } else {
      setError(data.message || "Login failed. Please try again.");
      setLoading(false);
    }
  } catch (err) {
    setError("An error occurred. Please try again.");
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <Image src="/logo/5.png" alt="Prime Referral Residence" width={180} height={60} className="mx-auto mb-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Administrator Login</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to access the admin panel</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-primary focus:ring-primary focus:outline-none"
                  placeholder="admin@admin.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-primary focus:ring-primary focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
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
              Processing...
            </>
          ) : (
            "Login"
          )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
