"use client"

import type React from "react"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Home, Building, FileText, MessageSquare, Star, DollarSign, LogOut, Menu, X, User, Bell, Phone } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  useEffect(() => {
  const token = localStorage.getItem("adminToken");

  if (!token || pathname === "/admin/login") {
    if (pathname !== "/admin/login") {
      router.push("/admin/login");
    }
    setLoading(false);
    return;
  }

  setIsAuthenticated(true);
  setLoading(false);
}, [pathname, router]);


  const handleLogout = () => {
  localStorage.removeItem("adminAuthenticated");
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminName");
  localStorage.removeItem("adminEmail");
  router.push("/admin/login");
};


  // Don't apply layout to login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Properties", href: "/admin/properties", icon: Building },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Contact Us", href: "/admin/contact", icon: Phone },
    { name: "Feedbacks", href: "/admin/feedbacks", icon: Star },
    { name: "Payments", href: "/admin/payments", icon: DollarSign },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/admin/dashboard" className="flex items-center">
              <Image src="/logo/2.png" alt="Prime Referral Residence" width={150} height={50} />
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive(item.href) ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  } group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors`}
                >
                  <item.icon
                    className={`${
                      isActive(item.href) ? "text-white" : "text-gray-500 group-hover:text-gray-700"
                    } mr-3 flex-shrink-0 h-5 w-5 transition-colors`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-500" />
              Logout
            </button>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/"
                className="flex items-center px-3 py-2 text-sm font-medium text-primary rounded-md hover:bg-gray-100 transition-colors"
              >
                Return to Website
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-gray-700">
              <Menu size={24} />
            </button>

            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">Welcome {name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
