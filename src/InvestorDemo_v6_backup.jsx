import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

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

// Default portfolio metadata
const defaultMeta = {
  fundName: "Apex Growth Partners II",
  fundType: "Growth Equity",
  lastUpdated: "2025-01-15"
};

// Default portfolio data - 10 companies
const defaultPortfolioData = [
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
  const [searchParams] = useSearchParams();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [sortBy, setSortBy] = useState('relativeScore');
  const [sortDir, setSortDir] = useState('desc');
  const [showSizeModal, setShowSizeModal] = useState(null);
  
  // Dynamic portfolio loading from URL param
  const [portfolioData, setPortfolioData] = useState(defaultPortfolioData);
  const [fundMeta, setFundMeta] = useState(defaultMeta);
  const [loading, setLoading] = useState(false);
  
  // Load custom portfolio if client param is present
  useEffect(() => {
    const clientParam = searchParams.get('client');
    if (clientParam) {
      setLoading(true);
      fetch(`/data/${clientParam}.json`)
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then(data => {
          if (data.portfolio) setPortfolioData(data.portfolio);
          if (data.fundName) setFundMeta({
            fundName: data.fundName,
            fundType: data.fundType || 'Growth Equity',
            lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0]
          });
          setLoading(false);
        })
        .catch(err => {
          console.log('Using default portfolio data:', err.message);
          setLoading(false);
        });
    }
  }, [searchParams]);
  
  // Current fund data (use fundMeta for dynamic name)
  const currentFund = { ...peerFunds[0], name: fundMeta.fundName };
  
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
            <div style={{ color: '#fff', fontSize: '13px' }}>
              <span style={{ opacity: 0.7 }}>Fund:</span> <span style={{ fontWeight: 600 }}>{fundMeta.fundName}</span>
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
          
          {/* Priority Focus */}
          <div style={{ 
            backgroundColor: colors.cream, 
            borderRadius: '12px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            borderLeft: `4px solid ${colors.coral}`
          }}>
            <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Priority Focus</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy, marginBottom: '4px' }}>
              {underperformers.length > 0 ? underperformers[0].name : 'All On Track'}
            </div>
            {underperformers.length > 0 && (
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                Biggest opportunity: {underperformers[0].topGaps[0]?.dimension || 'Multiple dimensions'}
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
          {/* Left Column - Company List */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            overflow: 'hidden'
          }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
              <button
                onClick={() => setActiveTab('overview')}
                style={{
                  padding: '16px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: activeTab === 'overview' ? colors.navy : '#6b7280',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'overview' ? `2px solid ${colors.coral}` : '2px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-1px'
                }}
              >
                Portfolio Overview
              </button>
              <button
                onClick={() => setActiveTab('benchmark')}
                style={{
                  padding: '16px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: activeTab === 'benchmark' ? colors.navy : '#6b7280',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'benchmark' ? `2px solid ${colors.coral}` : '2px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-1px'
                }}
              >
                Peer Benchmarks
              </button>
            </div>
            
            {activeTab === 'overview' && (
              <div>
                {/* Sort Controls */}
                <div style={{ padding: '12px 20px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {portfolioData.length} companies • Sorted by {sortBy === 'relativeScore' ? 'vs. Universe' : 'Health Score'}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => { setSortBy('relativeScore'); setSortDir('asc'); }}
                      style={{
                        padding: '4px 10px',
                        fontSize: '11px',
                        backgroundColor: sortBy === 'relativeScore' ? colors.navy : '#fff',
                        color: sortBy === 'relativeScore' ? '#fff' : '#6b7280',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      vs. Universe
                    </button>
                    <button
                      onClick={() => { setSortBy('healthScore'); setSortDir('desc'); }}
                      style={{
                        padding: '4px 10px',
                        fontSize: '11px',
                        backgroundColor: sortBy === 'healthScore' ? colors.navy : '#fff',
                        color: sortBy === 'healthScore' ? '#fff' : '#6b7280',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Health Score
                    </button>
                  </div>
                </div>
                
                {/* Company List */}
                <div>
                  {sortedCompanies.map((company, idx) => (
                    <div 
                      key={company.id}
                      onClick={() => setSelectedCompany(company)}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 80px 80px 100px',
                        alignItems: 'center',
                        padding: '16px 20px',
                        borderBottom: '1px solid #f3f4f6',
                        cursor: 'pointer',
                        backgroundColor: selectedCompany?.id === company.id ? colors.cream : 'transparent',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy }}>{company.name}</span>
                          <StatusBadge status={company.status} />
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{company.sector} • {company.stage}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <MiniGauge score={company.healthScore} size={48} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <RelativeScore score={company.relativeScore} />
                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>vs. univ</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>Portfolio rank</div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy }}>#{getPortfolioRank(company.id)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'benchmark' && (
              <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy, marginBottom: '16px' }}>Fund Comparison</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
                    Average Revenue Model Health Score across participating funds
                  </div>
                  
                  {peerFunds.map((fund, idx) => (
                    <FundComparisonBar 
                      key={idx} 
                      fund={idx === 0 ? currentFund : fund} 
                      maxHealth={8} 
                      isCurrentFund={idx === 0}
                    />
                  ))}
                </div>
                
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px',
                  marginTop: '24px'
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Universe Benchmarks</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '12px' }}>
                    <div>
                      <div style={{ color: '#6b7280', marginBottom: '4px' }}>Top Quartile</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: colors.green }}>{UNIVERSE_TOP_QUARTILE}</div>
                    </div>
                    <div>
                      <div style={{ color: '#6b7280', marginBottom: '4px' }}>Average</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: colors.navy }}>{UNIVERSE_AVG}</div>
                    </div>
                    <div>
                      <div style={{ color: '#6b7280', marginBottom: '4px' }}>Bottom Quartile</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: colors.coral }}>{UNIVERSE_BOTTOM_QUARTILE}</div>
                    </div>
                  </div>
                </div>
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
                </div>
                
                <div style={{ padding: '0 20px 20px' }}>
                  {/* FleetOps gets special button that links to /user */}
                  {selectedCompany.id === 4 ? (
                    <Link to="/user" style={{ textDecoration: 'none' }}>
                      <button 
                        style={{
                          width: '100%',
                          padding: '12px',
                          backgroundColor: colors.coral,
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Improve Your Performance →
                      </button>
                    </Link>
                  ) : (
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
                  )}
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
                  backgroundColor: '#f8fafc', 
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#6b7280',
                  lineHeight: 1.6
                }}>
                  <strong style={{ color: colors.darkNavy }}>How to use:</strong> Click on any company to see detailed dimension scores and identify improvement opportunities.
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Methodology Note */}
        <div style={{ 
          marginTop: '24px', 
          padding: '16px 20px', 
          backgroundColor: '#fff', 
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            <strong style={{ color: colors.darkNavy }}>Methodology:</strong> Scores derived from analysis of public-facing materials including website, pricing pages, case studies, and sales collateral. 
            Universe benchmark based on 100+ B2B technology companies.
          </div>
          <div style={{ fontSize: '11px', color: '#9ca3af' }}>
            Last updated: {fundMeta.lastUpdated}
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
        }} onClick={() => setShowSizeModal(null)}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px' }}>
              Opportunity Sizing: {showSizeModal.name}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
              Based on benchmark data and typical improvement trajectories
            </div>
            
            <div style={{ 
              padding: '20px', 
              backgroundColor: colors.cream, 
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>Current Health Score</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: colors.coral }}>{showSizeModal.healthScore.toFixed(1)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>Target Health Score</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: colors.green }}>{Math.min(showSizeModal.healthScore + 2, 8.5).toFixed(1)}</div>
                </div>
              </div>
            </div>
            
            <div style={{ fontSize: '13px', color: colors.darkNavy, marginBottom: '16px' }}>
              <strong>Top 3 Improvement Areas:</strong>
            </div>
            
            {showSizeModal.topGaps.slice(0, 3).map((gap, idx) => (
              <div key={idx} style={{ 
                padding: '12px', 
                backgroundColor: '#f9fafb', 
                borderRadius: '8px',
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.darkNavy }}>{gap.dimension}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>{gap.issue.slice(0, 50)}...</div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: colors.coral }}>{gap.score.toFixed(1)}</div>
              </div>
            ))}
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
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
                Close
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: colors.coral,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Request Full Analysis →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
