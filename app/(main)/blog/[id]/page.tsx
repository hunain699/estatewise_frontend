import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Tag } from "lucide-react"
import { API_UPLOAD, API_URL } from '@/config'

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  blogImage: string
  createdAt: string
  tags: string[]
  author: string
  category: string
  content: string
}

interface BlogPostPageProps {
  params: { id: string }
}

// ← Add this function
export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/blogs/`)
  if (!res.ok) {
    // If the fetch fails entirely, return an empty array so build won’t break
    return []
  }
  const allPosts: BlogPost[] = await res.json()

  return allPosts.map((post) => ({
    id: post._id,
  }))
}

// Server Component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const id = params.id

  // Fetch the single blog post
  const res = await fetch(`${API_URL}/blogs/${id}`)
  if (!res.ok) {
    return <div className="text-center py-20">Blog post not found.</div>
  }
  const post: BlogPost = await res.json()

  // Fetch all blog posts
  const allRes = await fetch(`${API_URL}/blogs/`)
  const allPosts: BlogPost[] = await allRes.json()

  const reversedPosts = [...allPosts].reverse()
  const featuredPost = reversedPosts.length > 0 ? reversedPosts[0] : null
  const otherPosts = reversedPosts.slice(1)

  const categoryCounts: Record<string, number> = {}
  reversedPosts.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1
  })
  const recentPosts = reversedPosts.slice(0, 3)

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="relative h-96">
        <Image
          src={`${API_UPLOAD}/blogImage/${post.blogImage}`}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <div className="mb-4 flex items-center justify-center gap-4 text-sm">
              <span className="rounded-full bg-amber-500 px-3 py-1">{post.category}</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>By {post.author}</span>
              </div>
            </div>
            <h1 className="max-w-4xl mx-auto text-4xl font-light md:text-5xl">{post.title}</h1>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <article className="rounded-lg bg-white p-8 shadow-sm">
                {/* Render HTML content safely */}
                            <h1 className="max-w-4xl mx-auto text-xl mb-4 font-light md:text-2xl italic">{post.excerpt}</h1>

                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                <div className="mt-8 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-amber-100 hover:text-amber-800"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>   
            </div>
            <div className="space-y-8">
<div className="rounded-lg bg-white p-6 shadow-sm">
  <h3 className="mb-4 text-xl font-semibold">Categories</h3>
  <ul className="space-y-2">
    <li className="flex items-center justify-between py-2">
      <span>Market Analysis</span>
      <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs">12</span>
    </li>
    <li className="flex items-center justify-between py-2">
      <span>Buying Guide</span>
      <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs">8</span>
    </li>
    <li className="flex items-center justify-between py-2">
      <span>Selling Tips</span>
      <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs">10</span>
    </li>
    <li className="flex items-center justify-between py-2">
      <span>Investment</span>
      <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs">7</span>
    </li>
    <li className="flex items-center justify-between py-2">
      <span>Lifestyle</span>
      <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs">14</span>
    </li>
  </ul>
</div>

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
                                      </div>
                        
                         
          </div>
        </div>
      </section>
    </main>
  )
}
