import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image src="/logo/4.png" alt="Prime Referral Residence" width={180} height={60} />
            </Link>
            <p className="text-gray-400 mb-6">
              Committed to delivering results. Find your dream home with Estate Wise.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div> */}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-gray-400 hover:text-white transition-colors">
                  Agents
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Addison IL, 60101</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-400">(224) 224 5631</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary mr-3 flex-shrink-0" />
                <span className="text-gray-400">support@primereferral.us</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="text-gray-400 hover:text-white transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-white transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/valuation" className="text-gray-400 hover:text-white transition-colors">
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-400 hover:text-white transition-colors">
                  Administrator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Estate Wise. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <img src="/visa-svgrepo-com.svg" alt="Visa" className="h-8" />
              <img src="/mastercard-svgrepo-com.svg" alt="Mastercard" className="h-8" />
              <img src="/amex-svgrepo-com.svg" alt="American Express" className="h-8" />
              <img src="/discover-svgrepo-com.svg" alt="Discover" className="h-8" />
              <img src="/paypal-svgrepo-com.svg" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
