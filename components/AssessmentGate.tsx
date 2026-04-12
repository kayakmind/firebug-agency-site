"use client";

import { useState, useEffect } from "react";
import AssessmentForm from "./AssessmentForm";

const C = {
  midnight: "#1A1A2E",
  coral: "#FF6B4A",
  warmWhite: "#F5F0EB",
  smoke: "#8888AA",
  midLight: "#252542",
  midLighter: "#2E2E4A",
};

export default function AssessmentGate() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated via cookie
    const hasCookie = document.cookie
      .split(";")
      .some((c) => c.trim().startsWith("assessment_auth="));
    if (hasCookie) {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/verify-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthenticated(true);
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: C.midnight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 13,
            color: C.smoke,
            letterSpacing: 2,
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  if (authenticated) {
    return <AssessmentForm />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.midnight,
        color: C.warmWhite,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
        {/* Logo */}
        <svg
          width="40"
          height="68"
          viewBox="0 0 60 140"
          style={{ marginBottom: 32 }}
        >
          <rect x="27" y="50" width="6" height="88" rx="3" fill="#8888AA" />
          <ellipse cx="30" cy="50" rx="9" ry="10" fill="#2A1A12" />
          <path
            d="M30 4 C30 4, 42 18, 43 30 C44 42, 38 48, 30 50 C22 48, 16 42, 17 30 C18 18, 30 4, 30 4Z"
            fill="#FF6B4A"
            opacity="0.9"
          />
          <path
            d="M30 18 C30 18, 37 26, 37 33 C37 39, 34 44, 30 46 C26 44, 23 39, 23 33 C23 26, 30 18, 30 18Z"
            fill="#FFAA3B"
            opacity="0.9"
          />
          <ellipse cx="30" cy="40" rx="4" ry="6" fill="#FFE4A0" opacity="0.8" />
        </svg>

        <div
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase" as const,
            color: C.coral,
            marginBottom: 8,
          }}
        >
          Client Access
        </div>

        <h1
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          AI Readiness Assessment
        </h1>

        <p
          style={{
            fontSize: 15,
            color: C.smoke,
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          This assessment is for Firebug clients. Enter your access code to
          continue.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter access code"
            autoFocus
            style={{
              width: "100%",
              background: C.midLight,
              border: `1px solid ${error ? C.coral : C.midLighter}`,
              color: C.warmWhite,
              borderRadius: 8,
              padding: "14px 18px",
              fontSize: 15,
              fontFamily: "'DM Sans',sans-serif",
              outline: "none",
              boxSizing: "border-box" as const,
              textAlign: "center",
              letterSpacing: 2,
              marginBottom: 12,
            }}
          />

          {error && (
            <div
              style={{
                fontSize: 13,
                color: C.coral,
                marginBottom: 12,
                fontFamily: "'Space Mono',monospace",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!password || loading}
            style={{
              width: "100%",
              background: password && !loading ? C.coral : C.midLighter,
              color: password && !loading ? C.midnight : C.smoke,
              border: "none",
              padding: "14px 24px",
              borderRadius: 8,
              cursor: password && !loading ? "pointer" : "default",
              fontFamily: "'Space Mono',monospace",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              transition: "all 0.2s",
            }}
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>

        <p style={{ fontSize: 12, color: C.smoke, marginTop: 24 }}>
          Need access?{" "}
          <a
            href="mailto:kayakmind@gmail.com"
            style={{ color: C.coral, textDecoration: "none" }}
          >
            Contact Firebug
          </a>
        </p>
      </div>
    </div>
  );
}
