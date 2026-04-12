"use client";

import { useState, useEffect } from "react";

const C = {
  midnight: "#1A1A2E",
  coral: "#FF6B4A",
  amber: "#FFAA3B",
  electric: "#4A3AFF",
  warmWhite: "#F5F0EB",
  smoke: "#8888AA",
  midLight: "#252542",
  midLighter: "#2E2E4A",
  coralDim: "rgba(255,107,74,0.12)",
  amberDim: "rgba(255,170,59,0.10)",
};

const QUESTIONS = [
  {
    id: "org_type", step: 1,
    text: "What type of organization are you?",
    type: "single",
    options: ["Nonprofit / mission-driven", "Professional services", "Creative agency or studio", "Technology startup", "Small business", "Education", "Healthcare", "Other"],
  },
  {
    id: "org_size", step: 1,
    text: "How many people?",
    type: "single",
    options: ["Just me", "2–5", "6–15", "16–50", "51–200", "200+"],
  },
  {
    id: "role", step: 1,
    text: "What's your role?",
    type: "single",
    options: ["Founder / CEO / ED", "C-suite / VP / Director", "Manager / Team Lead", "Operations / Admin", "Marketing / Comms", "Technology / IT", "Other"],
  },
  {
    id: "priorities", step: 2,
    text: "What are your top priorities right now?",
    subtitle: "Choose up to 3",
    type: "multi", max: 3,
    options: ["Growing revenue", "Reducing costs / efficiency", "Improving marketing", "Modernizing technology", "Better data & reporting", "Expanding programs or reach", "Fundraising & donor relations", "Building the team"],
  },
  {
    id: "ai_level", step: 2,
    text: "Where is your organization with AI right now?",
    type: "single",
    options: ["Haven't started — it feels overwhelming", "Curious — a few people have experimented", "Using it casually — ChatGPT for occasional tasks", "Actively implementing — adopted for specific workflows", "Advanced — AI is part of daily operations"],
  },
  {
    id: "opportunity", step: 3,
    text: "Where do you think AI could help most?",
    subtitle: "Choose up to 3",
    type: "multi", max: 3,
    options: ["Marketing & content creation", "Automating repetitive tasks", "Data analysis & reporting", "Customer/client communications", "Internal operations & workflows", "Strategy & decision-making", "Grant writing & fundraising", "I'm not sure — that's why I'm here"],
  },
  {
    id: "automate", step: 3,
    text: "If you could automate one thing tomorrow, what would it be?",
    type: "open",
    placeholder: "The thing that makes you think 'why am I still doing this manually?'",
  },
  {
    id: "blockers", step: 3,
    text: "What's holding you back?",
    subtitle: "Choose up to 2",
    type: "multi", max: 2,
    options: ["Don't know where to start", "Don't have the right skills", "Worried about cost", "Concerned about quality", "Privacy & security concerns", "Don't have time to figure it out", "Nothing — just need a guide"],
  },
];

const STEPS = [
  { num: 1, title: "About You", icon: "👋" },
  { num: 2, title: "Your Priorities", icon: "🎯" },
  { num: 3, title: "AI Opportunities", icon: "✨" },
  { num: 4, title: "Your Details", icon: "📬" },
  { num: 5, title: "Your Snapshot", icon: "🔥" },
];

function generateSnapshot(answers) {
  const priorities = answers.priorities || [];
  const opportunities = answers.opportunity || [];
  const aiLevel = answers.ai_level || "";
  const blockers = answers.blockers || [];
  const orgType = answers.org_type || "";

  const insights = [];

  if ((priorities.includes("Improving marketing") || priorities.includes("Growing revenue")) && opportunities.includes("Marketing & content creation")) {
    insights.push({
      area: "Marketing & Content",
      color: C.coral,
      icon: "📣",
      text: "Your biggest quick win is in marketing. AI lets small teams create 3–5x more content, repurpose across channels automatically, and compete with organizations that have much larger teams. A content engine setup could transform your output within weeks.",
      service: "Content Engine Setup · Brand Voice & Prompt Library",
    });
  }

  if ((priorities.includes("Reducing costs / efficiency")) && opportunities.includes("Automating repetitive tasks")) {
    insights.push({
      area: "Workflow Automation",
      color: C.amber,
      icon: "⚙️",
      text: "You're sitting on significant automation potential. Most organizations your size have 15–20 hours/week of repetitive work that AI can handle — data entry, report formatting, email routing, document creation. That's time your team gets back for higher-value work.",
      service: "Workflow Audit & Automation Map · AI-Powered Workflow Builds",
    });
  }

  if (priorities.includes("Better data & reporting") || opportunities.includes("Data analysis & reporting")) {
    insights.push({
      area: "Data & Intelligence",
      color: C.electric,
      icon: "📊",
      text: "Your data could be working much harder for you. AI-powered dashboards and automated reporting mean you stop building spreadsheets and start making decisions. Imagine getting a smart briefing every Monday instead of spending hours pulling numbers.",
      service: "Data Audit & Dashboard Setup · KPI Framework · AI-Powered Reporting",
    });
  }

  if (opportunities.includes("Customer/client communications") || opportunities.includes("Internal operations & workflows")) {
    insights.push({
      area: "Operations & Communications",
      color: C.coral,
      icon: "💬",
      text: "AI can handle the repetitive parts of communication — drafting responses, routing inquiries, personalizing outreach at scale — while keeping your team's voice and quality standards. The result: faster response times and more capacity for the conversations that matter.",
      service: "Custom AI Agent Builds · Email & Newsletter System",
    });
  }

  if (opportunities.includes("Grant writing & fundraising") || (orgType === "Nonprofit / mission-driven" && priorities.includes("Fundraising & donor relations"))) {
    insights.push({
      area: "Nonprofit & Fundraising",
      color: C.amber,
      icon: "🤝",
      text: "AI is a game-changer for nonprofits drowning in grant applications and donor reporting. Grant writing assistants, automated impact reports, and personalized donor communications mean your team spends more time on mission and less on paperwork.",
      service: "Nonprofit AI Toolkit · Grant Writing Assistant Agent",
    });
  }

  if (opportunities.includes("Strategy & decision-making")) {
    insights.push({
      area: "Strategic AI Adoption",
      color: C.electric,
      icon: "🧭",
      text: "Before diving into specific tools, a structured AI strategy helps you prioritize the right initiatives, avoid wasted spending, and build a roadmap your whole team can follow. This is especially valuable for organizations that know AI matters but aren't sure where to start.",
      service: "AI Readiness Assessment · AI Strategy Roadmap",
    });
  }

  if (opportunities.includes("I'm not sure — that's why I'm here")) {
    insights.push({
      area: "Finding Your Starting Point",
      color: C.coral,
      icon: "🔍",
      text: "Not knowing where AI fits is completely normal — that's exactly what an AI readiness assessment is for. A 30-minute conversation can surface 3–5 specific opportunities you haven't thought of, tailored to your organization's size, industry, and priorities.",
      service: "Free AI Audit Call · AI Readiness Assessment",
    });
  }

  if (insights.length === 0) {
    insights.push({
      area: "Your AI Opportunity",
      color: C.coral,
      icon: "🔥",
      text: "Based on your priorities, there are several areas where AI could create real value for your organization. A quick conversation can help us pinpoint the highest-impact starting points — and make sure you're not wasting time or money on the wrong tools.",
      service: "Free AI Audit Call",
    });
  }

  let maturityNote = "";
  if (aiLevel.includes("Haven't") || aiLevel.includes("Curious")) {
    maturityNote = "The good news: you don't need to be technical to get started. A clear strategy — starting with the areas that matter most to your organization — is the fastest path forward.";
  } else if (aiLevel.includes("casually")) {
    maturityNote = "You've already got a foundation to build on. The next step is moving from casual use to systematic implementation where AI actually changes how your team works day-to-day.";
  } else if (aiLevel.includes("implementing") || aiLevel.includes("Advanced")) {
    maturityNote = "You're ahead of most organizations your size. The opportunity now is optimization — making sure your AI investments are delivering measurable ROI and scaling what's working.";
  }

  return { insights: insights.slice(0, 3), maturityNote };
}

function Option({ label, selected, onClick, multi, color = C.coral }) {
  const bg = selected ? (multi ? "rgba(74,58,255,0.12)" : C.coralDim) : C.midLight;
  const border = selected ? (multi ? C.electric : color) : C.midLighter;
  const textColor = selected ? (multi ? "#9B93FF" : C.coral) : C.warmWhite;
  return (
    <button onClick={onClick} style={{
      background: bg, border: `1px solid ${border}`, color: textColor,
      padding: "11px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left",
      fontSize: 14, fontFamily: "'DM Sans',sans-serif", transition: "all 0.15s",
      lineHeight: 1.3, width: "100%", display: "flex", alignItems: "center", gap: 10,
    }}>
      {multi && (
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 18, height: 18, borderRadius: 4, flexShrink: 0,
          border: `2px solid ${selected ? C.electric : C.smoke}`,
          background: selected ? C.electric : "transparent",
          fontSize: 11, color: C.warmWhite,
        }}>{selected ? "✓" : ""}</span>
      )}
      {label}
    </button>
  );
}

export default function LeadMagnet() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: "", email: "", org: "", phone: "", newsletter: true });
  const [submitted, setSubmitted] = useState(false);

  const questions = QUESTIONS.filter((q) => q.step === step);
  const totalSteps = 5;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  const handleSingle = (qId, opt) => setAnswers((a) => ({ ...a, [qId]: opt }));
  const handleMulti = (qId, opt, max) => {
    setAnswers((a) => {
      const curr = a[qId] || [];
      if (curr.includes(opt)) return { ...a, [qId]: curr.filter((o) => o !== opt) };
      if (max && curr.length >= max) return a;
      return { ...a, [qId]: [...curr, opt] };
    });
  };
  const handleText = (qId, val) => setAnswers((a) => ({ ...a, [qId]: val }));

  const canAdvance = () => {
    if (step === 4) return contact.name && contact.email;
    const required = questions.filter((q) => q.type !== "open");
    return required.every((q) => answers[q.id] !== undefined && (Array.isArray(answers[q.id]) ? answers[q.id].length > 0 : true));
  };

  const goNext = () => {
    if (step === 4) {
      const results = generateSnapshot(answers);
      setSubmitted(true);
      setStep(5);
      // Fire API call in background — don't block UI
      fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          org_type: answers.org_type,
          org_size: answers.org_size,
          role: answers.role,
          priorities: answers.priorities || [],
          ai_level: answers.ai_level,
          opportunity: answers.opportunity || [],
          automate: answers.automate || "",
          blockers: answers.blockers || [],
          snapshot_results: results,
        }),
      }).catch((err) => console.error("Lead submission error:", err));
      return;
    }
    setStep((s) => s + 1);
  };
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const snapshot = submitted ? generateSnapshot(answers) : null;

  const stepInfo = STEPS[step - 1];

  return (
    <div style={{ minHeight: "100vh", background: C.midnight, color: C.warmWhite, fontFamily: "'DM Sans',sans-serif" }}>
      {/* Fonts loaded by root layout */}
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 20px 80px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: C.coral, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Firebug Agency</div>
          <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, margin: "0 0 4px", lineHeight: 1.3 }}>AI Opportunity Snapshot</h1>
          <p style={{ color: C.smoke, fontSize: 13, margin: 0 }}>2-3 minutes · See where AI can help your organization</p>
        </div>

        {/* Progress */}
        <div style={{ height: 3, background: C.midLighter, borderRadius: 2, marginBottom: 6, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg,${C.coral},${C.amber})`, borderRadius: 2, transition: "width 0.4s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.smoke, marginBottom: 24, fontFamily: "'Space Mono',monospace" }}>
          <span>{stepInfo.icon} {stepInfo.title}</span>
          <span>Step {step} of {totalSteps}</span>
        </div>

        {/* Results */}
        {step === 5 && snapshot ? (
          <div>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🔥</div>
              <h2 style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, margin: "0 0 6px" }}>
                {contact.name.split(" ")[0]}, here's your snapshot
              </h2>
              <p style={{ color: C.smoke, fontSize: 13, margin: 0 }}>
                Based on your answers, here are your top AI opportunity areas.
              </p>
            </div>

            {snapshot.insights.map((ins, i) => (
              <div key={i} style={{
                background: C.midLight, borderRadius: 14, padding: 22, marginBottom: 16,
                borderLeft: `3px solid ${ins.color}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{ins.icon}</span>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 14, fontWeight: 700, color: ins.color }}>{ins.area}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, margin: "0 0 10px", color: C.warmWhite }}>{ins.text}</p>
                <div style={{ fontSize: 11, color: C.smoke, fontFamily: "'Space Mono',monospace" }}>
                  Relevant services: {ins.service}
                </div>
              </div>
            ))}

            {snapshot.maturityNote && (
              <div style={{ background: C.amberDim, borderRadius: 12, padding: 18, marginBottom: 20, border: `1px solid ${C.amber}33` }}>
                <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, color: C.warmWhite }}>{snapshot.maturityNote}</p>
              </div>
            )}

            <div style={{
              background: C.coralDim, borderRadius: 14, padding: 22, marginBottom: 20,
              border: `1px solid ${C.coral}33`, textAlign: "center",
            }}>
              <h3 style={{ fontFamily: "'Space Mono',monospace", fontSize: 15, margin: "0 0 8px", color: C.coral }}>
                Want to go deeper?
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.5, margin: "0 0 16px", color: C.warmWhite }}>
                Book a free 30-minute AI audit call. We'll map out exactly where AI can make the biggest difference for {contact.org || "your organization"}.
              </p>
              <a
                href="mailto:kayakmind@gmail.com?subject=AI%20Audit%20Call%20Request"
                style={{
                  display: "inline-block",
                  background: C.coral, color: C.midnight, border: "none",
                  padding: "12px 28px", borderRadius: 8, cursor: "pointer",
                  fontFamily: "'Space Mono',monospace", fontSize: 13, fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Book Your Free AI Audit →
              </a>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => { setStep(1); setAnswers({}); setContact({ name: "", email: "", org: "", phone: "", newsletter: true }); setSubmitted(false); }}
                style={{ background: "none", border: `1px solid ${C.smoke}44`, color: C.smoke, padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: 12 }}
              >
                Start Over
              </button>
            </div>
          </div>
        ) : step === 4 ? (
          /* Contact form */
          <div>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, marginBottom: 4 }}>Almost there — where should we send your snapshot?</p>
              <p style={{ fontSize: 12, color: C.smoke, margin: 0 }}>We'll also follow up with a personal note within 24 hours.</p>
            </div>
            {[
              { key: "name", label: "Your name *", ph: "Chris Martinez" },
              { key: "email", label: "Email *", ph: "chris@example.com", type: "email" },
              { key: "org", label: "Organization name", ph: "Acme Nonprofit" },
              { key: "phone", label: "Phone (optional)", ph: "(555) 555-5555", type: "tel" },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: C.smoke, display: "block", marginBottom: 4, fontFamily: "'Space Mono',monospace" }}>{f.label}</label>
                <input
                  type={f.type || "text"}
                  value={contact[f.key]}
                  onChange={(e) => setContact((c) => ({ ...c, [f.key]: e.target.value }))}
                  placeholder={f.ph}
                  style={{
                    width: "100%", background: C.midLight, border: `1px solid ${C.midLighter}`,
                    color: C.warmWhite, borderRadius: 8, padding: "11px 14px", fontSize: 14,
                    fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.warmWhite, cursor: "pointer", marginTop: 8 }}>
              <input
                type="checkbox"
                checked={contact.newsletter}
                onChange={(e) => setContact((c) => ({ ...c, newsletter: e.target.checked }))}
                style={{ accentColor: C.coral }}
              />
              Send me Firebug's newsletter with AI insights for small organizations
            </label>
          </div>
        ) : (
          /* Questions */
          <div>
            {questions.map((q) => (
              <div key={q.id} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: q.subtitle ? 2 : 10, lineHeight: 1.4 }}>{q.text}</div>
                {q.subtitle && <div style={{ fontSize: 11, color: C.smoke, marginBottom: 10, fontFamily: "'Space Mono',monospace" }}>{q.subtitle}</div>}
                {q.type === "single" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {q.options.map((o) => <Option key={o} label={o} selected={answers[q.id] === o} onClick={() => handleSingle(q.id, o)} />)}
                  </div>
                )}
                {q.type === "multi" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {q.options.map((o) => <Option key={o} label={o} selected={(answers[q.id] || []).includes(o)} onClick={() => handleMulti(q.id, o, q.max)} multi />)}
                  </div>
                )}
                {q.type === "open" && (
                  <textarea
                    value={answers[q.id] || ""}
                    onChange={(e) => handleText(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    rows={2}
                    style={{
                      width: "100%", background: C.midLight, border: `1px solid ${C.midLighter}`,
                      color: C.warmWhite, borderRadius: 10, padding: "11px 14px", fontSize: 14,
                      fontFamily: "'DM Sans',sans-serif", resize: "vertical", outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Nav */}
        {step < 5 && (
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: `1px solid ${C.midLighter}`, marginTop: 8 }}>
            <button
              onClick={goBack}
              disabled={step === 1}
              style={{
                background: "none", border: `1px solid ${step === 1 ? C.midLighter : C.smoke}44`,
                color: step === 1 ? C.midLighter : C.smoke,
                padding: "10px 18px", borderRadius: 8, cursor: step === 1 ? "default" : "pointer",
                fontFamily: "'Space Mono',monospace", fontSize: 12,
              }}
            >← Back</button>
            <button
              onClick={goNext}
              disabled={!canAdvance()}
              style={{
                background: canAdvance() ? C.coral : C.midLighter,
                color: canAdvance() ? C.midnight : C.smoke,
                border: "none", padding: "10px 22px", borderRadius: 8,
                cursor: canAdvance() ? "pointer" : "default",
                fontFamily: "'Space Mono',monospace", fontSize: 12, fontWeight: 700,
              }}
            >{step === 4 ? "See My Snapshot →" : "Next →"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
