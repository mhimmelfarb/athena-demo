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
        .rw-grid-3col {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
        .rw-coming-soon {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: #78350f;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
          margin-left: 8px;
          vertical-align: middle;
        }
        @media (max-width: 900px) {
          .rw-grid-2col {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .rw-grid-cards {
            grid-template-columns: 1fr;
          }
          .rw-grid-3col {
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
              You're leaving 20–30% of revenue on the table
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              Not because your team isn't working hard. Your commercial model has gaps - pricing that doesn't match value, unclear positioning, sales teams that can't articulate ROI. The symptoms show up as stalled deals, discounting pressure, and confused buyer conversations.
            </p>

            <p
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.6,
              }}
            >
              Remidi Works combines expert judgment, real market data, and AI workflows to show you exactly what's broken and how to fix it. No black-box AI answers. No slow consulting engagements. A guided system that gets you from diagnosis to action.
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
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              Decision support for commercial excellence

            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#6b7280",
                lineHeight: 1.7,
                marginBottom: 32,
                textAlign: "center",
                maxWidth: 700,
                margin: "0 auto 32px",
              }}
            >
              Platform + proprietary data + expert validation. AI analyzes, experts apply judgment and organizational awareness, you execute with confidence.
            </p>

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
                  "Benchmark against 300+ B2B companies using our proprietary Commercial Health Score across pricing, positioning, and enablement",
                  "Isolate root causes—separate pricing gaps from positioning issues from enablement failures using observable market signals",
                  "Quantify revenue opportunity with confidence intervals showing best case, likely case, and threshold for action",
                  "Get expert guidance on navigating your organization—tactical moves like which leader to engage for case studies or how to frame changes for finance approval",
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

            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#475569", marginBottom: 16 }}>
              Remidi Works combines structured diagnostics, proprietary
              benchmarks, and operating awareness to help leadership teams make
              better commercial decisions. AI improves speed and consistency.
              Judgment stays with the people accountable for results.
            </p>

            <div
              style={{
                marginTop: 20,
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderLeft: `4px solid ${colors.navy}`,
                borderRadius: 12,
                padding: 16,
                color: "#1e3a8a",
                fontSize: 15,
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: "#1e40af", display: "block", marginBottom: 6 }}>
                Why platform + expert beats generic AI:
              </strong>
              AI can analyze data and suggest next steps. The expert applies judgment 
              on whether you're on the right path, has organizational awareness to navigate 
              around blockers, and knows the tactical moves that actually work—like knowing 
              which leader to engage when you need a case study or how to frame a pricing 
              change so finance will approve it.
            </div>
          </div>
        </section>

        {/* Three Benefits Section */}
        <section
          className="rw-section-padding"
          style={{
            backgroundColor: "#fff",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2
              className="rw-section-title"
              style={{
                fontWeight: 800,
                color: colors.darkNavy,
                marginBottom: 40,
                textAlign: "center",
              }}
            >
              What makes us different
            </h2>

            <div className="rw-grid-3col">
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }} aria-hidden="true">📊</div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: colors.darkNavy,
                    marginBottom: 8,
                  }}
                >
                  Real Market Data
                </div>
                <p
                  style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}
                >
                  No more guessing. Benchmarks from 300+ companies show you
                  exactly where you stand and what good looks like.
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }} aria-hidden="true">🎯</div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: colors.darkNavy,
                    marginBottom: 8,
                  }}
                >
                  Expert-Guided System
                </div>
                <p
                  style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}
                >
                  AI does the analysis. Experts validate the findings. Your team
                  builds the muscle.
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }} aria-hidden="true">⚡</div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: colors.darkNavy,
                    marginBottom: 8,
                  }}
                >
                  Results Without the Overhead
                </div>
                <p
                  style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}
                >
                  Actionable insights in weeks, not months. No $200K consulting
                  engagement. No new headcount.
                </p>
              </div>
            </div>
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
                button="Get a FREE Company Snapshot"
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
                button="Get a FREE Portfolio Snapshot"
                color={colors.coral}
                link="https://r9bey.share.hsforms.com/2LHpECgUmSKqEhEFMW4FVHQ"
              />
            </div>
          </div>
        </section>

        {/* Trust / Why Us Section */}
        <section
          className="rw-section-padding"
          style={{
            backgroundColor: "#fff",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <h2
              className="rw-section-title"
              style={{
                fontWeight: 800,
                color: colors.darkNavy,
                marginBottom: 20,
              }}
            >
              Expert platform, proven track record
            </h2>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "#475569",
                marginBottom: 32,
              }}
            >
              Over 50 years of combined experience improving commercial models
              and driving growth across startups through Fortune 500 companies.
              Serial operating partners for private equity and venture capital
              firms, with executive leadership roles spanning Nielsen, Kellogg,
              and multiple growth-stage B2B companies.
            </p>

            <div
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: colors.cream,
                borderRadius: 8,
                border: `2px solid ${colors.navy}`,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: colors.darkNavy,
                  margin: 0,
                }}
              >
                Trusted by private equity and venture capital investors
              </p>
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
