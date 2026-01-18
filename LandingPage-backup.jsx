import React from 'react';

const colors = {
  navy: '#3D5A80',
  coral: '#EE6C4D',
  lightBlue: '#98C1D9',
  darkNavy: '#293241',
  cream: '#E0FBFC',
};

export default function LandingPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: colors.navy, 
        padding: '16px 24px',
        borderBottom: `3px solid ${colors.coral}`
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ 
              backgroundColor: colors.coral, 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#fff',
              fontSize: '12px'
            }}>RW</span>
            <span style={{ fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Remidi Works</span>
            <span style={{ fontSize: '12px', color: colors.lightBlue, marginLeft: '8px' }}>Commercial Excellence</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`,
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '44px', 
            fontWeight: 700, 
            color: '#fff', 
            marginBottom: '24px',
            lineHeight: 1.2,
            letterSpacing: '-0.5px'
          }}>
            Commercial Excellence shouldn't be <span style={{ fontStyle: 'italic', color: colors.lightBlue }}>"I'll know it when I see it."</span>
          </h1>
          
          <p style={{ 
            fontSize: '16px', 
            color: 'rgba(255,255,255,0.7)', 
            marginBottom: '16px',
            lineHeight: 1.6
          }}>
            B2B companies typically leave 20-30% of revenue on the table due to commercial model gaps in areas like pricing, positioning, and sales enablement. Your metrics show you something's wrong, but not where to focus or how to move the needle.
          </p>
          
          <p style={{ 
            fontSize: '20px', 
            color: '#fff',
            fontWeight: 700,
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Remidi Works benchmarks your commercial model against real market data, then shows you exactly where the opportunities are and how to capture them.
          </p>
        </div>
      </section>
      {/* Commercial Model Section */}
      <section style={{ 
        backgroundColor: '#fff', 
        padding: '80px 24px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: colors.darkNavy, marginBottom: '12px' }}>
              Achieve Fast, Measurable Growth
            </h3>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Data-driven commercial strategy and enablement that empowers your teams to execute with confidence
            </p>
          </div>
          
          {/* Remidi Works Zone - Top */}
          <div style={{ 
            backgroundColor: '#3D5A80',
            borderRadius: '12px 12px 0 0',
            padding: '20px 24px',
            border: '2px solid #3D5A80'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '4px'
            }}>
              <span style={{ 
                backgroundColor: colors.coral, 
                width: '24px', 
                height: '24px', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#fff',
                fontSize: '9px'
              }}>RW</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                RW Modules diagnose, prioritize and fix growth opportunities
              </span>
            </div>
          </div>
          
          {/* Strategy & Enablement Content */}
          <div style={{ 
            backgroundColor: colors.cream,
            padding: '24px 32px',
            border: '2px solid #3D5A80',
            borderTop: 'none'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              {/* Commercial Strategy */}
              <div>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: 700, 
                  color: colors.darkNavy, 
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: `2px solid ${colors.coral}`
                }}>
                  Commercial Strategy
                </div>
                <ul style={{ 
                  fontSize: '13px', 
                  color: '#4b5563', 
                  lineHeight: 2,
                  paddingLeft: '20px',
                  margin: 0
                }}>
                  <li>Market Segmentation</li>
                  <li>ICP Definition</li>
                  <li>Value Proposition</li>
                  <li>Competitive Positioning</li>
                  <li>Pricing Strategy</li>
                  <li>Packaging & Bundling</li>
                  <li>Channel Strategy</li>
                  <li>Messaging Architecture</li>
                </ul>
              </div>
              
              {/* Commercial Enablement */}
              <div>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: 700, 
                  color: colors.darkNavy, 
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: `2px solid ${colors.coral}`
                }}>
                  Commercial Enablement
                </div>
                <ul style={{ 
                  fontSize: '13px', 
                  color: '#4b5563', 
                  lineHeight: 2,
                  paddingLeft: '20px',
                  margin: 0
                }}>
                  <li>Sales Enablement Strategy</li>
                  <li>CS Enablement Strategy</li>
                  <li>Buyer Journey Mapping</li>
                  <li>Qualification Framework</li>
                  <li>Competitive Intelligence System</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Connection Arrow */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '16px 0',
            backgroundColor: '#f8fafc'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{ fontSize: '20px', color: colors.coral }}>↓</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: colors.navy }}>
                Better inputs = better outputs
              </span>
              <span style={{ fontSize: '20px', color: colors.coral }}>↓</span>
            </div>
          </div>
          
          {/* Execution Zone - Bottom */}
          <div style={{ 
            backgroundColor: '#f1f5f9',
            borderRadius: '0 0 12px 12px',
            padding: '20px 24px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                Enabling Your GTM Teams to Execute More Successfully
              </span>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>
                Client / Partner Execution
              </span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
              {/* Marketing */}
              <div>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  color: '#64748b', 
                  marginBottom: '8px' 
                }}>
                  Marketing
                </div>
                <ul style={{ 
                  fontSize: '11px', 
                  color: '#94a3b8', 
                  lineHeight: 1.8,
                  paddingLeft: '16px',
                  margin: 0
                }}>
                  <li>Demand Generation</li>
                  <li>Channel Mix Strategy</li>
                  <li>Campaign Execution</li>
                  <li>Lead Scoring & Routing</li>
                  <li>SDR/BDR Outbound</li>
                </ul>
              </div>
              
              {/* Sales */}
              <div>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  color: '#64748b', 
                  marginBottom: '8px' 
                }}>
                  Sales
                </div>
                <ul style={{ 
                  fontSize: '11px', 
                  color: '#94a3b8', 
                  lineHeight: 1.8,
                  paddingLeft: '16px',
                  margin: 0
                }}>
                  <li>Sales Methodology</li>
                  <li>Tools - CRM, CPQ, etc.</li>
                  <li>Discovery</li>
                  <li>Solution Development</li>
                  <li>Proposal & Negotiation</li>
                </ul>
              </div>
              
              {/* Customer Success */}
              <div>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  color: '#64748b', 
                  marginBottom: '8px' 
                }}>
                  Customer Success
                </div>
                <ul style={{ 
                  fontSize: '11px', 
                  color: '#94a3b8', 
                  lineHeight: 1.8,
                  paddingLeft: '16px',
                  margin: 0
                }}>
                  <li>Onboarding</li>
                  <li>Ongoing Success Mgmt</li>
                  <li>Renewal Management</li>
                  <li>Expansion & Upsell</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What Makes Us Different Section */}
      <section style={{ 
        backgroundColor: '#fff', 
        padding: '60px 24px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h3 style={{ 
            fontSize: '24px', 
            fontWeight: 700, 
            color: colors.darkNavy, 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            What Makes Us Different
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>📊</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px' }}>
                Real Market Data
              </div>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                No more guessing. Benchmarks from 300+ companies show you exactly where you stand and what good looks like.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🎯</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px' }}>
                Expert-Guided System
              </div>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                AI does the analysis. Experts validate the findings. Your team builds the muscle.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>⚡</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px' }}>
                Results Without the Overhead
              </div>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                Actionable insights in weeks, not months. No $200K consulting engagement. No new headcount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section style={{ 
        backgroundColor: '#f8fafc', 
        padding: '60px 24px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              color: colors.darkNavy, 
              marginBottom: '16px'
            }}>
              What We Do
            </h3>
            <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
              We quantify what's broken, size the opportunity, and guide you through fixing it with peer benchmarks and expert methodology.
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb'
          }}>
            <img 
              src="/portfolio-dashboard.png" 
              alt="Remidi Works Portfolio Dashboard showing commercial health scores across portfolio companies"
              style={{ 
                width: '100%', 
                height: 'auto',
                borderRadius: '8px'
              }}
            />
          </div>
        </div>
      </section>

      {/* Two Paths Section */}
      <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '32px' 
        }}>
          
          {/* Portfolio Company Demo Card */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ 
              backgroundColor: colors.cream,
              padding: '32px',
              borderBottom: `4px solid ${colors.lightBlue}`
            }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '12px',
                backgroundColor: colors.navy,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '28px' }}>👤</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px' }}>
                Portfolio Company View
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                For CMOs, CROs, and Marketing Leaders
              </p>
            </div>
            
            <div style={{ padding: '32px' }}>
              <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.7, marginBottom: '24px' }}>
                See how a marketing leader at a portfolio company uses Remidi Works to diagnose 
                commercialization gaps and build board-ready deliverables, guided by AI 
                with expert support when needed.
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: colors.navy, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  What You'll See
                </div>
                <ul style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, paddingLeft: '20px' }}>
                  <li>Pre-populated diagnostic from observable data</li>
                  <li>Real-time score refinement through AI interview</li>
                  <li>Prioritized action plan based on gaps</li>
                  <li>Step-by-step workstream execution</li>
                </ul>
              </div>
              
              <div style={{ 
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <img 
                  src="/portfolio-company-view.png" 
                  alt="Portfolio company diagnostic view showing dimension scores and improvement priorities"
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    borderRadius: '4px',
                    border: '1px solid #e5e7eb'
                  }}
                />
              </div>
              
              <a 
                href="https://hg-partners-45784330.hubspotpagebuilder.com/-temporary-slug-7849a973-8e5e-49c0-ba54-09fbbac11513?hs_preview=IrHJGQuF-204846823727"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button style={{
                  width: '100%',
                  padding: '16px 24px',
                  backgroundColor: colors.navy,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  Get a Company Snapshot
                  <span style={{ fontSize: '18px' }}>→</span>
                </button>
              </a>
            </div>
          </div>

          {/* Investor Demo Card */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ 
              backgroundColor: colors.darkNavy,
              padding: '32px',
              borderBottom: `4px solid ${colors.coral}`
            }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '12px',
                backgroundColor: colors.coral,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '28px' }}>📊</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                Investor Portfolio View
              </h2>
              <p style={{ fontSize: '14px', color: colors.lightBlue }}>
                For PE/VC Investors and Operating Partners
              </p>
            </div>
            
            <div style={{ padding: '32px' }}>
              <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.7, marginBottom: '24px' }}>
                See how investors use Remidi Works to monitor commercial health across their 
                entire portfolio, identifying which companies need attention and drilling into 
                improvement opportunities.
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: colors.navy, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  What You'll See
                </div>
                <ul style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, paddingLeft: '20px' }}>
                  <li>Portfolio-wide health scores from public data</li>
                  <li>Company ranking vs. 300+ company benchmark</li>
                  <li>Top improvement priorities per underperformer</li>
                  <li>Drill-down to company diagnostic workflow</li>
                </ul>
              </div>
              
              <div style={{ 
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <img 
                  src="/portfolio-dashboard.png" 
                  alt="Investor portfolio dashboard showing company rankings and health scores"
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    borderRadius: '4px',
                    border: '1px solid #e5e7eb'
                  }}
                />
              </div>
              
              <a 
                href="https://hg-partners-45784330.hubspotpagebuilder.com/-temporary-slug-7849a973-8e5e-49c0-ba54-09fbbac11513?hs_preview=IrHJGQuF-204846823727"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button style={{
                  width: '100%',
                  padding: '16px 24px',
                  backgroundColor: colors.coral,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  Get a Portfolio Snapshot
                  <span style={{ fontSize: '18px' }}>→</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        backgroundColor: colors.cream,
        padding: '80px 24px',
        borderTop: `4px solid ${colors.coral}`,
        borderBottom: `4px solid ${colors.coral}`
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 700, 
            color: colors.darkNavy, 
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            Get Your Portfolio Snapshot Free
          </h2>
          
          <p style={{ 
            fontSize: '18px', 
            color: '#4b5563', 
            marginBottom: '40px',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Send us your portfolio company list. We'll analyze their commercial health and send you the results — no cost, no commitment.
          </p>
          
          <a 
            href="https://hg-partners-45784330.hubspotpagebuilder.com/-temporary-slug-7849a973-8e5e-49c0-ba54-09fbbac11513?hs_preview=IrHJGQuF-204846823727"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button style={{
              padding: '18px 36px',
              backgroundColor: colors.coral,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(238, 108, 77, 0.3)',
              transition: 'all 0.2s'
            }}>
              Get Started Free
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: colors.darkNavy, 
        padding: '32px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ 
              backgroundColor: colors.coral, 
              width: '24px', 
              height: '24px', 
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#fff',
              fontSize: '10px'
            }}>RW</span>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Remidi Works</span>
            <span style={{ fontSize: '12px', color: colors.lightBlue, marginLeft: '4px' }}>by HG Partners</span>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
            The fastest, surest path to Commercial Excellence for growth-stage B2B companies
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '16px' }}>
            © 2026 HG Partners. Demo for concept testing purposes.
          </p>
        </div>
      </footer>
    </div>
  );
}
