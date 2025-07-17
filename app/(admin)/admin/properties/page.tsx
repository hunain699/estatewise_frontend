"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Search, Trash2, Eye, Grid, List, MapPin, Bed, Bath, Square } from "lucide-react"
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
import PropertyCardView from "@/components/admin/property-card-view"

interface Property {
  _id: string
  title: string
  location: string
  price: string
  status: string
  area: string
  bedrooms: string
  bathrooms: string
  yearBuild: string
  garage: string
  lotSize: string
  images: string[]
  description: string
  category: string
  features: string[]
}
import { API_UPLOAD, API_URL } from '@/config'

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setLoading(true);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/properties/`);
      const data = await res.json();
      setProperties(data);
      setLoading(false); // ✅ Stop loading after success
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false); // ✅ Stop loading after error
    }
  };

  fetchProperties();
}, []);


  // Filter properties based on search term
  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle property deletion
  
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/properties/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p._id !== id))
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
        <h1 className="text-2xl font-bold">Properties Management</h1>
        <Link href="/admin/properties/new">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Add New Property
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search properties..."
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
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="hidden lg:table-cell">Bedrooms</TableHead>
                  <TableHead className="hidden lg:table-cell">Bathrooms</TableHead>
                  <TableHead className="hidden lg:table-cell">Area (sqft)</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.map((property) => (
                  <TableRow key={property._id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>${property.price.toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                    <TableCell className="hidden lg:table-cell">{property.bedrooms}</TableCell>
                    <TableCell className="hidden lg:table-cell">{property.bathrooms}</TableCell>
                    <TableCell className="hidden lg:table-cell">{property.area}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          property.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : property.status === "Sold"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {property.status}
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
                              onClick={() => setSelectedProperty(property)}
                            >
                              <Eye size={16} />
                              <span className="sr-only">View</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{property.title}</DialogTitle>
                              <DialogDescription>Property Details</DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                              <div className="relative h-64 md:h-full rounded-md overflow-hidden">
                                <Image
                                  src={`${API_UPLOAD}/${property.images[0]}`}
                                  alt={property.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium">
                                  {property.status}
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-lg font-semibold">{property.title}</h3>
                                  <div className="flex items-center text-gray-500 mt-1">
                                    <MapPin size={16} className="mr-1" />
                                    <span>{property.location}</span>
                                  </div>
                                  <div className="text-2xl font-bold text-green-600 mt-2">
                                    ${property.price.toLocaleString()}
                                  </div>
                                </div>

                                <div className="flex justify-between border-t border-b border-gray-200 py-2">
                                  <div className="flex items-center">
                                    <Bed size={16} className="mr-1 text-gray-500" />
                                    <span>{property.bedrooms} Beds</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Bath size={16} className="mr-1 text-gray-500" />
                                    <span>{property.bathrooms} Baths</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Square size={16} className="mr-1 text-gray-500" />
                                    <span>{property.area} sqft</span>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium">Description</h4>
                                  <p className="text-gray-600 mt-1">{property.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium">Year Built</h4>
                                    <p className="text-gray-600">{property.yearBuild}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Garage</h4>
                                    <p className="text-gray-600">{property.garage} Cars</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Lot Size</h4>
                                    <p className="text-gray-600">{property.lotSize}</p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium">Features</h4>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {property.features.map((feature, index) => (
                                      <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Link href={`/properties/${property._id}`} target="_blank">
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
                                This action cannot be undone. This will permanently delete the property and remove the
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(property._id)}
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
          <PropertyCardView properties={filteredProperties} onDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}
