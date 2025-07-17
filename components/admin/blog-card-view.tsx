"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Edit, Eye, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { API_UPLOAD } from "@/config"

interface Blog {
  _id: string
  title: string
  excerpt: string
  content: string
  createdAt: Date
  author: string
  category: string
  blogImage: string
  tags: string[]
}

interface BlogCardViewProps {
  blogs: Blog[]
  onDelete: (id: string) => void
}

export default function BlogCardView({ blogs, onDelete }: BlogCardViewProps) {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="relative h-48">
            <Image
              src={`${API_UPLOAD}/blogImage/${blog.blogImage}`}
              alt={blog.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium">
              {blog.category}
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 truncate">{blog.title}</h3>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Calendar size={14} className="mr-1" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{blog.author}</span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>

            <div className="flex justify-between gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-1"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  {selectedBlog && (
                    <>
                      <DialogHeader>
                        <DialogTitle>{selectedBlog.title}</DialogTitle>
                        <DialogDescription>Blog Post Details</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="relative h-64 w-full rounded-md overflow-hidden mb-6">
                          <Image
                            src={`${API_UPLOAD}/blogImage/${blog.blogImage}`}
                            alt={selectedBlog.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium">
                            {selectedBlog.category}
                          </div>
                        </div>

                        <div className="flex items-center mb-4">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                            <Image
                              src={"https://cdn2.iconfinder.com/data/icons/occupations-2/500/occupation-32-512.png"}
                              alt={selectedBlog.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{selectedBlog.author}</h3>
                            {/* <p className="text-sm text-gray-500">{selectedBlog.authorTitle}</p> */}
                          </div>
                          <div className="ml-auto flex items-center text-gray-500">
                            <Calendar size={16} className="mr-1" />
                            <span>{new Date(selectedBlog.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <h2 className="text-xl font-bold mb-2">{selectedBlog.title}</h2>
                        <p className="text-gray-700 italic mb-4">{selectedBlog.excerpt}</p>

                        <div className="prose max-w-none">
                          {selectedBlog.content.split("\n\n").map((paragraph, index) => (
                            <p key={index} className="mb-4">
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        <div className="mt-6">
                          <h4 className="font-medium mb-2">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedBlog.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Link href={`/admin/blogs/edit/${selectedBlog._id}`}>
                          <Button variant="outline" className="mr-2">
                            <Edit size={16} className="mr-2" />
                            Edit Blog Post
                          </Button>
                        </Link>
                        <Link href={`/blog/${selectedBlog._id}`} target="_blank">
                          <Button>
                            <Eye size={16} className="mr-2" />
                            View on Website
                          </Button>
                        </Link>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex items-center justify-center gap-1">
                    <Trash2 size={16} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the blog post and remove the data from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(blog._id)} className="bg-red-600 hover:bg-red-700">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
