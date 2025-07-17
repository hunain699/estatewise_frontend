import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function NewsletterSection() {
  return (
    <section className="bg-amber-500 py-12 sm:py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-xl text-center">
          {/* Heading */}
          <h2 className="mb-3 text-2xl sm:text-3xl font-light">Subscribe to Our Newsletter</h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base">
            Stay updated with the latest properties, market trends, and real estate news.
          </p>

          {/* Form */}
          <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              type="email"
              placeholder="Your email address"
              className="h-11 sm:h-12 flex-1 rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/70 focus-visible:ring-white text-sm sm:text-base"
            />
            <Button className="h-11 sm:h-12 rounded-full bg-white px-6 sm:px-8 text-amber-500 hover:bg-white/90 text-sm sm:text-base">
              Subscribe
            </Button>
          </form>

          {/* Note */}
          <p className="mt-4 text-xs sm:text-sm text-white/80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
