"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, Grid, List, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import BlogCardView from "@/components/admin/blog-card-view"
import { API_URL, API_UPLOAD } from '@/config'

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

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

useEffect(() => {
  setLoading(true);
  
  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/blogs/`)
      const data = await res.json()
      setBlogs(data.reverse()) // Reverse the array to show latest first
      setLoading(false); // ✅ set loading false after success
    } catch (error) {
      console.error("Error fetching properties:", error)
      setLoading(false); // ✅ still needed in error case
    }
  }

  fetchProperties()
}, []);



  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle blog deletion
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setBlogs((prev) => prev.filter((p) => p._id !== id))
      } else {
        console.error("Failed to delete property")
      }
    } catch (error) {
      console.error("Error deleting property:", error)
    }
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Link href="/admin/blogs/new">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Add New Blog
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search blogs..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="flex items-center gap-1"
            >
              <Grid size={16} />
              <span className="hidden sm:inline">Grid</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="flex items-center gap-1"
            >
              <List size={16} />
              <span className="hidden sm:inline">List</span>
            </Button>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Author</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{blog.author}</TableCell>
                    <TableCell className="hidden lg:table-cell">{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {blog.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setSelectedBlog(blog)}
                            >
                              <Eye size={16} />
                              <span className="sr-only">View</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{blog.title}</DialogTitle>
                              <DialogDescription>Blog Post Details</DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="relative h-64 w-full rounded-md overflow-hidden mb-6">
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

                              <div className="flex items-center mb-4">
                                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                                  <Image
                                    src={`${API_UPLOAD}/blogImage/${blog.blogImage}`}
                                    alt={blog.author}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium">{blog.author}</h3>
                                  {/* <p className="text-sm text-gray-500">{blog.authorTitle}</p> */}
                                </div>
                                <div className="ml-auto flex items-center text-gray-500">
                                  <Calendar size={16} className="mr-1" />
                                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>

                              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                              <p className="text-gray-700 italic mb-4">{blog.excerpt}</p>

                              <div className="prose max-w-none">
                                {blog.content.split("\n\n").map((paragraph, index) => (
                                  <p key={index} className="mb-4">
                                    {paragraph}
                                  </p>
                                ))}
                              </div>

                              <div className="mt-6">
                                <h4 className="font-medium mb-2">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                  {blog.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Link href={`/blog/${blog._id}`} target="_blank">
                                <Button>
                                  <Eye size={16} className="mr-2" />
                                  View on Website
                                </Button>
                              </Link>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                              <Trash2 size={16} />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the blog post and remove the
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(blog._id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <BlogCardView blogs={filteredBlogs} onDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}
