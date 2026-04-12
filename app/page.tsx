import Link from "next/link";
import Divider from "@/components/Divider";

export const metadata = {
  title: "Firebug Agency — Your AI Person",
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-match reveal d1">
          <svg width="56" height="96" viewBox="0 0 60 140">
            <rect x="27" y="50" width="6" height="88" rx="3" fill="#C4B8A8" />
            <ellipse cx="30" cy="50" rx="9" ry="10" fill="#2A1A12" />
            <path d="M30 4 C30 4, 42 18, 43 30 C44 42, 38 48, 30 50 C22 48, 16 42, 17 30 C18 18, 30 4, 30 4Z" fill="#FF6B4A" opacity="0.9" />
            <path d="M30 18 C30 18, 37 26, 37 33 C37 39, 34 44, 30 46 C26 44, 23 39, 23 33 C23 26, 30 18, 30 18Z" fill="#FFAA3B" opacity="0.9" />
            <ellipse cx="30" cy="40" rx="4" ry="6" fill="#FFE4A0" opacity="0.8" />
          </svg>
        </div>
        <h1 className="reveal d2">We&apos;re your <em>AI person.</em></h1>
        <p className="hero-sub reveal d3">AI moves fast — new tools, new capabilities, new best practices, sometimes weekly. You don&apos;t have time to keep up. We do. We provide ongoing guidance and hands-on implementation so you stay ahead instead of scrambling to catch up.</p>
        <a href="#contact" className="hero-cta reveal d4">Start a conversation</a>
      </section>

      <Divider />

      {/* What you get */}
      <section id="services">
        <div className="section-label reveal">What you get</div>
        <h2 className="section-title reveal d1">Direct access to someone<br />who gets this stuff.</h2>
        <p className="section-desc reveal d2">No account managers. No junior staff. No generic playbooks. You work directly with me — and I keep my client roster small so every organization gets real attention.</p>
        <div className="value-grid">
          <div className="value-card reveal d3">
            <div className="value-icon vi-coral">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B4A" strokeWidth="2" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
            </div>
            <h3>AI strategy</h3>
            <p>Where should AI fit in your organization? What tools matter? What&apos;s hype? I cut through the noise and give you a clear, prioritized roadmap.</p>
          </div>
          <div className="value-card reveal d4">
            <div className="value-icon vi-electric">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A3AFF" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
            </div>
            <h3>Hands-on implementation</h3>
            <p>I don&apos;t just recommend — I build. Workflows, automations, prompt systems, tool integrations. You get working solutions, not slide decks.</p>
          </div>
          <div className="value-card reveal d5">
            <div className="value-icon vi-amber">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFAA3B" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
            </div>
            <h3>Ongoing guidance</h3>
            <p>The AI landscape shifts weekly. You&apos;re busy running your organization — I stay on top of what&apos;s changing, flag what matters to your business, and adjust your strategy as the ground moves.</p>
          </div>
        </div>
      </section>

      <Divider />

      {/* Pricing */}
      <section id="pricing">
        <div className="section-label reveal">Pricing</div>
        <h2 className="section-title reveal d1">Simple, transparent,<br />built for the long haul.</h2>
        <p className="section-desc reveal d2">Three ways to work together. Most clients start with Spark and move to Flame once they see what&apos;s possible.</p>
        <div className="tiers-grid">
          <div className="tier reveal d3">
            <div className="tier-name">Spark</div>
            <div className="tier-price">$500/month</div>
            <div className="tier-desc">Your AI pulse check. For organizations that aren&apos;t ready to build yet but need someone watching the horizon.</div>
            <ul className="tier-features">
              <li>One strategy call per month</li>
              <li>Monthly landscape brief</li>
              <li>Async access for quick questions</li>
              <li>Tool &amp; workflow recommendations</li>
            </ul>
            <a href="#contact" className="tier-cta tier-cta-outline">Get started</a>
          </div>
          <div className="tier tier-featured reveal d4">
            <div className="tier-badge">Most popular</div>
            <div className="tier-name">Flame</div>
            <div className="tier-price">$1,500/month</div>
            <div className="tier-desc">Your AI partner. I build the workflows, set up the tools, and keep your strategy sharp as things evolve.</div>
            <ul className="tier-features">
              <li>Everything in Spark</li>
              <li>Hands-on implementation</li>
              <li>Two strategy calls per month</li>
              <li>Monthly priorities memo</li>
              <li>Ongoing async access</li>
            </ul>
            <a href="#contact" className="tier-cta tier-cta-fill">Get started</a>
          </div>
          <div className="tier reveal d5">
            <div className="tier-name">Signal</div>
            <div className="tier-price">Custom</div>
            <div className="tier-desc">For bigger lifts. Full strategy development, team workshops, or custom agent builds — scoped to your needs.</div>
            <ul className="tier-features">
              <li>Full AI strategy development</li>
              <li>Team training workshops</li>
              <li>Custom agent &amp; automation builds</li>
              <li>Intensive project sprints</li>
            </ul>
            <a href="#contact" className="tier-cta tier-cta-outline">Let&apos;s scope it</a>
          </div>
        </div>
      </section>

      <Divider />

      {/* About */}
      <section id="about">
        <div className="section-label reveal">Who you&apos;re working with</div>
        <div className="about-grid">
          <div className="about-photo reveal d2">
            <div className="about-photo-placeholder">Your photo here</div>
          </div>
          <div className="about-text">
            <h3 className="reveal d2">I&apos;ve spent my career building systems and processes that help organizations reach their goals through technology.</h3>
            <p className="reveal d3">I&apos;m Chris — a systems builder with a background in communications strategy, science journalism, and a deep obsession with what AI is making possible right now.</p>
            <p className="reveal d4">I&apos;ve designed and implemented AI workflows for research institutions, media companies, and content platforms. I don&apos;t just talk about this stuff — <strong>I use it every day to build real systems for real organizations.</strong></p>
            <p className="reveal d5">Firebug exists because I kept watching smart, capable organizations fall behind simply because they didn&apos;t have someone to guide them through the noise. That&apos;s what I do.</p>
            <div className="about-tags reveal d6">
              <span className="about-tag">AI strategy</span>
              <span className="about-tag">Workflow automation</span>
              <span className="about-tag">Content systems</span>
              <span className="about-tag">Technology implementation</span>
              <span className="about-tag">Agent development</span>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Snapshot CTA */}
      <div className="snapshot-cta">
        <h2 className="reveal">Where could AI help <em>your organization?</em></h2>
        <p className="reveal d1">Take our 2-minute AI Opportunity Snapshot and get personalized insights on where AI can make the biggest impact for you.</p>
        <Link href="/snapshot" className="cta-btn reveal d2">Take the Snapshot</Link>
      </div>

      <Divider />

      {/* CTA */}
      <section className="cta-section" id="contact">
        <h2 className="cta-title reveal">Ready to <em>light it up?</em></h2>
        <p className="cta-desc reveal d1">Let&apos;s start with a conversation. No pitch, no pressure — just a clear-eyed look at where AI fits in your organization.</p>
        <a href="mailto:kayakmind@gmail.com" className="cta-btn reveal d2">Start a conversation</a>
        <div className="cta-email reveal d3">or email directly at <a href="mailto:kayakmind@gmail.com">kayakmind@gmail.com</a></div>
      </section>
    </>
  );
}
