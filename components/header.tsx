"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/packages" },
    { name: "Properties", href: "/properties" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Home Valuation", href: "/valuation" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isHomePage
          ? scrolled
            ? "bg-white shadow-md text-gray-800"
            : "bg-transparent text-white"
          : "bg-white shadow-md text-gray-800",
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
       

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.slice(0, 5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-amber-400 transition",
                pathname === link.href
                  ? "text-amber-500 font-semibold"
                  : isHomePage && !scrolled
                    ? "text-white"
                    : "text-gray-800"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="relative flex-1 md:flex-none flex justify-center md:justify-start">
  <Link href="/" className="relative h-12 w-36">
    <Image src="/logo/5.png" alt="WP Residence Logo" fill className="object-contain" />
  </Link>
</div>


        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/contact"
            className={cn(
              "hover:text-amber-400",
              pathname === "/contact"
                ? "text-amber-500 font-semibold"
                : isHomePage && !scrolled
                  ? "text-white"
                  : "text-gray-800"
            )}
          >
            Contact
          </Link>
          <Link
            href="/valuation"
            className={cn(
              "hover:text-amber-400",
              pathname === "/valuation"
                ? "text-amber-500 font-semibold"
                : isHomePage && !scrolled
                  ? "text-white"
                  : "text-gray-800"
            )}
          >
            Home Valuation
          </Link>
          <Link href="tel:+12242245631" className="flex items-center gap-2 text-amber-500 hover:text-amber-400">
            <Phone className="h-4 w-4" />
            <span>+1 (224) 224 5631</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-inherit focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={cn(
          "md:hidden transition-all duration-300 bg-white shadow-md text-gray-800",
          isHomePage && !scrolled && "bg-white text-gray-800"
        )}>
          <nav className="flex flex-col items-start gap-4 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "w-full py-2 border-b border-gray-200 hover:text-amber-500",
                  pathname === link.href ? "text-amber-500 font-semibold" : ""
                )}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="tel:+12242245631"
              className="flex items-center gap-2 text-amber-500 hover:text-amber-400 mt-2"
            >
              <Phone className="h-4 w-4" />
              <span>+1 (224) 224 5631</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
