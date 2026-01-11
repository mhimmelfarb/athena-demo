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

// Peer benchmarks for contributed metrics
const PEER_BENCHMARKS = {
  nrr: 108,
  grr: 91,
  winRate: 28,
  salesCycle: 52,
  cac: 32000,
  ltv: 145000
};

// Helper: format currency
const formatCurrency = (num) => num >= 1000000 ? `$${(num / 1000000).toFixed(1)}M` : `$${(num / 1000).toFixed(0)}K`;

// Helper: get indexed score (0 = peer median)
const getIndexedScore = (value, peer, inverse = false) => {
  if (inverse) return Math.round(peer - value); // For sales cycle: lower is better
  return Math.round(((value - peer) / peer) * 100); // Percentage difference
};

// Helper: get status color based on index
const getMetricStatus = (indexed, thresholds = { red: -15, yellow: 0 }) => {
  if (indexed <= thresholds.red) return 'red';
  if (indexed <= thresholds.yellow) return 'yellow';
  return 'green';
};

// Default portfolio data - 10 companies with contributed metrics
const defaultPortfolioData = [
  { 
    id: 1, name: 'CloudSync Pro', sector: 'DevOps/Infrastructure', stage: 'Series B', 
    healthScore: 7.8, relativeScore: 2.0,
    valueArticulation: 8.2, pricingArchitecture: 7.5, competitivePositioning: 7.9, salesEnablement: 6.8, customerROI: 8.5,
    status: 'outperformer', invested: 2022,
    arr: 18500000, nrr: 112, grr: 94, winRate: 32, salesCycle: 45, cac: 28000, ltv: 168000,
    estimatedUpside: 925000, priority: 'low',
    topGaps: [],
    topOpportunities: []
  },
  { 
    id: 2, name: 'DataForge AI', sector: 'AI/ML Platform', stage: 'Series A', 
    healthScore: 5.4, relativeScore: -0.4,
    valueArticulation: 4.8, pricingArchitecture: 5.2, competitivePositioning: 6.1, salesEnablement: 4.5, customerROI: 6.4,
    status: 'underperformer', invested: 2023,
    arr: 8200000, nrr: 98, grr: 88, winRate: 18, salesCycle: 78, cac: 42000, ltv: 118000,
    estimatedUpside: 1850000, priority: 'high',
    topGaps: [
      { dimension: 'Sales Enablement', score: 4.5, issue: 'No ROI calculator or quantified proof points on website' },
      { dimension: 'Value Articulation', score: 4.8, issue: 'Features described but customer outcomes not quantified' },
      { dimension: 'Pricing Architecture', score: 5.2, issue: 'Flat per-seat pricing doesn\'t scale with value delivered' }
    ],
    topOpportunities: [
      { dimension: 'Sales Enablement', currentScore: 4.5, targetScore: 6.5, metric: 'Win Rate', impact: '+6%', arrImpact: 492000 },
      { dimension: 'Value Articulation', currentScore: 4.8, targetScore: 6.5, metric: 'Sales Cycle', impact: '-18 days', arrImpact: 410000 }
    ]
  },
  { 
    id: 3, name: 'SecureVault', sector: 'Cybersecurity', stage: 'Series C', 
    healthScore: 8.1, relativeScore: 2.3,
    valueArticulation: 8.5, pricingArchitecture: 8.0, competitivePositioning: 8.3, salesEnablement: 7.8, customerROI: 7.9,
    status: 'outperformer', invested: 2021,
    arr: 32000000, nrr: 118, grr: 96, winRate: 35, salesCycle: 38, cac: 26000, ltv: 195000,
    estimatedUpside: 640000, priority: 'low',
    topGaps: [],
    topOpportunities: []
  },
  { 
    id: 4, name: 'FleetOps', sector: 'Logistics Tech', stage: 'Series A', 
    healthScore: 4.2, relativeScore: -1.6,
    valueArticulation: 3.5, pricingArchitecture: 4.8, competitivePositioning: 4.9, salesEnablement: 3.2, customerROI: 4.6,
    status: 'underperformer', invested: 2023,
    arr: 6800000, nrr: 91, grr: 82, winRate: 14, salesCycle: 92, cac: 48000, ltv: 96000,
    estimatedUpside: 2380000, priority: 'critical',
    topGaps: [
      { dimension: 'Sales Enablement', score: 3.2, issue: 'No published pricing, no case studies with quantified ROI' },
      { dimension: 'Value Articulation', score: 3.5, issue: 'Operational stats shown but no connection to customer P&L impact' },
      { dimension: 'Customer ROI Proof', score: 4.6, issue: 'Claims savings but no calculator or specific customer evidence' }
    ],
    topOpportunities: [
      { dimension: 'Sales Enablement', currentScore: 3.2, targetScore: 6.0, metric: 'Win Rate', impact: '+9%', arrImpact: 856000 },
      { dimension: 'Value Articulation', currentScore: 3.5, targetScore: 6.0, metric: 'Sales Cycle', impact: '-28 days', arrImpact: 680000 },
      { dimension: 'Customer ROI Proof', currentScore: 4.6, targetScore: 6.5, metric: 'NRR', impact: '+8%', arrImpact: 544000 }
    ]
  },
  { 
    id: 5, name: 'TalentMatch', sector: 'HR Tech', stage: 'Series B', 
    healthScore: 6.3, relativeScore: 0.5,
    valueArticulation: 6.8, pricingArchitecture: 5.5, competitivePositioning: 6.2, salesEnablement: 6.5, customerROI: 6.5,
    status: 'on-track', invested: 2022,
    arr: 12400000, nrr: 104, grr: 90, winRate: 24, salesCycle: 58, cac: 35000, ltv: 140000,
    estimatedUpside: 1116000, priority: 'medium',
    topGaps: [],
    topOpportunities: []
  },
  { 
    id: 6, name: 'PayStream', sector: 'FinTech', stage: 'Series B', 
    healthScore: 7.2, relativeScore: 1.4,
    valueArticulation: 7.5, pricingArchitecture: 7.8, competitivePositioning: 6.8, salesEnablement: 7.0, customerROI: 6.9,
    status: 'outperformer', invested: 2021,
    arr: 21000000, nrr: 110, grr: 93, winRate: 30, salesCycle: 48, cac: 30000, ltv: 162000,
    estimatedUpside: 840000, priority: 'low',
    topGaps: [],
    topOpportunities: []
  },
  { 
    id: 7, name: 'HealthBridge', sector: 'HealthTech', stage: 'Series A', 
    healthScore: 5.1, relativeScore: -0.7,
    valueArticulation: 5.5, pricingArchitecture: 4.2, competitivePositioning: 5.8, salesEnablement: 4.8, customerROI: 5.2,
    status: 'underperformer', invested: 2024,
    arr: 5200000, nrr: 96, grr: 85, winRate: 19, salesCycle: 72, cac: 38000, ltv: 108000,
    estimatedUpside: 1196000, priority: 'high',
    topGaps: [
      { dimension: 'Pricing Architecture', score: 4.2, issue: 'Single flat-rate tier regardless of practice size or usage' },
      { dimension: 'Sales Enablement', score: 4.8, issue: 'Limited competitive positioning materials visible' },
      { dimension: 'Customer ROI Proof', score: 5.2, issue: 'Testimonials but no quantified outcomes' }
    ],
    topOpportunities: [
      { dimension: 'Pricing Architecture', currentScore: 4.2, targetScore: 6.5, metric: 'NRR', impact: '+6%', arrImpact: 468000 },
      { dimension: 'Sales Enablement', currentScore: 4.8, targetScore: 6.5, metric: 'Win Rate', impact: '+5%', arrImpact: 390000 }
    ]
  },
  { 
    id: 8, name: 'RetailIQ', sector: 'Retail Analytics', stage: 'Series B', 
    healthScore: 6.8, relativeScore: 1.0,
    valueArticulation: 7.2, pricingArchitecture: 6.5, competitivePositioning: 6.9, salesEnablement: 6.2, customerROI: 7.2,
    status: 'on-track', invested: 2022,
    arr: 15600000, nrr: 106, grr: 91, winRate: 26, salesCycle: 55, cac: 33000, ltv: 152000,
    estimatedUpside: 780000, priority: 'medium',
    topGaps: [],
    topOpportunities: []
  },
  { 
    id: 9, name: 'SupplyCore', sector: 'Supply Chain', stage: 'Series B', 
    healthScore: 5.5, relativeScore: -0.3,
    valueArticulation: 5.2, pricingArchitecture: 6.8, competitivePositioning: 5.5, salesEnablement: 4.8, customerROI: 5.2,
    status: 'underperformer', invested: 2021,
    arr: 11800000, nrr: 100, grr: 88, winRate: 21, salesCycle: 68, cac: 40000, ltv: 125000,
    estimatedUpside: 1534000, priority: 'high',
    topGaps: [
      { dimension: 'Sales Enablement', score: 4.8, issue: 'No visible battle cards or competitive differentiation content' },
      { dimension: 'Value Articulation', score: 5.2, issue: 'Generic efficiency claims without segment-specific proof' },
      { dimension: 'Customer ROI Proof', score: 5.2, issue: 'Case studies lack specific financial outcomes' }
    ],
    topOpportunities: [
      { dimension: 'Sales Enablement', currentScore: 4.8, targetScore: 6.5, metric: 'Win Rate', impact: '+5%', arrImpact: 590000 },
      { dimension: 'Value Articulation', currentScore: 5.2, targetScore: 6.5, metric: 'Sales Cycle', impact: '-12 days', arrImpact: 472000 }
    ]
  },
  { 
    id: 10, name: 'MarketPulse', sector: 'MarTech', stage: 'Series A', 
    healthScore: 6.5, relativeScore: 0.7,
    valueArticulation: 6.9, pricingArchitecture: 6.2, competitivePositioning: 6.8, salesEnablement: 5.8, customerROI: 6.8,
    status: 'on-track', invested: 2023,
    arr: 7400000, nrr: 105, grr: 90, winRate: 25, salesCycle: 56, cac: 34000, ltv: 148000,
    estimatedUpside: 592000, priority: 'medium',
    topGaps: [],
    topOpportunities: []
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
// Dimension tooltip content
const dimensionTooltips = {
  'Value Articulation': {
    description: 'How well customer outcomes are quantified across the 9 Value Levers',
    components: [
      'Time Savings',
      'Cost Displacement', 
      'Risk Mitigation',
      'Revenue Acceleration',
      'Quality Improvement',
      'Scalability',
      'Decision Intelligence',
      'Workforce Optimization',
      'Competitive Advantage'
    ]
  },
  'Pricing Architecture': {
    description: 'Clarity and structure of pricing model',
    components: [
      'Pricing Transparency',
      'Value-Based Model Signals',
      'No Hidden Fees',
      'Clear Inclusions',
      'Low Commitment Entry Options'
    ]
  },
  'Competitive Positioning': {
    description: 'Whether competitive claims are proven with evidence',
    components: [
      'Differentiation Claims',
      'Evidence Provided',
      'Competitive Awareness',
      'G2/Capterra Positioning'
    ]
  },
  'Sales Enablement': {
    description: 'Information completeness for buyer self-qualification',
    components: [
      'ICP/Persona Clarity',
      'Product Description',
      'Try Before Buy',
      'Demo/Trial Access',
      'Decision-Making Information'
    ]
  },
  'Customer ROI Proof': {
    description: 'Third-party credibility and validation',
    components: [
      'Customer Logos (Relevant)',
      'Named Testimonials',
      'Quantified Case Studies',
      'Hard Numbers',
      'Review Site Presence',
      'Third-Party Validation'
    ]
  }
};

const ScoreBar = ({ score, label, compact = false, showTooltip = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const tooltip = dimensionTooltips[label];
  
  const getColor = (s) => {
    if (s >= 7) return colors.green;
    if (s >= 5.5) return colors.yellow;
    return colors.red;
  };
  
  return (
    <div 
      style={{ marginBottom: compact ? '6px' : '10px', position: 'relative' }}
      onMouseEnter={() => showTooltip && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ 
          fontSize: compact ? '10px' : '11px', 
          color: '#6b7280',
          cursor: showTooltip ? 'help' : 'default',
          borderBottom: showTooltip ? '1px dotted #9ca3af' : 'none'
        }}>{label}</span>
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
      
      {/* Tooltip */}
      {showTooltip && isHovered && tooltip && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '8px',
          padding: '12px 14px',
          backgroundColor: colors.darkNavy,
          color: '#fff',
          borderRadius: '8px',
          fontSize: '11px',
          zIndex: 100,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <div style={{ marginBottom: '8px', color: colors.lightBlue, fontWeight: 600 }}>
            {tooltip.description}
          </div>
          <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '6px' }}>
            Scoring components:
          </div>
          <ul style={{ margin: 0, paddingLeft: '14px', lineHeight: 1.6 }}>
            {tooltip.components.map((item, idx) => (
              <li key={idx} style={{ color: '#e5e7eb' }}>{item}</li>
            ))}
          </ul>
        </div>
      )}
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
  const [showBoardSlide, setShowBoardSlide] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [diligenceResults, setDiligenceResults] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  
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
  const underperformers = portfolioData.filter(c => c.status === 'underperformer').sort((a, b) => a.healthScore - b.healthScore);
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
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            </Link>
            <span style={{ fontSize: '11px', color: colors.lightBlue }}>Portfolio Intelligence</span>
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
                onClick={() => setActiveTab('enhanced')}
                style={{
                  padding: '16px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: activeTab === 'enhanced' ? colors.navy : '#6b7280',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'enhanced' ? `2px solid ${colors.coral}` : '2px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-1px'
                }}
              >
                Enhanced View
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
              <button
                onClick={() => setActiveTab('sectors')}
                style={{
                  padding: '16px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: activeTab === 'sectors' ? colors.navy : '#6b7280',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'sectors' ? `2px solid ${colors.coral}` : '2px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-1px'
                }}
              >
                Sector Intelligence
              </button>
              <button
                onClick={() => setActiveTab('diligence')}
                style={{
                  padding: '16px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: activeTab === 'diligence' ? colors.navy : '#6b7280',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'diligence' ? `2px solid ${colors.coral}` : '2px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-1px'
                }}
              >
                🔍 Diligence Mode
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
            
            {activeTab === 'enhanced' && (
              <div>
                {/* Enhanced View Header */}
                <div style={{ padding: '12px 20px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {portfolioData.length} companies • Sorted by upside potential
                  </div>
                  <div style={{ fontSize: '11px', color: colors.coral, fontWeight: 600 }}>
                    Total Portfolio Upside: {formatCurrency(portfolioData.reduce((sum, c) => sum + (c.estimatedUpside || 0), 0))}
                  </div>
                </div>
                
                {/* Enhanced Table Header */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1.5fr 80px 80px 80px 120px', 
                  padding: '12px 20px',
                  backgroundColor: '#f9fafb',
                  borderBottom: '1px solid #e5e7eb',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <div>Company</div>
                  <div style={{ textAlign: 'center' }}>Health</div>
                  <div style={{ textAlign: 'center' }}>vs Univ</div>
                  <div style={{ textAlign: 'center' }}>Priority</div>
                  <div style={{ textAlign: 'right' }}>$ Upside Potential</div>
                </div>
                
                {/* Enhanced Company List - sorted by upside */}
                <div>
                  {[...portfolioData].sort((a, b) => (b.estimatedUpside || 0) - (a.estimatedUpside || 0)).map((company, idx) => {
                    const priorityStyles = {
                      critical: { bg: '#fef2f2', color: '#991b1b', label: 'Critical' },
                      high: { bg: '#fef3c7', color: '#92400e', label: 'High' },
                      medium: { bg: '#e0f2fe', color: '#0369a1', label: 'Medium' },
                      low: { bg: '#f0fdf4', color: '#166534', label: 'Low' }
                    };
                    const pStyle = priorityStyles[company.priority] || priorityStyles.medium;
                    
                    return (
                      <div 
                        key={company.id}
                        onClick={() => setSelectedCompany(company)}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1.5fr 80px 80px 80px 120px',
                          alignItems: 'center',
                          padding: '14px 20px',
                          borderBottom: '1px solid #f3f4f6',
                          cursor: 'pointer',
                          backgroundColor: selectedCompany?.id === company.id ? colors.cream : 'transparent',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy }}>{company.name}</span>
                            <StatusBadge status={company.status} />
                          </div>
                          <div style={{ fontSize: '11px', color: '#6b7280' }}>{company.sector}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <MiniGauge score={company.healthScore} size={44} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <RelativeScore score={company.relativeScore} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            fontSize: '10px',
                            fontWeight: 600,
                            borderRadius: '4px',
                            backgroundColor: pStyle.bg,
                            color: pStyle.color
                          }}>
                            {pStyle.label}
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: company.estimatedUpside > 1000000 ? colors.coral : colors.darkNavy }}>
                            {formatCurrency(company.estimatedUpside || 0)}
                          </div>
                          {company.arr && (
                            <div style={{ fontSize: '10px', color: '#9ca3af' }}>
                              {((company.estimatedUpside / company.arr) * 100).toFixed(0)}% of ARR
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {activeTab === 'benchmark' && (
              <div style={{ padding: '20px' }}>
                {/* Cooperative Stats Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '16px 20px',
                  backgroundColor: colors.cream,
                  borderRadius: '8px',
                  marginBottom: '24px'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Data Cooperative</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy }}>198 Companies • 24 Funds</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Your Portfolio Position</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: avgHealth >= UNIVERSE_AVG ? colors.green : colors.coral }}>
                      {avgHealth >= UNIVERSE_TOP_QUARTILE ? 'Top Quartile' : avgHealth >= UNIVERSE_AVG ? 'Above Average' : 'Below Average'}
                    </div>
                  </div>
                </div>

                {/* Distribution Bar */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Portfolio vs. Cooperative Distribution</div>
                  <div style={{ position: 'relative', height: '48px', borderRadius: '8px', overflow: 'hidden', background: 'linear-gradient(to right, #fecaca 0%, #fef3c7 40%, #d1fae5 100%)' }}>
                    {/* Quartile markers */}
                    <div style={{ position: 'absolute', top: 0, bottom: 0, width: '1px', backgroundColor: '#9ca3af', left: `${(UNIVERSE_BOTTOM_QUARTILE / 10) * 100}%` }}>
                      <span style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: '#6b7280' }}>25th</span>
                    </div>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, width: '2px', backgroundColor: '#6b7280', left: `${(UNIVERSE_AVG / 10) * 100}%` }}>
                      <span style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: '#6b7280', fontWeight: 600 }}>50th</span>
                    </div>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, width: '1px', backgroundColor: '#9ca3af', left: `${(UNIVERSE_TOP_QUARTILE / 10) * 100}%` }}>
                      <span style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: '#6b7280' }}>75th</span>
                    </div>
                    {/* Your position marker */}
                    <div style={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: `${(avgHealth / 10) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%',
                      backgroundColor: colors.navy,
                      border: '3px solid white',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px', fontSize: '10px', color: '#9ca3af' }}>
                    <span>2.0 - Critical</span>
                    <span style={{ fontWeight: 600, color: colors.navy }}>Your portfolio: {avgHealth.toFixed(1)}</span>
                    <span>10.0 - Excellent</span>
                  </div>
                </div>

                {/* Dimension Comparison */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.darkNavy, marginBottom: '16px' }}>Your Portfolio vs. Cooperative Median</div>
                  
                  {[
                    { name: 'Value Articulation', yourScore: dimAverages.valueArticulation, peerAvg: 5.9, topQuartile: 7.3 },
                    { name: 'Pricing Architecture', yourScore: dimAverages.pricingArchitecture, peerAvg: 5.7, topQuartile: 7.1 },
                    { name: 'Competitive Positioning', yourScore: dimAverages.competitivePositioning, peerAvg: 6.1, topQuartile: 7.5 },
                    { name: 'Sales Enablement', yourScore: dimAverages.salesEnablement, peerAvg: 5.4, topQuartile: 6.9 },
                    { name: 'Customer ROI Proof', yourScore: dimAverages.customerROI, peerAvg: 5.8, topQuartile: 7.2 },
                  ].map((dim, idx) => {
                    const diff = dim.yourScore - dim.peerAvg;
                    const percentile = Math.round(50 + (diff / (dim.topQuartile - dim.peerAvg)) * 25);
                    const diffColor = diff >= 0.5 ? colors.green : diff <= -0.5 ? colors.red : colors.yellow;
                    return (
                      <div key={idx} style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 500, color: colors.darkNavy }}>{dim.name}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '11px', color: '#9ca3af' }}>~{Math.max(20, Math.min(80, percentile))}th %ile</span>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: diffColor }}>
                              {diff >= 0 ? '+' : ''}{diff.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div style={{ position: 'relative', height: '10px', backgroundColor: '#e5e7eb', borderRadius: '5px' }}>
                          {/* Median marker */}
                          <div style={{
                            position: 'absolute',
                            left: `${(dim.peerAvg / 10) * 100}%`,
                            top: '-2px',
                            width: '2px',
                            height: '14px',
                            backgroundColor: '#6b7280',
                          }} />
                          {/* Top quartile marker */}
                          <div style={{
                            position: 'absolute',
                            left: `${(dim.topQuartile / 10) * 100}%`,
                            top: '-2px',
                            width: '1px',
                            height: '14px',
                            backgroundColor: colors.green,
                          }} />
                          {/* Your score bar */}
                          <div style={{
                            width: `${(dim.yourScore / 10) * 100}%`,
                            height: '100%',
                            backgroundColor: diffColor,
                            borderRadius: '5px',
                            transition: 'width 0.3s ease',
                          }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                          <span style={{ fontSize: '10px', color: '#9ca3af' }}>Median: {dim.peerAvg}</span>
                          <span style={{ fontSize: '10px', color: colors.green }}>Top 25%: {dim.topQuartile}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Sector Breakdown */}
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px',
                  marginTop: '24px'
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Sector Intelligence</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                    Your portfolio spans {[...new Set(portfolioData.map(c => c.sector))].length} sectors. Key insight:
                  </div>
                  <div style={{ 
                    padding: '12px', 
                    backgroundColor: '#e0f2fe', 
                    borderRadius: '6px',
                    borderLeft: `3px solid ${colors.lightBlue}`,
                    fontSize: '12px',
                    color: '#0369a1'
                  }}>
                    <strong>Sales Enablement</strong> shows the widest gap vs. cooperative (-{(5.4 - dimAverages.salesEnablement).toFixed(1)} from median). Companies that improve this dimension see average <strong>+6% win rate improvement</strong> within 6 months.
                  </div>
                </div>

                {/* Cooperative Benchmarks Grid */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '12px',
                  marginTop: '24px'
                }}>
                  <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Top Quartile</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: colors.green }}>{UNIVERSE_TOP_QUARTILE}</div>
                    <div style={{ fontSize: '10px', color: '#059669' }}>75th %ile</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Cooperative Median</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: colors.navy }}>{UNIVERSE_AVG}</div>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>50th %ile</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                    <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Bottom Quartile</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: colors.coral }}>{UNIVERSE_BOTTOM_QUARTILE}</div>
                    <div style={{ fontSize: '10px', color: '#dc2626' }}>25th %ile</div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'sectors' && (
              <div style={{ padding: '20px' }}>
                {/* Sector Selector */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Select Sector to Analyze</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {[...new Set(portfolioData.map(c => c.sector))].map(sector => {
                      const sectorCount = portfolioData.filter(c => c.sector === sector).length;
                      return (
                        <button
                          key={sector}
                          onClick={() => setSelectedSector(sector)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 500,
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: selectedSector === sector ? colors.navy : '#f3f4f6',
                            color: selectedSector === sector ? 'white' : '#4b5563',
                            transition: 'all 0.15s'
                          }}
                        >
                          {sector} ({sectorCount})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedSector ? (
                  <>
                    {/* Sector Stats */}
                    {(() => {
                      const sectorCompanies = portfolioData.filter(c => c.sector === selectedSector);
                      const sectorAvg = sectorCompanies.reduce((a, c) => a + c.healthScore, 0) / sectorCompanies.length;
                      // Simulated cooperative sector data
                      const cooperativeSectorData = {
                        'DevOps/Infrastructure': { n: 23, median: 6.2, topQuartile: 7.5 },
                        'AI/ML Platform': { n: 31, median: 5.8, topQuartile: 7.1 },
                        'Cybersecurity': { n: 28, median: 6.8, topQuartile: 8.0 },
                        'Logistics Tech': { n: 18, median: 5.4, topQuartile: 6.8 },
                        'HR Tech': { n: 22, median: 6.0, topQuartile: 7.2 },
                        'FinTech': { n: 35, median: 6.5, topQuartile: 7.8 },
                        'HealthTech': { n: 19, median: 5.6, topQuartile: 7.0 },
                        'Retail Analytics': { n: 14, median: 6.1, topQuartile: 7.4 },
                        'Supply Chain': { n: 16, median: 5.7, topQuartile: 7.0 },
                        'MarTech': { n: 27, median: 6.3, topQuartile: 7.6 }
                      };
                      const sectorData = cooperativeSectorData[selectedSector] || { n: 20, median: 5.8, topQuartile: 7.2 };
                      
                      // Calculate dimension averages for sector
                      const sectorDimAvgs = {
                        valueArticulation: sectorCompanies.reduce((a, c) => a + c.valueArticulation, 0) / sectorCompanies.length,
                        pricingArchitecture: sectorCompanies.reduce((a, c) => a + c.pricingArchitecture, 0) / sectorCompanies.length,
                        competitivePositioning: sectorCompanies.reduce((a, c) => a + c.competitivePositioning, 0) / sectorCompanies.length,
                        salesEnablement: sectorCompanies.reduce((a, c) => a + c.salesEnablement, 0) / sectorCompanies.length,
                        customerROI: sectorCompanies.reduce((a, c) => a + c.customerROI, 0) / sectorCompanies.length
                      };

                      return (
                        <>
                          {/* Sector Overview Cards */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ padding: '16px', backgroundColor: colors.cream, borderRadius: '8px', textAlign: 'center' }}>
                              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Your Companies</div>
                              <div style={{ fontSize: '24px', fontWeight: 700, color: colors.navy }}>{sectorCompanies.length}</div>
                              <div style={{ fontSize: '10px', color: '#6b7280' }}>in {selectedSector}</div>
                            </div>
                            <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', textAlign: 'center' }}>
                              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Cooperative Size</div>
                              <div style={{ fontSize: '24px', fontWeight: 700, color: colors.darkNavy }}>{sectorData.n}</div>
                              <div style={{ fontSize: '10px', color: '#6b7280' }}>companies</div>
                            </div>
                            <div style={{ padding: '16px', backgroundColor: sectorAvg >= sectorData.median ? '#d1fae5' : '#fef3c7', borderRadius: '8px', textAlign: 'center' }}>
                              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Your Sector Avg</div>
                              <div style={{ fontSize: '24px', fontWeight: 700, color: sectorAvg >= sectorData.median ? colors.green : colors.yellow }}>{sectorAvg.toFixed(1)}</div>
                              <div style={{ fontSize: '10px', color: sectorAvg >= sectorData.median ? '#059669' : '#d97706' }}>
                                {sectorAvg >= sectorData.topQuartile ? 'Top Quartile' : sectorAvg >= sectorData.median ? 'Above Median' : 'Below Median'}
                              </div>
                            </div>
                          </div>

                          {/* Sector Distribution */}
                          <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>
                              Your {selectedSector} Companies vs. Sector Cooperative
                            </div>
                            <div style={{ position: 'relative', height: '40px', borderRadius: '8px', overflow: 'hidden', background: 'linear-gradient(to right, #fecaca 0%, #fef3c7 40%, #d1fae5 100%)' }}>
                              {/* Median marker */}
                              <div style={{ position: 'absolute', top: 0, bottom: 0, width: '2px', backgroundColor: '#6b7280', left: `${(sectorData.median / 10) * 100}%` }}>
                                <span style={{ position: 'absolute', bottom: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: '#6b7280' }}>Median</span>
                              </div>
                              {/* Top quartile marker */}
                              <div style={{ position: 'absolute', top: 0, bottom: 0, width: '1px', backgroundColor: colors.green, left: `${(sectorData.topQuartile / 10) * 100}%` }}>
                                <span style={{ position: 'absolute', bottom: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: colors.green }}>Top 25%</span>
                              </div>
                              {/* Your companies as dots */}
                              {sectorCompanies.map((company, idx) => (
                                <div key={company.id} style={{ 
                                  position: 'absolute', 
                                  top: '50%', 
                                  left: `${(company.healthScore / 10) * 100}%`,
                                  transform: 'translate(-50%, -50%)',
                                  width: '14px', 
                                  height: '14px', 
                                  borderRadius: '50%',
                                  backgroundColor: colors.navy,
                                  border: '2px solid white',
                                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                  cursor: 'pointer',
                                  zIndex: 10
                                }} title={`${company.name}: ${company.healthScore.toFixed(1)}`} />
                              ))}
                            </div>
                          </div>

                          {/* Company List in Sector */}
                          <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Your {selectedSector} Companies</div>
                            {sectorCompanies.sort((a, b) => b.healthScore - a.healthScore).map((company, idx) => {
                              const vsMedian = company.healthScore - sectorData.median;
                              return (
                                <div key={company.id} style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'space-between',
                                  padding: '12px',
                                  backgroundColor: idx % 2 === 0 ? '#f9fafb' : 'white',
                                  borderRadius: '6px',
                                  marginBottom: '4px'
                                }}>
                                  <div>
                                    <div style={{ fontSize: '13px', fontWeight: 600, color: colors.darkNavy }}>{company.name}</div>
                                    <div style={{ fontSize: '11px', color: '#6b7280' }}>{company.stage}</div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                      <div style={{ fontSize: '16px', fontWeight: 700, color: company.healthScore >= 7 ? colors.green : company.healthScore >= 5.5 ? colors.yellow : colors.red }}>
                                        {company.healthScore.toFixed(1)}
                                      </div>
                                    </div>
                                    <div style={{ 
                                      padding: '4px 10px', 
                                      borderRadius: '12px',
                                      fontSize: '11px',
                                      fontWeight: 600,
                                      backgroundColor: vsMedian >= 0.5 ? '#d1fae5' : vsMedian >= -0.5 ? '#fef3c7' : '#fee2e2',
                                      color: vsMedian >= 0.5 ? '#065f46' : vsMedian >= -0.5 ? '#92400e' : '#991b1b'
                                    }}>
                                      {vsMedian >= 0 ? '+' : ''}{vsMedian.toFixed(1)} vs sector
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Dimension Comparison */}
                          <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>
                              Dimension Analysis vs. {selectedSector} Cooperative
                            </div>
                            {[
                              { name: 'Value Articulation', yourScore: sectorDimAvgs.valueArticulation, sectorMedian: sectorData.median + 0.1 },
                              { name: 'Pricing Architecture', yourScore: sectorDimAvgs.pricingArchitecture, sectorMedian: sectorData.median - 0.1 },
                              { name: 'Competitive Positioning', yourScore: sectorDimAvgs.competitivePositioning, sectorMedian: sectorData.median + 0.3 },
                              { name: 'Sales Enablement', yourScore: sectorDimAvgs.salesEnablement, sectorMedian: sectorData.median - 0.4 },
                              { name: 'Customer ROI Proof', yourScore: sectorDimAvgs.customerROI, sectorMedian: sectorData.median },
                            ].map((dim, idx) => {
                              const diff = dim.yourScore - dim.sectorMedian;
                              const diffColor = diff >= 0.5 ? colors.green : diff <= -0.5 ? colors.red : colors.yellow;
                              return (
                                <div key={idx} style={{ marginBottom: '14px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 500, color: colors.darkNavy }}>{dim.name}</span>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: diffColor }}>
                                      {diff >= 0 ? '+' : ''}{diff.toFixed(1)}
                                    </span>
                                  </div>
                                  <div style={{ position: 'relative', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                                    <div style={{
                                      position: 'absolute',
                                      left: `${(dim.sectorMedian / 10) * 100}%`,
                                      top: '-2px',
                                      width: '2px',
                                      height: '12px',
                                      backgroundColor: '#6b7280',
                                    }} />
                                    <div style={{
                                      width: `${(dim.yourScore / 10) * 100}%`,
                                      height: '100%',
                                      backgroundColor: diffColor,
                                      borderRadius: '4px',
                                    }} />
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Sector Insight */}
                          <div style={{ 
                            padding: '16px', 
                            backgroundColor: '#e0f2fe', 
                            borderRadius: '8px',
                            borderLeft: `3px solid ${colors.lightBlue}`
                          }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: '#0369a1', marginBottom: '8px' }}>
                              Sector Insight: {selectedSector}
                            </div>
                            <div style={{ fontSize: '12px', color: '#0c4a6e' }}>
                              {sectorAvg >= sectorData.median ? (
                                <>Your {selectedSector} companies outperform the sector median by <strong>+{(sectorAvg - sectorData.median).toFixed(1)} pts</strong>. 
                                Focus on maintaining this advantage while improving weaker dimensions.</>
                              ) : (
                                <>Your {selectedSector} companies are <strong>{(sectorData.median - sectorAvg).toFixed(1)} pts below</strong> sector median. 
                                Companies that close this gap typically see <strong>12-18% improvement</strong> in win rates within 6 months.</>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '48px 24px', color: '#6b7280' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏭</div>
                    <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Select a sector above</div>
                    <div style={{ fontSize: '12px' }}>See how your companies compare to sector-specific benchmarks</div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'diligence' && (
              <div style={{ padding: '20px' }}>
                {!diligenceResults ? (
                  <>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy, marginBottom: '8px' }}>Target Company Assessment</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        Enter a target company for pre-acquisition commercial health analysis
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Company Name</label>
                        <input type="text" defaultValue="TargetCo Industries" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Website URL</label>
                        <input type="text" defaultValue="www.targetco.com" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Sector</label>
                        <select style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }}>
                          <option>DevOps/Infrastructure</option>
                          <option>AI/ML Platform</option>
                          <option>Cybersecurity</option>
                          <option>FinTech</option>
                          <option>HR Tech</option>
                          <option>HealthTech</option>
                          <option>Logistics Tech</option>
                          <option>MarTech</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Estimated ARR</label>
                        <input type="text" defaultValue="$12M" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px' }} />
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setDiligenceResults(true)}
                      style={{ 
                        width: '100%',
                        padding: '14px 24px', 
                        backgroundColor: colors.coral, 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        fontSize: '14px', 
                        fontWeight: 600, 
                        cursor: 'pointer',
                        marginTop: '8px'
                      }}
                    >
                      Run Diligence Assessment
                    </button>
                    
                    <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '8px' }}>What You'll Get</div>
                      <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#6b7280', lineHeight: 1.8 }}>
                        <li>Commercial health score based on observable data</li>
                        <li>Perception gap analysis (mgmt view vs. external signals)</li>
                        <li>Sector-specific benchmarking</li>
                        <li>Value creation opportunity sizing</li>
                        <li>IC memo-ready export</li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Results Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <div>
                        <div style={{ fontSize: '10px', fontWeight: 500, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Diligence Assessment</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy }}>TargetCo Industries</div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>DevOps/Infrastructure • ~$12M ARR</div>
                      </div>
                      <button 
                        onClick={() => setDiligenceResults(null)} 
                        style={{ fontSize: '12px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        ← New Assessment
                      </button>
                    </div>
                    
                    {/* Score Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                      <div style={{ padding: '14px', backgroundColor: colors.cream, borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Est. Score</div>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: colors.navy }}>5.2</div>
                        <div style={{ fontSize: '10px', color: '#6b7280' }}>38th %ile</div>
                      </div>
                      <div style={{ padding: '14px', backgroundColor: '#fef3c7', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '10px', color: '#92400e', marginBottom: '4px' }}>Confidence</div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: colors.yellow }}>Medium</div>
                        <div style={{ fontSize: '10px', color: '#92400e' }}>Public data</div>
                      </div>
                      <div style={{ padding: '14px', backgroundColor: '#d1fae5', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '10px', color: '#065f46', marginBottom: '4px' }}>Potential</div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: colors.green }}>HIGH</div>
                        <div style={{ fontSize: '10px', color: '#065f46' }}>Fixable gaps</div>
                      </div>
                    </div>
                    
                    {/* Perception Gap */}
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Perception Gap Analysis</div>
                      <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '12px' }}>Management Self-Assessment vs. External Observable Data</div>
                      
                      {[
                        { name: 'Value Articulation', mgmt: 7.5, ext: 5.2 },
                        { name: 'Pricing Architecture', mgmt: 6.0, ext: 4.8 },
                        { name: 'Competitive Position', mgmt: 7.0, ext: 6.3 },
                        { name: 'Sales Enablement', mgmt: 5.5, ext: 4.2 },
                        { name: 'Customer ROI Proof', mgmt: 5.0, ext: 5.5 },
                      ].map((d, idx) => {
                        const gap = d.ext - d.mgmt;
                        const isLargeGap = Math.abs(gap) > 1.5;
                        return (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                            <span style={{ fontSize: '11px', color: colors.darkNavy, width: '120px' }}>{d.name}</span>
                            <span style={{ fontSize: '11px', color: '#9ca3af', width: '50px', textAlign: 'center' }}>{d.mgmt}</span>
                            <span style={{ fontSize: '11px', color: colors.darkNavy, width: '50px', textAlign: 'center', fontWeight: 600 }}>{d.ext}</span>
                            <span style={{ fontSize: '11px', fontWeight: 600, width: '60px', textAlign: 'right', color: isLargeGap ? colors.red : gap < 0 ? colors.yellow : colors.green }}>
                              {gap > 0 ? '+' : ''}{gap.toFixed(1)} {isLargeGap ? '⚠️' : ''}
                            </span>
                          </div>
                        );
                      })}
                      <div style={{ display: 'flex', fontSize: '9px', color: '#9ca3af', marginTop: '8px', justifyContent: 'space-between' }}>
                        <span></span>
                        <span style={{ width: '50px', textAlign: 'center' }}>Mgmt</span>
                        <span style={{ width: '50px', textAlign: 'center' }}>External</span>
                        <span style={{ width: '60px', textAlign: 'right' }}>Gap</span>
                      </div>
                    </div>
                    
                    {/* Red Flag */}
                    <div style={{ 
                      padding: '12px', 
                      backgroundColor: '#fef2f2', 
                      borderRadius: '6px',
                      borderLeft: `3px solid ${colors.red}`,
                      marginBottom: '20px'
                    }}>
                      <div style={{ fontSize: '11px', color: '#991b1b' }}>
                        <strong>⚠️ Large perception gap</strong> on Value Articulation (-2.3). This indicates either lack of awareness (fixable) or lack of candor (red flag). Validate in diligence.
                      </div>
                    </div>
                    
                    {/* Value Creation */}
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Value Creation Opportunity (3-Year)</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: '#6b7280' }}>Conservative</div>
                          <div style={{ fontSize: '18px', fontWeight: 700, color: '#4b5563' }}>$1.4M</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '12px', backgroundColor: colors.cream, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: colors.navy, fontWeight: 500 }}>Realistic</div>
                          <div style={{ fontSize: '18px', fontWeight: 700, color: colors.navy }}>$2.2M</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#d1fae5', borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: colors.green }}>Optimistic</div>
                          <div style={{ fontSize: '18px', fontWeight: 700, color: colors.green }}>$3.6M</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '12px' }}>
                        <strong>Primary lever:</strong> Value Articulation improvement (+$800K)
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ 
                        flex: 1,
                        padding: '10px', 
                        backgroundColor: colors.navy, 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        fontSize: '12px', 
                        fontWeight: 600, 
                        cursor: 'pointer' 
                      }}>
                        Export IC Memo
                      </button>
                      <button style={{ 
                        flex: 1,
                        padding: '10px', 
                        backgroundColor: '#f3f4f6', 
                        color: colors.darkNavy, 
                        border: '1px solid #d1d5db', 
                        borderRadius: '6px', 
                        fontSize: '12px', 
                        fontWeight: 500, 
                        cursor: 'pointer' 
                      }}>
                        Full Report
                      </button>
                    </div>
                  </>
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
                  {/* Toggle between views */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <button
                      onClick={() => setShowAdvanced(false)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: !showAdvanced ? colors.navy : '#f3f4f6',
                        color: !showAdvanced ? '#fff' : '#6b7280',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Health Dimensions
                    </button>
                    <button
                      onClick={() => setShowAdvanced(true)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: showAdvanced ? colors.navy : '#f3f4f6',
                        color: showAdvanced ? '#fff' : '#6b7280',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      vs. Peer Benchmarks
                    </button>
                  </div>

                  {!showAdvanced ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Performance vs. Peer Median</div>
                      <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '16px' }}>Index shows deviation from peer benchmark (0 = median)</div>
                      
                      {/* Indexed Metrics */}
                      {[
                        { label: 'NRR', value: selectedCompany.nrr, peer: PEER_BENCHMARKS.nrr, unit: '%' },
                        { label: 'Win Rate', value: selectedCompany.winRate, peer: PEER_BENCHMARKS.winRate, unit: '%' },
                        { label: 'Sales Cycle', value: selectedCompany.salesCycle, peer: PEER_BENCHMARKS.salesCycle, unit: 'd', inverse: true },
                        { label: 'LTV/CAC', value: (selectedCompany.ltv / selectedCompany.cac).toFixed(1), peer: (PEER_BENCHMARKS.ltv / PEER_BENCHMARKS.cac).toFixed(1), unit: 'x', isRatio: true }
                      ].map((metric, idx) => {
                        const indexed = metric.isRatio 
                          ? ((parseFloat(metric.value) - parseFloat(metric.peer)) * 10).toFixed(0)
                          : metric.inverse 
                            ? getIndexedScore(metric.value, metric.peer, true)
                            : getIndexedScore(metric.value, metric.peer);
                        const status = getMetricStatus(parseFloat(indexed), { red: -15, yellow: 0 });
                        const statusColor = { red: colors.red, yellow: colors.yellow, green: colors.green }[status];
                        const barWidth = Math.min(Math.abs(indexed), 50);
                        const isNegative = parseFloat(indexed) < 0;
                        
                        return (
                          <div key={idx} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <span style={{ fontSize: '11px', color: '#6b7280' }}>{metric.label}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '10px', color: '#9ca3af' }}>{metric.value}{metric.unit} vs {metric.peer}{metric.unit}</span>
                                <span style={{ 
                                  width: '8px', 
                                  height: '8px', 
                                  borderRadius: '50%', 
                                  backgroundColor: statusColor 
                                }} />
                              </div>
                            </div>
                            <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', position: 'relative' }}>
                              <div style={{ 
                                position: 'absolute',
                                left: '50%',
                                top: 0,
                                bottom: 0,
                                width: '2px',
                                backgroundColor: '#9ca3af'
                              }} />
                              <div style={{ 
                                position: 'absolute',
                                [isNegative ? 'right' : 'left']: '50%',
                                top: 0,
                                height: '100%',
                                width: `${barWidth}%`,
                                backgroundColor: statusColor,
                                borderRadius: isNegative ? '4px 0 0 4px' : '0 4px 4px 0',
                                transition: 'width 0.3s ease'
                              }} />
                            </div>
                            <div style={{ fontSize: '10px', fontWeight: 600, color: statusColor, textAlign: 'center', marginTop: '2px' }}>
                              {isNegative ? '' : '+'}{indexed}
                            </div>
                          </div>
                        );
                      })}

                      {/* Improvement Opportunities */}
                      {selectedCompany.topOpportunities && selectedCompany.topOpportunities.length > 0 && (
                        <div style={{ marginTop: '20px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '12px' }}>Quantified Opportunities</div>
                          {selectedCompany.topOpportunities.slice(0, 3).map((opp, idx) => (
                            <div key={idx} style={{ 
                              padding: '10px', 
                              backgroundColor: '#f8fafc', 
                              borderRadius: '6px',
                              marginBottom: '8px',
                              borderLeft: `3px solid ${colors.coral}`
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: 600, color: colors.darkNavy }}>{opp.dimension}</div>
                                  <div style={{ fontSize: '10px', color: '#6b7280' }}>{opp.metric}: {opp.impact}</div>
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: colors.green }}>+{formatCurrency(opp.arrImpact)}</div>
                              </div>
                            </div>
                          ))}
                          <div style={{ 
                            marginTop: '12px', 
                            padding: '12px', 
                            backgroundColor: colors.cream, 
                            borderRadius: '8px',
                            textAlign: 'center'
                          }}>
                            <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>RW Estimated Upside Potential</div>
                            <div style={{ fontSize: '20px', fontWeight: 700, color: colors.coral }}>{formatCurrency(selectedCompany.estimatedUpside)}</div>
                            <div style={{ fontSize: '10px', color: '#6b7280' }}>{((selectedCompany.estimatedUpside / selectedCompany.arr) * 100).toFixed(0)}% of current ARR</div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                <div style={{ padding: '0 20px 20px' }}>
                  {/* Board Slide button for underperformers with data */}
                  {selectedCompany.status === 'underperformer' && selectedCompany.topOpportunities?.length > 0 && (
                    <button 
                      onClick={() => setShowBoardSlide(selectedCompany)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '8px',
                        backgroundColor: '#f3f4f6',
                        color: colors.darkNavy,
                        border: `1px solid ${colors.lightBlue}`,
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      📊 View Board Slide
                    </button>
                  )}
                  
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
                <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '12px' }}>Hover over dimension names to see scoring components</div>
                
                <ScoreBar score={dimAverages.valueArticulation} label="Value Articulation" showTooltip={true} />
                <ScoreBar score={dimAverages.pricingArchitecture} label="Pricing Architecture" showTooltip={true} />
                <ScoreBar score={dimAverages.competitivePositioning} label="Competitive Positioning" showTooltip={true} />
                <ScoreBar score={dimAverages.salesEnablement} label="Sales Enablement" showTooltip={true} />
                <ScoreBar score={dimAverages.customerROI} label="Customer ROI Proof" showTooltip={true} />
                
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
      
      {/* Board Slide Modal */}
      {showBoardSlide && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowBoardSlide(null)}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            width: '900px',
            maxWidth: '95%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }} onClick={e => e.stopPropagation()}>
            {/* Board Slide Header */}
            <div style={{ 
              padding: '24px 32px', 
              borderBottom: `3px solid ${colors.coral}`,
              backgroundColor: colors.navy 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>{showBoardSlide.name}</div>
                  <div style={{ fontSize: '13px', color: colors.lightBlue, marginTop: '4px' }}>{showBoardSlide.sector} • {showBoardSlide.stage} • ARR: {formatCurrency(showBoardSlide.arr)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: colors.lightBlue, marginBottom: '4px' }}>Commercial Health Score</div>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: colors.coral }}>{showBoardSlide.healthScore.toFixed(1)}</div>
                </div>
              </div>
              
              {/* Status Summary */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                {(() => {
                  const metrics = [
                    { value: showBoardSlide.nrr, peer: PEER_BENCHMARKS.nrr },
                    { value: showBoardSlide.winRate, peer: PEER_BENCHMARKS.winRate },
                    { value: showBoardSlide.salesCycle, peer: PEER_BENCHMARKS.salesCycle, inverse: true },
                    { value: showBoardSlide.ltv / showBoardSlide.cac, peer: PEER_BENCHMARKS.ltv / PEER_BENCHMARKS.cac, isRatio: true }
                  ];
                  const counts = { red: 0, yellow: 0, green: 0 };
                  metrics.forEach(m => {
                    const idx = m.isRatio 
                      ? (m.value - m.peer) * 10
                      : m.inverse 
                        ? m.peer - m.value
                        : ((m.value - m.peer) / m.peer) * 100;
                    counts[getMetricStatus(idx, { red: -15, yellow: 0 })]++;
                  });
                  return (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: colors.red }} />
                        <span style={{ fontSize: '13px', color: '#fff' }}>{counts.red} Critical</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: colors.yellow }} />
                        <span style={{ fontSize: '13px', color: '#fff' }}>{counts.yellow} Attention</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: colors.green }} />
                        <span style={{ fontSize: '13px', color: '#fff' }}>{counts.green} On Track</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
            
            {/* Board Slide Content */}
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {/* Left: Indexed Performance Chart */}
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy, marginBottom: '20px' }}>Performance vs. Peer Benchmark</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '16px' }}>Index deviation from peer median (0 = benchmark)</div>
                  
                  {[
                    { label: 'Net Revenue Retention', value: showBoardSlide.nrr, peer: PEER_BENCHMARKS.nrr, unit: '%' },
                    { label: 'Win Rate', value: showBoardSlide.winRate, peer: PEER_BENCHMARKS.winRate, unit: '%' },
                    { label: 'Sales Cycle', value: showBoardSlide.salesCycle, peer: PEER_BENCHMARKS.salesCycle, unit: ' days', inverse: true },
                    { label: 'LTV/CAC Ratio', value: (showBoardSlide.ltv / showBoardSlide.cac).toFixed(1), peer: (PEER_BENCHMARKS.ltv / PEER_BENCHMARKS.cac).toFixed(1), unit: 'x', isRatio: true }
                  ].map((metric, idx) => {
                    const indexed = metric.isRatio 
                      ? ((parseFloat(metric.value) - parseFloat(metric.peer)) * 10).toFixed(0)
                      : metric.inverse 
                        ? Math.round(metric.peer - metric.value)
                        : Math.round(((metric.value - metric.peer) / metric.peer) * 100);
                    const status = getMetricStatus(parseFloat(indexed), { red: -15, yellow: 0 });
                    const statusColor = { red: colors.red, yellow: colors.yellow, green: colors.green }[status];
                    const barWidth = Math.min(Math.abs(indexed), 40);
                    const isNegative = parseFloat(indexed) < 0;
                    
                    return (
                      <div key={idx} style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: statusColor }} />
                            <span style={{ fontSize: '13px', fontWeight: 500, color: colors.darkNavy }}>{metric.label}</span>
                          </div>
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>{metric.value}{metric.unit}</span>
                        </div>
                        <div style={{ height: '24px', backgroundColor: '#f3f4f6', borderRadius: '4px', position: 'relative' }}>
                          <div style={{ 
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 0,
                            width: '2px',
                            backgroundColor: '#9ca3af'
                          }} />
                          <div style={{ 
                            position: 'absolute',
                            [isNegative ? 'right' : 'left']: '50%',
                            top: '4px',
                            height: '16px',
                            width: `${barWidth}%`,
                            backgroundColor: statusColor,
                            borderRadius: '2px',
                            transition: 'width 0.3s ease'
                          }} />
                          <div style={{ 
                            position: 'absolute',
                            left: isNegative ? `${50 - barWidth - 5}%` : `${50 + barWidth + 2}%`,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '12px', 
                            fontWeight: 700, 
                            color: statusColor
                          }}>
                            {isNegative ? '' : '+'}{indexed}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Right: Priority Actions */}
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: colors.darkNavy, marginBottom: '20px' }}>Priority Actions</div>
                  
                  {showBoardSlide.topOpportunities?.slice(0, 3).map((opp, idx) => (
                    <div key={idx} style={{ 
                      padding: '16px', 
                      backgroundColor: '#f8fafc', 
                      borderRadius: '8px',
                      marginBottom: '12px',
                      borderLeft: `4px solid ${idx === 0 ? colors.coral : colors.lightBlue}`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: colors.darkNavy }}>{opp.dimension}</div>
                          <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>Expected: {opp.metric} {opp.impact}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: colors.green }}>+{formatCurrency(opp.arrImpact)}</div>
                          <div style={{ fontSize: '10px', color: '#6b7280' }}>ARR impact</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Total Opportunity */}
                  <div style={{ 
                    marginTop: '20px',
                    padding: '20px', 
                    backgroundColor: colors.cream, 
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>RW Estimated Upside Potential</div>
                    <div style={{ fontSize: '32px', fontWeight: 700, color: colors.coral }}>{formatCurrency(showBoardSlide.estimatedUpside)}</div>
                    <div style={{ fontSize: '13px', color: colors.darkNavy, marginTop: '4px' }}>
                      {((showBoardSlide.estimatedUpside / showBoardSlide.arr) * 100).toFixed(0)}% of current ARR
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div style={{ 
                marginTop: '24px', 
                paddingTop: '16px', 
                borderTop: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                  Remidi Works | Commercial Health Intelligence | Confidential
                </div>
                <button
                  onClick={() => setShowBoardSlide(null)}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: colors.navy,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
