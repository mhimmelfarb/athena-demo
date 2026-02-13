import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

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
  darkGray: '#374151',
  mediumGray: '#4b5563'
};

// Universe benchmark baseline
const UNIVERSE_AVG = 5.8;
const UNIVERSE_TOP_QUARTILE = 7.2;

// Dimension benchmarks for top quartile
const DIMENSION_TOP_QUARTILE = {
  valueArticulation: 8.1,
  buyerTrust: 8.0,
  differentiation: 7.8,
  buyerEnablement: 7.5,
  socialProof: 7.9
};

// Peer fund benchmarks
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

// Helper: format currency
const formatCurrency = (num) => num >= 1000000 ? `$${(num / 1000000).toFixed(1)}M` : `$${(num / 1000).toFixed(0)}K`;

// Helper: get current date formatted
const getCurrentDate = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  return `${months[now.getMonth()]} ${now.getFullYear()}`;
};

// Default portfolio data
const defaultPortfolioData = [
  { 
    id: 1, name: 'CloudSync Pro', sector: 'DevOps/Infrastructure', stage: 'Series B', 
    healthScore: 7.8, relativeScore: 2.0,
    valueArticulation: 8.2, buyerTrust: 7.5, differentiation: 7.9, buyerEnablement: 6.8, socialProof: 8.5,
    status: 'outperformer', invested: 2022,
    arr: 18500000, estimatedUpside: 925000, priority: 'low',
    topGaps: [],
    topOpportunities: []
  },
  { 
    id: 2, name: 'DataForge AI', sector: 'AI/ML Platform', stage: 'Series A', 
    healthScore: 5.4, relativeScore: -0.4,
    valueArticulation: 4.8, buyerTrust: 5.2, differentiation: 6.1, buyerEnablement: 4.5, socialProof: 6.4,
    status: 'underperformer', invested: 2023,
    arr: 8200000, estimatedUpside: 1850000, priority: 'high',
    topGaps: [
      { dimension: 'Buyer Enablement', score: 4.5, issue: 'No ROI calculator or quantified proof points on website' },
      { dimension: 'Value Articulation', score: 4.8, issue: 'Features described but customer outcomes not quantified' }
    ],
    topOpportunities: [
      { dimension: 'Buyer Enablement', currentScore: 4.5, targetScore: 6.5, metric: 'Win Rate', impact: '+6%', arrImpact: 492000 }
    ]
  },
  { 
    id: 3, name: 'SecureVault', sector: 'Cybersecurity', stage: 'Series C', 
    healthScore: 8.1, relativeScore: 2.3,
    valueArticulation: 8.5, buyerTrust: 8.0, differentiation: 8.3, buyerEnablement: 7.8, socialProof: 7.9,
    status: 'outperformer', invested: 2021,
    arr: 32000000, estimatedUpside: 640000, priority: 'low',
    topGaps: [],
    topOpportunities: []
  },
  { 
    id: 4, name: 'FleetOps', sector: 'Logistics Tech', stage: 'Series A', 
    healthScore: 4.2, relativeScore: -1.6,
    valueArticulation: 3.5, buyerTrust: 4.8, differentiation: 4.9, buyerEnablement: 3.2, socialProof: 4.6,
    status: 'underperformer', invested: 2023,
    arr: 6800000, estimatedUpside: 2380000, priority: 'critical',
    portfolioRank: 10,
    topGaps: [
      { dimension: 'Buyer Enablement', score: 3.2, issue: 'No published pricing, no case studies with quantified ROI' },
      { dimension: 'Value Articulation', score: 3.5, issue: 'Operational stats shown but no connection to customer P&L impact' },
      { dimension: 'Social Proof', score: 4.6, issue: 'Claims savings but no calculator or specific customer evidence' }
    ],
    topOpportunities: [
      { dimension: 'Buyer Enablement', currentScore: 3.2, targetScore: 6.0, metric: 'Win Rate', impact: '+9%', arrImpact: 856000 },
      { dimension: 'Value Articulation', currentScore: 3.5, targetScore: 6.0, metric: 'Sales Cycle', impact: '-28 days', arrImpact: 680000 },
      { dimension: 'Social Proof', currentScore: 4.6, targetScore: 6.5, metric: 'NRR', impact: '+8%', arrImpact: 544000 }
    ],
    // Diagnostic data
    diagnosticData: {
      commercialMaturityScore: 3.9,
      benchmarkGap: 2.3,
      dimensions: [
        {
          name: 'Value Articulation',
          score: 3.2,
          previousScore: 3.5,
          tier: 'T1',
          priority: 'High',
          peerScore: 5.2,
          topQuartile: 7.1
        },
        {
          name: 'Differentiation',
          score: 4.9,
          tier: 'T2',
          priority: 'Medium',
          peerScore: 5.5,
          topQuartile: 7.8
        },
        {
          name: 'Buyer Enablement',
          score: 2.8,
          previousScore: 3.2,
          tier: 'T1',
          priority: 'High',
          peerScore: 5.8,
          topQuartile: 7.5
        }
      ],
      criticalFinding: {
        title: 'Critical Finding',
        description: 'Your case studies score 2/10 on the CFO-Ready Index™. For $100-200K deals with CFO sign-off, benchmark is 7+.',
        impact: 'This gap is likely costing 15-25% of winnable deals.',
        source: 'Deal Velocity Analysis'
      },
      priorities: [
        {
          id: 1,
          title: 'Case Study Strategy',
          description: 'Transform operational stats → CFO-ready ROI proof using HGP Proof Point Protocol™',
          estimatedWinRate: '+20-30% win rate',
          confidence: 'Highest confidence (T1 data) + No dependencies + Largest revenue impact',
          priority: 'CRITICAL'
        },
        {
          id: 2,
          title: 'Pricing Clarity',
          description: 'Publish pricing or ROI calculator showing fleet cost savings',
          confidence: 'Medium confidence (T2 data) + Depends on value articulation work',
          priority: 'HIGH'
        },
        {
          id: 3,
          title: 'Value Articulation',
          description: 'Connect route efficiency to customer P&L impact',
          confidence: 'Lower priority: Addressed as part of case study project',
          priority: 'MEDIUM'
        }
      ],
      projectedImprovement: {
        currentScore: 2.8,
        afterProject: 6.5,
        benchmark: 7.0
      },
      expertInsight: {
        quote: '"Your \'route optimization\' claims could translate to $200k+ annual savings for mid-size fleets. That\'s a story that closes deals — if you quantify it."'
      }
    }
  },
  { 
    id: 5, name: 'TalentMatch', sector: 'HR Tech', stage: 'Series B', 
    healthScore: 6.3, relativeScore: 0.5,
    valueArticulation: 6.8, buyerTrust: 5.5, differentiation: 6.2, buyerEnablement: 6.5, socialProof: 6.5,
    status: 'on-track', invested: 2022,
    arr: 12400000, estimatedUpside: 1116000, priority: 'medium',
    topGaps: [
      { dimension: 'Buyer Trust', score: 5.5, issue: 'Pricing structure unclear for different team sizes' }
    ],
    topOpportunities: [
      { dimension: 'Buyer Trust', currentScore: 5.5, targetScore: 7.0, metric: 'Conversion Rate', impact: '+4%', arrImpact: 496000 }
    ]
  },
  { 
    id: 6, name: 'SupplyCore', sector: 'Supply Chain', stage: 'Series B', 
    healthScore: 5.9, relativeScore: 0.1,
    valueArticulation: 6.1, buyerTrust: 5.8, differentiation: 5.7, buyerEnablement: 5.9, socialProof: 6.0,
    status: 'on-track', invested: 2022,
    arr: 14600000, estimatedUpside: 1314000, priority: 'medium',
    topGaps: [
      { dimension: 'Differentiation', score: 5.7, issue: 'Competitive claims not backed with evidence' }
    ],
    topOpportunities: [
      { dimension: 'Differentiation', currentScore: 5.7, targetScore: 7.2, metric: 'Win Rate', impact: '+5%', arrImpact: 730000 }
    ]
  },
  {
    id: 7, name: 'FinEdge', sector: 'FinTech', stage: 'Series A',
    healthScore: 5.2, relativeScore: -0.6,
    valueArticulation: 5.4, buyerTrust: 4.9, differentiation: 5.3, buyerEnablement: 5.0, socialProof: 5.4,
    status: 'underperformer', invested: 2023,
    arr: 7500000, estimatedUpside: 1650000, priority: 'high',
    topGaps: [
      { dimension: 'Buyer Trust', score: 4.9, issue: 'Pricing page lacks transparency and value metrics' }
    ],
    topOpportunities: [
      { dimension: 'Buyer Trust', currentScore: 4.9, targetScore: 6.8, metric: 'Qualified Leads', impact: '+12%', arrImpact: 900000 }
    ]
  },
  {
    id: 8, name: 'HealthStream', sector: 'HealthTech', stage: 'Series B',
    healthScore: 6.8, relativeScore: 1.0,
    valueArticulation: 7.1, buyerTrust: 6.4, differentiation: 6.9, buyerEnablement: 6.5, socialProof: 7.1,
    status: 'on-track', invested: 2021,
    arr: 21000000, estimatedUpside: 945000, priority: 'low',
    topGaps: [],
    topOpportunities: []
  },
  {
    id: 9, name: 'EduTech Pro', sector: 'EdTech', stage: 'Series A',
    healthScore: 5.6, relativeScore: -0.2,
    valueArticulation: 5.9, buyerTrust: 5.1, differentiation: 5.8, buyerEnablement: 5.3, socialProof: 5.9,
    status: 'underperformer', invested: 2023,
    arr: 9200000, estimatedUpside: 1472000, priority: 'medium',
    topGaps: [
      { dimension: 'Buyer Trust', score: 5.1, issue: 'No clear pricing tiers for different institution sizes' }
    ],
    topOpportunities: [
      { dimension: 'Buyer Trust', currentScore: 5.1, targetScore: 6.9, metric: 'Sales Cycle', impact: '-15 days', arrImpact: 552000 }
    ]
  },
  {
    id: 10, name: 'PropTech Solutions', sector: 'Real Estate Tech', stage: 'Series C',
    healthScore: 7.5, relativeScore: 1.7,
    valueArticulation: 7.8, buyerTrust: 7.2, differentiation: 7.6, buyerEnablement: 7.1, socialProof: 7.8,
    status: 'outperformer', invested: 2020,
    arr: 28000000, estimatedUpside: 700000, priority: 'low',
    topGaps: [],
    topOpportunities: []
  }
];

// Mini gauge component
const MiniGauge = ({ score, size = 48 }) => {
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;
  
  const getColor = () => {
    if (score >= 7) return colors.green;
    if (score >= 5.5) return colors.yellow;
    return colors.red;
  };
  
  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="4"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={getColor()}
        strokeWidth="4"
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

// Score bar component
const ScoreBar = ({ score, label, compact = false, showTooltip = false }) => {
  const getColor = (s) => {
    if (s >= 7) return colors.green;
    if (s >= 5.5) return colors.yellow;
    return colors.red;
  };
  
  return (
    <div style={{ marginBottom: compact ? '6px' : '10px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ 
          fontSize: compact ? '12px' : '14px', 
          color: colors.mediumGray,
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
    </div>
  );
};

// Status badge component
const StatusBadge = ({ status }) => {
  const configs = {
    'outperformer': { bg: '#dcfce7', text: '#166534', label: 'OUTPERFORMER' },
    'on-track': { bg: '#e0f2fe', text: '#0369a1', label: 'ON TRACK' },
    'underperformer': { bg: '#fee2e2', text: '#991b1b', label: 'UNDERPERFORMER' }
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

// Priority indicator
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

// Company Diagnostic View Component
const CompanyDiagnostic = ({ company, onBack }) => {
  const diagnostic = company.diagnosticData;
  
  if (!diagnostic) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Diagnostic data not available for this company.</p>
        <button onClick={onBack} style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: colors.navy,
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f0f9ff', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#fff', padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy, margin: 0 }}>
            {company.name}
          </h2>
          <p style={{ fontSize: '14px', color: colors.mediumGray, margin: '4px 0 0 0' }}>
            {company.sector} • {company.stage}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Top Section: Commercial Maturity Score */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
          <div></div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: colors.mediumGray, marginBottom: '4px' }}>
              Commercial Maturity Score™
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '48px', fontWeight: 700, color: colors.coral }}>
                {diagnostic.commercialMaturityScore}
              </span>
              <span style={{ fontSize: '24px', color: colors.mediumGray }}>/10</span>
              <span style={{ fontSize: '20px', color: colors.red, marginLeft: '8px' }}>↓</span>
            </div>
            <div style={{ fontSize: '13px', color: colors.mediumGray, marginTop: '4px' }}>
              Gap to benchmark: {diagnostic.benchmarkGap} points
            </div>
          </div>
        </div>

        {/* Dimension Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {diagnostic.dimensions.map((dim, idx) => {
            const tierColors = {
              'T1': { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
              'T2': { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' }
            };
            const tierColor = tierColors[dim.tier] || tierColors['T2'];
            
            return (
              <div key={idx} style={{
                backgroundColor: tierColor.bg,
                border: `2px solid ${tierColor.border}`,
                borderRadius: '12px',
                padding: '16px'
              }}>
                <div style={{ fontSize: '12px', color: colors.mediumGray, marginBottom: '8px' }}>
                  {dim.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 700, color: colors.red }}>
                    {dim.score}
                  </span>
                  <span style={{ fontSize: '18px', color: colors.mediumGray }}>/10</span>
                  {dim.previousScore && (
                    <span style={{ fontSize: '14px', color: colors.red }}>
                      ↓ from {dim.previousScore}
                    </span>
                  )}
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', color: colors.mediumGray, marginBottom: '4px' }}>
                    Peer: {dim.peerScore} | Top 25%: {dim.topQuartile}
                  </div>
                  <div style={{ fontSize: '11px', color: tierColor.text }}>
                    ▶ See confidence basis
                  </div>
                </div>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  backgroundColor: tierColor.text,
                  color: '#fff',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 600
                }}>
                  {dim.tier} • {dim.priority}
                </div>
              </div>
            );
          })}
        </div>

        {/* Critical Finding */}
        <div style={{
          backgroundColor: '#fef2f2',
          border: `3px solid ${colors.red}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🔴</span>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.red, margin: 0 }}>
                {diagnostic.criticalFinding.title}
              </h3>
            </div>
            <div style={{ fontSize: '11px', color: colors.mediumGray }}>
              ™ {diagnostic.criticalFinding.source}
            </div>
          </div>
          <p style={{ fontSize: '14px', color: colors.darkGray, marginBottom: '8px', lineHeight: 1.6 }}>
            {diagnostic.criticalFinding.description}
          </p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: colors.red, margin: 0 }}>
            <strong>Estimated impact:</strong> {diagnostic.criticalFinding.impact}
          </p>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
          {/* Left: Priority Ranking */}
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: colors.darkNavy, margin: 0 }}>
                Priority Ranking
              </h3>
              <div style={{ fontSize: '11px', color: colors.mediumGray }}>
                ™ HGP Priority Algorithm
              </div>
            </div>

            {diagnostic.priorities.map((priority, idx) => {
              const priorityColors = {
                'CRITICAL': { bg: '#fef2f2', border: '#991b1b', icon: '🔴' },
                'HIGH': { bg: '#fef3c7', border: '#92400e', icon: '🟡' },
                'MEDIUM': { bg: '#f3f4f6', border: '#6b7280', icon: '⚪' }
              };
              const pColor = priorityColors[priority.priority] || priorityColors['MEDIUM'];
              
              return (
                <div key={idx} style={{
                  backgroundColor: pColor.bg,
                  border: `2px solid ${pColor.border}`,
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{pColor.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 700, color: colors.darkNavy, margin: 0 }}>
                          {idx + 1}. {priority.title}
                        </h4>
                        {priority.priority === 'CRITICAL' && (
                          <span style={{
                            backgroundColor: colors.red,
                            color: '#fff',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 600
                          }}>
                            CRITICAL
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '13px', color: colors.darkGray, marginBottom: '10px', lineHeight: 1.5 }}>
                        {priority.description}
                      </p>
                      {priority.estimatedWinRate && (
                        <div style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          color: colors.darkGray,
                          marginBottom: '8px'
                        }}>
                          Est. {priority.estimatedWinRate}
                        </div>
                      )}
                      <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: colors.mediumGray,
                        lineHeight: 1.5
                      }}>
                        <span style={{ fontWeight: 600 }}>✓ Why #{idx + 1}:</span> {priority.confidence}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Projected Improvement + Expert Insight */}
          <div>
            {/* Projected Improvement */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '20px' }}>📈</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, margin: 0 }}>
                  Projected Improvement
                </h3>
              </div>
              
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: colors.mediumGray, marginBottom: '4px' }}>
                  Current Score
                </div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: colors.red }}>
                  {diagnostic.projectedImprovement.currentScore}/10
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: colors.mediumGray, marginBottom: '4px' }}>
                  After Case Study Project
                </div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: colors.green }}>
                  {diagnostic.projectedImprovement.afterProject}/10
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', color: colors.mediumGray, marginBottom: '4px' }}>
                  Segment Benchmark
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: colors.mediumGray }}>
                  {diagnostic.projectedImprovement.benchmark}/10
                </div>
              </div>
            </div>

            {/* Expert Insight */}
            <div style={{
              backgroundColor: '#e0f2fe',
              border: `2px solid ${colors.lightBlue}`,
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px' }}>💡</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, margin: 0 }}>
                  Expert Insight
                </h3>
              </div>
              <p style={{ fontSize: '14px', color: colors.darkGray, fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                {diagnostic.expertInsight.quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Portfolio Company Card Component (for right panel)
const PortfolioCompanyCard = ({ company, onClick, onClose }) => {
  return (
    <div 
      style={{ 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          color: '#9ca3af',
          cursor: 'pointer',
          padding: '4px',
          lineHeight: 1,
          zIndex: 10
        }}
        onMouseEnter={(e) => e.target.style.color = colors.darkNavy}
        onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
      >
        ×
      </button>

      <div 
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.95';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        <div style={{ marginBottom: '18px', paddingBottom: '18px', borderBottom: '2px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: colors.darkNavy, margin: '0 0 8px 0' }}>
            {company.name}
          </h3>
        <div style={{ fontSize: '14px', color: colors.mediumGray, marginBottom: '10px' }}>
          {company.sector} • {company.stage}
        </div>
        <StatusBadge status={company.status} />
      </div>

      {/* Key Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '12px', 
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: colors.mediumGray, marginBottom: '4px', textTransform: 'uppercase' }}>
            Health
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.darkNavy }}>
            {company.healthScore.toFixed(1)}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: colors.mediumGray, marginBottom: '4px', textTransform: 'uppercase' }}>
            VS Universe
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.red }}>
            {company.relativeScore.toFixed(1)}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: colors.mediumGray, marginBottom: '4px', textTransform: 'uppercase' }}>
            Portfolio
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: colors.mediumGray }}>
            #{company.portfolioRank || '-'}
          </div>
        </div>
      </div>

      {/* Tab Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '20px',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '12px'
      }}>
        <button style={{
          flex: 1,
          padding: '8px 12px',
          backgroundColor: colors.navy,
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          Health Dimensions
        </button>
        <button style={{
          flex: 1,
          padding: '8px 12px',
          backgroundColor: 'transparent',
          color: colors.mediumGray,
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          vs. Peer Benchmarks
        </button>
      </div>

      {/* Revenue Model Health Dimensions */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ 
          fontSize: '14px', 
          fontWeight: 700, 
          color: colors.darkNavy, 
          marginBottom: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Revenue Model Health Dimensions
        </h4>
        
        <ScoreBar score={company.valueArticulation} label="Value Articulation" compact={true} />
        <ScoreBar score={company.buyerTrust} label="Pricing Architecture" compact={true} />
        <ScoreBar score={company.differentiation} label="Competitive Positioning" compact={true} />
        <ScoreBar score={company.buyerEnablement} label="Sales Enablement" compact={true} />
        <ScoreBar score={company.socialProof} label="Customer ROI Proof" compact={true} />
      </div>

      {/* Primary Gap */}
      <div style={{
        backgroundColor: '#fef3c7',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#92400e' }}>
          Primary Gap: {company.topGaps && company.topGaps.length > 0 ? 
            company.topGaps[0].dimension : 'Sales Enablement'}
        </div>
      </div>

      </div>

      {/* Action Buttons */}
      <a 
        href="/fleetops-board-slide.html"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '10px',
          backgroundColor: '#fff',
          color: colors.navy,
          border: `2px solid ${colors.navy}`,
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          textDecoration: 'none',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = colors.navy;
          e.target.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#fff';
          e.target.style.color = colors.navy;
        }}
      >
        <span>📊</span> View Board Slide
      </a>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: colors.coral,
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#d85a3d'}
        onMouseLeave={(e) => e.target.style.backgroundColor = colors.coral}
      >
        Improve Your Performance →
      </button>
    </div>
  );
};

// Main Dashboard Component
export default function InvestorPortfolioDashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [hoveredCompany, setHoveredCompany] = useState(null);
  const [portfolioData, setPortfolioData] = useState(defaultPortfolioData);
  const [fundMeta, setFundMeta] = useState(defaultMeta);
  const [loading, setLoading] = useState(false);
  
  // Check for company parameter
  const companyParam = searchParams.get('company');
  const viewingCompany = portfolioData.find(c => 
    c.name.toLowerCase().replace(/\s+/g, '') === companyParam?.toLowerCase()
  );
  
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
  
  // If viewing a company diagnostic, render that view
  if (viewingCompany) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}>
        {/* Header with Breadcrumb */}
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
            
            {/* Breadcrumb */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              fontSize: '14px',
              color: colors.lightBlue
            }}>
              <button
                onClick={() => navigate('/investor')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.lightBlue,
                  cursor: 'pointer',
                  fontSize: '14px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(152, 193, 217, 0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Dashboard
              </button>
              <span>›</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{viewingCompany.name}</span>
            </div>
          </div>
        </header>

        <CompanyDiagnostic 
          company={viewingCompany} 
          onBack={() => navigate('/investor')}
        />
      </div>
    );
  }
  
  // Current fund data
  const currentFund = { ...peerFunds[0], name: fundMeta.fundName };
  
  // Calculate portfolio aggregates
  const avgHealth = portfolioData.reduce((sum, c) => sum + c.healthScore, 0) / portfolioData.length;
  const avgRelative = avgHealth - UNIVERSE_AVG;
  const totalUpside = portfolioData.reduce((sum, c) => sum + (c.estimatedUpside || 0), 0);
  const underperformers = portfolioData.filter(c => c.status === 'underperformer').sort((a, b) => (b.estimatedUpside || 0) - (a.estimatedUpside || 0));
  const priorityCompanies = portfolioData.filter(c => c.priority === 'critical' || c.priority === 'high').length;
  
  // Calculate dimension averages
  const dimAverages = {
    valueArticulation: portfolioData.reduce((sum, c) => sum + c.valueArticulation, 0) / portfolioData.length,
    buyerTrust: portfolioData.reduce((sum, c) => sum + c.buyerTrust, 0) / portfolioData.length,
    differentiation: portfolioData.reduce((sum, c) => sum + c.differentiation, 0) / portfolioData.length,
    buyerEnablement: portfolioData.reduce((sum, c) => sum + c.buyerEnablement, 0) / portfolioData.length,
    socialProof: portfolioData.reduce((sum, c) => sum + c.socialProof, 0) / portfolioData.length
  };
  
  // Calculate dimension upside
  const calculateDimensionUpside = (dimName) => {
    const avgScore = dimAverages[dimName];
    const topQuartile = DIMENSION_TOP_QUARTILE[dimName];
    if (avgScore >= topQuartile) return 0;
    const gap = topQuartile - avgScore;
    const totalARR = portfolioData.reduce((sum, c) => sum + (c.arr || 0), 0);
    return gap * 0.04 * totalARR;
  };
  
  // Get priority focus company
  const priorityFocus = underperformers[0] || null;
  
  // Sort companies by upside potential
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
        {/* Key Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {/* Portfolio GTM Health */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '12px', color: colors.mediumGray, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
              Portfolio GTM Health
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <MiniGauge score={avgHealth} size={72} />
              <div>
                <div style={{ fontSize: '36px', fontWeight: 800, color: colors.darkNavy, lineHeight: 1 }}>
                  {avgHealth.toFixed(1)}
                </div>
                <div style={{ fontSize: '14px', color: colors.green, fontWeight: 600, marginTop: '4px' }}>
                  +{avgRelative.toFixed(1)} vs universe
                </div>
              </div>
            </div>
          </div>

          {/* Total Portfolio Upside */}
          <div style={{ 
            backgroundColor: colors.cream, 
            borderRadius: '12px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            borderLeft: `4px solid ${colors.coral}`
          }}>
            <div style={{ fontSize: '12px', color: colors.mediumGray, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
              Total Portfolio Upside
            </div>
            <div style={{ fontSize: '48px', fontWeight: 800, color: colors.coral, lineHeight: 1, marginBottom: '6px' }}>
              {formatCurrency(totalUpside)}
            </div>
            <div style={{ fontSize: '13px', color: colors.mediumGray, fontWeight: 500 }}>
              Estimated ARR opportunity
            </div>
          </div>

          {/* Need Attention */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '12px', color: colors.mediumGray, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
              Need Attention
            </div>
            <div style={{ fontSize: '56px', fontWeight: 800, color: colors.darkNavy, lineHeight: 1, marginBottom: '6px' }}>
              {priorityCompanies}
            </div>
            <div style={{ fontSize: '13px', color: colors.mediumGray, fontWeight: 500 }}>
              {priorityCompanies} underperformers
            </div>
          </div>

          {/* Next Action */}
          {priorityFocus && (
            <div style={{ 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              border: `2px solid ${colors.coral}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <span style={{ fontSize: '16px' }}>🎯</span>
                <div style={{ fontSize: '12px', color: colors.coral, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
                  Next Action
                </div>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: colors.darkNavy, marginBottom: '6px' }}>
                Review {priorityFocus.name}
              </div>
              <div style={{ fontSize: '12px', color: colors.mediumGray, marginBottom: '8px', lineHeight: 1.4 }}>
                No published pricing, no case studies with quantified ROI
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: colors.coral }}>
                {formatCurrency(priorityFocus.estimatedUpside || 0)}
              </div>
              <div style={{ fontSize: '11px', color: colors.mediumGray, fontWeight: 600 }}>
                at risk
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
          {/* Left Column - Portfolio Table */}
          <div style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            overflow: 'hidden'
          }}>
            {/* Tabs */}
            <div style={{ 
              display: 'flex', 
              gap: '0',
              borderBottom: '2px solid #e5e7eb',
              padding: '0 24px'
            }}>
              <button
                onClick={() => setActiveTab('portfolio')}
                style={{
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: 'transparent',
                  color: activeTab === 'portfolio' ? colors.navy : colors.mediumGray,
                  border: 'none',
                  borderBottom: activeTab === 'portfolio' ? `3px solid ${colors.navy}` : '3px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-2px',
                  transition: 'all 0.2s'
                }}
              >
                Portfolio View
              </button>
              <button
                onClick={() => setActiveTab('benchmark')}
                style={{
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: 'transparent',
                  color: activeTab === 'benchmark' ? colors.navy : colors.mediumGray,
                  border: 'none',
                  borderBottom: activeTab === 'benchmark' ? `3px solid ${colors.navy}` : '3px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-2px',
                  transition: 'all 0.2s'
                }}
              >
                Peer Benchmarks
              </button>
            </div>

            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '13px', color: colors.mediumGray, fontWeight: 500 }}>
                    {portfolioData.length} companies • Sorted by upside potential
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{
                      padding: '8px 14px',
                      fontSize: '12px',
                      backgroundColor: '#fff',
                      color: colors.navy,
                      border: `2px solid ${colors.navy}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onClick={() => alert('Board report download coming soon')}
                    >
                      <span>📊</span> Download Report
                    </button>
                    <button style={{
                      padding: '8px 14px',
                      fontSize: '12px',
                      backgroundColor: colors.coral,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onClick={() => alert('Scheduling feature coming soon')}
                    >
                      <span>📅</span> Schedule Review
                    </button>
                  </div>
                </div>
                
                {/* Table Header */}
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
                
                {/* Company List */}
                <div>
                  {sortedCompanies.map((company) => {
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
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        {/* Company Name & Status */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 700, color: colors.darkNavy }}>{company.name}</span>
                            <StatusBadge status={company.status} />
                          </div>
                          <div style={{ fontSize: '14px', color: colors.mediumGray, fontWeight: 500 }}>{company.sector}</div>
                          
                          {/* Hover preview of top gaps */}
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
                        
                        {/* vs Universe */}
                        <div style={{ textAlign: 'center' }}>
                          <RelativeScore score={company.relativeScore} showContext={true} />
                        </div>
                        
                        {/* Priority */}
                        <div style={{ textAlign: 'center' }}>
                          <PriorityIndicator priority={company.priority} />
                        </div>
                        
                        {/* $ Upside */}
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
                    {peerFunds.map((fund, idx) => {
                      const percentage = (fund.avgHealth / 10) * 100;
                      const isCurrentFund = fund.name === currentFund.name;
                      
                      return (
                        <div key={idx} style={{ 
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
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column */}
          <div>
            {/* Dimension Insights Card */}
            {!selectedCompany && (
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
                      <ScoreBar score={value} label={label} showTooltip={false} />
                      
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
            )}
            
            {/* Selected Company Card */}
            {selectedCompany && (
              <PortfolioCompanyCard 
                company={selectedCompany}
                onClick={() => {
                  const companySlug = selectedCompany.name.toLowerCase().replace(/\s+/g, '');
                  navigate(`/investor?company=${companySlug}`);
                }}
                onClose={() => setSelectedCompany(null)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
