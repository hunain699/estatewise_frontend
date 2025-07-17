"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, Trash2, MapPin, Bed, Bath, Square } from "lucide-react"
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

interface Property {
  _id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  status: "Available" | "Sold"
  description: string
  yearBuild: number
  garage: number
  lotSize: string
  features: string[]
}

interface PropertyCardViewProps {
  properties: Property[]
  onDelete: (id: string) => void
}

export default function PropertyCardView({ properties, onDelete }: PropertyCardViewProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="relative h-48">
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

          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 truncate">{property.title}</h3>
            <p className="text-green-600 font-bold mb-2">${property.price.toLocaleString()}</p>
            <p className="text-gray-600 mb-2 truncate">{property.location}</p>

            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>{property.bedrooms} beds</span>
              <span>{property.bathrooms} baths</span>
              <span>{property.area} sqft</span>
            </div>

            <div className="flex justify-between gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-1"
                    onClick={() => setSelectedProperty(property)}
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  {selectedProperty && (
                    <>
                      <DialogHeader>
                        <DialogTitle>{selectedProperty.title}</DialogTitle>
                        <DialogDescription>Property Details</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        <div className="relative h-64 md:h-full rounded-md overflow-hidden">
                          <Image
                            src={`${API_UPLOAD}/${selectedProperty.images[0]}`}
                            alt={selectedProperty.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium">
                            {selectedProperty.status}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold">{selectedProperty.title}</h3>
                            <div className="flex items-center text-gray-500 mt-1">
                              <MapPin size={16} className="mr-1" />
                              <span>{selectedProperty.location}</span>
                            </div>
                            <div className="text-2xl font-bold text-green-600 mt-2">
                              ${selectedProperty.price.toLocaleString()}
                            </div>
                          </div>

                          <div className="flex justify-between border-t border-b border-gray-200 py-2">
                            <div className="flex items-center">
                              <Bed size={16} className="mr-1 text-gray-500" />
                              <span>{selectedProperty.bedrooms} Beds</span>
                            </div>
                            <div className="flex items-center">
                              <Bath size={16} className="mr-1 text-gray-500" />
                              <span>{selectedProperty.bathrooms} Baths</span>
                            </div>
                            <div className="flex items-center">
                              <Square size={16} className="mr-1 text-gray-500" />
                              <span>{selectedProperty.area} sqft</span>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium">Description</h4>
                            <p className="text-gray-600 mt-1">{selectedProperty.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium">Year Built</h4>
                              <p className="text-gray-600">{selectedProperty.yearBuild}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Garage</h4>
                              <p className="text-gray-600">{selectedProperty.garage} Cars</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Lot Size</h4>
                              <p className="text-gray-600">{selectedProperty.lotSize}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium">Features</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedProperty.features.map((feature, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Link href={`/properties/${selectedProperty._id}`} target="_blank">
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
                      This action cannot be undone. This will permanently delete the property and remove the data from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(property._id)} className="bg-red-600 hover:bg-red-700">
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
