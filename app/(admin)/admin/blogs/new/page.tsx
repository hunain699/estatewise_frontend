"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { X, FileText, User, Tag, ImageIcon, Save, ArrowLeft, Hash, Plus } from "lucide-react"
import { API_URL } from '@/config'

export default function NewBlog() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    imageUrl: "",
    tags: [""],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleRemoveImage = (index: number) => {
      setImages(images.filter((_, i) => i !== index))
    }
  
    const handleFeatureChange = (index: number, value: string) => {
      const updatedFeatures = [...formData.tags]
      updatedFeatures[index] = value
      setFormData({
        ...formData,
        tags: updatedFeatures,
      })
    }
  
    const handleAddFeature = () => {
      setFormData({
        ...formData,
        tags: [...formData.tags, ""],
      })
    }
    const [imageFiles, setImageFiles] = useState<File[]>([])
  
const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const preview = URL.createObjectURL(file);
  setImages([preview]);            // only one preview
  setImageFiles([file]);           // only one file
};

  
  
    const handleRemoveFeature = (index: number) => {
      const updatedFeatures = formData.tags.filter((_, i) => i !== index)
      setFormData({
        ...formData,
        tags: updatedFeatures,
      })
    }

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const form = new FormData();
  
      // Append all form fields
      for (const key in formData) {
        if (key === "tags") {
          formData.tags.forEach(f => form.append("tags", f));
        } else {
          form.append(key, (formData as any)[key]);
        }
      }
  
      // Append image files
      if (imageFiles[0]) {
  form.append("blogImage", imageFiles[0])
}
      const response = await fetch(`${API_URL}/blogs/`, {
        method: "POST",
        body: form,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add property");
      }
  
      alert("Property added successfully!");
      router.push("/admin/blogs");
    } catch (error: any) {
      console.error("Error submitting property:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Blog Post</h1>
          <p className="text-gray-600">Create a new blog post for your website</p>
        </div>
        <Link
          href="/admin/blogs"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Blogs
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Blog Information</h2>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Blog Title*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Top 10 Luxury Features in Prime Referral Homes"
                />
              </div>
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt/Summary*
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={2}
                required
                value={formData.excerpt}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="A brief summary of your blog post (appears in previews)"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content*
              </label>
              <textarea
                id="content"
                name="content"
                rows={10}
                required
                value={formData.content}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Write your blog post content here..."
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Blog Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Author*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="author"
                  name="author"
                  type="text"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Jane Smith"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="">Select Category</option>
                  <option value="Luxury Living">Luxury Living</option>
                  <option value="Investment">Investment</option>
                  <option value="Design">Design</option>
                  <option value="History">History</option>
                  <option value="Market Analysis">Market Analysis</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            {formData.tags.map((tags, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="e.g. Swimming Pool, Garden, etc."
                />
                {formData.tags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFeature}
              className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Feature
            </button>
          </div>
          </div>
           <div className="py-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Blog Images</h2>

          <div className="mb-4">
  <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">
    Upload Images
  </label>
  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-primary file:text-white
      hover:file:bg-primary/90"
  />
</div>


          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
              {images.map((url, index) => (
                <div key={index} className="relative group rounded-md overflow-hidden border border-gray-200">
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">No images added yet</p>
              <p className="text-xs text-gray-400">Add image URLs using the field above</p>
            </div>
          )}
        </div>

          {formData.imageUrl && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
              <div className="rounded-md overflow-hidden border border-gray-200 w-full max-w-md">
                <img
                  src={formData.imageUrl || "/placeholder.svg"}
                  alt="Blog featured image preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 flex justify-end">
          <Link
            href="/admin/blogs"
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
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              <span className="flex items-center">
                <Save className="mr-2 h-5 w-5" />
                Publish Blog Post
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
