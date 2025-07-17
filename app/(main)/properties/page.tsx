"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, Grid, List, MapPin } from "lucide-react";
import { API_UPLOAD, API_URL } from '@/config'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "@/components/property-card";
import Loading from "@/app/(admin)/admin/feedbacks/loading";
type Property = {
  _id: string;
  title: string;
  location: string;
  price: string;
  images: string[];
  status: string;
  description: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const propertiesPerPage = 16

  useEffect(() => {
    fetch(`${API_URL}/properties`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch properties:", err)
        setLoading(false)
      })
  }, [])

if (loading) {
    return (
     <div className="min-h-screen flex items-center justify-center">
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
</div>

    )
  }
  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty)

  const totalPages = Math.ceil(properties.length / propertiesPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" }) // optional: scroll to top
  }

  return (
    <main className="min-h-screen">
     {/* Page Header */}
<section className="relative h-56 sm:h-72 md:h-80">
  <Image
    src="https://www.shutterstock.com/image-vector/water-surface-magic-neon-glow-600nw-2483884465.jpg"
    alt="Prime Referral Properties"
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black/40" />

  <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
    <div className="text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light">Our Properties</h1>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm">
        <Link href="/" className="hover:text-amber-400">
          Home
        </Link>
        <span>/</span>
        <span>Properties</span>
      </div>
    </div>
  </div>
</section>

{/* Search and Filter Section */}
<section className="bg-white py-6 sm:py-8 shadow-md">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex-1 mb-4 md:mb-0">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by location, property name, or keyword"
            className="h-12 pl-10 pr-4 w-full"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <Select>
          <SelectTrigger className="h-12 w-full md:w-40">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-12 w-full md:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Available">For Sale</SelectItem>
            <SelectItem value="for-rent">For Rent</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</section>


      {/* Properties Section */}
      <section className="bg-gray-50 py-12">
  <div className="container mx-auto px-4">
    <Tabs defaultValue="grid" className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{properties.length}</span> properties
              </p>

            <div className="flex items-center gap-4">
              <Select defaultValue="newest">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="beds">Most Bedrooms</SelectItem>
                  <SelectItem value="size">Largest Size</SelectItem>
                </SelectContent>
              </Select>

  <TabsList className="bg-white">
    <TabsTrigger value="grid" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500"
>
      <Grid className="h-4 w-4" />
    </TabsTrigger>
    <TabsTrigger value="list" 
    className="data-[state=active]:bg-amber-500 data-[state=active]:text-white hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-amber-500"
    >
      <List className="h-4 w-4" />
    </TabsTrigger>
    {/* <TabsTrigger value="map" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
      <MapPin className="h-4 w-4" />
    </TabsTrigger> */}
  </TabsList>
            </div>
          </div>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentProperties.map((property) => (
                  <PropertyCard key={property._id} {...property} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list">
    <div className="space-y-6">
      {currentProperties.map((property) => (
        <div
          key={property._id}
          className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm md:flex-row"
        >
          <div className="relative h-64 w-full md:h-auto md:w-1/3">
            <Image
              src={`${API_UPLOAD}/${property.images[0]}`}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4">
              <h3 className="mb-1 text-xl font-semibold">{property.title}</h3>
              <p className="text-sm text-gray-500">{property.location}</p>
            </div>
            <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="font-semibold">{property.bedrooms}</span> Bedrooms
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">{property.bathrooms}</span> Bathrooms
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">{property.area.toLocaleString()}</span> sq ft
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <p className="text-xl font-bold text-amber-500">
                ${property.price.toLocaleString()}
                {property.status === "For Rent" && (
                  <span className="text-sm font-normal text-gray-500">/month</span>
                )}
              </p>
              <Link
                href={`/properties/${property._id}`}
                className="rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </TabsContent>

            {/* <TabsContent value="map" className="mt-0">
              <div className="h-[600px] rounded-lg bg-gray-200 p-4">
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">Map view would be displayed here</p>
                </div>
              </div>
            </TabsContent> */}
          </Tabs>

          <div className="mt-12 flex justify-center">
        <nav className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant="outline"
              size="icon"
              className={`h-10 w-10 rounded-full ${
                currentPage === i + 1 ? "bg-amber-500 text-white hover:bg-amber-600" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </nav>
      </div>
        </div>
      </section>
    </main>
  )
}
