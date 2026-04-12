"use client";

import { useState, useRef, useEffect } from "react";

const COLORS = {
  midnight: "#1A1A2E",
  coral: "#FF6B4A",
  amber: "#FFAA3B",
  electric: "#4A3AFF",
  warmWhite: "#F5F0EB",
  smoke: "#8888AA",
  midnightLight: "#252542",
  midnightLighter: "#2E2E4A",
  coralDim: "rgba(255,107,74,0.15)",
  amberDim: "rgba(255,170,59,0.12)",
  electricDim: "rgba(74,58,255,0.12)",
};

const SECTIONS = [
  {
    id: "org",
    title: "Organization Profile",
    subtitle: "Who are you and what do you do?",
    icon: "🏢",
    questions: [
      {
        id: "org_type",
        text: "What type of organization are you?",
        type: "single",
        options: [
          "Nonprofit / mission-driven",
          "Professional services (law, accounting, real estate)",
          "Creative agency or studio",
          "Technology startup",
          "Small business (retail, food, services)",
          "Education institution",
          "Healthcare organization",
          "Other",
        ],
      },
      {
        id: "org_size",
        text: "How many people are in your organization?",
        type: "single",
        options: ["Just me", "2–5", "6–15", "16–50", "51–200", "200+"],
      },
      {
        id: "role",
        text: "What is your role?",
        type: "single",
        options: [
          "Founder / CEO / Executive Director",
          "C-suite / VP / Director",
          "Manager / Team Lead",
          "Operations / Admin",
          "Marketing / Communications",
          "Technology / IT",
          "Other",
        ],
      },
      {
        id: "tech_budget",
        text: "Annual budget for technology and tools?",
        type: "single",
        options: [
          "Under $5,000/year",
          "$5,000–$15,000",
          "$15,000–$50,000",
          "$50,000–$100,000",
          "Over $100,000",
          "I don't know",
        ],
      },
      {
        id: "org_description",
        text: "In a sentence or two, what does your organization do?",
        type: "open",
        placeholder: "Type here or tap the mic to record an audio response...",
      },
    ],
  },
  {
    id: "ai",
    title: "AI Maturity",
    subtitle: "Where are you today with AI?",
    icon: "🤖",
    questions: [
      {
        id: "ai_relationship",
        text: "How would you describe your current relationship with AI?",
        type: "single",
        scoreMap: [1, 2, 2.5, 3.5, 5],
        options: [
          "Haven't started — it feels overwhelming",
          "Curious — a few people have experimented",
          "Dabbling — we use ChatGPT occasionally",
          "Implementing — we've adopted AI for specific workflows",
          "Advanced — AI is integrated into core operations",
        ],
      },
      {
        id: "ai_tools",
        text: "Which AI tools does your organization currently use?",
        type: "multi",
        options: [
          "ChatGPT / OpenAI",
          "Claude / Anthropic",
          "Google Gemini",
          "Microsoft Copilot",
          "Image generation (Midjourney, DALL·E)",
          "Writing assistants (Grammarly, etc.)",
          "AI features in existing tools",
          "Industry-specific AI tools",
          "None",
        ],
      },
      {
        id: "ai_adoption",
        text: "Who uses AI in your organization?",
        type: "single",
        scoreMap: [1, 2, 3, 4, 5],
        options: [
          "Nobody",
          "One or two early adopters",
          "A specific team or department",
          "Most of the organization",
          "Everyone, regularly",
        ],
      },
      {
        id: "ai_policy",
        text: "Does your organization have an AI usage policy?",
        type: "single",
        options: [
          "Yes, documented and enforced",
          "Yes, informal guidelines",
          "No, but we've discussed it",
          "No, haven't thought about it",
        ],
      },
      {
        id: "ai_concerns",
        text: "What are your biggest concerns about AI adoption?",
        type: "multi",
        options: [
          "Data privacy and security",
          "Accuracy and reliability",
          "Cost",
          "Team resistance or lack of skills",
          "Not knowing where to start",
          "Replacing jobs / team anxiety",
          "Legal or compliance risks",
          "No concerns — we just want to move faster",
        ],
      },
    ],
  },
  {
    id: "strategy",
    title: "Strategy & Leadership",
    subtitle: "How does AI fit your bigger picture?",
    icon: "🎯",
    questions: [
      {
        id: "strategic_plan",
        text: "Does your strategic plan mention AI or technology?",
        type: "single",
        scoreMap: [5, 3.5, 2, 1],
        options: [
          "Yes, AI is a key part of our plan",
          "We have a tech strategy, but AI isn't addressed",
          "General plan, technology isn't a focus",
          "We don't have a formal strategic plan",
        ],
      },
      {
        id: "tech_decisions",
        text: "Who makes technology decisions?",
        type: "single",
        scoreMap: [2.5, 4, 1.5, 3.5, 1],
        options: [
          "The founder/CEO/ED makes all tech decisions",
          "A technology leader (CTO, IT director)",
          "Decisions are made ad hoc by whoever needs a tool",
          "A committee or leadership team",
          "No clear decision-making process",
        ],
      },
      {
        id: "tool_evaluation",
        text: "How do you evaluate and select new tools?",
        type: "single",
        scoreMap: [5, 3, 2, 1],
        options: [
          "Research, compare, and pilot before committing",
          "Someone finds it, tries it, we adopt if it works",
          "Go with what's popular or peer-recommended",
          "No process — tools accumulate organically",
        ],
      },
      {
        id: "priorities",
        text: "Top 3 organizational priorities right now?",
        type: "multi",
        max: 3,
        options: [
          "Growing revenue / acquiring customers",
          "Reducing costs / improving efficiency",
          "Improving quality of services",
          "Expanding programs or reach",
          "Fundraising and donor relations",
          "Building the team",
          "Modernizing technology",
          "Improving marketing",
          "Improving data and reporting",
          "Compliance and risk management",
        ],
      },
      {
        id: "dream_outcome",
        text: "What would success look like? What's the dream outcome?",
        type: "open",
        placeholder: "Be as specific or aspirational as you want...",
      },
    ],
  },
  {
    id: "ops",
    title: "Operations & Automation",
    subtitle: "Where is time being wasted?",
    icon: "⚙️",
    questions: [
      {
        id: "workflow_efficiency",
        text: "How would you rate your workflow efficiency?",
        type: "single",
        scoreMap: [5, 3.5, 2, 1],
        options: [
          "Excellent — streamlined and documented",
          "Good — mostly smooth with occasional friction",
          "Fair — significant manual work and workarounds",
          "Poor — constantly fighting fires",
        ],
      },
      {
        id: "time_sinks",
        text: "Which tasks consume the most time?",
        type: "multi",
        max: 5,
        options: [
          "Data entry between systems",
          "Email management",
          "Scheduling and calendars",
          "Report creation",
          "Invoice and payment processing",
          "Client intake and onboarding",
          "Document creation",
          "Social media management",
          "Grant writing and reporting",
          "Meeting notes and follow-ups",
          "File management",
          "Customer service inquiries",
          "Research and info gathering",
        ],
      },
      {
        id: "documentation",
        text: "Are your core business processes documented?",
        type: "single",
        scoreMap: [5, 3, 1.5, 1],
        options: [
          "Fully documented with SOPs and checklists",
          "Some documented, most aren't",
          "Processes live in people's heads",
          "What processes?",
        ],
      },
      {
        id: "tool_connectivity",
        text: "How connected are your tools?",
        type: "single",
        scoreMap: [5, 3.5, 2, 1],
        options: [
          "Highly connected — data flows automatically",
          "Somewhat connected — some integrations",
          "Mostly disconnected — manual data transfer",
          "Completely siloed — nothing talks to anything",
        ],
      },
      {
        id: "automate_wish",
        text: "If you could automate one thing tomorrow, what would it be?",
        type: "open",
        placeholder: "What makes you think 'why am I still doing this manually?'",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Communications",
    subtitle: "How do you reach your audience?",
    icon: "📣",
    questions: [
      {
        id: "marketing_capacity",
        text: "How would you describe your marketing capacity?",
        type: "single",
        scoreMap: [5, 3, 2, 1, 2],
        options: [
          "Dedicated marketing team",
          "One person alongside other responsibilities",
          "Shared across people, none dedicated",
          "We don't really do marketing",
          "The founder/ED does all marketing",
        ],
      },
      {
        id: "channels",
        text: "Which marketing channels do you actively use?",
        type: "multi",
        options: [
          "Website / blog",
          "Email newsletter",
          "Social media (organic)",
          "Paid advertising",
          "SEO / search",
          "Events and speaking",
          "PR / media relations",
          "Direct outreach / sales",
          "Referrals / word of mouth",
          "Video / YouTube",
          "Podcast",
        ],
      },
      {
        id: "content_frequency",
        text: "How often do you publish new content?",
        type: "single",
        scoreMap: [5, 4, 3.5, 2.5, 1.5, 1],
        options: [
          "Daily",
          "A few times per week",
          "Weekly",
          "A few times per month",
          "Monthly or less",
          "Rarely / never",
        ],
      },
      {
        id: "marketing_challenges",
        text: "Biggest marketing challenges?",
        type: "multi",
        max: 3,
        options: [
          "Not enough time to create content",
          "Don't know what to say or write about",
          "Inconsistent posting",
          "Can't measure what's working",
          "Website is outdated",
          "Brand voice is unclear",
          "Not on the right channels",
          "Email list is small or unengaged",
          "Can't compete with larger organizations",
        ],
      },
    ],
  },
  {
    id: "data",
    title: "Data & Business Intelligence",
    subtitle: "Can you see what's happening?",
    icon: "📊",
    questions: [
      {
        id: "performance_tracking",
        text: "How do you track your organization's performance?",
        type: "single",
        scoreMap: [5, 3.5, 2, 1],
        options: [
          "Real-time dashboards and automated reports",
          "Regular manual reports (weekly/monthly)",
          "Ad hoc — we pull numbers when someone asks",
          "Gut feel — we don't really track metrics",
        ],
      },
      {
        id: "data_location",
        text: "Where does your important data live?",
        type: "multi",
        options: [
          "Spreadsheets (Sheets, Excel)",
          "CRM (HubSpot, Salesforce, etc.)",
          "Project management tools",
          "Accounting software",
          "Email and communication tools",
          "Custom database or application",
          "Paper files or personal notes",
          "I'm not sure",
        ],
      },
      {
        id: "source_of_truth",
        text: "Do you have a single source of truth for key metrics?",
        type: "single",
        scoreMap: [5, 3, 1.5, 1],
        options: [
          "Yes — we know exactly where to go",
          "Sort of — different tools show different numbers",
          "No — it's a mess and nobody trusts the data",
          "We don't have key metrics defined",
        ],
      },
      {
        id: "magic_dashboard",
        text: "If you had a magic dashboard, what would you want to see?",
        type: "open",
        placeholder: "What questions do you wish you could answer instantly?",
      },
    ],
  },
  {
    id: "tech",
    title: "Technology & Infrastructure",
    subtitle: "What are you building on?",
    icon: "🛡️",
    questions: [
      {
        id: "stack_quality",
        text: "How would you rate your overall technology stack?",
        type: "single",
        scoreMap: [5, 3.5, 2, 1],
        options: [
          "Modern and well-maintained",
          "Adequate — works but could be better",
          "Dated — tools from several years ago",
          "Chaotic — adopted randomly, nothing organized",
        ],
      },
      {
        id: "collab_platform",
        text: "Primary collaboration platform?",
        type: "single",
        options: [
          "Google Workspace",
          "Microsoft 365",
          "A mix of both",
          "Something else",
          "No consistent platform",
        ],
      },
      {
        id: "tech_concerns",
        text: "Which concerns apply to your current tech stack?",
        type: "multi",
        options: [
          "Paying for tools nobody uses",
          "Data trapped in non-exportable tools",
          "Too many overlapping tools",
          "Nothing integrates",
          "No backup strategy",
          "Don't know total tech spend",
          "Website is outdated",
          "No password manager or security practices",
          "We've outgrown our tools",
          "None — our stack is solid",
        ],
      },
      {
        id: "resilience",
        text: "If a key tool shut down tomorrow, could you keep operating?",
        type: "single",
        scoreMap: [5, 3.5, 2, 1],
        options: [
          "Yes — data is portable, we'd switch quickly",
          "Probably — painful but survivable",
          "I'm not sure",
          "No — we'd be in serious trouble",
        ],
      },
      {
        id: "tech_anxiety",
        text: "Anything about your tech setup that keeps you up at night?",
        type: "open",
        placeholder: "Optional — share any concerns or frustrations...",
      },
    ],
  },
];

const DIMENSION_MAP = {
  ai: { label: "AI Maturity", color: COLORS.coral, keys: ["ai_relationship", "ai_adoption"] },
  strategy: { label: "Strategic Readiness", color: COLORS.electric, keys: ["strategic_plan", "tech_decisions", "tool_evaluation"] },
  ops: { label: "Operational Efficiency", color: COLORS.amber, keys: ["workflow_efficiency", "documentation", "tool_connectivity"] },
  marketing: { label: "Marketing Capability", color: COLORS.coral, keys: ["marketing_capacity", "content_frequency"] },
  data: { label: "Data & Intelligence", color: COLORS.electric, keys: ["performance_tracking", "source_of_truth"] },
  tech: { label: "Technology Foundation", color: COLORS.amber, keys: ["stack_quality", "resilience"] },
};

function computeScores(answers) {
  const scores = {};
  for (const [sectionId, dim] of Object.entries(DIMENSION_MAP)) {
    const section = SECTIONS.find((s) => s.id === sectionId);
    if (!section) continue;
    let total = 0, count = 0;
    for (const key of dim.keys) {
      const q = section.questions.find((qq) => qq.id === key);
      if (!q || !q.scoreMap || answers[key] === undefined) continue;
      const idx = q.options.indexOf(answers[key]);
      if (idx >= 0 && q.scoreMap[idx] !== undefined) {
        total += q.scoreMap[idx];
        count++;
      }
    }
    scores[sectionId] = count > 0 ? Math.round((total / count) * 10) / 10 : null;
  }
  return scores;
}

function getRecommendation(dimId, score) {
  if (score === null) return "Complete the assessment to see recommendations.";
  const recs = {
    ai: {
      low: "Start with AI Foundations Training — your team needs a solid base before adopting tools.",
      mid: "Ready for an AI Strategy Roadmap to prioritize which tools and workflows to tackle first.",
      high: "Ready for advanced work — custom agent builds and AI-powered automation.",
    },
    strategy: {
      low: "Begin with an AI Readiness Assessment and develop a strategic technology plan.",
      mid: "You have the foundation — an AI Strategy Roadmap will give you a clear path forward.",
      high: "Strong strategic base — focus on execution with hands-on implementation.",
    },
    ops: {
      low: "Start with a Workflow Audit — document and fix processes before adding AI.",
      mid: "Good foundation — ready for AI-Powered Workflow Builds to automate the manual work.",
      high: "Operations are strong — layer in advanced automation and custom agents.",
    },
    marketing: {
      low: "Marketing is a quick-win area — start with a Marketing Audit and Content Engine Setup.",
      mid: "Build a Brand Voice & Prompt Library and AI-assisted content repurposing pipeline.",
      high: "Mature marketing — optimize with AI-powered analytics, SEO automation, and advanced personalization.",
    },
    data: {
      low: "Start with a Data Audit and KPI Framework — you need to know what to measure before measuring it.",
      mid: "Ready for Dashboard Setup and automated reporting to make your data actionable.",
      high: "Strong data practice — add AI-Powered Reporting for predictive insights and anomaly detection.",
    },
    tech: {
      low: "This comes first. Tech Stack Advising to build a resilient, portable foundation before anything else.",
      mid: "Solid base with gaps — targeted improvements to portability, integrations, and security.",
      high: "Strong foundation — you're ready to layer AI on top with confidence.",
    },
  };
  const level = score <= 2.5 ? "low" : score <= 3.5 ? "mid" : "high";
  return recs[dimId]?.[level] || "";
}

function RadarChart({ scores }) {
  const dims = Object.entries(DIMENSION_MAP);
  const cx = 150, cy = 150, r = 110;
  const levels = [1, 2, 3, 4, 5];
  const angleStep = (Math.PI * 2) / dims.length;
  const startAngle = -Math.PI / 2;
  const getPoint = (i, val) => {
    const a = startAngle + i * angleStep;
    const d = (val / 5) * r;
    return [cx + d * Math.cos(a), cy + d * Math.sin(a)];
  };
  const dataPoints = dims.map(([id], i) => getPoint(i, scores[id] ?? 0));
  const polyStr = dataPoints.map((p) => p.join(",")).join(" ");
  return (
    <svg viewBox="0 0 300 300" style={{ width: "100%", maxWidth: 340, margin: "0 auto", display: "block" }}>
      {levels.map((l) => (
        <polygon
          key={l}
          points={dims.map((_, i) => getPoint(i, l).join(",")).join(" ")}
          fill="none"
          stroke={COLORS.smoke}
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}
      {dims.map(([, dim], i) => {
        const [x, y] = getPoint(i, 5);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={COLORS.smoke} strokeWidth="0.5" opacity="0.2" />;
      })}
      <polygon points={polyStr} fill={COLORS.coral} fillOpacity="0.2" stroke={COLORS.coral} strokeWidth="2" />
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={COLORS.coral} />
      ))}
      {dims.map(([, dim], i) => {
        const [x, y] = getPoint(i, 5.8);
        const anchor = x < cx - 10 ? "end" : x > cx + 10 ? "start" : "middle";
        return (
          <text key={i} x={x} y={y} textAnchor={anchor} fill={COLORS.warmWhite} fontSize="9" fontFamily="'DM Sans', sans-serif">
            {dim.label}
          </text>
        );
      })}
    </svg>
  );
}

function ScoreBar({ label, score, color }) {
  const pct = score !== null ? (score / 5) * 100 : 0;
  const labelText = score !== null ? `${score}/5` : "—";
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
        <span style={{ color: COLORS.warmWhite }}>{label}</span>
        <span style={{ color, fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>{labelText}</span>
      </div>
      <div style={{ height: 6, background: COLORS.midnightLighter, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

export default function Assessment() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [recording, setRecording] = useState(null);
  const [audioBlobs, setAudioBlobs] = useState({});
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSection]);

  const section = SECTIONS[currentSection];
  const progress = ((currentSection + (completed ? 1 : 0)) / SECTIONS.length) * 100;

  const handleSingle = (qId, option) => setAnswers((a) => ({ ...a, [qId]: option }));

  const handleMulti = (qId, option, max) => {
    setAnswers((a) => {
      const curr = a[qId] || [];
      if (curr.includes(option)) return { ...a, [qId]: curr.filter((o) => o !== option) };
      if (max && curr.length >= max) return a;
      return { ...a, [qId]: [...curr, option] };
    });
  };

  const handleText = (qId, val) => setAnswers((a) => ({ ...a, [qId]: val }));

  const toggleRecording = async (qId) => {
    if (recording === qId) {
      mediaRecorderRef.current?.stop();
      setRecording(null);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlobs((ab) => ({ ...ab, [qId]: URL.createObjectURL(blob) }));
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(qId);
    } catch { /* mic not available */ }
  };

  const sectionAnswered = (s) => {
    const required = s.questions.filter((q) => q.type !== "open");
    return required.every((q) => answers[q.id] !== undefined);
  };

  const goNext = () => {
    if (currentSection < SECTIONS.length - 1) setCurrentSection((c) => c + 1);
    else setCompleted(true);
  };
  const goBack = () => { if (currentSection > 0) setCurrentSection((c) => c - 1); };

  const scores = computeScores(answers);
  const allScored = Object.values(scores).every((s) => s !== null);

  if (completed) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.midnight, color: COLORS.warmWhite, fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: COLORS.coral, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
              Firebug Agency
            </div>
            <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: 26, margin: 0, lineHeight: 1.2 }}>
              Your AI Readiness Profile
            </h1>
            <p style={{ color: COLORS.smoke, fontSize: 14, marginTop: 8 }}>
              Here's where you stand across 6 dimensions — and where to start.
            </p>
          </div>
          <div style={{ background: COLORS.midnightLight, borderRadius: 16, padding: 24, marginBottom: 24, border: `1px solid ${COLORS.midnightLighter}` }}>
            <RadarChart scores={scores} />
          </div>
          <div style={{ background: COLORS.midnightLight, borderRadius: 16, padding: 24, marginBottom: 24, border: `1px solid ${COLORS.midnightLighter}` }}>
            <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, margin: "0 0 20px", color: COLORS.warmWhite }}>Dimension Scores</h2>
            {Object.entries(DIMENSION_MAP).map(([id, dim]) => (
              <ScoreBar key={id} label={dim.label} score={scores[id]} color={dim.color} />
            ))}
          </div>
          <div style={{ background: COLORS.midnightLight, borderRadius: 16, padding: 24, marginBottom: 24, border: `1px solid ${COLORS.midnightLighter}` }}>
            <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, margin: "0 0 20px", color: COLORS.warmWhite }}>Recommendations</h2>
            {Object.entries(DIMENSION_MAP).map(([id, dim]) => (
              <div key={id} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${COLORS.midnightLighter}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: dim.color, marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>
                  {dim.label} — {scores[id] !== null ? `${scores[id]}/5` : "—"}
                </div>
                <div style={{ fontSize: 14, color: COLORS.warmWhite, lineHeight: 1.5 }}>
                  {getRecommendation(id, scores[id])}
                </div>
              </div>
            ))}
          </div>
          {allScored && (
            <div style={{ background: COLORS.coralDim, borderRadius: 16, padding: 24, border: `1px solid ${COLORS.coral}33`, marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, margin: "0 0 8px", color: COLORS.coral }}>
                Your Suggested Starting Point
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: COLORS.warmWhite }}>
                {(() => {
                  const lowest = Object.entries(scores).reduce((a, b) => (b[1] !== null && (a[1] === null || b[1] < a[1]) ? b : a));
                  const isTechLow = scores.tech !== null && scores.tech <= 2.5;
                  if (isTechLow) return "Your technology foundation needs attention first. Before we work on AI strategy, automation, or marketing, we need to make sure your stack is resilient and your data is portable. We'd start with Tech Stack Advising and the Future-Proofing Checklist.";
                  return `Your lowest dimension is ${DIMENSION_MAP[lowest[0]]?.label} (${lowest[1]}/5). We'd start there. ${getRecommendation(lowest[0], lowest[1])}`;
                })()}
              </p>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => { setCompleted(false); setCurrentSection(0); setAnswers({}); }}
              style={{ background: "none", border: `1px solid ${COLORS.smoke}`, color: COLORS.smoke, padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13, marginRight: 12 }}
            >
              Start Over
            </button>
            <button
              style={{ background: COLORS.coral, color: COLORS.midnight, border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700 }}
              onClick={() => alert("In the full version, this would email your results and book a debrief call with Firebug.")}
            >
              Book Your Debrief Call →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ minHeight: "100vh", background: COLORS.midnight, color: COLORS.warmWhite, fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "32px 20px 100px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: COLORS.coral, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
            Firebug Agency
          </div>
          <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, margin: 0, lineHeight: 1.2 }}>AI Readiness Assessment</h1>
          <p style={{ color: COLORS.smoke, fontSize: 13, marginTop: 6 }}>15–25 minutes · Mostly multiple choice</p>
        </div>
        <div style={{ height: 3, background: COLORS.midnightLighter, borderRadius: 2, marginBottom: 8, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg, ${COLORS.coral}, ${COLORS.amber})`, borderRadius: 2, transition: "width 0.5s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.smoke, marginBottom: 28, fontFamily: "'Space Mono', monospace" }}>
          <span>Section {currentSection + 1} of {SECTIONS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>{section.icon}</div>
          <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, margin: "0 0 4px" }}>{section.title}</h2>
          <p style={{ color: COLORS.smoke, fontSize: 14, margin: 0 }}>{section.subtitle}</p>
        </div>
        {section.questions.map((q) => (
          <div key={q.id} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 12, lineHeight: 1.4, color: COLORS.warmWhite }}>{q.text}</div>
            {q.type === "single" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSingle(q.id, opt)}
                      style={{
                        background: selected ? COLORS.coralDim : COLORS.midnightLight,
                        border: `1px solid ${selected ? COLORS.coral : COLORS.midnightLighter}`,
                        color: selected ? COLORS.coral : COLORS.warmWhite,
                        padding: "12px 16px",
                        borderRadius: 10,
                        cursor: "pointer",
                        textAlign: "left",
                        fontSize: 14,
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.2s ease",
                        lineHeight: 1.3,
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
            {q.type === "multi" && (
              <div>
                {q.max && <div style={{ fontSize: 11, color: COLORS.smoke, marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>Select up to {q.max}</div>}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {q.options.map((opt) => {
                    const selected = (answers[q.id] || []).includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => handleMulti(q.id, opt, q.max)}
                        style={{
                          background: selected ? COLORS.electricDim : COLORS.midnightLight,
                          border: `1px solid ${selected ? COLORS.electric : COLORS.midnightLighter}`,
                          color: selected ? "#9B93FF" : COLORS.warmWhite,
                          padding: "12px 16px",
                          borderRadius: 10,
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: 14,
                          fontFamily: "'DM Sans', sans-serif",
                          transition: "all 0.2s ease",
                          lineHeight: 1.3,
                        }}
                      >
                        <span style={{ display: "inline-block", width: 18, height: 18, borderRadius: 4, border: `2px solid ${selected ? COLORS.electric : COLORS.smoke}`, background: selected ? COLORS.electric : "transparent", marginRight: 10, verticalAlign: "middle", textAlign: "center", lineHeight: "16px", fontSize: 12, color: COLORS.warmWhite }}>
                          {selected ? "✓" : ""}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {q.type === "open" && (
              <div>
                <textarea
                  value={typeof answers[q.id] === "string" ? answers[q.id] : ""}
                  onChange={(e) => handleText(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  rows={3}
                  style={{
                    width: "100%",
                    background: COLORS.midnightLight,
                    border: `1px solid ${COLORS.midnightLighter}`,
                    color: COLORS.warmWhite,
                    borderRadius: 10,
                    padding: "12px 16px",
                    fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif",
                    resize: "vertical",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    onClick={() => toggleRecording(q.id)}
                    style={{
                      background: recording === q.id ? COLORS.coral : COLORS.midnightLight,
                      border: `1px solid ${recording === q.id ? COLORS.coral : COLORS.midnightLighter}`,
                      color: recording === q.id ? COLORS.midnight : COLORS.smoke,
                      padding: "8px 14px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 12,
                      fontFamily: "'Space Mono', monospace",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {recording === q.id ? "⏹ Stop Recording" : "🎤 Record Audio"}
                  </button>
                  {audioBlobs[q.id] && (
                    <span style={{ fontSize: 11, color: COLORS.amber }}>✓ Audio recorded</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, borderTop: `1px solid ${COLORS.midnightLighter}` }}>
          <button
            onClick={goBack}
            disabled={currentSection === 0}
            style={{
              background: "none",
              border: `1px solid ${currentSection === 0 ? COLORS.midnightLighter : COLORS.smoke}`,
              color: currentSection === 0 ? COLORS.midnightLighter : COLORS.smoke,
              padding: "10px 20px",
              borderRadius: 8,
              cursor: currentSection === 0 ? "default" : "pointer",
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
            }}
          >
            ← Back
          </button>
          <button
            onClick={goNext}
            style={{
              background: sectionAnswered(section) ? COLORS.coral : COLORS.midnightLighter,
              color: sectionAnswered(section) ? COLORS.midnight : COLORS.smoke,
              border: "none",
              padding: "10px 20px",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {currentSection === SECTIONS.length - 1 ? "See Results →" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
