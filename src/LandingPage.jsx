import React from "react";

const colors = {
  navy: "#3D5A80",
  coral: "#EE6C4D",
  lightBlue: "#98C1D9",
  darkNavy: "#293241",
  cream: "#E0FBFC",
};

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#0f172a",
      }}
    >
      {/* ================= HEADER ================= */}
      <header
        style={{
          backgroundColor: colors.navy,
          padding: "16px 24px",
          borderBottom: `3px solid ${colors.coral}`,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                backgroundColor: colors.coral,
                width: 36,
                height: 36,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                color: "#fff",
                fontSize: 12,
              }}
            >
              RW
            </div>
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.4px",
                }}
              >
                Remidi Works
              </div>
              <div style={{ fontSize: 12, color: colors.lightBlue }}>
                Commercial Excellence
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        style={{
          background: `linear-gradient(135deg, ${colors.darkNavy}, ${colors.navy})`,
          padding: "88px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 24,
              letterSpacing: "-0.6px",
            }}
          >
            Commercial Excellence should not be{" "}
            <span style={{ fontStyle: "italic", color: colors.lightBlue }}>
              "I'll know it when I see it."
            </span>
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            Most leadership teams can see when performance is lagging. What they
            cannot see clearly is why it is happening, where the real
            opportunities are, or which actions will actually move the needle.
          </p>

          <p
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.6,
            }}
          >
            Remidi Works is a decision support platform for commercial excellence
            that surfaces high-impact revenue and growth opportunities and helps
            leaders act with confidence.
          </p>
        </div>
      </section>

      {/* ================= REALITY SECTION ================= */}
      <section style={{ backgroundColor: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: colors.darkNavy,
              marginBottom: 20,
            }}
          >
            Knowing the numbers is not the problem
          </h2>

          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#475569" }}>
            Investors and operators can read topline growth, retention, and
            pipeline metrics. What is harder is understanding what is driving
            those outcomes and deciding where to focus limited time and
            resources.
          </p>

          <ul
            style={{
              marginTop: 24,
              paddingLeft: 20,
              fontSize: 16,
              lineHeight: 1.9,
              color: "#475569",
            }}
          >
            <li>Which gaps actually matter</li>
            <li>Which opportunities are real versus theoretical</li>
            <li>What teams can realistically execute</li>
            <li>What to fix first without endless debate</li>
          </ul>
        </div>
      </section>

      {/* ================= WHAT REMIDI DELIVERS ================= */}
      <section
        style={{
          backgroundColor: colors.cream,
          padding: "72px 24px",
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: colors.darkNavy,
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            Decision support for commercial excellence
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 32,
            }}
          >
            {[
              "Surface the highest-impact revenue and margin opportunities",
              "Explain what is driving performance and what is holding it back",
              "Prioritize actions across pricing, GTM, and enablement",
              "Support confident decisions grounded in real operating context",
            ].map((item) => (
              <div
                key={item}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "#334155",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section style={{ backgroundColor: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: colors.darkNavy,
              marginBottom: 24,
            }}
          >
            Built to support judgment, not replace it
          </h2>

          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#475569" }}>
            Remidi Works combines structured diagnostics, proprietary benchmarks,
            and operating awareness to help leadership teams make better
            commercial decisions. AI improves speed and consistency. Judgment
            stays with the people accountable for results.
          </p>
        </div>
      </section>

      {/* ================= TWO PATHS ================= */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: 999,
                backgroundColor: "#eef2ff",
                color: colors.navy,
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              SELF-SELECT A DEMO
            </div>
            <h2
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: colors.darkNavy,
                marginBottom: 10,
              }}
            >
              One platform. Two ways to use it.
            </h2>
            <p style={{ fontSize: 16, color: "#475569" }}>
              The same decision support engine, applied to different jobs-to-be-done.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
              gap: 32,
            }}
          >
            {/* Company */}
            <DemoCard
              title="Portfolio Company View"
              subtitle="For CEOs, CMOs, CROs, and leadership teams"
              description="Surface the most important commercial opportunities and get a clear, execution-ready path forward."
              bullets={[
                "Opportunity diagnostics grounded in real data",
                "Clear prioritization across pricing and GTM",
                "Board-ready outputs and recommendations",
                "Confidence to act without adding headcount",
              ]}
              button="See Your Company Snapshot"
              color={colors.navy}
            />

            {/* Investor */}
            <DemoCard
              title="Investor Portfolio View"
              subtitle="For PE investors and operating partners"
              description="Identify commercial risk and upside across the portfolio and focus attention where it matters most."
              bullets={[
                "Consistent diagnostics across companies",
                "Early visibility into value creation opportunities",
                "Faster triage without heroics",
                "Repeatable decision frameworks for management teams",
              ]}
              button="See Your Portfolio Snapshot"
              color={colors.coral}
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section
        style={{
          backgroundColor: colors.cream,
          padding: "80px 24px",
          borderTop: `4px solid ${colors.coral}`,
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: colors.darkNavy,
              marginBottom: 20,
            }}
          >
            See where the real opportunities are
          </h2>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "#475569",
              marginBottom: 36,
            }}
          >
            Get a live view of how Remidi Works surfaces commercial opportunities
            and supports confident decisions.
          </p>

          <button
            style={{
              padding: "18px 36px",
              backgroundColor: colors.coral,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        style={{
          backgroundColor: colors.darkNavy,
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
          © 2026 Remidi Works by HG Partners
        </div>
      </footer>
    </div>
  );
}

/* ---------- Demo Card Component ---------- */

function DemoCard({ title, subtitle, description, bullets, button, color }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: 32,
          backgroundColor: color,
          color: "#fff",
        }}
      >
        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
          {title}
        </h3>
        <p style={{ fontSize: 14, opacity: 0.85 }}>{subtitle}</p>
      </div>

      <div style={{ padding: 32 }}>
        <p style={{ fontSize: 15, color: "#334155", marginBottom: 16 }}>
          {description}
        </p>

        <ul
          style={{
            paddingLeft: 20,
            marginBottom: 24,
            fontSize: 14,
            lineHeight: 1.8,
            color: "#475569",
          }}
        >
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <button
          style={{
            width: "100%",
            padding: "14px 20px",
            backgroundColor: color,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          {button}
        </button>
      </div>
    </div>
  );
}
