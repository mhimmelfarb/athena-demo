import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// HG Partners Brand Colors
const colors = {
  navy: '#3D5A80',
  coral: '#EE6C4D',
  lightBlue: '#98C1D9',
  darkNavy: '#293241',
  cream: '#E0FBFC',
  white: '#FFFFFF',
  red: '#C1292E',
  yellow: '#F4A300',
  green: '#2D936C'
};

// Score color helper
const getScoreColor = (score, max = 100) => {
  const normalized = (score / max) * 100;
  if (normalized >= 70) return colors.green;
  if (normalized >= 50) return colors.yellow;
  return colors.red;
};

// Severity badge
const SeverityBadge = ({ severity }) => {
  const configs = {
    critical: { bg: '#fee2e2', text: '#991b1b', label: 'CRITICAL' },
    high: { bg: '#fef3c7', text: '#92400e', label: 'HIGH' },
    medium: { bg: '#e0f2fe', text: '#0369a1', label: 'MEDIUM' },
    low: { bg: '#dcfce7', text: '#166534', label: 'LOW' }
  };
  const config = configs[severity] || configs.medium;

  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      fontSize: '10px',
      fontWeight: 700,
      borderRadius: '4px',
      backgroundColor: config.bg,
      color: config.text,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }}>
      {config.label}
    </span>
  );
};

// Score gauge component
const ScoreGauge = ({ score, label, size = 120 }) => {
  const percentage = score;
  const radius = size / 2 - 10;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        <path
          d={`M 10 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d={`M 10 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2}`}
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          fontSize="28"
          fontWeight="800"
          fill={colors.darkNavy}
        >
          {score}
        </text>
        <text
          x={size / 2}
          y={size / 2 + 16}
          textAnchor="middle"
          fontSize="11"
          fill="#6b7280"
        >
          /100
        </text>
      </svg>
      {label && (
        <div style={{ fontSize: '12px', color: colors.darkNavy, fontWeight: 600, marginTop: '-4px' }}>
          {label}
        </div>
      )}
    </div>
  );
};

// Score bar component
const ScoreBar = ({ score, label, max = 100 }) => {
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', color: '#4b5563' }}>{label}</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: colors.darkNavy }}>{score}/{max}</span>
      </div>
      <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${(score / max) * 100}%`,
          backgroundColor: getScoreColor(score, max),
          borderRadius: '4px',
          transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  );
};

// Expandable section component
const ExpandableSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      marginBottom: '16px',
      overflow: 'hidden'
    }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: isOpen ? '#f9fafb' : '#fff',
          borderBottom: isOpen ? '1px solid #e5e7eb' : 'none'
        }}
      >
        <span style={{ fontWeight: 600, color: colors.darkNavy }}>{title}</span>
        <span style={{ fontSize: '18px', color: '#9ca3af' }}>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && (
        <div style={{ padding: '20px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default function CompanyDemo() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setLoading(true);
    fetch(`/data/${slug}_demo.json`)
      .then(res => {
        if (!res.ok) throw new Error('Company data not found');
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '16px' }}>Loading...</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Fetching analysis for {slug}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>404</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: colors.darkNavy, marginBottom: '8px' }}>
            Company Not Found
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
            We couldn't find analysis data for "{slug}". Check the URL or contact support.
          </div>
          <Link to="/" style={{
            color: colors.coral,
            textDecoration: 'none',
            fontWeight: 600
          }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { company, executiveSummary, commercialHealthScore, dimensions, buyerTrust, risks, strengths, executiveActions, redFlags, valuationImplications, conclusion, metadata } = data;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'actions', label: 'Action Plan' },
    { id: 'risks', label: 'Risks & Strengths' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: colors.navy,
        padding: '16px 24px',
        borderBottom: `3px solid ${colors.coral}`
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
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
            </Link>
            <span style={{ fontSize: '12px', color: colors.lightBlue, marginLeft: '8px' }}>Company Analysis</span>
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
            Analysis Date: {metadata?.analysisDate}
          </div>
        </div>
      </header>

      {/* Company Header */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.navy} 100%)`,
        padding: '32px 24px',
        color: '#fff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: colors.lightBlue, marginBottom: '8px', textTransform: 'uppercase' }}>
                Commercial Health Analysis
              </div>
              <h1 style={{ fontSize: '36px', fontWeight: 700, margin: '0 0 8px 0' }}>{company.name}</h1>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                <span>{company.industry}</span>
                <span>•</span>
                <span>{company.stage}</span>
                <span>•</span>
                <span>{company.employees} employees</span>
                <span>•</span>
                <span>{company.headquarters}</span>
              </div>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {company.keyCustomers?.slice(0, 6).map((customer, idx) => (
                  <span key={idx} style={{
                    padding: '4px 10px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 500
                  }}>
                    {customer}
                  </span>
                ))}
                {company.keyCustomers?.length > 6 && (
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '4px',
                    fontSize: '11px'
                  }}>
                    +{company.keyCustomers.length - 6} more
                  </span>
                )}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <ScoreGauge score={executiveSummary.overallScore} label="Overall Score" />
              <div style={{
                marginTop: '8px',
                padding: '6px 12px',
                backgroundColor: executiveSummary.severity === 'high' ? '#fee2e2' : executiveSummary.severity === 'medium' ? '#fef3c7' : '#dcfce7',
                color: executiveSummary.severity === 'high' ? '#991b1b' : executiveSummary.severity === 'medium' ? '#92400e' : '#166534',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'inline-block'
              }}>
                {executiveSummary.gradeLevel}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: activeTab === tab.id ? colors.coral : '#6b7280',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  fontSize: '14px',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab.id ? `3px solid ${colors.coral}` : '3px solid transparent',
                  marginBottom: '-1px'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Executive Summary */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy, marginTop: 0, marginBottom: '16px' }}>
                Executive Summary
              </h2>
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px'
              }}>
                <div style={{ fontWeight: 600, color: '#991b1b', marginBottom: '8px' }}>Primary Diagnosis</div>
                <p style={{ margin: 0, color: '#7f1d1d', lineHeight: 1.6 }}>{executiveSummary.primaryDiagnosis}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: '#f0fdf4', borderRadius: '12px', padding: '16px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontWeight: 600, color: '#166534', marginBottom: '8px', fontSize: '13px' }}>Biggest Opportunity</div>
                  <p style={{ margin: 0, color: '#15803d', fontSize: '14px', lineHeight: 1.5 }}>{executiveSummary.biggestOpportunity}</p>
                </div>
                <div style={{ backgroundColor: '#fef3c7', borderRadius: '12px', padding: '16px', border: '1px solid #fde68a' }}>
                  <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '8px', fontSize: '13px' }}>Urgent Action Required</div>
                  <p style={{ margin: 0, color: '#a16207', fontSize: '14px', lineHeight: 1.5 }}>{executiveSummary.urgentAction}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '20px' }}>
                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: colors.red }}>{executiveSummary.estimatedLeakedRevenue}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>Est. Leaked Revenue</div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: colors.coral }}>{executiveSummary.timeToIntervention}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>Time to Intervene</div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: colors.darkNavy }}>{company.estimatedARR}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>Est. ARR</div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: colors.navy }}>{company.funding?.total}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>Total Funding</div>
                </div>
              </div>
            </div>

            {/* Commercial Health Scores */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy, marginTop: 0, marginBottom: '20px' }}>
                Commercial Health Breakdown
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                {Object.entries(commercialHealthScore.components).map(([key, component]) => (
                  <div key={key} style={{
                    padding: '20px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: 800,
                      color: getScoreColor(component.score),
                      marginBottom: '8px'
                    }}>
                      {component.score}
                    </div>
                    <div style={{ fontSize: '12px', color: '#4b5563', fontWeight: 500 }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>
                      Weight: {component.weight}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Strength */}
            <div style={{
              backgroundColor: colors.cream,
              borderRadius: '16px',
              border: `1px solid ${colors.lightBlue}`,
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: colors.navy, marginTop: 0, marginBottom: '12px' }}>
                Key Strength
              </h3>
              <p style={{ margin: 0, color: colors.darkNavy, lineHeight: 1.6, fontSize: '15px' }}>
                {executiveSummary.keyStrength}
              </p>
            </div>

            {/* Conclusion */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              padding: '24px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy, marginTop: 0, marginBottom: '16px' }}>
                Conclusion & Recommendation
              </h2>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
                {conclusion.summary}
              </p>
              <div style={{
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #bbf7d0'
              }}>
                <div style={{ fontWeight: 600, color: '#166534', marginBottom: '8px' }}>Recommended Path Forward</div>
                <p style={{ margin: 0, color: '#15803d', lineHeight: 1.6 }}>
                  {conclusion.recommendation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dimensions Tab */}
        {activeTab === 'dimensions' && (
          <div>
            {Object.entries(dimensions).map(([key, dimension]) => (
              <ExpandableSection key={key} title={`${key.replace(/([A-Z])/g, ' $1').trim()} — Score: ${dimension.score}/100`} defaultOpen={key === 'pricingArchitecture'}>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ margin: '0 0 16px 0', color: '#4b5563', lineHeight: 1.6, fontSize: '14px' }}>
                    {dimension.summary}
                  </p>
                </div>

                {/* Findings */}
                {dimension.findings?.map((finding, idx) => (
                  <div key={idx} style={{
                    marginBottom: '16px',
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '10px',
                    borderLeft: `4px solid ${getScoreColor(finding.score)}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 600, color: colors.darkNavy }}>{finding.title}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: getScoreColor(finding.score) }}>
                          {finding.score}/100
                        </span>
                        <SeverityBadge severity={finding.severity} />
                      </div>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>Evidence</div>
                      <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#4b5563', lineHeight: 1.6 }}>
                        {finding.evidence?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', marginBottom: '6px', textTransform: 'uppercase' }}>Impact</div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#dc2626', lineHeight: 1.5 }}>{finding.impact}</p>
                    </div>

                    <div style={{
                      backgroundColor: '#dcfce7',
                      borderRadius: '8px',
                      padding: '12px',
                      marginTop: '12px'
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#166534', marginBottom: '4px', textTransform: 'uppercase' }}>Recommendation</div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#15803d', lineHeight: 1.5 }}>{finding.recommendation}</p>
                    </div>
                  </div>
                ))}

                {/* Critical Gaps */}
                {dimension.criticalGaps && (
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#991b1b', marginBottom: '10px' }}>Critical Gaps</div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#7f1d1d', lineHeight: 1.8 }}>
                      {dimension.criticalGaps.map((gap, i) => (
                        <li key={i}>{gap}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quick Wins */}
                {dimension.quickWins && (
                  <div style={{ marginTop: '20px', backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#166534', marginBottom: '10px' }}>Quick Wins</div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#15803d', lineHeight: 1.8 }}>
                      {dimension.quickWins.map((win, i) => (
                        <li key={i}>{win}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </ExpandableSection>
            ))}
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy, marginBottom: '20px' }}>
              Immediate Actions (30-60 days)
            </h2>
            {executiveActions.immediate?.map((action, idx) => (
              <div key={idx} style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                padding: '24px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700, color: colors.darkNavy }}>
                      {action.action}
                    </h3>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#6b7280' }}>
                      <span>Timeline: <strong>{action.timeline}</strong></span>
                      <span>•</span>
                      <span>Owner: <strong>{action.owner}</strong></span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{
                      padding: '4px 10px',
                      backgroundColor: action.effort === 'HIGH' ? '#fef3c7' : '#dcfce7',
                      color: action.effort === 'HIGH' ? '#92400e' : '#166534',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600
                    }}>
                      {action.effort} EFFORT
                    </span>
                    <span style={{
                      padding: '4px 10px',
                      backgroundColor: action.impact === 'HIGH' || action.impact === 'STRATEGIC' ? '#dcfce7' : '#e0f2fe',
                      color: action.impact === 'HIGH' || action.impact === 'STRATEGIC' ? '#166534' : '#0369a1',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600
                    }}>
                      {action.impact} IMPACT
                    </span>
                  </div>
                </div>

                <p style={{ margin: '0 0 16px 0', color: '#4b5563', lineHeight: 1.6, fontSize: '14px' }}>
                  {action.description}
                </p>

                <div style={{ backgroundColor: '#f9fafb', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>Expected Outcomes</div>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#4b5563', lineHeight: 1.7 }}>
                    {action.expectedOutcomes?.map((outcome, i) => (
                      <li key={i}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <h2 style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy, marginTop: '32px', marginBottom: '20px' }}>
              Strategic Actions (90-180 days)
            </h2>
            {executiveActions.strategic?.map((action, idx) => (
              <div key={idx} style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: `2px solid ${colors.navy}`,
                padding: '24px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700, color: colors.darkNavy }}>
                      {action.action}
                    </h3>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#6b7280' }}>
                      <span>Timeline: <strong>{action.timeline}</strong></span>
                      <span>•</span>
                      <span>Owner: <strong>{action.owner}</strong></span>
                    </div>
                  </div>
                  <span style={{
                    padding: '6px 12px',
                    backgroundColor: colors.coral,
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {action.impact}
                  </span>
                </div>

                <p style={{ margin: '0 0 16px 0', color: '#4b5563', lineHeight: 1.6, fontSize: '14px' }}>
                  {action.description}
                </p>

                <div style={{ backgroundColor: colors.cream, borderRadius: '10px', padding: '16px', border: `1px solid ${colors.lightBlue}` }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: colors.navy, marginBottom: '10px' }}>Expected Outcomes</div>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: colors.darkNavy, lineHeight: 1.7 }}>
                    {action.expectedOutcomes?.map((outcome, i) => (
                      <li key={i}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Risks & Strengths Tab */}
        {activeTab === 'risks' && (
          <div>
            {/* Red Flags */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#991b1b', marginBottom: '20px' }}>
                Red Flags
              </h2>
              {redFlags?.map((flag, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#fef2f2',
                  borderRadius: '12px',
                  border: '1px solid #fecaca',
                  padding: '20px',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      padding: '4px 10px',
                      backgroundColor: flag.severity === 'HIGH' ? '#fee2e2' : '#fef3c7',
                      color: flag.severity === 'HIGH' ? '#991b1b' : '#92400e',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 700
                    }}>
                      {flag.severity} SEVERITY • {flag.category}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 12px 0', color: '#7f1d1d', lineHeight: 1.6, fontWeight: 500 }}>
                    {flag.flag}
                  </p>
                  <p style={{ margin: 0, color: '#991b1b', fontSize: '13px', fontStyle: 'italic' }}>
                    Implication: {flag.implication}
                  </p>
                </div>
              ))}
            </div>

            {/* Risks */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy, marginBottom: '20px' }}>
                Market & Competitive Risks
              </h2>
              {risks?.map((risk, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  padding: '20px',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: colors.darkNavy }}>
                      {risk.risk}
                    </h3>
                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                      <span style={{
                        padding: '2px 8px',
                        backgroundColor: risk.probability === 'HIGH' ? '#fee2e2' : '#fef3c7',
                        color: risk.probability === 'HIGH' ? '#991b1b' : '#92400e',
                        borderRadius: '4px',
                        fontSize: '9px',
                        fontWeight: 600
                      }}>
                        {risk.probability} PROB
                      </span>
                      <span style={{
                        padding: '2px 8px',
                        backgroundColor: risk.impact === 'SEVERE' ? '#fee2e2' : '#fef3c7',
                        color: risk.impact === 'SEVERE' ? '#991b1b' : '#92400e',
                        borderRadius: '4px',
                        fontSize: '9px',
                        fontWeight: 600
                      }}>
                        {risk.impact} IMPACT
                      </span>
                    </div>
                  </div>
                  <p style={{ margin: '0 0 12px 0', color: '#4b5563', fontSize: '13px', lineHeight: 1.5 }}>
                    {risk.evidence}
                  </p>
                  <div style={{ backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#166534' }}>Mitigation: </span>
                    <span style={{ fontSize: '12px', color: '#15803d' }}>{risk.mitigation}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths */}
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: colors.green, marginBottom: '20px' }}>
                Key Strengths & Moats
              </h2>
              {strengths?.map((strength, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#f0fdf4',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0',
                  padding: '20px',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      padding: '4px 10px',
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 700
                    }}>
                      {strength.category}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#166534' }}>
                        Defensibility: <strong>{strength.defensibility}</strong>
                      </span>
                      <span style={{ fontSize: '11px', color: strength.monetization === 'SEVERELY UNDERUTILIZED' ? '#dc2626' : '#166534' }}>
                        Monetization: <strong>{strength.monetization}</strong>
                      </span>
                    </div>
                  </div>
                  <p style={{ margin: 0, color: '#15803d', lineHeight: 1.6 }}>
                    {strength.strength}
                  </p>
                </div>
              ))}
            </div>

            {/* Valuation Implications */}
            {valuationImplications && (
              <div style={{ marginTop: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy, marginBottom: '20px' }}>
                  Valuation Scenarios
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                  <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    padding: '24px'
                  }}>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>Current Trajectory</div>
                    <h3 style={{ margin: '0 0 8px 0', color: colors.darkNavy }}>{valuationImplications.currentTrajectory.scenario}</h3>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: colors.navy, marginBottom: '12px' }}>
                      {valuationImplications.currentTrajectory.estimatedValue}
                    </div>
                    <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#4b5563', lineHeight: 1.5 }}>
                      {valuationImplications.currentTrajectory.rationale}
                    </p>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      Probability: <strong>{valuationImplications.currentTrajectory.probability}</strong>
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: colors.cream,
                    borderRadius: '12px',
                    border: `2px solid ${colors.coral}`,
                    padding: '24px'
                  }}>
                    <div style={{ fontSize: '12px', color: colors.navy, marginBottom: '8px' }}>With Intervention</div>
                    <h3 style={{ margin: '0 0 8px 0', color: colors.darkNavy }}>{valuationImplications.withIntervention.scenario}</h3>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: colors.coral, marginBottom: '12px' }}>
                      {valuationImplications.withIntervention.estimatedValue}
                    </div>
                    <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#4b5563', lineHeight: 1.5 }}>
                      {valuationImplications.withIntervention.rationale}
                    </p>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      Probability: <strong>{valuationImplications.withIntervention.probability}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: colors.darkNavy,
        padding: '24px',
        marginTop: '40px',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
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
        </div>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
          Confidence Level: {metadata?.confidenceLevel} • Data Quality: {metadata?.dataQuality}
        </p>
      </footer>
    </div>
  );
}
