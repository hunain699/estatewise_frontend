import Link from "next/link"
import Image from "next/image"
import { Home, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="relative mb-8 h-40 w-40">
          <Image src="/404.svg" alt="404 Not Found" fill />
        </div>

        <h1 className="text-5xl font-light">404</h1>
        <h2 className="mt-2 text-3xl font-light">Page Not Found</h2>

        <p className="mx-auto mt-6 max-w-md text-gray-600">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button className="gap-2 bg-amber-500 hover:bg-amber-600">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
          <Button variant="outline" className="gap-2">
            <Search className="h-4 w-4" />
            Search Properties
          </Button>
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-xl font-semibold">Popular Pages</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/properties" className="text-amber-500 hover:underline">
              Properties
            </Link>
            <Link href="/agents" className="text-amber-500 hover:underline">
              Our Agents
            </Link>
            <Link href="/about" className="text-amber-500 hover:underline">
              About Us
            </Link>
            <Link href="/blog" className="text-amber-500 hover:underline">
              Blog
            </Link>
            <Link href="/contact" className="text-amber-500 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
