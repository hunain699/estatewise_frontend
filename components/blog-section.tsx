'use client'

import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import { API_UPLOAD, API_URL } from "@/config";

type Post = {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  blogImage: string;
  category: string;
  createdAt: string;
};

export default function BlogSection() {
  // 2. Tell useState that posts is an array of Post objects
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs`);
        const data: Post[] = await res.json();

        const latestPosts = data.reverse().slice(0, 3);
        setPosts(latestPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false); // ✅ Stop loading once done
      }
    };

    fetchPosts();
  }, []);
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center mb-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
return (
  <section className="py-16">
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="mb-12 text-center px-2">
        <h2 className="text-3xl sm:text-4xl font-light">Latest from Our Blog</h2>
        <div className="mx-auto mt-4 max-w-xl text-gray-600 text-sm sm:text-base">
          Stay updated with the latest news, market trends, and insights about Prime Referral real estate.
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post) => (
          <article
            key={post._id}
            className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
          >
            <Link href={`/blog/${post._id}`} className="block">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                <Image
                  src={`${API_UPLOAD}/blogImage/${post.blogImage}` || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </Link>

            <div className="p-4 sm:p-6">
              {/* Meta Info */}
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">{post.category}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{post.createdAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  <span>{post.author}</span>
                </div>
              </div>

              {/* Title */}
              <Link href={`/blog/${post._id}`}>
                <h3 className="mb-2 text-lg sm:text-xl font-semibold transition-colors group-hover:text-amber-500">
                  {post.title}
                </h3>
              </Link>

              {/* Excerpt */}
              <p className="mb-4 text-sm text-gray-600">{post.excerpt}</p>

              {/* Read More */}
              <Link
                href={`/blog/${post._id}`}
                className="inline-flex items-center font-medium text-amber-500 hover:text-amber-600 text-sm"
              >
                Read More
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="inline-block rounded-full border-2 border-amber-500 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-amber-500 transition-colors hover:bg-amber-500 hover:text-white"
        >
          View All Posts
        </Link>
      </div>
    </div>
  </section>
);
}
