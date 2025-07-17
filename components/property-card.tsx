import Image from "next/image"
import Link from "next/link"
import { Heart, Maximize2, BedDouble, Bath, SquareIcon as SquareFoot } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { API_UPLOAD } from "@/config"

interface PropertyCardProps {
  _id: string
  title: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  status: "For Sale" | "For Rent"
  featured?: boolean
  isSold?: boolean
  isActive?: boolean
}

export default function PropertyCard({
  _id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  area,
  images,
  status,
  featured = false,
  isSold = false,
  isActive = true,
}: PropertyCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative">
        <Link href={`/properties/${_id}`}>
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={`${API_UPLOAD}/${images[0]}`}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </Link>

        <div className="absolute left-4 top-4 flex gap-2">
          {featured && <Badge className="bg-blue-600 text-white hover:bg-blue-700">Featured</Badge>}
          {/* <Badge
            className={cn(
              "text-white",
              status === "For Sale" ? "bg-amber-500 hover:bg-amber-600" : "bg-purple-600 hover:bg-purple-700",
            )}
          >
            {status}
          </Badge> */}
          {isSold && <Badge className="bg-red-600 text-white hover:bg-red-700">Sold</Badge>}
          {isActive && <Badge className="bg-green-600 text-white hover:bg-green-700">Available</Badge>}
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 text-gray-700 backdrop-blur-sm hover:bg-white"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/properties/${_id}`} className="hover:text-amber-500">
          <h3 className="mb-1 text-lg font-semibold">{title}</h3>
        </Link>
        <p className="mb-3 text-sm text-gray-500">{address}</p>
        <p className="mb-4 text-xl font-bold text-amber-500">
          ${price.toLocaleString()}
          {status === "For Rent" && <span className="text-sm font-normal text-gray-500">/month</span>}
        </p>

        <div className="flex justify-between border-t border-gray-100 pt-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <BedDouble className="h-4 w-4 text-amber-500" />
            <span>
              {bedrooms} {bedrooms === 1 ? "Bed" : "Beds"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-amber-500" />
            <span>
              {bathrooms} {bathrooms === 1 ? "Bath" : "Baths"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <SquareFoot className="h-4 w-4 text-amber-500" />
            <span>{area.toLocaleString()} sq ft</span>
          </div>
        </div>
      </div>
    </div>
  )
}
