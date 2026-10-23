import Divider from "@/components/Divider";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-label">Legal</div>
        <h1 className="page-title">Terms of Service</h1>
      </div>
      <Divider />
      <div className="section legal">
        <p><em>Last updated October 23, 2026</em></p>

        <p>
          These terms govern your use of firebugagency.com, the Firebug AI
          assessment, and the social publishing tools Firebug Agency operates
          (together, the &ldquo;Services&rdquo;). By using the Services you
          agree to them.
        </p>

        <h2>The Services</h2>
        <p>
          Firebug Agency provides AI strategy consulting and operates internal
          tools that schedule and publish content to social accounts owned by
          Firebug, its brands and its clients. Access to the publishing tools
          is limited to accounts we have authorized.
        </p>

        <h2>Connected accounts</h2>
        <p>
          If you connect a social account, you confirm you are authorized to
          manage it and that the content published through the Services
          follows that platform&apos;s own terms and community guidelines. You
          can disconnect an account at any time.
        </p>

        <h2>Your content</h2>
        <p>
          You keep ownership of content you provide. You grant us permission to
          store, format and publish it only as needed to deliver the Services.
        </p>

        <h2>Acceptable use</h2>
        <p>
          Don&apos;t use the Services to publish unlawful, infringing,
          deceptive or harmful content, to send spam, or to interfere with the
          Services or the platforms they connect to.
        </p>

        <h2>Third-party platforms</h2>
        <p>
          The Services rely on platforms such as TikTok, Meta, X, Pinterest and
          Google. We are not responsible for their availability, policies or
          changes to their APIs.
        </p>

        <h2>Disclaimers and liability</h2>
        <p>
          The Services are provided &ldquo;as is&rdquo; without warranties of
          any kind. To the extent the law allows, Firebug Agency is not liable
          for indirect or consequential damages, and our total liability is
          limited to the amount you paid us in the prior 12 months.
        </p>

        <h2>Changes and termination</h2>
        <p>
          We may update these terms and will change the date above when we do.
          We may suspend access for misuse.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of California.</p>

        <h2>Contact</h2>
        <p>
          <a href="mailto:kayakmind@gmail.com">kayakmind@gmail.com</a>
        </p>
      </div>
    </>
  );
}
