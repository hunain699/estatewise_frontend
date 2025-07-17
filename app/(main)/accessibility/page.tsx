import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessibility Statement | Prime Referral Residence",
  description: "Our commitment to making Prime Referral Residence accessible to all users.",
}

const AccessibilityPage = () => {
  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Accessibility Statement</h1>
          <p className="text-gray-500 mb-8">Last Updated: May 13, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Our Commitment</h2>
              <p>
                Estate Wise Residence is committed to ensuring digital accessibility for people with disabilities. We are
                continually improving the user experience for everyone, and applying the relevant accessibility
                standards.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Conformance Status</h2>
              <p>
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to
                improve accessibility for people with disabilities. It defines three levels of conformance: Level A,
                Level AA, and Level AAA.
              </p>
              <p className="mt-4">
                Estate Wise Residence is partially conformant with WCAG 2.1 level AA. Partially conformant means that some
                parts of the content do not fully conform to the accessibility standard.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Accessibility Features</h2>
              <p>Estate Wise Residence includes the following accessibility features:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  Semantic HTML: We use semantic HTML to ensure that content is accessible to screen readers and other
                  assistive technologies.
                </li>
                <li>Keyboard Navigation: All interactive elements are accessible via keyboard navigation.</li>
                <li>Text Alternatives: We provide text alternatives for non-text content.</li>
                <li>Color Contrast: We ensure sufficient color contrast between text and background.</li>
                <li>Resizable Text: Text can be resized without loss of content or functionality.</li>
                <li>Focus Indicators: Visible focus indicators are provided for keyboard users.</li>
                <li>ARIA Attributes: We use ARIA attributes to enhance accessibility where appropriate.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Limitations and Alternatives</h2>
              <p>
                Despite our best efforts to ensure accessibility of Estate Wise Residence, there may be some limitations. Below
                is a description of known limitations, and potential solutions. Please contact us if you observe an
                issue not listed below.
              </p>
              <p className="mt-4">Known limitations:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  <strong>PDF Documents:</strong> Some of our older PDF documents may not be fully accessible. We are
                  working to remediate these documents. In the meantime, please contact us if you need assistance
                  accessing information in these documents.
                </li>
                <li>
                  <strong>Third-Party Content:</strong> Some third-party content, such as property listings from
                  external sources, may not be fully accessible. We are working with our partners to improve the
                  accessibility of this content.
                </li>
                <li>
                  <strong>Interactive Maps:</strong> Our property maps use interactive features that may not be fully
                  accessible to screen readers. We provide alternative text descriptions for all properties shown on
                  maps.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Feedback</h2>
              <p>
                We welcome your feedback on the accessibility of Estate Wise Residence. Please let us know if you encounter
                accessibility barriers on Prime Referral Residence:
              </p>
              <div className="mt-4">
                <p>Phone: (224) 224 5631</p>
                <p>E-mail: accessibility@Prime Referralresidence.com</p>
                <p>Postal address: 1234 Vineyard Lane, Prime Referral, CA 94558</p>
              </div>
              <p className="mt-4">We try to respond to feedback within 3 business days.</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Assessment Approach</h2>
              <p>Estate Wise Residence assessed the accessibility of this website by the following approaches:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Self-evaluation</li>
                <li>External evaluation</li>
                <li>Automated testing using accessibility evaluation tools</li>
                <li>User testing with assistive technologies</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Technical Specifications</h2>
              <p>
                Accessibility of Estate Wise Residence relies on the following technologies to work with the particular
                combination of web browser and any assistive technologies or plugins installed on your computer:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>WAI-ARIA</li>
              </ul>
              <p className="mt-4">
                These technologies are relied upon for conformance with the accessibility standards used.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Compatibility with Browsers and Assistive Technology
              </h2>
              <p>Estate Wise Residence is designed to be compatible with the following assistive technologies:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Screen readers (including JAWS, NVDA, VoiceOver, and TalkBack)</li>
                <li>Screen magnifiers</li>
                <li>Speech recognition software</li>
                <li>Keyboard-only navigation</li>
              </ul>
              <p className="mt-4">
                Estate Wise Residence is compatible with recent versions of major browsers, including Chrome, Firefox, Safari,
                and Edge.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AccessibilityPage
