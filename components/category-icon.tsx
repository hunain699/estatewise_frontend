import Link from "next/link"
import { Home, Key, Building, Building2, Warehouse, Hotel, LandPlot, Store, Landmark } from "lucide-react"

interface CategoryIconProps {
  icon: string
  label: string
  href: string
}

export default function CategoryIcon({ icon, label, href }: CategoryIconProps) {
  const getIcon = () => {
    switch (icon) {
      case "home":
        return <Home className="h-6 w-6" />
      case "key":
        return <Key className="h-6 w-6" />
      case "house":
        return <Home className="h-6 w-6" />
      case "building":
        return <Building className="h-6 w-6" />
      case "villa":
        return <Building2 className="h-6 w-6" />
      case "studio":
        return <Warehouse className="h-6 w-6" />
      case "condo":
        return <Hotel className="h-6 w-6" />
      case "office":
        return <Landmark className="h-6 w-6" />
      case "shop":
        return <Store className="h-6 w-6" />
      default:
        return <LandPlot className="h-6 w-6" />
    }
  }

  return (
    <Link href={href} className="flex flex-col items-center gap-2 text-center transition-colors hover:text-amber-500">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:border-amber-500 hover:text-amber-500">
        {getIcon()}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}
