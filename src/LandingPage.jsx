import React from 'react';
import { Link } from 'react-router-dom';

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
            <span style={{ fontSize: '12px', color: colors.lightBlue, marginLeft: '8px' }}>Building Revenue Model Excellence</span>
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
          <div style={{ 
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: 'rgba(238, 108, 77, 0.2)',
            borderRadius: '20px',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: colors.coral, letterSpacing: '0.5px' }}>
              FOR MIDDLE MARKET PE FIRMS & PORTFOLIO COMPANIES
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 800, 
            color: '#fff', 
            marginBottom: '24px',
            lineHeight: 1.1,
            letterSpacing: '-1px'
          }}>
            Decision Support Platform for Revenue Model Excellence
          </h1>
          
          <p style={{ 
            fontSize: '20px', 
            color: colors.lightBlue, 
            marginBottom: '16px',
            lineHeight: 1.6
          }}>
            Continuous benchmarking and diagnostics that identify pricing underperformers, 
            calculate dollar upside, and prioritize fixes across your portfolio.
          </p>
          
          <p style={{ 
            fontSize: '16px', 
            color: 'rgba(255,255,255,0.7)', 
            marginBottom: '40px'
          }}>
            Explore two perspectives on how Remidi Works delivers value.
          </p>
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
                commercialization gaps and build board-ready deliverables—guided by AI, 
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
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Demo Company</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy }}>
                  FleetOps • Logistics Tech • Series A
                </div>
              </div>
              
              <Link to="/user" style={{ textDecoration: 'none' }}>
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
                  Explore Portfolio Company Demo
                  <span style={{ fontSize: '18px' }}>→</span>
                </button>
              </Link>
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
                See how investors use Remidi Works to monitor Revenue Model Health across their 
                entire portfolio—identifying which companies need attention and drilling into 
                improvement opportunities.
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: colors.navy, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  What You'll See
                </div>
                <ul style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, paddingLeft: '20px' }}>
                  <li>Portfolio-wide health scores from public data</li>
                  <li>Company ranking vs. 100-company universe</li>
                  <li>Top improvement priorities per underperformer</li>
                  <li>Drill-down to company diagnostic workflow</li>
                </ul>
              </div>
              
              <div style={{ 
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Demo Fund</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy }}>
                  Apex Growth Partners II • 10 Portfolio Companies
                </div>
              </div>
              
              <Link to="/investor" style={{ textDecoration: 'none' }}>
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
                  Explore Investor Demo
                  <span style={{ fontSize: '18px' }}>→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section style={{ 
        backgroundColor: '#fff', 
        padding: '60px 24px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 700, color: colors.darkNavy, marginBottom: '16px' }}>
            Why Remidi Works?
          </h3>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Our research shows B2B companies leave 20-30% of potential revenue 
            on the table due to commercialization gaps.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: colors.coral, marginBottom: '8px' }}>20-30%</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Revenue recovery opportunity identified in typical engagement</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: colors.navy, marginBottom: '8px' }}>2 Weeks</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Time to actionable recommendations vs. 3-6 months traditional</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: colors.coral, marginBottom: '8px' }}>100+</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>B2B tech companies in our benchmark database</div>
            </div>
          </div>
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
            Data-first revenue model excellence platform for growth-stage B2B tech companies
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '16px' }}>
            © 2025 HG Partners. Demo for concept testing purposes.
          </p>
        </div>
      </footer>
    </div>
  );
}
