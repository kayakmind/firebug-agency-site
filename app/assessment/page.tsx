import type { Metadata } from "next";
import AssessmentGate from "@/components/AssessmentGate";

export const metadata: Metadata = {
  title: "AI Readiness Assessment",
};

export default function AssessmentPage() {
  return <AssessmentGate />;
}
