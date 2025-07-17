import Image from "next/image"
import Link from "next/link"
import {
  BedDouble,
  Bath,
  SquareIcon as SquareFoot,
  Car,
  MapPin,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PropertyCard from "@/components/property-card"
import { API_UPLOAD, API_URL } from '@/config'

type Property = {
  _id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuild?: number;
  lotSize?: number;
  garage?: number;
  description: string;
  features?: string[];
  images: string[];
  status: "For Sale" | "For Rent";
  agent?: {
    id: string;
    name: string;
    title: string;
    image: string;
    phone: string;
    email: string;
  };
};
interface PropertyPageProps {
  params: { id: string }
}

export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/properties`);
  if (!res.ok) {
    // If the fetch fails entirely, return an empty array so build won’t break
    return []
  }
  const properties: Property[] = await res.json();

  return properties.map((property) => ({
    id: property._id,
  }));
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const id = params.id

  const res = await fetch(`${API_URL}/properties/${id}`);
  const property: Property = await res.json();

  const simRes = await fetch(`${API_URL}/properties`);
  const allProperties: Property[] = await simRes.json();

  const similarProperties = allProperties
    .filter((p) => p._id !== property._id)
    .slice(0, 3);

// if (loading) {
//     return (
//      <div className="min-h-screen flex items-center justify-center">
//   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
// </div>

//     )
//   }  if (!property) return <div>Property not found</div>;
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Property Header */}
      <section className="bg-white shadow-sm mt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Link href="/" className="text-sm text-gray-500 hover:text-amber-500">
                  Home
                </Link>
                <span className="text-sm text-gray-500">/</span>
                <Link href="/properties" className="text-sm text-gray-500 hover:text-amber-500">
                  Properties
                </Link>
                <span className="text-sm text-gray-500">/</span>
                <span className="text-sm text-gray-500">{property.title}</span>
              </div>
              <h1 className="text-2xl font-semibold md:text-3xl">{property.title}</h1>

              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="h-4 w-4 text-amber-500" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-amber-500 text-white hover:bg-amber-600">{property.status}</Badge>
              <div className="text-2xl font-bold text-amber-500">${property.price.toLocaleString()}</div>

              {/* <div className="ml-auto flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Printer className="h-5 w-5" />
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Property Gallery */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-1 row-span-2 md:col-span-2 md:row-span-2">
              <div className="relative h-96 w-full overflow-hidden rounded-lg md:h-full">
                <Image
                  src={`${API_UPLOAD}/${property.images[0]}`}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={`${API_UPLOAD}/${image}`}
                  alt={`${property.title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Overview */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-2xl font-semibold">Overview</h2>

                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="rounded-full bg-amber-100 p-3">
                        <BedDouble className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <span className="block text-lg font-semibold">{property.bedrooms}</span>
                        <span className="text-sm text-gray-500">Bedrooms</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="rounded-full bg-amber-100 p-3">
                        <Bath className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <span className="block text-lg font-semibold">{property.bathrooms}</span>
                        <span className="text-sm text-gray-500">Bathrooms</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="rounded-full bg-amber-100 p-3">
                        <SquareFoot className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <span className="block text-lg font-semibold">{property.area.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">Square Feet</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="rounded-full bg-amber-100 p-3">
                        <Car className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <span className="block text-lg font-semibold">{property.garage}</span>
                        <span className="text-sm text-gray-500">Garage Spaces</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Property Type</span>
                      <span className="font-medium">Villa</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Year Built</span>
                      <span className="font-medium">{property.yearBuild}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Lot Size</span>
                      <span className="font-medium">{property.lotSize} acres</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Status</span>
                      <span className="font-medium">{property.status}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-2xl font-semibold">Description</h2>

                  <div className="prose max-w-none text-gray-600">
                    {property.description.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-2xl font-semibold">Property Features</h2>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
{property.features?.map((feature, index) => (
  <div key={index} className="flex items-center gap-2">
    <div className="rounded-full bg-amber-100 p-1">
      <svg className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span>{feature}</span>
  </div>
))}

                  </div>
                </div>
                {/* Location */}
                {/* <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-2xl font-semibold">Location</h2>

                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-gray-500">Property map would be displayed here</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={property.agent.image || "/placeholder.svg"}
                      alt={property.agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">{property.agent.name}</h3>
                    <p className="text-sm text-gray-500">{property.agent.title}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-amber-500" />
                    <span>{property.agent.phone}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-amber-500" />
                    <span>{property.agent.email}</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">Contact Agent</Button>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </div>
              </div> */}

              {/* Schedule a Tour */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Schedule a Tour</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Today
                    </Button>

                    <Button variant="outline" className="justify-start">
                      <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Tomorrow
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      10:00 AM
                    </Button>
                    <Button variant="outline" size="sm">
                      12:00 PM
                    </Button>
                    <Button variant="outline" size="sm">
                      2:00 PM
                    </Button>
                    <Button variant="outline" size="sm">
                      4:00 PM
                    </Button>
                    <Button variant="outline" size="sm">
                      6:00 PM
                    </Button>
                    <Button variant="outline" size="sm">
                      Custom
                    </Button>
                  </div>

                  <Button className="w-full bg-amber-500 hover:bg-amber-600">Schedule a Tour</Button>
                </div>
              </div>

              {/* Mortgage Calculator */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Mortgage Calculator</h3>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Home Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                      <input
                        type="numbers"
                        defaultValue={property.price.toLocaleString()}
                        className="w-full rounded-md border border-gray-300 py-2 pl-8 pr-3"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Down Payment (20%)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                      <input
                        type="text"
                        defaultValue={((property.price * 0.2) || 0).toLocaleString()}
                        className="w-full rounded-md border border-gray-300 py-2 pl-8 pr-3"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Loan Term</label>
                    <select className="w-full rounded-md border border-gray-300 py-2 px-3">
                      <option>30 Years</option>
                      <option>15 Years</option>
                      <option>10 Years</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Interest Rate</label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="4.5"
                        className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-8"
                      />
                      <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                    </div>
                  </div>

                  <Button className="w-full bg-amber-500 hover:bg-amber-600">Calculate</Button>

                  <div className="rounded-md bg-gray-50 p-4">
                    <div className="mb-2 text-center text-sm font-medium text-gray-500">Estimated Monthly Payment</div>
                    <div className="text-center text-2xl font-bold text-amber-500">$9,945</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-semibold">Similar Properties</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarProperties.slice(0, 3).map((simProp) => (
              <PropertyCard key={simProp._id} {...simProp} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
