import Divider from "@/components/Divider";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-label">Legal</div>
        <h1 className="page-title">Privacy Policy</h1>
      </div>
      <Divider />
      <div className="section legal">
        <p><em>Last updated October 23, 2026</em></p>

        <p>
          This policy covers firebugagency.com, the Firebug AI assessment, and
          the internal social publishing tools Firebug Agency operates for its
          own brands and clients. &ldquo;We&rdquo; means Firebug Agency.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Information you give us.</strong> Your name, email, company
            and answers when you contact us or take the assessment.
          </li>
          <li>
            <strong>Connected social accounts.</strong> When an account owner
            connects a social account (such as TikTok, Instagram, Threads, X,
            Pinterest or YouTube) to our publishing tool, we receive the basic
            profile information and access tokens that platform provides. We
            use them only to publish and schedule content the account owner
            has approved, and to show that account&apos;s handle and avatar
            inside the tool.
          </li>
          <li>
            <strong>Basic usage data.</strong> Standard server logs and
            privacy-friendly analytics, such as pages visited and browser type.
          </li>
        </ul>

        <h2>How we use it</h2>
        <p>
          To respond to you, deliver services you request, publish content on
          accounts that authorized us, and keep the site secure. We do not sell
          personal information, and we do not use data from connected social
          accounts for advertising or to train AI models.
        </p>

        <h2>Sharing</h2>
        <p>
          We share data only with service providers that run our
          infrastructure (hosting, database, email) under confidentiality
          obligations, with the social platforms you connect when we publish on
          your behalf, or when the law requires it.
        </p>

        <h2>Retention and deletion</h2>
        <p>
          Access tokens are kept while an account stays connected. You can
          disconnect at any time from the tool or from the platform&apos;s own
          app settings, which revokes our access. Email us to have any of your
          data deleted, and we will do so within 30 days.
        </p>

        <h2>Security</h2>
        <p>
          Credentials and tokens are stored on access-controlled systems and
          are never shared with third parties beyond the platform that issued
          them.
        </p>

        <h2>Children</h2>
        <p>
          Our services are not directed to children under 13, and we do not
          knowingly collect their information.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, including California, you may have the
          right to access, correct or delete your personal information. Email
          us to make a request.
        </p>

        <h2>Contact</h2>
        <p>
          Firebug Agency, San Diego, California.{" "}
          <a href="mailto:kayakmind@gmail.com">kayakmind@gmail.com</a>
        </p>
      </div>
    </>
  );
}
