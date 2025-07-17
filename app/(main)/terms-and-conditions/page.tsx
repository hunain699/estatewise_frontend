import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | Prime Referral Residence",
  description: "Terms and conditions for using the Prime Referral Residence website and services.",
}

const TermsAndConditionsPage = () => {
  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Terms of Services</h1>
          <p className="text-gray-500 mb-8">Last Updated: May 13, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-2">
              <p>
                In these Terms of Service, Prime referral refers to itself as “we,” “us,” “our,” and “Prime referral,” 
                and the terms “you,” “your,” and “user” refer to the user of the Prime referral services. Prime referral 
                reserves the right to modify these Terms of Service at any time and for any reason, without providing specific
                 notice to users. The updated Terms of Service will be effective immediately upon posting on the Prime referral
                  website, and it is the user’s responsibility to review the updated terms periodically. By using the Prime
                   referral services, you agree to be bound by these Terms of Service.
              </p>
               <p className="mt-4">
                By contacting Prime referral, you grant consent to receive marketing, transactional, 
                and informational messages. Message frequency may vary, but you can anticipate receiving no 
                more than one weekly message. Standard message and data rates may apply. Prime referral may 
                employ various communication methods, including text messages, phone calls, pre-recorded messages, 
                or artificial voice messages, initiated through our phone system, Customer Relationship Management 
                (CRM), or Automatic Telephone Dialing System (ATDS). You affirm that you are contacting Prime referral 
                using your phone number and retain the option to opt out of our services at any time by texting ‘STOP’ 
                to +1 (224) 481-0882. If you experience issues with the messaging program, reply with the keyword 'HELP' 
                at +1 (224) 481-0882 for assistance or inquiries.
              </p>
              <p className="mt-4">
                You agree to promptly notify Service Providers if you change your phone number. You may revoke your consent 
                to receive calls by requesting to be placed on an internal Do Not Call list and text messages by responding 
                with STOP. Prime referral strictly protects your privacy and never shares your data with anyone under any circumstances.
              </p>
              
            </section>

          </div>
        </div>
      </div>
    </main>
  )
}

export default TermsAndConditionsPage
