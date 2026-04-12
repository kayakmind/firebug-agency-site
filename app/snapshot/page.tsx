import type { Metadata } from "next";
import SnapshotForm from "@/components/SnapshotForm";

export const metadata: Metadata = {
  title: "AI Opportunity Snapshot",
  description:
    "Discover where AI can help your organization. Takes 2-3 minutes.",
};

export default function SnapshotPage() {
  return <SnapshotForm />;
}
