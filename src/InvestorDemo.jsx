import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

// Universe benchmark baseline (from our 100-company database)
const UNIVERSE_AVG = 5.8;
const UNIVERSE_TOP_QUARTILE = 7.2;
const UNIVERSE_BOTTOM_QUARTILE = 4.5;

// Peer fund benchmarks (5-10 funds contributing)
const peerFunds = [
  { name: 'Apex Growth Partners II', avgHealth: 6.31, portfolioSize: 10, rank: 2 },
  { name: 'Meridian Capital Fund III', avgHealth: 6.85, portfolioSize: 14, rank: 1 },
  { name: 'Catalyst Ventures', avgHealth: 5.92, portfolioSize: 8, rank: 4 },
  { name: 'Summit Partners VII', avgHealth: 6.15, portfolioSize: 12, rank: 3 },
  { name: 'Horizon Growth Equity', avgHealth: 5.48, portfolioSize: 9, rank: 5 },
  { name: 'Evergreen Tech Fund', avgHealth: 5.21, portfolioSize: 11, rank: 6 },
];

// Fictional portfolio data - 10 companies
// Health scores based on observable public data
// Relative score = healthScore - UNIVERSE_AVG
const portfolioData = [
  { 
    id: 1, name: 'CloudSync Pro', sector: 'DevOps/Infrastructure', stage: 'Series B', 
    healthScore: 7.8, relativeScore: 2.0,
    valueArticulation: 8.2, pricingArchitecture: 7.5, competitivePositioning: 7.9, salesEnablement: 6.8, customerROI: 8.5,
    status: 'outperformer', invested: 2022,
    topGaps: []
  },
  { 
    id: 2, name: 'DataForge AI', sector: 'AI/ML Platform', stage: 'Series A', 
    healthScore: 5.4, relativeScore: -0.4,
    valueArticulation: 4.8, pricingArchitecture: 5.2, competitivePositioning: 6.1, salesEnablement: 4.5, customerROI: 6.4,
    status: 'underperformer', invested: 2023,
    topGaps: [
      { dimension: 'Sales Enablement', score: 4.5, issue: 'No ROI calculator or quantified proof points on website' },
      { dimension: 'Value Articulation', score: 4.8, issue: 'Features described but customer outcomes not quantified' },
      { dimension: 'Pricing Architecture', score: 5.2, issue: 'Flat per-seat pricing doesn\'t scale with value delivered' }
    ]
  },
  { 
    id: 3, name: 'SecureVault', sector: 'Cybersecurity', stage: 'Series C', 
    healthScore: 8.1, relativeScore: 2.3,
    valueArticulation: 8.5, pricingArchitecture: 8.0, competitivePositioning: 8.3, salesEnablement: 7.8, customerROI: 7.9,
    status: 'outperformer', invested: 2021,
    topGaps: []
  },
  { 
    id: 4, name: 'FleetOps', sector: 'Logistics Tech', stage: 'Series A', 
    healthScore: 4.2, relativeScore: -1.6,
    valueArticulation: 3.5, pricingArchitecture: 4.8, competitivePositioning: 4.9, salesEnablement: 3.2, customerROI: 4.6,
    status: 'underperformer', invested: 2023,
    topGaps: [
      { dimension: 'Sales Enablement', score: 3.2, issue: 'No published pricing, no case studies with quantified ROI' },
      { dimension: 'Value Articulation', score: 3.5, issue: 'Operational stats shown but no connection to customer P&L impact' },
      { dimension: 'Customer ROI Proof', score: 4.6, issue: 'Claims savings but no calculator or specific customer evidence' }
    ]
  },
  { 
    id: 5, name: 'TalentMatch', sector: 'HR Tech', stage: 'Series B', 
    healthScore: 6.3, relativeScore: 0.5,
    valueArticulation: 6.8, pricingArchitecture: 5.5, competitivePositioning: 6.2, salesEnablement: 6.5, customerROI: 6.5,
    status: 'on-track', invested: 2022,
    topGaps: []
  },
  { 
    id: 6, name: 'PayStream', sector: 'FinTech', stage: 'Series B', 
    healthScore: 7.2, relativeScore: 1.4,
    valueArticulation: 7.5, pricingArchitecture: 7.8, competitivePositioning: 6.8, salesEnablement: 7.0, customerROI: 6.9,
    status: 'outperformer', invested: 2021,
    topGaps: []
  },
  { 
    id: 7, name: 'HealthBridge', sector: 'HealthTech', stage: 'Series A', 
    healthScore: 5.1, relativeScore: -0.7,
    valueArticulation: 5.5, pricingArchitecture: 4.2, competitivePositioning: 5.8, salesEnablement: 4.8, customerROI: 5.2,
    status: 'underperformer', invested: 2024,
    topGaps: [
      { dimension: 'Pricing Architecture', score: 4.2, issue: 'Single flat-rate tier regardless of practice size or usage' },
      { dimension: 'Sales Enablement', score: 4.8, issue: 'Limited competitive positioning materials visible' },
      { dimension: 'Customer ROI Proof', score: 5.2, issue: 'Testimonials but no quantified outcomes' }
    ]
  },
  { 
    id: 8, name: 'RetailIQ', sector: 'Retail Analytics', stage: 'Series B', 
    healthScore: 6.8, relativeScore: 1.0,
    valueArticulation: 7.2, pricingArchitecture: 6.5, competitivePositioning: 6.9, salesEnablement: 6.2, customerROI: 7.2,
    status: 'on-track', invested: 2022,
    topGaps: []
  },
  { 
    id: 9, name: 'SupplyCore', sector: 'Supply Chain', stage: 'Series B', 
    healthScore: 5.5, relativeScore: -0.3,
    valueArticulation: 5.2, pricingArchitecture: 6.8, competitivePositioning: 5.5, salesEnablement: 4.8, customerROI: 5.2,
    status: 'underperformer', invested: 2021,
    topGaps: [
      { dimension: 'Sales Enablement', score: 4.8, issue: 'No visible battle cards or competitive differentiation content' },
      { dimension: 'Value Articulation', score: 5.2, issue: 'Generic efficiency claims without segment-specific proof' },
      { dimension: 'Customer ROI Proof', score: 5.2, issue: 'Case studies lack specific financial outcomes' }
    ]
  },
  { 
    id: 10, name: 'MarketPulse', sector: 'MarTech', stage: 'Series A', 
    healthScore: 6.5, relativeScore: 0.7,
    valueArticulation: 6.9, pricingArchitecture: 6.2, competitivePositioning: 6.8, salesEnablement: 5.8, customerROI: 6.8,
    status: 'on-track', invested: 2023,
    topGaps: []
  }
];

// Mini gauge component
const MiniGauge = ({ score, size = 60 }) => {
  const percentage = (score / 10) * 100;
  const getColor = (s) => {
    if (s >= 7) return colors.green;
    if (s >= 5.5) return colors.yellow;
    return colors.red;
  };
  
  const radius = size / 2 - 4;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
      <path
        d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`}
        fill="none"
        stroke={getColor(score)}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      <text
        x={size / 2}
        y={size / 2 + 4}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={colors.darkNavy}
      >
        {score.toFixed(1)}
      </text>
    </svg>
  );
};

// Score bar component
const ScoreBar = ({ score, label, compact = false }) => {
  const getColor = (s) => {
    if (s >= 7) return colors.green;
    if (s >= 5.5) return colors.yellow;
    return colors.red;
  };
  
  return (
    <div style={{ marginBottom: compact ? '6px' : '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontSize: compact ? '10px' : '11px', color: '#6b7280' }}>{label}</span>
        <span style={{ fontSize: compact ? '10px' : '11px', fontWeight: 600, color: colors.darkNavy }}>{score.toFixed(1)}</span>
      </div>
      <div style={{ height: compact ? '4px' : '6px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${score * 10}%`, 
            backgroundColor: getColor(score),
            borderRadius: '3px',
            transition: 'width 0.5s ease'
          }} 
        />
      </div>
    </div>
  );
};

// Status badge component
const StatusBadge = ({ status }) => {
  const configs = {
    'outperformer': { bg: '#dcfce7', text: '#166534', label: 'Outperformer' },
    'on-track': { bg: '#e0f2fe', text: '#0369a1', label: 'On Track' },
    'underperformer': { bg: '#fee2e2', text: '#991b1b', label: 'Underperformer' }
  };
  const config = configs[status] || configs['on-track'];
  
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 8px',
      fontSize: '10px',
      fontWeight: 600,
      borderRadius: '9999px',
      backgroundColor: config.bg,
      color: config.text,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }}>
      {config.label}
    </span>
  );
};

// Relative score display
const RelativeScore = ({ score }) => {
  const isPositive = score >= 0;
  const color = score >= 1.0 ? colors.green : score >= 0 ? colors.navy : score >= -0.5 ? colors.yellow : colors.red;
  
  return (
    <span style={{ 
      fontSize: '14px', 
      fontWeight: 700, 
      color,
      fontFamily: 'monospace'
    }}>
      {isPositive ? '+' : ''}{score.toFixed(1)}
    </span>
  );
};

// Fund comparison bar
const FundComparisonBar = ({ fund, maxHealth, isCurrentFund }) => {
  const percentage = (fund.avgHealth / 10) * 100;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      padding: '8px 0',
      borderLeft: isCurrentFund ? `3px solid ${colors.coral}` : '3px solid transparent',
      paddingLeft: isCurrentFund ? '12px' : '15px'
    }}>
      <div style={{ width: '140px', fontSize: '12px', color: isCurrentFund ? colors.darkNavy : '#6b7280', fontWeight: isCurrentFund ? 600 : 400 }}>
        {isCurrentFund ? '→ ' : ''}{fund.name.length > 18 ? fund.name.slice(0, 18) + '...' : fund.name}
      </div>
      <div style={{ flex: 1, height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ 
          height: '100%', 
          width: `${percentage}%`,
          backgroundColor: isCurrentFund ? colors.coral : colors.lightBlue,
          borderRadius: '4px',
          transition: 'width 0.5s ease'
        }} />
      </div>
      <div style={{ width: '32px', fontSize: '12px', fontWeight: 600, color: colors.darkNavy, textAlign: 'right' }}>
        {fund.avgHealth.toFixed(1)}
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function InvestorPortfolioDashboard() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [tier, setTier] = useState('observer');
  const [sortBy, setSortBy] = useState('relativeScore');
  const [sortDir, setSortDir] = useState('desc');
  const [showSizeModal, setShowSizeModal] = useState(null);
  
  // Current fund data
  const currentFund = peerFunds[0];
  
  // Calculate portfolio aggregates
  const avgHealth = portfolioData.reduce((sum, c) => sum + c.healthScore, 0) / portfolioData.length;
  const avgRelative = portfolioData.reduce((sum, c) => sum + c.relativeScore, 0) / portfolioData.length;
  const underperformers = portfolioData.filter(c => c.status === 'underperformer');
  const outperformers = portfolioData.filter(c => c.status === 'outperformer');
  
  // Sort companies
  const sortedCompanies = [...portfolioData].sort((a, b) => {
    const multiplier = sortDir === 'desc' ? -1 : 1;
    return (a[sortBy] - b[sortBy]) * multiplier;
  });
  
  // Portfolio rank
  const rankedCompanies = [...portfolioData].sort((a, b) => b.healthScore - a.healthScore);
  const getPortfolioRank = (id) => rankedCompanies.findIndex(c => c.id === id) + 1;
  
  // Calculate dimension averages
  const dimAverages = {
    valueArticulation: portfolioData.reduce((sum, c) => sum + c.valueArticulation, 0) / portfolioData.length,
    pricingArchitecture: portfolioData.reduce((sum, c) => sum + c.pricingArchitecture, 0) / portfolioData.length,
    competitivePositioning: portfolioData.reduce((sum, c) => sum + c.competitivePositioning, 0) / portfolioData.length,
    salesEnablement: portfolioData.reduce((sum, c) => sum + c.salesEnablement, 0) / portfolioData.length,
    customerROI: portfolioData.reduce((sum, c) => sum + c.customerROI, 0) / portfolioData.length
  };

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
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginRight: '16px' }}>
              <span style={{ fontSize: '16px' }}>←</span> All Demos
            </Link>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  backgroundColor: colors.coral, 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#fff',
                  fontSize: '10px'
                }}>RW</span>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Remidi Works</span>
              </div>
              <span style={{ fontSize: '11px', color: colors.lightBlue, marginLeft: '40px' }}>Portfolio Intelligence</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '6px', padding: '3px' }}>
              <button
                onClick={() => setTier('observer')}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: tier === 'observer' ? colors.coral : 'transparent',
                  color: tier === 'observer' ? '#fff' : 'rgba(255,255,255,0.7)',
                  transition: 'all 0.2s'
                }}
              >
                Observer
              </button>
              <button
                onClick={() => setTier('contributor')}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: tier === 'contributor' ? colors.coral : 'transparent',
                  color: tier === 'contributor' ? '#fff' : 'rgba(255,255,255,0.7)',
                  transition: 'all 0.2s'
                }}
              >
                Contributor
              </button>
            </div>
            
            <div style={{ color: '#fff', fontSize: '13px' }}>
              <span style={{ opacity: 0.7 }}>Fund:</span> <span style={{ fontWeight: 600 }}>Apex Growth Partners II</span>
            </div>
          </div>
        </div>
      </header>
      
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Key Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {/* Portfolio Health */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Portfolio Health Score</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MiniGauge score={avgHealth} size={70} />
              <div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>vs. universe avg</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: avgRelative >= 0 ? colors.green : colors.coral }}>
                  {avgRelative >= 0 ? '+' : ''}{avgRelative.toFixed(1)} pts
                </div>
              </div>
            </div>
          </div>
          
          {/* Distribution */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Portfolio Distribution</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: colors.green }}>{outperformers.length}</div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Outperform</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: colors.navy }}>{portfolioData.length - outperformers.length - underperformers.length}</div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>On Track</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: colors.coral }}>{underperformers.length}</div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Underperform</div>
              </div>
            </div>
          </div>
          
          {/* Universe Position */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Universe Position</div>
            <div style={{ fontSize: '13px', color: colors.darkNavy, marginBottom: '8px' }}>
              {avgHealth >= UNIVERSE_TOP_QUARTILE ? 'Top Quartile' : avgHealth >= UNIVERSE_AVG ? 'Above Average' : avgHealth >= UNIVERSE_BOTTOM_QUARTILE ? 'Below Average' : 'Bottom Quartile'}
            </div>
            <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', position: 'relative' }}>
              <div style={{ 
                position: 'absolute',
                left: `${(avgHealth / 10) * 100}%`,
                top: '-4px',
                width: '16px',
                height: '16px',
                backgroundColor: colors.coral,
                borderRadius: '50%',
                border: '2px solid #fff',
                transform: 'translateX(-50%)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }} />
              <div style={{ position: 'absolute', left: '25%', top: '12px', fontSize: '9px', color: '#9ca3af' }}>Q4</div>
              <div style={{ position: 'absolute', left: '50%', top: '12px', fontSize: '9px', color: '#9ca3af', transform: 'translateX(-50%)' }}>Avg</div>
              <div style={{ position: 'absolute', left: '75%', top: '12px', fontSize: '9px', color: '#9ca3af' }}>Q1</div>
            </div>
          </div>
          
          {/* Peer Fund Rank */}
          <div style={{ 
            backgroundColor: colors.navy, 
            borderRadius: '12px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '11px', color: colors.lightBlue, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Peer Fund Ranking</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: '#fff' }}>#{currentFund.rank}</span>
              <span style={{ fontSize: '14px', color: colors.lightBlue }}>of {peerFunds.length} funds</span>
            </div>
            <div style={{ fontSize: '11px', color: colors.lightBlue, marginTop: '4px' }}>Based on avg. portfolio health</div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
          {/* Left Column */}
          <div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
              {['overview', 'underperformers', 'peer benchmark'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '6px 6px 0 0',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: activeTab === tab ? '#fff' : 'transparent',
                    color: activeTab === tab ? colors.navy : '#6b7280'
                  }}
                >
                  {tab.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>
            
            {activeTab === 'overview' && (
              <div style={{ backgroundColor: '#fff', borderRadius: '0 12px 12px 12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                {/* Table Header */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '2fr 1fr 90px 90px 110px',
                  padding: '12px 16px',
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0 12px 0 0'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company</div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sector</div>
                  <button 
                    onClick={() => { setSortBy('healthScore'); setSortDir(sortDir === 'desc' ? 'asc' : 'desc'); }}
                    style={{ fontSize: '11px', fontWeight: 600, color: sortBy === 'healthScore' ? colors.navy : '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  >
                    Health {sortBy === 'healthScore' && (sortDir === 'desc' ? '↓' : '↑')}
                  </button>
                  <button 
                    onClick={() => { setSortBy('relativeScore'); setSortDir(sortDir === 'desc' ? 'asc' : 'desc'); }}
                    style={{ fontSize: '11px', fontWeight: 600, color: sortBy === 'relativeScore' ? colors.navy : '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  >
                    vs. Univ {sortBy === 'relativeScore' && (sortDir === 'desc' ? '↓' : '↑')}
                  </button>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</div>
                </div>
                
                {/* Table Rows */}
                {sortedCompanies.map((company, idx) => (
                  <div 
                    key={company.id}
                    onClick={() => setSelectedCompany(selectedCompany?.id === company.id ? null : company)}
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '2fr 1fr 90px 90px 110px',
                      padding: '14px 16px',
                      borderBottom: idx < portfolioData.length - 1 ? '1px solid #f3f4f6' : 'none',
                      cursor: 'pointer',
                      backgroundColor: selectedCompany?.id === company.id ? colors.cream : 'transparent',
                      transition: 'background-color 0.15s'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy }}>{company.name}</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>{company.stage} • #{getPortfolioRank(company.id)} in portfolio</div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center' }}>{company.sector}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <MiniGauge score={company.healthScore} size={50} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <RelativeScore score={company.relativeScore} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <StatusBadge status={company.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'underperformers' && (
              <div style={{ backgroundColor: '#fff', borderRadius: '0 12px 12px 12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>
                  {underperformers.length} companies scoring below universe average. Top 3 improvement priorities shown for each.
                </div>
                
                {underperformers
                  .sort((a, b) => a.relativeScore - b.relativeScore)
                  .map((company, idx) => (
                    <div 
                      key={company.id}
                      style={{ 
                        padding: '20px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        marginBottom: idx < underperformers.length - 1 ? '16px' : 0,
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      {/* Company Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy }}>{company.name}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{company.sector} • {company.stage}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MiniGauge score={company.healthScore} size={50} />
                            <div>
                              <RelativeScore score={company.relativeScore} />
                              <div style={{ fontSize: '10px', color: '#9ca3af' }}>vs. universe</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Top 3 Gaps */}
                      <div style={{ fontSize: '11px', fontWeight: 600, color: colors.darkNavy, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Top 3 Improvement Priorities
                      </div>
                      
                      {company.topGaps.map((gap, gidx) => (
                        <div 
                          key={gidx}
                          style={{ 
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            padding: '10px 12px',
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            marginBottom: gidx < 2 ? '8px' : 0,
                            borderLeft: `3px solid ${gap.score < 4.5 ? colors.coral : colors.yellow}`
                          }}
                        >
                          <div style={{ 
                            width: '20px', 
                            height: '20px', 
                            borderRadius: '50%', 
                            backgroundColor: colors.navy,
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {gidx + 1}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy }}>{gap.dimension}</div>
                            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{gap.issue}</div>
                          </div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: gap.score < 4.5 ? colors.coral : colors.yellow }}>
                            {gap.score.toFixed(1)}
                          </div>
                        </div>
                      ))}
                      
                      {/* Size Opportunity CTA */}
                      <div style={{ 
                        marginTop: '16px', 
                        padding: '12px 16px', 
                        backgroundColor: colors.cream,
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: `1px solid ${colors.lightBlue}`
                      }}>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: colors.navy }}>Want to size this opportunity?</div>
                          <div style={{ fontSize: '11px', color: '#6b7280' }}>10-minute interview about ARR, pricing model, and sales metrics</div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setShowSizeModal(company); }}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: colors.coral,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Size It →
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            
            {activeTab === 'peer benchmark' && (
              <div style={{ backgroundColor: '#fff', borderRadius: '0 12px 12px 12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>
                  Portfolio health compared against {peerFunds.length} participating funds
                </div>
                
                {/* Fund Rankings */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Fund Portfolio Health Rankings</div>
                  {peerFunds
                    .sort((a, b) => b.avgHealth - a.avgHealth)
                    .map((fund) => (
                      <FundComparisonBar 
                        key={fund.name} 
                        fund={fund} 
                        maxHealth={10} 
                        isCurrentFund={fund.name === currentFund.name} 
                      />
                    ))
                  }
                </div>
                
                {/* Universe Reference */}
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Reference: 100-Company Universe
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontSize: '12px' }}>
                    <div>
                      <div style={{ color: '#6b7280' }}>Top Quartile</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: colors.green }}>{UNIVERSE_TOP_QUARTILE}</div>
                    </div>
                    <div>
                      <div style={{ color: '#6b7280' }}>Average</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: colors.navy }}>{UNIVERSE_AVG}</div>
                    </div>
                    <div>
                      <div style={{ color: '#6b7280' }}>Bottom Quartile</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: colors.coral }}>{UNIVERSE_BOTTOM_QUARTILE}</div>
                    </div>
                  </div>
                </div>
                
                {tier === 'observer' && (
                  <div style={{ 
                    padding: '20px', 
                    backgroundColor: colors.cream, 
                    borderRadius: '8px',
                    border: `1px dashed ${colors.lightBlue}`
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: colors.navy, marginBottom: '8px' }}>Unlock Detailed Benchmarking</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
                      Contribute board-level metrics (ARR, NRR, churn) to unlock:
                    </div>
                    <ul style={{ fontSize: '12px', color: '#6b7280', margin: 0, paddingLeft: '20px', marginBottom: '16px' }}>
                      <li style={{ marginBottom: '4px' }}>Company-level peer comparisons within your sector</li>
                      <li style={{ marginBottom: '4px' }}>Detailed diagnostics on each dimension</li>
                      <li style={{ marginBottom: '4px' }}>Trend analysis over time</li>
                      <li>Recommendations prioritized by revenue impact</li>
                    </ul>
                    <button 
                      onClick={() => setTier('contributor')}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: colors.navy,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Become a Contributor
                    </button>
                  </div>
                )}
                
                {tier === 'contributor' && (
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#dcfce7', 
                    borderRadius: '8px',
                    border: '1px solid #86efac'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#166534', marginBottom: '4px' }}>✓ Contributor Access Active</div>
                    <div style={{ fontSize: '11px', color: '#166534' }}>
                      You're contributing data for 8 of 10 portfolio companies. Full benchmarking and diagnostics available.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Right Column */}
          <div>
            {selectedCompany ? (
              <div style={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                position: 'sticky',
                top: '24px'
              }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy }}>{selectedCompany.name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{selectedCompany.sector} • {selectedCompany.stage}</div>
                    </div>
                    <StatusBadge status={selectedCompany.status} />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '16px' }}>
                    <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}>Health</div>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy }}>{selectedCompany.healthScore.toFixed(1)}</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}>vs Universe</div>
                      <div style={{ fontSize: '20px', fontWeight: 700 }}><RelativeScore score={selectedCompany.relativeScore} /></div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}>Portfolio</div>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy }}>#{getPortfolioRank(selectedCompany.id)}</div>
                    </div>
                  </div>
                </div>
                
                <div style={{ padding: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Revenue Model Health Dimensions</div>
                  
                  <ScoreBar score={selectedCompany.valueArticulation} label="Value Articulation" />
                  <ScoreBar score={selectedCompany.pricingArchitecture} label="Pricing Architecture" />
                  <ScoreBar score={selectedCompany.competitivePositioning} label="Competitive Positioning" />
                  <ScoreBar score={selectedCompany.salesEnablement} label="Sales Enablement" />
                  <ScoreBar score={selectedCompany.customerROI} label="Customer ROI Proof" />
                  
                  {selectedCompany.status === 'underperformer' && (
                    <div style={{ 
                      marginTop: '16px', 
                      padding: '12px', 
                      backgroundColor: '#fef3c7', 
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#92400e'
                    }}>
                      <strong>Primary Gap:</strong> {selectedCompany.topGaps[0]?.dimension || 'Multiple dimensions need attention'}
                    </div>
                  )}
                  
                  {tier === 'contributor' && (
                    <div style={{ 
                      marginTop: '16px', 
                      padding: '12px', 
                      backgroundColor: colors.cream, 
                      borderRadius: '6px',
                      border: `1px solid ${colors.lightBlue}`
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: colors.navy, marginBottom: '8px' }}>Contributor Insights</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
                        <div><span style={{ color: '#6b7280' }}>Sector Rank:</span> <span style={{ fontWeight: 600 }}>Top 40%</span></div>
                        <div><span style={{ color: '#6b7280' }}>Stage Peers:</span> <span style={{ fontWeight: 600 }}>+0.8 pts</span></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div style={{ padding: '0 20px 20px' }}>
                  <button 
                    onClick={() => setShowSizeModal(selectedCompany)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: selectedCompany.status === 'underperformer' ? colors.coral : colors.navy,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {selectedCompany.status === 'underperformer' ? 'Size This Opportunity →' : 'Request Detailed Diagnostic →'}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px', 
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy, marginBottom: '16px' }}>Portfolio Dimension Averages</div>
                
                <ScoreBar score={dimAverages.valueArticulation} label="Value Articulation" />
                <ScoreBar score={dimAverages.pricingArchitecture} label="Pricing Architecture" />
                <ScoreBar score={dimAverages.competitivePositioning} label="Competitive Positioning" />
                <ScoreBar score={dimAverages.salesEnablement} label="Sales Enablement" />
                <ScoreBar score={dimAverages.customerROI} label="Customer ROI Proof" />
                
                <div style={{ 
                  marginTop: '20px', 
                  padding: '16px', 
                  backgroundColor: colors.cream, 
                  borderRadius: '8px',
                  borderLeft: `4px solid ${colors.coral}`
                }}>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>Weakest Dimension Portfolio-Wide</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: colors.darkNavy }}>
                    Sales Enablement
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    Avg: {dimAverages.salesEnablement.toFixed(1)} / 10 • {underperformers.filter(c => c.topGaps.some(g => g.dimension === 'Sales Enablement')).length} companies affected
                  </div>
                </div>
                
                <div style={{ marginTop: '20px', fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>
                  Click a company for detailed breakdown
                </div>
              </div>
            )}
            
            {/* Data Sources */}
            <div style={{ 
              marginTop: '16px',
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Scoring Basis</div>
              <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.6 }}>
                <div style={{ marginBottom: '6px' }}>
                  <strong>Observable data:</strong> Pricing pages, G2/Capterra reviews, LinkedIn presence, job postings, press releases
                </div>
                <div>
                  <strong>Benchmark:</strong> 100-company database of B2B tech companies ($5M-$50M revenue)
                </div>
              </div>
            </div>
            
            {/* Remidi Works CTA */}
            <div style={{ 
              marginTop: '16px',
              backgroundColor: colors.navy, 
              borderRadius: '12px', 
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>Ready to Fix These Gaps?</div>
              <div style={{ fontSize: '12px', color: colors.lightBlue, marginBottom: '16px' }}>
                Remidi Works guides your portco teams through fixing revenue model gaps—with AI and expert support.
              </div>
              <button style={{
                width: '100%',
                padding: '10px',
                backgroundColor: colors.coral,
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                Learn About Remidi Works →
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div style={{ 
          marginTop: '32px', 
          padding: '16px 0', 
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '11px', color: '#9ca3af' }}>
            Scores based on HG Partners' Revenue Model Health framework • Last updated: Dec 16, 2025
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>Benchmarked against 100-company database</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: colors.navy }}>HG Partners</span>
          </div>
        </div>
      </main>
      
      {/* Size Opportunity Modal */}
      {showSizeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '480px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px' }}>
              Size the Opportunity for {showSizeModal.name}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
              We've identified potential revenue model gaps. To estimate the dollar impact, we need a few additional data points.
            </div>
            
            <div style={{ 
              backgroundColor: '#f8fafc', 
              borderRadius: '8px', 
              padding: '20px',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>
                10-Minute Interview Covers:
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: colors.coral }}>•</span>
                  <span><strong>Revenue metrics:</strong> Current ARR, NRR, and churn rates</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: colors.coral }}>•</span>
                  <span><strong>Pricing model:</strong> Current structure and recent changes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: colors.coral }}>•</span>
                  <span><strong>Sales metrics:</strong> Win rates, deal cycles, discount patterns</span>
                </div>
              </div>
            </div>
            
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '24px' }}>
              <strong>Who should take this?</strong> You can answer these questions, or forward to the portco's CRO/CMO. Results go directly to your dashboard.
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowSizeModal(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#f3f4f6',
                  color: colors.darkNavy,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Maybe Later
              </button>
              <button style={{
                flex: 1,
                padding: '12px',
                backgroundColor: colors.coral,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                Start Interview →
              </button>
            </div>
            
            <div style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', marginTop: '16px' }}>
              Data stays confidential. Only summary scores visible at fund level.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
