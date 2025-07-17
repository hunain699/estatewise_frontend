"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Building, MapPin, DollarSign, Home, Tag, ImageIcon, Save, ArrowLeft, Plus, X } from "lucide-react"
import { API_URL } from '@/config'

export default function NewProperty() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    category: "",
    status: "Available",
    bedrooms: "",
    bathrooms: "",
    garage:"",
    lotSize:"",
    yearBuild:"",
    area: "",
    features: [""], // Start with one empty feature
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
    const updatedFeatures = [...formData.features]
    updatedFeatures[index] = value
    setFormData({
      ...formData,
      features: updatedFeatures,
    })
  }

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    })
  }
  const [imageFiles, setImageFiles] = useState<File[]>([])

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files
  if (!files) return

  const fileArray = Array.from(files)
  const previews = fileArray.map(file => URL.createObjectURL(file))
  setImages(prev => [...prev, ...previews])
  setImageFiles(prev => [...prev, ...fileArray])
}


  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      features: updatedFeatures,
    })
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const form = new FormData();

    // Append all form fields
    for (const key in formData) {
      if (key === "features") {
        formData.features.forEach(f => form.append("features", f));
      } else {
        form.append(key, (formData as any)[key]);
      }
    }

    // Append image files
    imageFiles.forEach(file => {
  form.append("images", file) // This sends actual files
})


    const response = await fetch(`${API_URL}/properties/`, {
      method: "POST",
      body: form,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add property");
    }

    alert("Property added successfully!");
    router.push("/admin/properties");
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
          <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
          <p className="text-gray-600">Create a new property listing</p>
        </div>
        <Link
          href="/admin/properties"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Properties
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Property Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Property Title*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Luxury Villa with Pool"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Prime Referral, CA"
                />
              </div>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="price"
                  name="price"
                  type="text"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="2,450,000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Home className="h-5 w-5 text-gray-400" />
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
                  <option value="Villa">Villa</option>
                  <option value="Estate">Estate</option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                  <option value="Cottage">Cottage</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="status"
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Describe the property..."
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Property Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms*
              </label>
              <input
                id="bedrooms"
                name="bedrooms"
                type="number"
                required
                min="0"
                value={formData.bedrooms}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="4"
              />
            </div>

            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms*
              </label>
              <input
                id="bathrooms"
                name="bathrooms"
                type="number"
                required
                min="0"
                step="0.5"
                value={formData.bathrooms}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="3"
              />
            </div>

            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                Area (sq ft)*
              </label>
              <input
                id="area"
                name="area"
                type="number"
                required
                min="0"
                value={formData.area}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="3200"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            <div>
              <label htmlFor="lotSize" className="block text-sm font-medium text-gray-700 mb-1">
                Lot Size*
              </label>
              <input
                id="lotSize"
                name="lotSize"
                type="number"
                required
                min="0"
                value={formData.lotSize}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="2"
              />
            </div>

            <div>
              <label htmlFor="yearBuild" className="block text-sm font-medium text-gray-700 mb-1">
                Year Build*
              </label>
              <input
                id="yearBuild"
                name="yearBuild"
                type="number"
                required
                min="0"
                step="0.5"
                value={formData.yearBuild}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="2019"
              />
            </div>

            <div>
              <label htmlFor="garage" className="block text-sm font-medium text-gray-700 mb-1">
                Cars in Garage*
              </label>
              <input
                id="garage"
                name="garage"
                type="number"
                required
                min="0"
                value={formData.garage}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="2"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="e.g. Swimming Pool, Garden, etc."
                />
                {formData.features.length > 1 && (
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

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Property Images</h2>

          <div className="mb-4">
  <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">
    Upload Images
  </label>
  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    multiple
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

        <div className="px-6 py-4 flex justify-end">
          <Link
            href="/admin/properties"
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
                Save Property
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
