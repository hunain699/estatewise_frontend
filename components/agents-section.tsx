import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function AgentsSection() {
  const agents = [
    {
      id: "agent1",
      name: "Jessica Parker",
      title: "Senior Real Estate Agent",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      properties: 42,
      phone: "+1 (707) 555-1234",
      email: "jessica@wpresidence.com",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: "agent2",
      name: "David Wilson",
      title: "Luxury Property Specialist",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      properties: 38,
      phone: "+1 (707) 555-5678",
      email: "david@wpresidence.com",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: "agent3",
      name: "Maria Rodriguez",
      title: "Vineyard Property Expert",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      properties: 29,
      phone: "+1 (707) 555-9012",
      email: "maria@wpresidence.com",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-light">Meet Our Agents</h2>
          <div className="mx-auto mt-4 max-w-2xl text-gray-600">
            Our team of experienced real estate professionals is dedicated to helping you find your perfect Prime Referral
            property.
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={agent.image || "/placeholder.svg"}
                  alt={agent.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-4 opacity-0 transition-all group-hover:bottom-4 group-hover:opacity-100">
                  <Link
                    href={agent.social.facebook}
                    className="rounded-full bg-white p-2 text-gray-800 hover:bg-amber-500 hover:text-white"
                  >
                    <Facebook className="h-4 w-4" />
                  </Link>
                  <Link
                    href={agent.social.twitter}
                    className="rounded-full bg-white p-2 text-gray-800 hover:bg-amber-500 hover:text-white"
                  >
                    <Twitter className="h-4 w-4" />
                  </Link>
                  <Link
                    href={agent.social.instagram}
                    className="rounded-full bg-white p-2 text-gray-800 hover:bg-amber-500 hover:text-white"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                  <Link
                    href={agent.social.linkedin}
                    className="rounded-full bg-white p-2 text-gray-800 hover:bg-amber-500 hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <Link href={`/agents/${agent.id}`}>
                  <h3 className="mb-1 text-xl font-semibold hover:text-amber-500">{agent.name}</h3>
                </Link>
                <p className="mb-3 text-gray-500">{agent.title}</p>
                <div className="mb-4 text-sm text-amber-500">{agent.properties} Properties</div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>{agent.phone}</p>
                  <p>{agent.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/agents"
            className="inline-block rounded-full border-2 border-amber-500 px-8 py-3 font-medium text-amber-500 transition-colors hover:bg-amber-500 hover:text-white"
          >
            View All Agents
          </Link>
        </div>
      </div>
    </section>
  )
}
