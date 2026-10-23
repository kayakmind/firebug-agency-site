import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <p>
        &copy; 2026 Firebug Agency. All rights reserved. &middot;{" "}
        <Link href="/privacy">Privacy</Link> &middot;{" "}
        <Link href="/terms">Terms</Link>
      </p>
    </footer>
  );
}
