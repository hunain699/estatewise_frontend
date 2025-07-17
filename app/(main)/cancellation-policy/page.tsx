import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cancellation Policy | Prime Referral Residence",
  description: "Information about how Prime Referral Residence uses cookies and similar technologies.",
}

const CookiePolicyPage = () => {
  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Cancellation Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: May 13, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <p>
                This Service Agreement will remain in effect for a term of either six (6) months or one (1) year, as determined by the
                 chosen membership plan. Both Prime Referral and the Agent/Broker reserve the right to terminate this Agreement at any 
                 time by providing written or emailed notice at least thirty (30) days prior to the intended termination date.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Impact of Termination</h2>
              <p>
               Termination of this Service Agreement shall not affect any outstanding 
               compensation, credits, discounts, or amounts owed or payable to the Broker/Agent 
               for any Leads accepted prior to the termination date.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Manual Renewal Process</h2>
              <p>
                For members on bi-annual or annual plans, Prime Referral requires manual renewal utilizing the provided payment information.
                 To continue the membership beyond the renewal date, the renewal process must be initiated by the Member. 
                The Membership Fee will be charged to the designated payment method only after explicit confirmation of renewal.
              </p>
             
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Cancellation Procedure</h2>
               <p>
                To initiate the cancellation of the membership, the Agent/Broker must submit written or emailed notice at least 
                fourteen (14) business days in advance. The Agent/Broker must complete and submit the “service cancellation form” 
                to Prime Referral via email at support@primereferral.us. 
                Upon confirmation of the cancellation, a unique cancellation confirmation number will be provided.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CookiePolicyPage
