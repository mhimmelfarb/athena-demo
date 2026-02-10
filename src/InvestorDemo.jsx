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
  green: '#2D936C',
  // Darker grays for better readability
  darkGray: '#374151',
  mediumGray: '#4b5563'
};

// Universe benchmark baseline (from our 100-company database)
const UNIVERSE_AVG = 5.8;
const UNIVERSE_TOP_QUARTILE = 7.2;
const UNIVERSE_BOTTOM_QUARTILE = 4.5;

// Dimension benchmarks for top quartile
const DIMENSION_TOP_QUARTILE = {
  valueArticulation: 8.1,
  buyerTrust: 8.0,
  differentiation: 7.8,
  buyerEnablement: 7.5,
  socialProof: 7.9
};

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

// Helper: get current date formatted
const getCurrentDate = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  return `${months[now.getMonth()]} ${now.getFullYear()}`;
};

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
    valueArticulation: 8.2, buyerTrust: 7.5, differentiation: 7.9, buyerEnablement: 6.8, socialProof: 8.5,
    status: 'outperformer', invested: 2022,
    arr: 18500000, nrr: 112, grr: 94, winRate: 32, salesCycle: 45, cac: 28000, ltv: 168000,
    estimatedUpside: 925000, priority: 'low',
    topGaps: [],
    topOpportunities: []
  },
  { 
    id: 2, name: 'DataForge AI', sector: 'AI/ML Platform', stage: 'Series A', 
    healthScore: 5.4, relativeScore: -0.4,
    valueArticulation: 4.8, buyerTrust: 5.2, differentiation: 6.1, buyerEnablement: 4.5, socialProof: 6.4,
    status: 'underperformer', invested: 2023,
    arr: 8200000, nrr: 98, grr: 88, winRate: 18, salesCycle: 78, cac: 42000, ltv: 118000,
    estimatedUpside: 1850000, priority: 'high',
    topGaps: [
      { dimension: 'Buyer Enablement', score: 4.5, issue: 'No ROI calculator or quantified proof points on website' },
      { dimension: 'Value Articulation', score: 4.8, issue: 'Features described but customer outcomes not quantified' },
      { dimension: 'Buyer Trust', score: 5.2, issue: 'Flat per-seat pricing doesn\'t scale with value delivered' }
    ],
    topOpportunities: [
      { dimension: 'Buyer Enablement', currentScore: 4.5, targetScore: 6.5, metric: 'Win Rate', impact: '+6%', arrImpact: 492000 },
      { dimension: 'Value Articulation', currentScore: 4.8, targetScore: 6.5, metric: 'Sales Cycle', impact: '-18 days', arrImpact: 410000 }
    ]
  },
  { 
    id: 3, name: 'SecureVault', sector: 'Cybersecurity', stage: 'Series C', 
    healthScore: 8.1, relativeScore: 2.3,
    valueArticulation: 8.5, buyerTrust: 8.0, differentiation: 8.3, buyerEnablement: 7.8, socialProof: 7.9,
    status: 'outperformer', invested: 2021,
    arr: 32000000, nrr: 118, grr: 96, winRate: 35, salesCycle: 38, cac: 26000, ltv: 195000,
    estimatedUpside: 640000, priority: 'low',
    topGaps: [],
    topOpportunities: []
  },
  { 
    id: 4, name: 'FleetOps', sector: 'Logistics Tech', stage: 'Series A', 
    healthScore: 4.2, relativeScore: -1.6,
    valueArticulation: 3.5, buyerTrust: 4.8, differentiation: 4.9, buyerEnablement: 3.2, socialProof: 4.6,
    status: 'underperformer', invested: 2023,
    arr: 6800000, nrr: 91, grr: 82, winRate: 14, salesCycle: 92, cac: 48000, ltv: 96000,
    estimatedUpside: 2380000, priority: 'critical',
    topGaps: [
      { dimension: 'Buyer Enablement', score: 3.2, issue: 'No published pricing, no case studies with quantified ROI' },
      { dimension: 'Value Articulation', score: 3.5, issue: 'Operational stats shown but no connection to customer P&L impact' },
      { dimension: 'Social Proof', score: 4.6, issue: 'Claims savings but no calculator or specific customer evidence' }
    ],
    topOpportunities: [
      { dimension: 'Buyer Enablement', currentScore: 3.2, targetScore: 6.0, metric: 'Win Rate', impact: '+9%', arrImpact: 856000 },
      { dimension: 'Value Articulation', currentScore: 3.5, targetScore: 6.0, metric: 'Sales Cycle', impact: '-28 days', arrImpact: 680000 },
      { dimension: 'Social Proof', currentScore: 4.6, targetScore: 6.5, metric: 'NRR', impact: '+8%', arrImpact: 544000 }
    ]
  },
  { 
    id: 5, name: 'TalentMatch', sector: 'HR Tech', stage: 'Series B', 
    healthScore: 6.3, relativeScore: 0.5,
    valueArticulation: 6.8, buyerTrust: 5.5, differentiation: 6.2, buyerEnablement: 6.5, socialProof: 6.5,
    status: 'on-track', invested: 2022,
    arr: 12400000, nrr: 104, grr: 90, winRate: 24, salesCycle: 58, cac: 35000, ltv: 140000,
    estimatedUpside: 1116000, priority: 'medium',
    topGaps: [
      { dimension: 'Buyer Trust', score: 5.5, issue: 'Pricing structure unclear for different team sizes' }
    ],
    topOpportunities: [
      { dimension: 'Buyer Trust', currentScore: 5.5, targetScore: 7.0, metric: 'NRR', impact: '+5%', arrImpact: 620000 }
    ]
  },
  { 
    id: 6, name: 'PayStream', sector: 'FinTech', stage: 'Series B', 
    healthScore: 7.2, relativeScore: 1.4,
    valueArticulation: 7.5, buyerTrust: 7.8, differentiation: 6.8, buyerEnablement: 7.0, socialProof: 6.9,
    status: 'outperformer', invested: 2021,
    arr: 21000000, nrr: 110, grr: 93, winRate: 30, salesCycle: 48, cac: 30000, ltv: 162000,
    estimatedUpside: 840000, priority: 'low',
    topGaps: [],
    topOpportunities: []
  },
  { 
    id: 7, name: 'HealthBridge', sector: 'HealthTech', stage: 'Series A', 
    healthScore: 5.1, relativeScore: -0.7,
    valueArticulation: 5.5, buyerTrust: 4.2, differentiation: 5.8, buyerEnablement: 4.8, socialProof: 5.2,
    status: 'underperformer', invested: 2024,
    arr: 5200000, nrr: 96, grr: 85, winRate: 19, salesCycle: 72, cac: 38000, ltv: 108000,
    estimatedUpside: 1196000, priority: 'high',
    topGaps: [
      { dimension: 'Buyer Trust', score: 4.2, issue: 'Single flat-rate tier regardless of practice size or usage' },
      { dimension: 'Buyer Enablement', score: 4.8, issue: 'Limited competitive positioning materials visible' },
      { dimension: 'Social Proof', score: 5.2, issue: 'Testimonials but no quantified outcomes' }
    ],
    topOpportunities: [
      { dimension: 'Buyer Trust', currentScore: 4.2, targetScore: 6.5, metric: 'NRR', impact: '+6%', arrImpact: 468000 },
      { dimension: 'Buyer Enablement', currentScore: 4.8, targetScore: 6.5, metric: 'Win Rate', impact: '+5%', arrImpact: 390000 }
    ]
  },
  { 
    id: 8, name: 'RetailIQ', sector: 'Retail Analytics', stage: 'Series B', 
    healthScore: 6.8, relativeScore: 1.0,
    valueArticulation: 7.2, buyerTrust: 6.5, differentiation: 6.9, buyerEnablement: 6.2, socialProof: 7.2,
    status: 'on-track', invested: 2022,
    arr: 15600000, nrr: 106, grr: 91, winRate: 26, salesCycle: 55, cac: 33000, ltv: 152000,
    estimatedUpside: 780000, priority: 'medium',
    topGaps: [],
    topOpportunities: []
  },
  { 
    id: 9, name: 'SupplyCore', sector: 'Supply Chain', stage: 'Series B', 
    healthScore: 5.5, relativeScore: -0.3,
    valueArticulation: 5.2, buyerTrust: 6.8, differentiation: 5.5, buyerEnablement: 4.8, socialProof: 5.2,
    status: 'underperformer', invested: 2021,
    arr: 11800000, nrr: 100, grr: 88, winRate: 21, salesCycle: 68, cac: 40000, ltv: 125000,
    estimatedUpside: 1534000, priority: 'high',
    topGaps: [
      { dimension: 'Buyer Enablement', score: 4.8, issue: 'No visible battle cards or competitive differentiation content' },
      { dimension: 'Value Articulation', score: 5.2, issue: 'Generic efficiency claims without segment-specific proof' },
      { dimension: 'Social Proof', score: 5.2, issue: 'Case studies lack specific financial outcomes' }
    ],
    topOpportunities: [
      { dimension: 'Buyer Enablement', currentScore: 4.8, targetScore: 6.5, metric: 'Win Rate', impact: '+5%', arrImpact: 590000 },
      { dimension: 'Value Articulation', currentScore: 5.2, targetScore: 6.5, metric: 'Sales Cycle', impact: '-12 days', arrImpact: 472000 }
    ]
  },
  { 
    id: 10, name: 'MarketPulse', sector: 'MarTech', stage: 'Series A', 
    healthScore: 6.5, relativeScore: 0.7,
    valueArticulation: 6.9, buyerTrust: 6.2, differentiation: 6.8, buyerEnablement: 5.8, socialProof: 6.8,
    status: 'on-track', invested: 2023,
    arr: 9700000, nrr: 103, grr: 89, winRate: 25, salesCycle: 60, cac: 36000, ltv: 138000,
    estimatedUpside: 873000, priority: 'medium',
    topGaps: [],
    topOpportunities: []
  }
];

// Mini gauge component (semicircle)
const MiniGauge = ({ score, size = 56 }) => {
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
    <svg width={size} height={size / 2 + 12} viewBox={`0 0 ${size} ${size / 2 + 12}`}>
      <path
        d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d={`M 4 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 4} ${size / 2}`}
        fill="none"
        stroke={getColor(score)}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      <text
        x={size / 2}
        y={size / 2 + 6}
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={colors.darkNavy}
      >
        {score.toFixed(1)}
      </text>
    </svg>
  );
};

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
  'Buyer Trust': {
    description: 'Clarity and structure of pricing model',
    components: [
      'Pricing Transparency',
      'Value-Based Model Signals',
      'No Hidden Fees',
      'Clear Inclusions',
      'Low Commitment Entry Options'
    ]
  },
  'Differentiation': {
    description: 'Whether competitive claims are proven with evidence',
    components: [
      'Differentiation Claims',
      'Evidence Provided',
      'Competitive Awareness',
      'G2/Capterra Positioning'
    ]
  },
  'Buyer Enablement': {
    description: 'Information completeness for buyer self-qualification',
    components: [
      'ICP/Persona Clarity',
      'Product Description',
      'Try Before Buy',
      'Demo/Trial Access',
      'Decision-Making Information'
    ]
  },
  'Social Proof': {
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

// Score bar component with hover tooltip
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ 
          fontSize: compact ? '12px' : '14px', 
          color: colors.mediumGray,
          cursor: showTooltip ? 'help' : 'default',
          borderBottom: showTooltip ? '1px dotted #9ca3af' : 'none',
          fontWeight: 500
        }}>{label}</span>
        <span style={{ fontSize: compact ? '13px' : '15px', fontWeight: 700, color: colors.darkNavy }}>{score.toFixed(1)}</span>
      </div>
      <div style={{ height: compact ? '6px' : '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${score * 10}%`, 
            backgroundColor: getColor(score),
            borderRadius: '4px',
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

// Relative score display with context
const RelativeScore = ({ score, showContext = false }) => {
  const isPositive = score >= 0;
  const color = score >= 1.0 ? colors.green : score >= 0 ? colors.navy : score >= -0.5 ? colors.yellow : colors.red;
  
  let context = '';
  if (showContext) {
    if (score >= 2.0) context = 'Top 10%';
    else if (score >= 1.0) context = 'Top Quartile';
    else if (score >= 0) context = 'Above Avg';
    else if (score >= -0.5) context = 'Below Avg';
    else context = 'Bottom Quartile';
  }
  
  return (
    <div style={{ textAlign: 'center' }}>
      <span style={{ 
        fontSize: '14px', 
        fontWeight: 700, 
        color,
        fontFamily: 'monospace'
      }}>
        {isPositive ? '+' : ''}{score.toFixed(1)}
      </span>
      {showContext && (
        <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '2px' }}>
          {context}
        </div>
      )}
    </div>
  );
};

// Priority indicator with emoji
const PriorityIndicator = ({ priority }) => {
  const configs = {
    critical: { emoji: '🔴', bg: '#fef2f2', color: '#991b1b', label: 'Critical' },
    high: { emoji: '🟡', bg: '#fef3c7', color: '#92400e', label: 'High' },
    medium: { emoji: '🟢', bg: '#e0f2fe', color: '#0369a1', label: 'Medium' },
    low: { emoji: '⚪', bg: '#f0fdf4', color: '#166534', label: 'Low' }
  };
  const config = configs[priority] || configs.medium;
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '3px 8px',
      fontSize: '10px',
      fontWeight: 600,
      borderRadius: '4px',
      backgroundColor: config.bg,
      color: config.color
    }}>
      <span>{config.emoji}</span>
      <span>{config.label}</span>
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
  const [activeTab, setActiveTab] = useState('portfolio');
  const [hoveredCompany, setHoveredCompany] = useState(null);
  
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
  const totalUpside = portfolioData.reduce((sum, c) => sum + (c.estimatedUpside || 0), 0);
  const underperformers = portfolioData.filter(c => c.status === 'underperformer').sort((a, b) => (b.estimatedUpside || 0) - (a.estimatedUpside || 0));
  const outperformers = portfolioData.filter(c => c.status === 'outperformer');
  const priorityCompanies = portfolioData.filter(c => c.priority === 'critical' || c.priority === 'high').length;
  
  // Calculate dimension averages and gaps to top quartile
  const dimAverages = {
    valueArticulation: portfolioData.reduce((sum, c) => sum + c.valueArticulation, 0) / portfolioData.length,
    buyerTrust: portfolioData.reduce((sum, c) => sum + c.buyerTrust, 0) / portfolioData.length,
    differentiation: portfolioData.reduce((sum, c) => sum + c.differentiation, 0) / portfolioData.length,
    buyerEnablement: portfolioData.reduce((sum, c) => sum + c.buyerEnablement, 0) / portfolioData.length,
    socialProof: portfolioData.reduce((sum, c) => sum + c.socialProof, 0) / portfolioData.length
  };
  
  // Calculate estimated portfolio-wide upside for each dimension
  const calculateDimensionUpside = (dimName) => {
    const avgScore = dimAverages[dimName];
    const topQuartile = DIMENSION_TOP_QUARTILE[dimName];
    if (avgScore >= topQuartile) return 0;
    
    // Rough estimate: assume 3-5% ARR improvement per point of dimension improvement
    const gap = topQuartile - avgScore;
    const totalARR = portfolioData.reduce((sum, c) => sum + (c.arr || 0), 0);
    return gap * 0.04 * totalARR; // 4% per point on average
  };
  
  // Get priority focus company (highest upside underperformer)
  const priorityFocus = underperformers[0] || null;
  
  // Sort companies by upside potential (default view)
  const sortedCompanies = [...portfolioData].sort((a, b) => (b.estimatedUpside || 0) - (a.estimatedUpside || 0));

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: colors.navy, 
        padding: '20px 24px',
        borderBottom: `4px solid ${colors.coral}`
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                fontSize: '11px'
              }}>RW</span>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Remidi Works</span>
            </Link>
            
            <div style={{ color: '#fff', fontSize: '14px' }}>
              <span style={{ opacity: 0.8 }}>Fund:</span> <span style={{ fontWeight: 600, marginLeft: '6px' }}>{fundMeta.fundName}</span>
            </div>
          </div>
          
          {/* PROMINENT REPORT TITLE */}
          <div style={{ marginTop: '16px' }}>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: 800, 
              color: '#fff', 
              margin: 0,
              letterSpacing: '-0.5px',
              lineHeight: 1.2
            }}>
              GTM Strategy Report
            </h1>
            <div style={{ fontSize: '14px', color: colors.lightBlue, marginTop: '6px', fontWeight: 500 }}>
              {fundMeta.fundType} Portfolio Assessment • {getCurrentDate()}
            </div>
          </div>
        </div>
      </header>
      
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Key Metrics Cards - BIGGER NUMBERS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          
          {/* Card 1: Portfolio GTM Health - BIGGER */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '12px', color: colors.mediumGray, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px', fontWeight: 600 }}>
              Portfolio GTM Health
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <MiniGauge score={avgHealth} size={80} />
              <div>
                <div style={{ fontSize: '36px', fontWeight: 800, color: colors.darkNavy, lineHeight: 1 }}>
                  {avgHealth.toFixed(1)}
                </div>
                <div style={{ fontSize: '13px', color: avgRelative >= 0 ? colors.green : colors.coral, fontWeight: 700, marginTop: '6px' }}>
                  {avgRelative >= 0 ? '+' : ''}{avgRelative.toFixed(1)} vs universe
                </div>
              </div>
            </div>
          </div>
          
          {/* Card 2: Portfolio Upside - HUGE NUMBERS */}
          <div style={{ 
            backgroundColor: colors.cream, 
            borderRadius: '12px', 
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            borderLeft: `5px solid ${colors.coral}`
          }}>
            <div style={{ fontSize: '12px', color: colors.mediumGray, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px', fontWeight: 600 }}>
              Total Portfolio Upside
            </div>
            <div style={{ fontSize: '44px', fontWeight: 800, color: colors.coral, marginBottom: '6px', lineHeight: 1 }}>
              {formatCurrency(totalUpside)}
            </div>
            <div style={{ fontSize: '13px', color: colors.mediumGray, fontWeight: 500 }}>
              Estimated ARR opportunity
            </div>
          </div>
          
          {/* Card 3: Priority Companies - BIGGER */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '12px', color: colors.mediumGray, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px', fontWeight: 600 }}>
              Need Attention
            </div>
            <div style={{ fontSize: '44px', fontWeight: 800, color: colors.darkNavy, marginBottom: '6px', lineHeight: 1 }}>
              {priorityCompanies}
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: colors.mediumGray, fontWeight: 500 }}>
              <span>{underperformers.length} underperformers</span>
            </div>
          </div>
          
          {/* Card 4: Next Action - UPGRADED WITH URGENCY */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            padding: '24px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            cursor: priorityFocus ? 'pointer' : 'default',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            border: priorityFocus ? `2px solid ${colors.coral}` : '2px solid transparent'
          }}
          onClick={() => priorityFocus && setSelectedCompany(priorityFocus)}
          onMouseEnter={(e) => {
            if (priorityFocus) {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
            }
          }}
          onMouseLeave={(e) => {
            if (priorityFocus) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.08)';
            }
          }}
          >
            <div style={{ fontSize: '12px', color: colors.mediumGray, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px' }}>🎯</span> Next Action
            </div>
            {priorityFocus ? (
              <>
                <div style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px', lineHeight: 1.3 }}>
                  Review {priorityFocus.name}
                </div>
                <div style={{ fontSize: '12px', color: colors.mediumGray, lineHeight: 1.5, marginBottom: '10px', fontWeight: 500 }}>
                  {priorityFocus.topGaps[0]?.issue || 'Multiple GTM gaps'}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: colors.red, lineHeight: 1 }}>
                  {formatCurrency(priorityFocus.estimatedUpside)}
                </div>
                <div style={{ fontSize: '12px', color: colors.red, fontWeight: 600, marginTop: '4px' }}>
                  at risk
                </div>
              </>
            ) : (
              <div style={{ fontSize: '16px', color: colors.green, fontWeight: 700, paddingTop: '20px' }}>
                All companies on track ✓
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
            {/* Tabs - CONSOLIDATED */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
              <button
                onClick={() => setActiveTab('portfolio')}
                style={{
                  padding: '18px 28px',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: activeTab === 'portfolio' ? colors.navy : colors.mediumGray,
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'portfolio' ? `3px solid ${colors.coral}` : '3px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-2px',
                  transition: 'color 0.15s ease'
                }}
              >
                Portfolio View
              </button>
              <button
                onClick={() => setActiveTab('benchmark')}
                style={{
                  padding: '18px 28px',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: activeTab === 'benchmark' ? colors.navy : colors.mediumGray,
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'benchmark' ? `3px solid ${colors.coral}` : '3px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-2px',
                  transition: 'color 0.15s ease'
                }}
              >
                Peer Benchmarks
              </button>
              <button
                onClick={() => setActiveTab('diligence')}
                style={{
                  padding: '18px 28px',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: activeTab === 'diligence' ? colors.navy : colors.mediumGray,
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'diligence' ? `3px solid ${colors.coral}` : '3px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-2px',
                  transition: 'color 0.15s ease'
                }}
              >
                🔍 Diligence Mode
              </button>
            </div>
            
            {/* PORTFOLIO VIEW TAB - Merged Enhanced View */}
            {activeTab === 'portfolio' && (
              <div>
                {/* Header with action CTAs - BIGGER BUTTONS */}
                <div style={{ 
                  padding: '16px 24px', 
                  backgroundColor: '#f9fafb', 
                  borderBottom: '2px solid #e5e7eb', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <div style={{ fontSize: '14px', color: colors.mediumGray, fontWeight: 500 }}>
                    {portfolioData.length} companies • Sorted by upside potential
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{
                      padding: '10px 16px',
                      fontSize: '13px',
                      backgroundColor: '#fff',
                      color: colors.navy,
                      border: `2px solid ${colors.navy}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 700,
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = colors.navy;
                      e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#fff';
                      e.target.style.color = colors.navy;
                    }}
                    onClick={() => alert('Board report download coming soon')}
                    >
                      <span>📊</span> Download Report
                    </button>
                    <button style={{
                      padding: '10px 16px',
                      fontSize: '13px',
                      backgroundColor: colors.coral,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 700,
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#d85a3d';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = colors.coral;
                    }}
                    onClick={() => alert('Scheduling feature coming soon')}
                    >
                      <span>📅</span> Schedule Review
                    </button>
                  </div>
                </div>
                
                {/* Table Header - BIGGER AND BOLDER */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '2fr 100px 100px 110px 140px', 
                  padding: '16px 24px',
                  backgroundColor: '#f9fafb',
                  borderBottom: '2px solid #e5e7eb',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: colors.darkNavy,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <div>Company</div>
                  <div style={{ textAlign: 'center' }}>GTM Health</div>
                  <div style={{ textAlign: 'center' }}>vs Univ</div>
                  <div style={{ textAlign: 'center' }}>Priority</div>
                  <div style={{ textAlign: 'right' }}>$ Upside</div>
                </div>
                
                {/* Company List - BIGGER TEXT, MORE SPACING */}
                <div>
                  {sortedCompanies.map((company, idx) => {
                    const isHovered = hoveredCompany === company.id;
                    const isSelected = selectedCompany?.id === company.id;
                    
                    return (
                      <div 
                        key={company.id}
                        onClick={() => setSelectedCompany(company)}
                        onMouseEnter={() => setHoveredCompany(company.id)}
                        onMouseLeave={() => setHoveredCompany(null)}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 100px 100px 110px 140px',
                          alignItems: 'center',
                          padding: '20px 24px',
                          borderBottom: '2px solid #f3f4f6',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? colors.cream : isHovered ? '#fafbfc' : 'transparent',
                          transition: 'background-color 0.15s ease',
                          position: 'relative'
                        }}
                      >
                        {/* Company Name & Status - MUCH BIGGER */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy }}>{company.name}</span>
                            <StatusBadge status={company.status} />
                          </div>
                          <div style={{ fontSize: '14px', color: colors.mediumGray, fontWeight: 500 }}>{company.sector}</div>
                          
                          {/* Hover preview of top gaps - BIGGER TEXT */}
                          {isHovered && company.topGaps && company.topGaps.length > 0 && (
                            <div style={{
                              marginTop: '10px',
                              padding: '10px 12px',
                              backgroundColor: '#fef2f2',
                              borderRadius: '6px',
                              fontSize: '13px',
                              color: colors.mediumGray,
                              lineHeight: 1.5,
                              fontWeight: 500
                            }}>
                              <div style={{ fontWeight: 700, color: colors.red, marginBottom: '4px' }}>Critical Gap:</div>
                              {company.topGaps[0].issue}
                            </div>
                          )}
                        </div>
                        
                        {/* GTM Health Score */}
                        <div style={{ textAlign: 'center' }}>
                          <MiniGauge score={company.healthScore} size={56} />
                        </div>
                        
                        {/* vs Universe (with context) */}
                        <div style={{ textAlign: 'center' }}>
                          <RelativeScore score={company.relativeScore} showContext={true} />
                        </div>
                        
                        {/* Priority with emoji */}
                        <div style={{ textAlign: 'center' }}>
                          <PriorityIndicator priority={company.priority} />
                        </div>
                        
                        {/* $ Upside - HUGE NUMBERS */}
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ 
                            fontSize: company.estimatedUpside > 1000000 ? '28px' : '24px', 
                            fontWeight: 800, 
                            color: company.estimatedUpside > 1000000 ? colors.coral : colors.darkNavy,
                            lineHeight: 1
                          }}>
                            {formatCurrency(company.estimatedUpside || 0)}
                          </div>
                          {company.arr && (
                            <div style={{ fontSize: '13px', color: colors.mediumGray, marginTop: '6px', fontWeight: 600 }}>
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
            
            {/* PEER BENCHMARKS TAB */}
            {activeTab === 'benchmark' && (
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px' }}>
                    Fund Performance Ranking
                  </h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '20px' }}>
                    Your portfolio compared to {peerFunds.length - 1} peer funds in the data cooperative
                  </p>
                  
                  <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                    {peerFunds.map((fund, idx) => (
                      <FundComparisonBar 
                        key={idx} 
                        fund={fund} 
                        maxHealth={Math.max(...peerFunds.map(f => f.avgHealth))}
                        isCurrentFund={fund.name === currentFund.name}
                      />
                    ))}
                  </div>
                </div>
                
                <div style={{ marginTop: '32px', padding: '16px', backgroundColor: colors.cream, borderRadius: '8px', borderLeft: `4px solid ${colors.coral}` }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: colors.darkNavy, marginBottom: '8px' }}>
                    💡 Data Cooperative Insight
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.6 }}>
                    Funds in the top quartile see 23% faster time-to-exit and 1.8x higher MOIC on average. 
                    The primary differentiator is systematic GTM strategy measurement across portfolio companies.
                  </div>
                </div>
              </div>
            )}
            
            {/* DILIGENCE MODE TAB */}
            {activeTab === 'diligence' && (
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, marginBottom: '8px' }}>
                    Pre-Investment Screening
                  </h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '20px' }}>
                    Assess potential deal flow companies before LOI using only public data
                  </p>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <input 
                      type="text" 
                      placeholder="Enter company website URL (e.g., acme.com)"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        fontSize: '13px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'border-color 0.15s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = colors.coral}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  
                  <button style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    backgroundColor: colors.coral,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#d85a3d'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = colors.coral}
                  onClick={() => alert('Diligence scan feature coming soon')}
                  >
                    Run GTM Health Scan
                  </button>
                </div>
                
                <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    What You'll Get
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '12px', color: '#6b7280', lineHeight: 2 }}>
                    <li>✓ GTM Health Score (0-10)</li>
                    <li>✓ 5-Dimension Breakdown</li>
                    <li>✓ Comparison vs Universe Benchmarks</li>
                    <li>✓ Critical GTM Gaps Identified</li>
                    <li>✓ Estimated Value Creation Potential</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - UPGRADED DIMENSION INSIGHTS */}
          <div>
            {/* Dimension Insights Card - WITH INTELLIGENCE */}
            <div style={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              marginBottom: '16px'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, marginBottom: '6px' }}>
                  Portfolio Dimension Insights
                </h3>
                <p style={{ fontSize: '13px', color: colors.mediumGray, fontWeight: 500 }}>
                  Gaps to top quartile with portfolio upside
                </p>
              </div>
              
              {Object.entries(dimAverages).map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                const topQuartile = DIMENSION_TOP_QUARTILE[key];
                const gap = topQuartile - value;
                const upside = calculateDimensionUpside(key);
                const hasGap = gap > 0.3;
                
                return (
                  <div key={key} style={{ marginBottom: '20px' }}>
                    <ScoreBar score={value} label={label} showTooltip={true} />
                    
                    {hasGap && (
                      <div style={{ 
                        marginTop: '8px', 
                        padding: '12px 14px', 
                        backgroundColor: '#fef3c7', 
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#78350f',
                        lineHeight: 1.5,
                        fontWeight: 500,
                        border: '2px solid #fbbf24'
                      }}>
                        <div style={{ fontWeight: 700, marginBottom: '4px' }}>
                          Gap to top quartile: <span style={{ fontSize: '14px' }}>{gap.toFixed(1)} pts</span>
                        </div>
                        <div style={{ fontWeight: 700, color: colors.coral, fontSize: '15px' }}>
                          Portfolio upside: {formatCurrency(upside)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Selected Company Detail */}
            {selectedCompany && (
              <div style={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px', 
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}>
                <div style={{ marginBottom: '18px', paddingBottom: '18px', borderBottom: '2px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: colors.darkNavy, margin: 0, lineHeight: 1.2 }}>
                      {selectedCompany.name}
                    </h3>
                    <button 
                      onClick={() => setSelectedCompany(null)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        color: '#9ca3af',
                        cursor: 'pointer',
                        padding: '0',
                        lineHeight: 1
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div style={{ fontSize: '14px', color: colors.mediumGray, marginBottom: '10px', fontWeight: 500 }}>
                    {selectedCompany.sector} • {selectedCompany.stage}
                  </div>
                  <StatusBadge status={selectedCompany.status} />
                </div>
                
                {/* Dimension Scores - BIGGER TEXT */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: colors.darkNavy, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    GTM Health Dimensions
                  </div>
                  <ScoreBar score={selectedCompany.valueArticulation} label="Value Articulation" compact={true} />
                  <ScoreBar score={selectedCompany.buyerTrust} label="Buyer Trust" compact={true} />
                  <ScoreBar score={selectedCompany.differentiation} label="Differentiation" compact={true} />
                  <ScoreBar score={selectedCompany.buyerEnablement} label="Buyer Enablement" compact={true} />
                  <ScoreBar score={selectedCompany.socialProof} label="Social Proof" compact={true} />
                </div>
                
                {/* Top Gaps - BIGGER, BOLDER */}
                {selectedCompany.topGaps && selectedCompany.topGaps.length > 0 && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: colors.darkNavy, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Critical GTM Gaps
                    </div>
                    {selectedCompany.topGaps.map((gap, idx) => (
                      <div key={idx} style={{ 
                        marginBottom: '12px', 
                        padding: '14px 16px', 
                        backgroundColor: '#fef2f2', 
                        borderRadius: '8px',
                        borderLeft: `4px solid ${colors.red}`
                      }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: colors.red, marginBottom: '6px' }}>
                          {gap.dimension} ({gap.score.toFixed(1)}/10)
                        </div>
                        <div style={{ fontSize: '14px', color: colors.mediumGray, lineHeight: 1.5, fontWeight: 500 }}>
                          {gap.issue}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Top Opportunities - BIGGER, BOLDER */}
                {selectedCompany.topOpportunities && selectedCompany.topOpportunities.length > 0 && (
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: colors.darkNavy, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Improvement Opportunities
                    </div>
                    {selectedCompany.topOpportunities.map((opp, idx) => (
                      <div key={idx} style={{ 
                        marginBottom: '12px', 
                        padding: '14px 16px', 
                        backgroundColor: '#f0fdf4', 
                        borderRadius: '8px',
                        borderLeft: `4px solid ${colors.green}`
                      }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: colors.green, marginBottom: '6px' }}>
                          {opp.dimension}: {opp.currentScore.toFixed(1)} → {opp.targetScore.toFixed(1)}
                        </div>
                        <div style={{ fontSize: '14px', color: colors.mediumGray, marginBottom: '6px', fontWeight: 500 }}>
                          {opp.metric}: {opp.impact}
                        </div>
                        <div style={{ fontSize: '17px', fontWeight: 800, color: colors.coral }}>
                          +{formatCurrency(opp.arrImpact)} ARR
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Action Button - BIGGER */}
                <button style={{
                  width: '100%',
                  padding: '14px',
                  marginTop: '20px',
                  fontSize: '14px',
                  fontWeight: 700,
                  backgroundColor: colors.navy,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkNavy}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.navy}
                onClick={() => alert(`Deep dive report for ${selectedCompany.name} coming soon`)}
                >
                  Schedule Deep Dive →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
