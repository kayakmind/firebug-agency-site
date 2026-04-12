import Link from "next/link";
import Divider from "@/components/Divider";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-label reveal">About</div>
        <h1 className="page-title reveal d1">
          I started Firebug because too many smart organizations are{" "}
          <em>flying blind on AI.</em>
        </h1>
      </div>

      <Divider />

      {/* Bio */}
      <div className="section">
        <div className="bio-grid">
          <div className="bio-photo reveal d1">
            <div className="bio-photo-placeholder">Your photo here</div>
          </div>
          <div className="bio-text">
            <h2 className="reveal d2">
              I&apos;m Chris. I&apos;ve spent my career building systems and
              processes that help organizations do what they do &mdash; better,
              faster, and smarter.
            </h2>

            <p className="reveal d3">
              My background spans science journalism, institutional
              communications, and technology strategy &mdash; but the thread
              running through all of it is the same: figuring out how to
              implement the right tools and processes so organizations can
              actually reach their goals. I&apos;ve done that work across
              research institutions, media companies, and content platforms.
            </p>

            <p className="reveal d4">
              That experience matters because{" "}
              <strong>
                AI isn&apos;t just a technology problem &mdash; it&apos;s a
                systems and strategy problem.
              </strong>{" "}
              The organizations that succeed with AI aren&apos;t the ones with
              the most technical firepower. They&apos;re the ones that
              understand how to redesign their processes around what&apos;s now
              possible, and execute methodically.
            </p>

            <p className="reveal d5">
              I started building with AI tools early &mdash; not as a hobbyist,
              but as someone responsible for real output at real organizations.
              I&apos;ve designed AI-powered production pipelines, automated
              operational workflows, built data platforms from scratch, and
              constructed custom agent systems. I&apos;ve also made every
              mistake along the way, which means I know which shortcuts work and
              which ones waste your time.
            </p>

            <p className="reveal d6">
              <strong>
                Firebug exists because I kept having the same conversation
              </strong>{" "}
              &mdash; with colleagues, with friends running nonprofits, with
              startup founders, with agency owners. They all said some version
              of the same thing: &quot;I know AI matters. I don&apos;t know
              where to start. I don&apos;t have anyone who can help me figure it
              out.&quot; So I became that person.
            </p>

            <p className="reveal d7">
              I work with a small number of clients because I believe the only
              way this works is through deep understanding of your business.
              I&apos;m not interested in scaling to 50 clients. I&apos;m
              interested in being genuinely useful to 6-8 at a time.
            </p>
          </div>
        </div>
      </div>

      <Divider />

      {/* Background */}
      <div className="section">
        <div className="section-label reveal">Background</div>
        <h2 className="section-title reveal d1">The path that led here.</h2>
        <div className="timeline reveal d2">
          <div className="tl-item">
            <div className="tl-date">Ongoing</div>
            <div className="tl-title">
              Building platforms, systems, and AI workflows
            </div>
            <div className="tl-text">
              I design and operate production systems, data platforms, and
              AI-powered workflows across multiple organizations and projects.
              From content pipelines to structured databases to custom agent
              builds &mdash; I ship real things that solve real problems.
            </div>
          </div>
          <div className="tl-item">
            <div className="tl-date">Throughout</div>
            <div className="tl-title">
              Technology implementation for organizations
            </div>
            <div className="tl-text">
              Across every role, the constant has been identifying the right
              technology, designing the processes around it, and getting
              organizations to adopt it effectively. I&apos;ve done this at
              research institutions, media companies, and content platforms
              &mdash; always focused on outcomes, not tools for tools&apos;
              sake.
            </div>
          </div>
          <div className="tl-item">
            <div className="tl-date">Foundation</div>
            <div className="tl-title">
              Marketing, PR, and communications leadership
            </div>
            <div className="tl-text">
              Years leading marketing, public relations, and communications at
              world-class research institutions &mdash; managing campaigns,
              media strategy, brand positioning, and audience development. That
              experience taught me how to translate complexity into clarity and
              drive organizational change, skills that directly inform how I
              help clients adopt AI.
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* What I believe */}
      <div className="section">
        <div className="section-label reveal">What I believe</div>
        <div className="belief-section reveal d1">
          <div className="belief-quote">
            AI doesn&apos;t replace judgment. It <em>amplifies</em> it.
          </div>
          <div className="belief-text">
            The best AI implementations don&apos;t remove humans from the
            equation &mdash; they give humans superpowers. They compress weeks
            of research into hours, surface patterns invisible to the naked eye,
            and automate the tedious work so people can focus on what actually
            requires a brain and a beating heart. That&apos;s what I build for
            my clients.
          </div>
        </div>
      </div>

      <Divider />

      {/* Values */}
      <div className="section">
        <div className="section-label reveal">How I operate</div>
        <h2 className="section-title reveal d1">
          The principles behind the work.
        </h2>
        <div className="values-grid">
          <div className="value-card reveal d2">
            <h3>
              <span
                className="value-dot"
                style={{ background: "var(--coral)" }}
              />
              Honesty over salesmanship
            </h3>
            <p>
              If AI isn&apos;t the right solution for something, I&apos;ll tell
              you. I&apos;m not here to sell you on AI for AI&apos;s sake.
              I&apos;m here to make your organization more effective &mdash; and
              sometimes that means saying &quot;don&apos;t bother with this
              one.&quot;
            </p>
          </div>
          <div className="value-card reveal d3">
            <h3>
              <span
                className="value-dot"
                style={{ background: "var(--electric)" }}
              />
              Build, don&apos;t just advise
            </h3>
            <p>
              The world has enough consultants who hand you a PDF and disappear.
              I build working systems. When we&apos;re done talking strategy, I
              roll up my sleeves and actually create the thing.
            </p>
          </div>
          <div className="value-card reveal d4">
            <h3>
              <span
                className="value-dot"
                style={{ background: "var(--amber)" }}
              />
              Stay small, stay useful
            </h3>
            <p>
              I deliberately keep my client roster small. Every organization I
              work with gets real attention, real thought, and real
              responsiveness. I&apos;d rather be great for six clients than
              mediocre for sixty.
            </p>
          </div>
          <div className="value-card reveal d5">
            <h3>
              <span
                className="value-dot"
                style={{ background: "var(--smoke)" }}
              />
              Plain language, always
            </h3>
            <p>
              I come from journalism. I believe in clarity. You&apos;ll never
              hear me say &quot;leverage synergies&quot; or &quot;paradigm
              shift.&quot; I explain things in plain English and make sure you
              understand what we&apos;re doing and why.
            </p>
          </div>
        </div>
      </div>

      <Divider />

      {/* Tools & skills */}
      <div className="section">
        <div className="section-label reveal">What I work with</div>
        <h2 className="section-title reveal d1">
          Tools, platforms, and capabilities.
        </h2>
        <div className="tools-grid">
          <div className="tool-card reveal d2">
            <div className="tool-card-label">AI platforms</div>
            <p>
              Claude, ChatGPT, Gemini, Perplexity, and the broader ecosystem of
              foundation models and APIs
            </p>
          </div>
          <div className="tool-card reveal d3">
            <div className="tool-card-label">Automation</div>
            <p>
              Custom workflow design, MCP integrations, agent building, API
              connections, and prompt engineering
            </p>
          </div>
          <div className="tool-card reveal d4">
            <div className="tool-card-label">Content systems</div>
            <p>
              WordPress, Notion, Substack, editorial pipelines, publishing
              workflows, and content repurposing systems
            </p>
          </div>
          <div className="tool-card reveal d5">
            <div className="tool-card-label">Data &amp; platforms</div>
            <p>
              Supabase, structured databases, data modeling, and building
              data-driven platforms from scratch
            </p>
          </div>
          <div className="tool-card reveal d6">
            <div className="tool-card-label">Development</div>
            <p>
              Next.js, Vercel, GitHub, and modern web stacks &mdash; enough to
              build and ship real products
            </p>
          </div>
          <div className="tool-card reveal d7">
            <div className="tool-card-label">Strategy</div>
            <p>
              AI roadmapping, tool evaluation, competitive analysis, team
              training, and organizational change management
            </p>
          </div>
        </div>
      </div>

      <Divider />

      {/* CTA */}
      <div className="cta-section">
        <h2 className="cta-title reveal">
          Let&apos;s figure out where <em>AI fits</em> in your world.
        </h2>
        <p className="cta-desc reveal d1">
          No pitch deck, no discovery questionnaire. Just a real conversation
          about your business and what&apos;s possible.
        </p>
        <a href="mailto:kayakmind@gmail.com" className="cta-btn reveal d2">
          Start a conversation
        </a>
        <div className="cta-email reveal d3">
          or email directly at{" "}
          <a href="mailto:kayakmind@gmail.com">kayakmind@gmail.com</a>
        </div>
      </div>
    </>
  );
}
