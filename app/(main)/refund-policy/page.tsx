import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy | Prime Referral Residence",
  description: "Information about how Prime Referral Residence uses cookies and similar technologies.",
}

const CookiePolicyPage = () => {
  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Refund Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: May 13, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <p>
                This Refund Policy (“Policy”) outlines the terms and conditions under which refunds for 
                the sign-up fee may be requested in connection with the Referral Agreement entered into with Prime Referral. 
                This Policy is valid for 90 days starting from the date the Referral Agreement is executed.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Eligibility for Refund</h2>
              <p>
                A refund of the sign-up fee will only be considered under the following conditions:
              </p>
             <div className="space-y-3 mt-6">
  <div className="flex items-start gap-2">
    <h3 className="font-semibold text-primary min-w-[220px]">Failure to Deliver Leads:</h3>
    <p>If Prime Referral does not provide any leads to the agent/broker as outlined in the agreement.</p>
  </div>
  
  <div className="flex items-start gap-2">
    <h3 className="font-semibold text-primary min-w-[220px]">Lack of Exclusivity of Leads:</h3>
    <p>If the lead given to the agent/broker is not exclusive and has been provided to other agents/brokers in the Prime Referral network.</p>
  </div>

  <div className="flex items-start gap-2">
    <h3 className="font-semibold text-primary min-w-[220px]">Unwillingness of the Lead to Engage:</h3>
    <p>If the lead(s) provided by Prime Referral show no intent to engage in business activities within 9 months of being assigned.</p>
  </div>

  <div className="flex items-start gap-2">
    <h3 className="font-semibold text-primary min-w-[220px]">Lead Already under Contract:</h3>
    <p>If the lead assigned to the agent/broker is already under contract with them at the time of the assignment.</p>
  </div>

  <div className="flex items-start gap-2">
    <h3 className="font-semibold text-primary min-w-[220px]">Leads outside Preferred Location:</h3>
    <p>
      If the agent/broker chooses to receive leads from areas outside of their preferred geographic locations, these leads will
      be counted as part of the monthly allocation and will not be eligible for a refund or replacement.
    </p>
  </div>
</div>

            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Refund Process</h2>
              <p>
                i. If Prime Referral fails to deliver the leads as stipulated (scenario 1), the agent/broker should send a reminder to Prime Referral requesting the leads.
                 If Prime Referral does not provide the leads within one month, the agent/broker can then submit a refund request.
              </p>
              <p className="mt-4">
                ii. In cases where the issue falls under scenarios 2-5, the agent/broker must notify Prime Referral with evidence and request a replacement of the
                 lead(s). If the replacement is not provided within one month, the agent/broker can proceed with a refund request for the sign-up fee.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Timely Reporting
              </h2>
              <p>
                It is the responsibility of the agent/broker to notify Prime Referral of 
                any concerns related to the leads within 48 hours of accepting the referral. 
                If the agent/broker fails to report any issues within this period, the leads will be 
                considered satisfactory, and no further claims for a refund or replacement will be accepted.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Acknowledgement</h2>
              <p>
                This Refund Policy takes effect on the date mentioned in the Referral Agreement 
                and replaces any previous versions. By entering into the Referral Agreement with 
                Prime Referral, you agree to abide by the terms stated in this policy.
              </p>
              <div className="mt-4">
                <p>
                  <strong>For any questions or to initiate a refund request, please contact Prime Referral's customer support at support@primereferral.us.</strong>
                </p>
                <p>We value your collaboration with Prime Referral and appreciate your trust in our services.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CookiePolicyPage
