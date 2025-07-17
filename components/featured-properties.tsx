"use client";

import Link from "next/link"
import PropertyCard from "@/components/property-card"
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { API_URL } from '@/config'

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
export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      fetch(`${API_URL}/properties`)
        .then((res) => res.json())
        .then((data) => {
          setProperties(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch properties:", err);
          setLoading(false);
        });
    }, []);
  
    if (loading) return <div><Loading /></div>;
  

  return (
   <section className="bg-gray-50 py-12 sm:py-16">
  <div className="container mx-auto px-4">
    {/* Responsive Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property._id} {...property} />
      ))}
    </div>

    {/* View All Button */}
    <div className="mt-10 sm:mt-12 text-center">
      <Link
        href="/properties"
        className="inline-block rounded-full border-2 border-amber-500 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-amber-500 transition-colors hover:bg-amber-500 hover:text-white"
      >
        View All Properties
      </Link>
    </div>
  </div>
</section>

  )
}
