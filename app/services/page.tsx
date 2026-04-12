import Link from "next/link";
import Divider from "@/components/Divider";

export const metadata = { title: "What We Do" };

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-label reveal">What we do</div>
        <h1 className="page-title reveal d1">AI is changing everything.<br />We help you <em>keep up.</em></h1>
        <p className="page-sub reveal d2">The AI landscape changes weekly. Most organizations don&apos;t have the time or the person to keep up, sort signal from noise, and actually build what matters. That&apos;s what we do.</p>
      </div>

      <Divider />

      {/* How We Work */}
      <div className="section">
        <div className="section-label reveal">How we work</div>
        <h2 className="section-title reveal d1">We go deep.</h2>
        <p className="section-desc reveal d2">Whether it&apos;s a focused project or an ongoing partnership, we take the time to understand your business and build solutions that actually work. Here&apos;s what that looks like.</p>

        <div className="hw-row reveal d3">
          <div>
            <div className="hw-number">01</div>
            <div className="hw-title">We listen first.</div>
            <div className="hw-text">
              <p>Every engagement starts with understanding your business — your goals, your pain points, your team&apos;s capabilities, and your appetite for change.</p>
              <p>We don&apos;t show up with a pre-built framework. We show up with questions, then build a strategy around your actual situation.</p>
            </div>
          </div>
          <div className="hw-visual">
            <div className="hw-visual-label">Discovery typically covers</div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-coral" /><span>Current tools and workflows</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-coral" /><span>Team structure and skill gaps</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-coral" /><span>Biggest time sinks and bottlenecks</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-coral" /><span>What you&apos;ve already tried</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-coral" /><span>Budget and timeline realities</span></div>
          </div>
        </div>

        <div className="hw-row hw-row-reverse reveal d4">
          <div>
            <div className="hw-number">02</div>
            <div className="hw-title">We build a roadmap.</div>
            <div className="hw-text">
              <p>Based on what we learn, we create a prioritized AI integration plan — not a 50-page deck, but a clear, practical list of what to do first, what to do next, and what to ignore.</p>
              <p>We focus on impact. What will save the most time, reduce the most friction, or unlock the most value — that&apos;s what we tackle first.</p>
            </div>
          </div>
          <div className="hw-visual">
            <div className="hw-visual-label">Roadmap priorities</div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-amber" /><span>Quick wins (this week)</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-amber" /><span>High-impact builds (this month)</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-amber" /><span>Strategic shifts (this quarter)</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-amber" /><span>Things to watch (not yet)</span></div>
          </div>
        </div>

        <div className="hw-row reveal d5">
          <div>
            <div className="hw-number">03</div>
            <div className="hw-title">We do the work.</div>
            <div className="hw-text">
              <p>This is where most consultancies disappear. We don&apos;t. We actually build the workflows, set up the tools, create the prompt systems, and integrate AI into your existing operations.</p>
              <p>You get working solutions — not recommendations to hand off to someone else.</p>
            </div>
          </div>
          <div className="hw-visual">
            <div className="hw-visual-label">Implementation includes</div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-electric" /><span>Workflow design and automation</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-electric" /><span>Tool selection and setup</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-electric" /><span>Custom prompt engineering</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-electric" /><span>Team onboarding and handoff</span></div>
          </div>
        </div>

        <div className="hw-row hw-row-reverse reveal d6">
          <div>
            <div className="hw-number">04</div>
            <div className="hw-title">We stay with you.</div>
            <div className="hw-text">
              <p>AI moves fast. What works today might be obsolete in three months. That&apos;s why we stay connected — monitoring the landscape, adjusting your strategy, and building new solutions as opportunities emerge.</p>
              <p>You always have someone watching the horizon for you.</p>
            </div>
          </div>
          <div className="hw-visual">
            <div className="hw-visual-label">Ongoing support</div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-coral" /><span>Monthly strategy calls</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-coral" /><span>Landscape monitoring and alerts</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-coral" /><span>Async access for quick questions</span></div>
            <div className="hw-visual-item"><div className="hw-dot hw-dot-coral" /><span>Quarterly roadmap updates</span></div>
          </div>
        </div>
      </div>

      <Divider />

      {/* Services Deep Dive */}
      <div className="section">
        <div className="section-label reveal">What we cover</div>
        <h2 className="section-title reveal d1">The full spectrum of AI integration.</h2>
        <p className="section-desc reveal d2">Every organization is different. Here are the areas where Firebug clients typically see the biggest impact.</p>

        <div className="services-grid">
          <div className="service-card reveal d3">
            <div className="service-card-icon sci-coral">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B4A" strokeWidth="2" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
            </div>
            <h3>AI strategy &amp; roadmapping</h3>
            <p>Where should AI fit in your organization? What&apos;s worth investing in and what&apos;s hype? We assess your operations, identify high-impact opportunities, and build a practical plan to get there — prioritized by effort and value.</p>
          </div>
          <div className="service-card reveal d4">
            <div className="service-card-icon sci-electric">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A3AFF" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
            </div>
            <h3>Workflow automation</h3>
            <p>We identify repetitive, time-consuming tasks in your operations and build AI-powered workflows that handle them — from content production pipelines to data processing to client communications. You get hours back every week.</p>
          </div>
          <div className="service-card reveal d5">
            <div className="service-card-icon sci-amber">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFAA3B" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
            </div>
            <h3>Content &amp; communications</h3>
            <p>AI can transform how you create, distribute, and optimize content — but only if it&apos;s set up right. We build systems for drafting, editing, publishing, and repurposing content that maintain your voice while dramatically increasing output.</p>
          </div>
          <div className="service-card reveal d6">
            <div className="service-card-icon sci-smoke">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8888AA" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
            </div>
            <h3>Tool evaluation &amp; integration</h3>
            <p>The AI tool landscape is overwhelming — new products launch daily, many of them overlapping. We cut through the noise, evaluate what&apos;s actually worth using for your specific needs, and handle the setup and integration.</p>
          </div>
          <div className="service-card reveal d3">
            <div className="service-card-icon sci-coral">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B4A" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
            </div>
            <h3>Custom AI agents</h3>
            <p>For organizations ready to go deeper, we design and build custom AI agents that handle specific business processes — research, data analysis, customer interactions, internal knowledge management, and more.</p>
          </div>
          <div className="service-card reveal d4">
            <div className="service-card-icon sci-electric">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A3AFF" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
            </div>
            <h3>Team training &amp; enablement</h3>
            <p>AI tools are only as good as the people using them. We run hands-on workshops that teach your team how to use AI effectively in their specific roles — not generic &quot;intro to ChatGPT&quot; sessions, but practical training tied to their actual work.</p>
          </div>
        </div>
      </div>

      <Divider />


      {/* FAQ */}
      <div className="section">
        <div className="section-label reveal">Common questions</div>
        <h2 className="section-title reveal d1">Things people ask before we start.</h2>
        <div className="faq-list">
          <div className="faq-item reveal d2">
            <div className="faq-q">What kinds of organizations do you work with?</div>
            <div className="faq-a">Nonprofits, agencies, startups, small businesses, and teams within larger organizations that don&apos;t have dedicated AI or tech resources. If you know AI matters but don&apos;t have someone on your team to figure it out and build it — we&apos;re probably a good fit.</div>
          </div>
          <div className="faq-item reveal d3">
            <div className="faq-q">How many clients do you take on?</div>
            <div className="faq-a">I keep my roster small — intentionally. Every client gets real attention, not a watered-down version of a stretched-thin consultant.</div>
          </div>
          <div className="faq-item reveal d4">
            <div className="faq-q">What if I don&apos;t know where to start?</div>
            <div className="faq-a">That&apos;s exactly why we exist. Most clients come to us with a vague sense that they should be doing more with AI but no clear picture of where to begin. The Spark tier is designed for exactly this — we figure it out together.</div>
          </div>
          <div className="faq-item reveal d5">
            <div className="faq-q">How is this different from just using ChatGPT ourselves?</div>
            <div className="faq-a">ChatGPT is a tool. We help you figure out which tools to use, how to integrate them into your actual workflows, and how to build systems that compound over time. The difference between using AI casually and using it strategically is enormous — that&apos;s the gap we fill.</div>
          </div>
        </div>
      </div>

      <Divider />

      {/* Snapshot CTA */}
      <div className="snapshot-cta">
        <h2 className="reveal">Not sure where to start? <em>Find out in 2 minutes.</em></h2>
        <p className="reveal d1">Take our AI Opportunity Snapshot — a quick assessment that shows you exactly where AI can help your organization most.</p>
        <Link href="/snapshot" className="cta-btn reveal d2">Take the Snapshot</Link>
      </div>

      <Divider />

      {/* CTA */}
      <div className="cta-section">
        <h2 className="cta-title reveal">Ready to <em>light it up?</em></h2>
        <p className="cta-desc reveal d1">Let&apos;s start with a conversation. No pitch, no pressure — just a clear-eyed look at where AI fits in your organization.</p>
        <a href="mailto:kayakmind@gmail.com" className="cta-btn reveal d2">Start a conversation</a>
        <div className="cta-email reveal d3">or email directly at <a href="mailto:kayakmind@gmail.com">kayakmind@gmail.com</a></div>
      </div>
    </>
  );
}
