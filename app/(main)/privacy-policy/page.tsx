import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Prime Referral Residence",
  description: "Our commitment to protecting your privacy and personal information at Prime Referral Residence.",
}

const PrivacyPolicyPage = () => {
  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: May 13, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-2">
              <p>
                This Privacy Policy explains how Prime referral uses your information when you use their 
                websites, products, tools, promotions, or other services (collectively, the “Services”). 
                By using the Services, you authorize Prime referral to contact you via marketing, transactional, 
                and informational messages related to real estate transactions.
              </p>
               <p className="mt-4">
                You may receive communications through text messages, phone calls, pre-recorded messages,
                 or artificial voice messages, with no more than one message per week. Standard message and data rates may apply
              </p>
               <p className="mt-4">
                You have the option to opt out at any time by texting "STOP" at; +1 (224) 481-0882. To rejoin, 
                sign up as you did initially, and we will resume sending SMS messages to you.
              </p>
              <p className="mt-4">
                Prime referral reserves the right to update this Privacy Policy at any time. Changes will be effective
                 immediately upon posting on their website, and your continued use of the Services indicates acceptance
                  of the updated Policy. Prime referral will notify you of any material changes as required by law.
              </p>
              <p className="mt-4">
               Your privacy is a priority, and Prime referral does not share your information with anyone. If you suspect
                unauthorized access to your account, send ‘HELP’ at; support@primereferral.us or send ‘HELP’ to +1 (224) 481-0882.
              </p>
              
            </section>

          </div>
        </div>
      </div>
    </main>
  )
}

export default PrivacyPolicyPage
