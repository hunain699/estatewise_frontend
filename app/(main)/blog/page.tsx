"use client";

import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Search } from "lucide-react"
import { API_UPLOAD, API_URL } from '@/config'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  blogImage: string
  createdAt: string
  author: string
  category: string
}
export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 4

 useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/blogs/`)
      const data: BlogPost[] = await res.json()

      const reversedData = [...data].reverse() // Reverse to show latest first

      if (reversedData.length > 0) {
        setFeaturedPost(reversedData[0])
        setPosts(reversedData.slice(1))

        // Count posts per category
        const counts: Record<string, number> = {}
        reversedData.forEach((post) => {
          counts[post.category] = (counts[post.category] || 0) + 1
        })
        setCategoryCounts(counts)
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  fetchBlogs()
}, [])


  if (loading) {
    return (
     <div className="min-h-screen flex items-center justify-center">
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
</div>

    )
  }

  const recentPosts = posts.slice(0, 3)
const indexOfLastPost = currentPage * postsPerPage
const indexOfFirstPost = indexOfLastPost - postsPerPage
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

const totalPages = Math.ceil(posts.length / postsPerPage)
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page)
  }
}


  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="relative h-80">
        <Image
          src="https://www.shutterstock.com/image-vector/water-surface-magic-neon-glow-600nw-2483884465.jpg"
          alt="Blog - WP Residence"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-light md:text-5xl">Our Blog</h1>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <Link href="/" className="hover:text-amber-400">
                Home
              </Link>
              <span>/</span>
              <span>Blog</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={`${API_UPLOAD}/blogImage/${featuredPost?.blogImage}`}
                  alt={featuredPost.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">{featuredPost?.category}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(featuredPost?.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    <span>{featuredPost?.author}</span>
                  </div>
                </div>

                <Link href={`/blog/${featuredPost?._id}`}>
                  <h2 className="mb-4 text-3xl font-semibold hover:text-amber-500">{featuredPost?.title}</h2>
                </Link>

                <p className="mb-6 text-gray-600">{featuredPost?.excerpt}</p>

                <Link
                  href={`/blog/${featuredPost?._id}`}
                  className="inline-flex items-center font-medium text-amber-500 hover:text-amber-600"
                >
                  Read More
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="grid gap-8 sm:grid-cols-2">
                {currentPosts.map((post) => (
                  <article
                    key={post._id}
                    className="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
                  >
                    <Link href={`/blog/${post._id}`} className="block">
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image
                          src={`${API_UPLOAD}/blogImage/${post.blogImage}`}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                    </Link>

                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">{post.category}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <Link href={`/blog/${post._id}`}>
                        <h3 className="mb-2 text-xl font-semibold transition-colors hover:text-amber-500">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="mb-4 text-gray-600">{post.excerpt}</p>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        <span>By {post.author}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
  <nav className="flex items-center gap-1">
    <Button
      variant="outline"
      size="icon"
      className="h-10 w-10 rounded-full"
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <span className="sr-only">Previous page</span>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </Button>

    {[...Array(totalPages)].map((_, index) => (
      <Button
        key={index}
        variant="outline"
        size="icon"
        onClick={() => goToPage(index + 1)}
        className={`h-10 w-10 rounded-full ${currentPage === index + 1 ? 'bg-amber-500 text-white hover:bg-amber-600' : ''}`}
      >
        {index + 1}
      </Button>
    ))}

    <Button
      variant="outline"
      size="icon"
      className="h-10 w-10 rounded-full"
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <span className="sr-only">Next page</span>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Button>
  </nav>
</div>

            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Search</h3>
                <div className="relative">
                  <Input type="text" placeholder="Search articles..." className="pr-10" />
                  <Button
                    size="icon"
                    className="absolute right-0 top-0 h-full rounded-l-none bg-amber-500 hover:bg-amber-600"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Categories</h3>
                <ul className="space-y-2">
                  {Object.entries(categoryCounts).map(([name, count]) => (
                    <li key={name}>
                      <div
                        className="flex items-center justify-between py-2 hover:text-amber-500"
                      >
                        <span>{name}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post._id} className="flex gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image src={`${API_UPLOAD}/blogImage/${post.blogImage}`}
                          alt={post.title} fill className="object-cover" />
                      </div>
                      <div>
                        <Link href={`/blog/${post._id}`} className="font-medium hover:text-amber-500">
                          {post.title}
                        </Link>
                        <p className="mt-1 text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
  <h3 className="mb-4 text-xl font-semibold">Tags</h3>
  <div className="flex flex-wrap gap-2">
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-amber-100 hover:text-amber-800">
      Real Estate
    </span>
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-amber-100 hover:text-amber-800">
      Prime Referral
    </span>
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-amber-100 hover:text-amber-800">
      Vineyard
    </span>
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-amber-100 hover:text-amber-800">
      Luxury Homes
    </span>
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-amber-100 hover:text-amber-800">
      Market Trends
    </span>
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-amber-100 hover:text-amber-800">
      Investment
    </span>
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-amber-100 hover:text-amber-800">
      Home Buying
    </span>
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-amber-100 hover:text-amber-800">
      Selling Tips
    </span>
  </div>
</div>


              {/* Newsletter */}
              <div className="rounded-lg bg-amber-500 p-6 text-white shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Newsletter</h3>
                <p className="mb-4">Subscribe to our newsletter to receive the latest real estate news and updates.</p>
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="h-12 border-white/20 bg-white/10 text-white placeholder:text-white/70 focus-visible:ring-white"
                  />
                  <Button className="w-full bg-white text-amber-500 hover:bg-white/90">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
