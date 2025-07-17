"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { X, User, Mail, MessageSquare, Star, Save, ArrowLeft, Plus } from "lucide-react"
import { API_URL } from '@/config'

export default function NewFeedback() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    comments: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const form = new FormData()
     const response = await fetch(`${API_URL}/feedbacks/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    rating: formData.rating,
    comment: formData.comments, // Backend expects `comment`, not `comments`
  }),
})


      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit feedback")
      }

      alert("Feedback submitted successfully!")
      router.push("/admin/feedbacks")
    } catch (error: any) {
      console.error("Error submitting feedback:", error)
      alert(error.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Feedback</h1>
          <p className="text-gray-600">Submit feedback from customers</p>
        </div>
        <Link
          href="/admin/feedbacks"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Feedbacks
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Feedback Information</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Star className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="rating"
                  name="rating"
                  required
                  value={formData.rating}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="">Select rating</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                Comments*
              </label>
              <textarea
                id="comments"
                name="comments"
                rows={5}
                required
                value={formData.comments}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Write your comments here..."
              />
            </div>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-end">
          <Link
            href="/admin/feedbacks"
            className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Save Feedback
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
