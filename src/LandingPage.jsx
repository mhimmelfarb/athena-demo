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
    <>
      <style>{`
        .rw-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .rw-grid-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        .rw-hero-title {
          font-size: 44px;
        }
        .rw-section-title {
          font-size: 28px;
        }
        .rw-cta-title {
          font-size: 36px;
        }
        .rw-section-padding {
          padding: 72px 24px;
        }
        .rw-hero-padding {
          padding: 88px 24px;
        }
        @media (max-width: 900px) {
          .rw-grid-2col {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .rw-grid-cards {
            grid-template-columns: 1fr;
          }
          .rw-hero-title {
            font-size: 32px;
          }
          .rw-section-title {
            font-size: 24px;
          }
          .rw-cta-title {
            font-size: 28px;
          }
          .rw-section-padding {
            padding: 48px 16px;
          }
          .rw-hero-padding {
            padding: 56px 16px;
          }
          .rw-grid-2col-reverse {
            display: flex;
            flex-direction: column-reverse;
          }
        }
        @media (max-width: 600px) {
          .rw-hero-title {
            font-size: 28px;
          }
          .rw-section-title {
            font-size: 22px;
          }
          .rw-cta-title {
            font-size: 24px;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          color: "#0f172a",
        }}
      >
        {/* Header */}
        <header
          style={{
            backgroundColor: colors.navy,
            padding: "16px 24px",
            borderBottom: `3px solid ${colors.coral}`,
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
                  flexShrink: 0,
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

        {/* Hero */}
        <section
          className="rw-hero-padding"
          style={{
            background: `linear-gradient(135deg, ${colors.darkNavy}, ${colors.navy})`,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h1
              className="rw-hero-title"
              style={{
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
              Most leadership teams can see when performance is lagging. What
              they cannot see clearly is why it is happening, where the real
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
              Remidi Works is a decision support platform for commercial
              excellence that surfaces high-impact revenue and growth
              opportunities and helps leaders act with confidence.
            </p>
          </div>
        </section>

        {/* Reality Section */}
        <section
          className="rw-section-padding"
          style={{ backgroundColor: "#fff" }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="rw-grid-2col">
              <div>
                <h2
                  className="rw-section-title"
                  style={{
                    fontWeight: 800,
                    color: colors.darkNavy,
                    marginBottom: 20,
                  }}
                >
                  Knowing the numbers is not the problem
                </h2>

                <p style={{ fontSize: 16, lineHeight: 1.7, color: "#475569" }}>
                  Investors and operators can read topline growth, retention,
                  and pipeline metrics. What is harder is understanding what is
                  driving those outcomes and deciding where to focus limited
                  time and resources.
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

              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: 16,
                  padding: 16,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src="/portfolio-dashboard.png"
                  alt="Portfolio dashboard showing commercial health scores"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Decision Support Section */}
        <section
          className="rw-section-padding"
          style={{
            backgroundColor: colors.cream,
            borderTop: "1px solid #e5e7eb",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2
              className="rw-section-title"
              style={{
                fontWeight: 800,
                color: colors.darkNavy,
                marginBottom: 32,
                textAlign: "center",
              }}
            >
              Decision support for commercial excellence
            </h2>

            <div className="rw-grid-2col rw-grid-2col-reverse">
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 16,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src="/portfolio-company-view.png"
                  alt="Company diagnostic view showing improvement priorities"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
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
                      padding: 20,
                      boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "#334155",
                      borderLeft: `4px solid ${colors.coral}`,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          className="rw-section-padding"
          style={{ backgroundColor: "#fff" }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2
              className="rw-section-title"
              style={{
                fontWeight: 800,
                color: colors.darkNavy,
                marginBottom: 24,
              }}
            >
              Built to support judgment, not replace it
            </h2>

            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#475569" }}>
              Remidi Works combines structured diagnostics, proprietary
              benchmarks, and operating awareness to help leadership teams make
              better commercial decisions. AI improves speed and consistency.
              Judgment stays with the people accountable for results.
            </p>
          </div>
        </section>

        {/* Two Paths Section */}
        <section
          className="rw-section-padding"
          style={{ backgroundColor: "#f8fafc" }}
        >
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
                className="rw-section-title"
                style={{
                  fontWeight: 800,
                  color: colors.darkNavy,
                  marginBottom: 10,
                }}
              >
                One platform. Two ways to use it.
              </h2>
              <p style={{ fontSize: 16, color: "#475569" }}>
                The same decision support engine, applied to different
                jobs-to-be-done.
              </p>
            </div>

            <div className="rw-grid-cards">
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
                link="https://r9bey.share.hsforms.com/2KauIEMEuTVeOtaF8X6lNWw"
              />

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
                link="https://r9bey.share.hsforms.com/2LHpECgUmSKqEhEFMW4FVHQ"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="rw-section-padding"
          style={{
            backgroundColor: colors.cream,
            borderTop: `4px solid ${colors.coral}`,
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <h2
              className="rw-cta-title"
              style={{
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
              Get a live view of how Remidi Works surfaces commercial
              opportunities and supports confident decisions.
            </p>

            <a
              href="https://r9bey.share.hsforms.com/2LHpECgUmSKqEhEFMW4FVHQ"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
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
            </a>
          </div>
        </section>

        {/* Footer */}
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
    </>
  );
}

function DemoCard({ title, subtitle, description, bullets, button, color, link }) {
  const buttonElement = (
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
  );

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
          padding: "24px 24px",
          backgroundColor: color,
          color: "#fff",
        }}
      >
        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
          {title}
        </h3>
        <p style={{ fontSize: 14, opacity: 0.85, margin: 0 }}>{subtitle}</p>
      </div>

      <div style={{ padding: 24 }}>
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

        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block" }}
          >
            {buttonElement}
          </a>
        ) : (
          buttonElement
        )}
      </div>
    </div>
  );
}
