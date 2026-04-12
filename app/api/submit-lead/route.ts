// app/api/submit-lead/route.ts
//
// This API route handles the AI Opportunity Snapshot form submission.
// It performs 4 actions:
//   1. Stores the lead in Supabase
//   2. Creates a CRM entry in Notion
//   3. Sends you an email notification (via Resend)
//   4. Adds to newsletter (via ConvertKit/Beehiiv) if opted in
//
// Environment variables needed in .env.local:
//   SUPABASE_URL=https://your-project.supabase.co
//   SUPABASE_SERVICE_KEY=your-service-role-key
//   NOTION_API_KEY=your-notion-integration-key
//   NOTION_CRM_DATABASE_ID=4cf0691ab5314e0e8a8a1ffc26f72d9d
//   RESEND_API_KEY=your-resend-key
//   NOTIFICATION_EMAIL=kayakmind@gmail.com
//   CONVERTKIT_API_KEY=your-convertkit-key (optional)
//   CONVERTKIT_FORM_ID=your-form-id (optional)

import { NextResponse } from "next/server";

// ============================================================
// Types
// ============================================================

interface LeadSubmission {
  // Contact info
  name: string;
  email: string;
  org: string;
  phone?: string;
  newsletter: boolean;

  // Assessment answers
  org_type: string;
  org_size: string;
  role: string;
  priorities: string[];
  ai_level: string;
  opportunity: string[];
  automate: string;
  blockers: string[];

  // Generated results
  snapshot_results: {
    insights: Array<{ area: string; text: string; service: string }>;
    maturityNote: string;
  };
}

// ============================================================
// 1. Store in Supabase
// ============================================================

async function storeInSupabase(lead: LeadSubmission) {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_SERVICE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY!}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      org_name: lead.org,
      phone: lead.phone || null,
      newsletter_optin: lead.newsletter,
      org_type: lead.org_type,
      org_size: lead.org_size,
      role: lead.role,
      priorities: lead.priorities,
      ai_level: lead.ai_level,
      opportunity_areas: lead.opportunity,
      automate_wish: lead.automate,
      blockers: lead.blockers,
      snapshot_results: lead.snapshot_results,
      source: "website",
      status: "new",
    }),
  });

  if (!res.ok) {
    console.error("Supabase error:", await res.text());
    throw new Error("Failed to store lead in Supabase");
  }

  return res.json();
}

// ============================================================
// 2. Create Notion CRM Entry
// ============================================================

// Map form values to Notion CRM select options
function mapAiLevel(level: string): string | null {
  const map: Record<string, string> = {
    "Haven't started — it feels overwhelming": "Not started",
    "Curious — a few people have experimented": "Curious",
    "Using it casually — ChatGPT for occasional tasks": "Dabbling",
    "Actively implementing — adopted for specific workflows": "Implementing",
    "Advanced — AI is part of daily operations": "Advanced",
  };
  return map[level] || null;
}

function mapOrgType(type: string): string | null {
  const map: Record<string, string> = {
    "Nonprofit / mission-driven": "Nonprofit",
    "Professional services": "Professional Services",
    "Creative agency or studio": "Creative Agency",
    "Technology startup": "Tech Startup",
    "Small business": "Small Business",
    Education: "Education",
    Healthcare: "Healthcare",
    Other: "Other",
  };
  return map[type] || null;
}

function mapRole(role: string): string | null {
  const map: Record<string, string> = {
    "Founder / CEO / ED": "Founder/CEO/ED",
    "C-suite / VP / Director": "C-suite/VP/Director",
    "Manager / Team Lead": "Manager/Team Lead",
    "Operations / Admin": "Operations/Admin",
    "Marketing / Comms": "Marketing/Comms",
    "Technology / IT": "Technology/IT",
    Other: "Other",
  };
  return map[role] || null;
}

function mapPriorities(priorities: string[]): string[] {
  const map: Record<string, string> = {
    "Growing revenue": "Growing revenue",
    "Reducing costs / efficiency": "Reducing costs",
    "Improving marketing": "Improving marketing",
    "Modernizing technology": "Modernizing tech",
    "Better data & reporting": "Better data",
    "Expanding programs or reach": "Expanding reach",
    "Fundraising & donor relations": "Fundraising",
    "Building the team": "Building team",
  };
  return priorities.map((p) => map[p]).filter(Boolean) as string[];
}

function mapOpportunities(areas: string[]): string[] {
  const map: Record<string, string> = {
    "Marketing & content creation": "Marketing & content",
    "Automating repetitive tasks": "Automating tasks",
    "Data analysis & reporting": "Data & reporting",
    "Customer/client communications": "Client comms",
    "Internal operations & workflows": "Internal ops",
    "Strategy & decision-making": "Strategy",
    "Grant writing & fundraising": "Grant writing",
    "I'm not sure — that's why I'm here": "Not sure",
  };
  return areas.map((a) => map[a]).filter(Boolean) as string[];
}

function mapBlockers(blockers: string[]): string[] {
  const map: Record<string, string> = {
    "Don't know where to start": "Dont know where to start",
    "Don't have the right skills": "No skills",
    "Worried about cost": "Cost concerns",
    "Concerned about quality": "Quality concerns",
    "Privacy & security concerns": "Privacy concerns",
    "Don't have time to figure it out": "No time",
    "Nothing — just need a guide": "Just need a guide",
  };
  return blockers.map((b) => map[b]).filter(Boolean) as string[];
}

// Calculate a simple lead score (1-10) based on signals
function calculateLeadScore(lead: LeadSubmission): number {
  let score = 5; // baseline

  // Org size — larger orgs = higher potential value
  const sizeScore: Record<string, number> = {
    "Just me": -1,
    "2–5": 0,
    "6–15": 1,
    "16–50": 2,
    "51–200": 2,
    "200+": 1, // often too big for solo consultant
  };
  score += sizeScore[lead.org_size] || 0;

  // Role — decision makers score higher
  if (
    lead.role === "Founder / CEO / ED" ||
    lead.role === "C-suite / VP / Director"
  )
    score += 1;

  // AI maturity — middle is best (ready but not advanced)
  if (
    lead.ai_level.includes("Curious") ||
    lead.ai_level.includes("casually")
  )
    score += 1;
  if (lead.ai_level.includes("Haven't")) score -= 1;

  // Blockers — "just need a guide" is the best signal
  if (lead.blockers.includes("Nothing — just need a guide")) score += 1;

  // Nonprofit (our strongest vertical)
  if (lead.org_type === "Nonprofit / mission-driven") score += 1;

  return Math.max(1, Math.min(10, score));
}

async function createNotionCRMEntry(lead: LeadSubmission) {
  const snapshotSummary = lead.snapshot_results.insights
    .map((i) => `${i.area}: ${i.text}`)
    .join("\n\n");

  // Build properties object for Notion API
  const properties: Record<string, any> = {
    Name: { title: [{ text: { content: lead.name } }] },
    Email: { email: lead.email },
    Organization: {
      rich_text: [{ text: { content: lead.org || "" } }],
    },
    Status: { select: { name: "New Lead" } },
    Source: { select: { name: "Website Snapshot" } },
    "Newsletter Opted In": { checkbox: lead.newsletter },
    "Automate Wish": {
      rich_text: [{ text: { content: lead.automate || "" } }],
    },
    "Snapshot Results": {
      rich_text: [
        { text: { content: snapshotSummary.slice(0, 2000) } },
      ],
    },
    "Lead Score": { number: calculateLeadScore(lead) },
    "Tier Interest": { select: { name: "Undecided" } },
    "Next Action": {
      rich_text: [
        { text: { content: "Review snapshot and send personalized follow-up within 24 hours" } },
      ],
    },
  };

  // Add optional fields
  if (lead.phone)
    properties.Phone = { phone_number: lead.phone };
  if (mapOrgType(lead.org_type))
    properties["Org Type"] = { select: { name: mapOrgType(lead.org_type)! } };
  if (lead.org_size)
    properties["Org Size"] = { select: { name: lead.org_size.replace("–", "-") } };
  if (mapRole(lead.role))
    properties.Role = { select: { name: mapRole(lead.role)! } };
  if (mapAiLevel(lead.ai_level))
    properties["AI Maturity"] = { select: { name: mapAiLevel(lead.ai_level)! } };

  // Multi-selects
  const priorities = mapPriorities(lead.priorities);
  if (priorities.length > 0)
    properties["Top Priorities"] = {
      multi_select: priorities.map((p) => ({ name: p })),
    };

  const opportunities = mapOpportunities(lead.opportunity);
  if (opportunities.length > 0)
    properties["Opportunity Areas"] = {
      multi_select: opportunities.map((o) => ({ name: o })),
    };

  const blockers = mapBlockers(lead.blockers);
  if (blockers.length > 0)
    properties.Blockers = {
      multi_select: blockers.map((b) => ({ name: b })),
    };

  // Set follow-up date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  properties["Follow Up Date"] = {
    date: { start: tomorrow.toISOString().split("T")[0] },
  };

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: {
        database_id: process.env.NOTION_CRM_DATABASE_ID,
      },
      properties,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Notion error:", err);
    throw new Error("Failed to create Notion CRM entry");
  }

  return res.json();
}

// ============================================================
// 3. Send Email Notification
// ============================================================

async function sendEmailNotification(lead: LeadSubmission) {
  const insightsList = lead.snapshot_results.insights
    .map((i) => `• ${i.area}: ${i.text}`)
    .join("\n\n");

  const body = `
🔥 New Lead from AI Opportunity Snapshot

NAME: ${lead.name}
EMAIL: ${lead.email}
ORG: ${lead.org || "Not provided"}
PHONE: ${lead.phone || "Not provided"}
NEWSLETTER: ${lead.newsletter ? "Yes" : "No"}

---

PROFILE:
• Type: ${lead.org_type}
• Size: ${lead.org_size}
• Role: ${lead.role}
• AI Maturity: ${lead.ai_level}

PRIORITIES: ${lead.priorities.join(", ")}

OPPORTUNITY AREAS: ${lead.opportunity.join(", ")}

WOULD AUTOMATE: ${lead.automate || "Not provided"}

BLOCKERS: ${lead.blockers.join(", ")}

LEAD SCORE: ${calculateLeadScore(lead)}/10

---

SNAPSHOT RESULTS SHOWN TO THEM:

${insightsList}

${lead.snapshot_results.maturityNote}

---

NEXT STEP: Review and send personalized follow-up within 24 hours.
Reference their specific answers — especially "${lead.automate || "their automation wish"}".
CRM entry created in Notion with status "New Lead".
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Firebug Agency <notifications@firebugagency.com>",
      to: [process.env.NOTIFICATION_EMAIL],
      subject: `🔥 New Lead: ${lead.name} (${lead.org || lead.org_type}) — Score: ${calculateLeadScore(lead)}/10`,
      text: body,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", await res.text());
    // Don't throw — email failure shouldn't block the response
  }
}

// ============================================================
// 4. Add to Newsletter
// ============================================================

async function addToNewsletter(lead: LeadSubmission) {
  if (!lead.newsletter) return;
  if (!process.env.CONVERTKIT_API_KEY || !process.env.CONVERTKIT_FORM_ID) return;

  // Tag the subscriber based on their profile for segmentation
  const tags: string[] = [];
  if (lead.org_type === "Nonprofit / mission-driven") tags.push("nonprofit");
  if (lead.ai_level.includes("Haven't") || lead.ai_level.includes("Curious"))
    tags.push("ai-beginner");
  if (lead.opportunity.includes("Marketing & content creation"))
    tags.push("marketing-focused");
  if (lead.opportunity.includes("Automating repetitive tasks"))
    tags.push("automation-focused");

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email: lead.email,
        first_name: lead.name.split(" ")[0],
        tags,
        fields: {
          organization: lead.org,
          org_type: lead.org_type,
        },
      }),
    }
  );

  if (!res.ok) {
    console.error("ConvertKit error:", await res.text());
    // Don't throw — newsletter failure shouldn't block the response
  }
}

// ============================================================
// Route Handler
// ============================================================

export async function POST(request: Request) {
  try {
    const lead: LeadSubmission = await request.json();

    // Validate required fields
    if (!lead.name || !lead.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Run all actions in parallel (Supabase + Notion are critical, email + newsletter are best-effort)
    const [supabaseResult, notionResult] = await Promise.all([
      storeInSupabase(lead),
      createNotionCRMEntry(lead),
      sendEmailNotification(lead).catch((e) =>
        console.error("Email notification failed:", e)
      ),
      addToNewsletter(lead).catch((e) =>
        console.error("Newsletter signup failed:", e)
      ),
    ]);

    return NextResponse.json({
      success: true,
      lead_id: supabaseResult?.[0]?.id,
      notion_page_id: notionResult?.id,
    });
  } catch (error) {
    console.error("Submit lead error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
