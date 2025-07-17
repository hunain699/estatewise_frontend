"use client"

import { useEffect, useState } from "react"
import { Building, FileText, MessageSquare, Star, DollarSign, Users } from "lucide-react"
import Link from "next/link"
import { API_UPLOAD, API_URL } from "@/config"

export default function AdminDashboard() {
const [data, setData] = useState<{
  totalProperties: number
  totalBlogs: number
  totalInquiries: number
  totalFeedbacks: number
  totalPayments: number
  totalUsers: number
  recentProperties: {
    id: number
    title: string
    price: string
    status: string
    images: string[]
    createdAt?: string
  }[]
  recentInquiries: {
    id: number
    name: string
    email: string
    subject: string
    date: string
  }[]
}>({
  totalProperties: 0,
  totalBlogs: 0,
  totalInquiries: 0,
  totalFeedbacks: 0,
  totalPayments: 0,
  totalUsers: 0,
  recentProperties: [],
  recentInquiries: [],
})



  const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchData = async () => {
    try {
      const [
        propertiesRes,
        blogsRes,
        inquiriesRes,
        feedbacksRes,
        packagesRes,
        usersRes
      ] = await Promise.all([
        fetch(`${API_URL}/properties`),
        fetch(`${API_URL}/blogs/`),
        fetch(`${API_URL}/Inquiries/`),
        fetch(`${API_URL}/feedbacks`),
        fetch(`${API_URL}/pakages`),
        fetch(`${API_URL}/users/`)
      ])

      const [
        properties,
        blogs,
        inquiries,
        feedbacks,
        packages,
        users
      ] = await Promise.all([
        propertiesRes.json(),
        blogsRes.json(),
        inquiriesRes.json(),
        feedbacksRes.json(),
        packagesRes.json(),
        usersRes.json()
      ])

      const latestProperties = [...properties]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)

      const latestInquiries = [...inquiries]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3)

      setData({
        totalProperties: properties.length,
        totalBlogs: blogs.length,
        totalInquiries: inquiries.length,
        totalFeedbacks: feedbacks.length,
        totalPayments: packages.length,
        totalUsers: users.length,
        recentProperties: latestProperties,
        recentInquiries: latestInquiries,
      })

    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [])


  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string
    value: number
    icon: any
    color: string
  }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
      <div className={`rounded-full p-3 ${color} text-white mr-4`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  )
  useEffect(() => {
  const fetchData = async () => {
    try {
      const propertiesRes = await fetch(`${API_URL}/properties`)
      const properties = await propertiesRes.json()

      // Sort by creation date (if available) and take the latest 3
      const latestProperties = [...properties]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)

      setData((prev) => ({
        ...prev,
        totalProperties: properties.length,
        recentProperties: latestProperties,
      }))
    } catch (error) {
      console.error("Error fetching recent properties:", error)
    }
  }
  const fetchData1 = async () => {
  try {
    const inquiriesRes = await fetch(`${API_URL}/Inquiries/`)
    const inquiries = await inquiriesRes.json()

    const latestInquiries = [...inquiries]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)

    setData(prev => ({
      ...prev,
      totalInquiries: inquiries.length,
      recentInquiries: latestInquiries,
    }))
  } catch (error) {
    console.error("Error fetching inquiries:", error)
  }
}

  fetchData1()
  fetchData()
}, [])


  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Prime Referral Residence admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Properties" value={data.totalProperties} icon={Building} color="bg-primary" />
        <StatCard title="Total Blogs" value={data.totalBlogs} icon={FileText} color="bg-blue-500" />
        <StatCard title="Total Inquiries" value={data.totalInquiries} icon={MessageSquare} color="bg-green-500" />
        <StatCard title="Feedback Count" value={data.totalFeedbacks} icon={Star} color="bg-yellow-500" />
        <StatCard title="Total Payments" value={data.totalPayments} icon={DollarSign} color="bg-purple-500" />
        <StatCard title="Active Users" value={data.totalUsers} icon={Users} color="bg-pink-500" />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Properties</h2>
            <Link href="/admin/properties" className="text-primary text-sm hover:underline">
              View All
            </Link>
          </div>
         <div className="divide-y divide-gray-200">
  {data.recentProperties.map((property) => (
    <div key={property.id} className="px-6 py-4 flex items-center">
      <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={`${API_UPLOAD}/${property.images[0]}`}
          alt={property.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium text-gray-900">{property.title}</h3>
        <p className="text-sm text-gray-500">{property.price}</p>
      </div>
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          property.status === "Available"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {property.status}
      </span>
    </div>
  ))}
</div>

        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-primary text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {data.recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="px-6 py-4">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{inquiry.name}</h3>
                  <span className="text-xs text-gray-500">{inquiry.date}</span>
                </div>
                <p className="text-sm text-gray-500">{inquiry.email}</p>
                <p className="text-sm text-gray-700 mt-1">{inquiry.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/properties/new"
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Building className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium text-gray-700">Add Property</span>
          </Link>
          <Link
            href="/admin/blogs/new"
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-8 w-8 text-blue-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Create Blog Post</span>
          </Link>
          <Link
            href="/admin/inquiries"
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageSquare className="h-8 w-8 text-green-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">View Inquiries</span>
          </Link>
          <Link
            href="/admin/payments"
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <DollarSign className="h-8 w-8 text-purple-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Manage Payments</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
