import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Default company data (FleetOps)
const defaultCompanyData = {
  company: {
    name: "FleetOps",
    industry: "Logistics Tech",
    arr: "$6.8M",
    stage: "Series A"
  },
  situation: {
    headline: "FleetOps is missing pipeline targets.",
    narrative: "The board suspects the root cause isn't sales execution—it's gaps in your revenue model and commercialization fundamentals.",
    context: "You've tasked your CMO and Head of Sales to diagnose the problem and build an action plan."
  },
  scores: {
    initial: {
      valueArticulation: { score: 3.5, status: "critical" },
      differentiation: { score: 4.9, status: "warning" },
      salesEnablement: { score: 3.2, status: "critical" }
    },
    postDiagnostic: {
      valueArticulation: { score: 3.2, status: "critical" },
      differentiation: { score: 4.9, status: "warning" },
      salesEnablement: { score: 2.8, status: "critical" }
    },
    commercialMaturity: { initial: 4.2, postDiagnostic: 3.9, benchmark: 6.2 }
  },
  criticalGap: {
    title: "Critical Gap Detected",
    metric: "2/10",
    metricLabel: "CFO-Ready Index™",
    description: "Your case studies score <strong>2/10</strong> on the CFO-Ready Index™. For $100-200K deals with CFO sign-off, benchmark is 7+. This gap is likely costing <strong>15-25% of winnable deals</strong>."
  },
  aiCoachInsight: "I've analyzed FleetOps' public footprint. Your <strong>Sales Enablement score of 3.2/10</strong> is your biggest blocker. I see operational stats — 'delivery times', 'route efficiency' — but they're not connected to customer P&L impact. <strong>A few quick questions will sharpen this picture.</strong>",
  diagnostic: {
    q1: {
      question: "When you lose deals, is it price confusion, proof points, or something else?",
      answer: "Prospects don't understand our pricing model. And when they ask how much they'll save, we can't give them specific numbers.",
      insight: "→ Confirms Sales Enablement gap (pricing clarity + proof points)"
    },
    q2: {
      question: "How many case studies would you confidently share with a CFO?",
      answer: "Honestly, zero. We have testimonials but nothing with hard ROI numbers.",
      insight: "→ CFO-Ready Index™ score: 2/10 (below threshold for enterprise deals)"
    },
    q3: {
      question: "What's blocking better case studies right now?",
      answer: "No process. Nobody owns it. We know customers are saving money but haven't documented it.",
      insight: "→ Root cause: methodology gap (solvable with Remidi Works)"
    }
  },
  patternDetected: {
    title: "Pattern Detected",
    description: "$150K ACV + CFO sign-off + no quantified proof = deals dying at decision stage",
    source: "Based on analysis of 52 similar logistics tech companies"
  },
  criticalFinding: {
    description: "Your case studies score <strong>2/10 on the CFO-Ready Index™</strong>. For $100-200K deals with CFO sign-off, benchmark is 7+. <strong>Estimated impact:</strong> This gap is likely costing 15-25% of winnable deals."
  },
  priorities: [
    { rank: 1, name: "Case Study Strategy", status: "critical", description: "Transform operational stats → CFO-ready ROI proof using HGP Proof Point Protocol™", impact: "Est. +20-30% win rate" },
    { rank: 2, name: "Pricing Clarity", status: "warning", description: "Publish pricing or ROI calculator showing fleet cost savings" },
    { rank: 3, name: "Value Articulation", status: "critical", description: "Connect route efficiency to customer P&L impact" }
  ],
  expertInsight: "Your 'route optimization' claims could translate to $200K+ annual savings for mid-size fleets. That's a story that closes deals — if you quantify it.",
  projectedImprovement: {
    current: 2.8,
    afterProject: 6.5,
    benchmark: 7.0,
    winRateImprovement: "+15-20%"
  }
};

export default function UserDemo() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [scoresUpdated, setScoresUpdated] = useState(false);
  const [companyData, setCompanyData] = useState(defaultCompanyData);
  const [loading, setLoading] = useState(false);

  // Load custom company data if client param is present
  useEffect(() => {
    const clientParam = searchParams.get('client');
    if (clientParam) {
      setLoading(true);
      fetch(`/data/${clientParam}-company.json`)
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then(data => {
          setCompanyData(data);
          setLoading(false);
        })
        .catch(err => {
          console.log('Using default company data:', err.message);
          setLoading(false);
        });
    }
  }, [searchParams]);

  useEffect(() => {
    setShowTyping(false);
    setQuestionAnswered(false);
    if (step === 3) setTimeout(() => setScoresUpdated(true), 1500);
  }, [step]);

  const handleNext = () => {
    if (step === 2 && !questionAnswered) {
      setShowTyping(true);
      setTimeout(() => { setShowTyping(false); setQuestionAnswered(true); }, 1500);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => { if (step > 0) setStep(step - 1); };

  // HG Partners Brand Colors
  const colors = {
    primary: '#3D5A80',
    primaryDark: '#293241',
    accent: '#EE6C4D',
    accentSoft: '#98C1D9',
    cream: '#E0FBFC',
    textMain: '#0f172a',
    textMuted: '#4b5563',
  };

  const ScoreGauge = ({ label, score, previousScore, status, framework }) => {
    const statusColors = {
      critical: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b' },
      warning: { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
      good: { bg: '#ecfdf5', border: '#a7f3d0', text: '#065f46' },
    };
    const c = statusColors[status] || statusColors.warning;
    return (
      <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: '12px 16px' }}>
        <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 4 }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: c.text }}>{score}</span>
          <span style={{ fontSize: 14, color: colors.textMuted }}>/10</span>
          {previousScore && previousScore !== score && (
            <span style={{ fontSize: 11, color: score > previousScore ? '#059669' : '#dc2626' }}>
              {score > previousScore ? '↑' : '↓'} from {previousScore}
            </span>
          )}
        </div>
        {framework && <div style={{ fontSize: 10, color: colors.primary, marginTop: 4 }}>{framework}</div>}
      </div>
    );
  };

  const ProprietaryBadge = ({ text }) => (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
      background: `${colors.primary}15`, color: colors.primary,
      padding: '4px 10px', borderRadius: 999,
    }}>
      <span style={{ fontSize: 12 }}>™</span> {text}
    </span>
  );

  const steps = [
    // Step 0: The Situation
    {
      title: "The Situation",
      content: (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            borderRadius: 20, padding: 40, marginBottom: 32, color: '#fff', textAlign: 'center',
          }}>
            <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accentSoft, marginBottom: 16 }}>
              The Situation
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
              {companyData.situation.headline}
            </div>
            <div style={{ fontSize: 16, color: '#d1d5db', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
              {companyData.situation.narrative}
            </div>
          </div>

          <div style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 32,
            border: '1px solid #e5e7eb',
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 16, color: colors.textMain, lineHeight: 1.8, marginBottom: 24 }}>
              {companyData.situation.context}
              <strong style={{ color: colors.accent }}> This is what they found.</strong>
            </div>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
              padding: 20, 
              backgroundColor: '#f9fafb', 
              borderRadius: 12 
            }}>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Company</div>
                <div style={{ fontWeight: 600, color: colors.primaryDark }}>{companyData.company.name}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Industry</div>
                <div style={{ fontWeight: 600, color: colors.primaryDark }}>{companyData.company.industry}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>ARR</div>
                <div style={{ fontWeight: 600, color: colors.primaryDark }}>{companyData.company.arr}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Stage</div>
                <div style={{ fontWeight: 600, color: colors.primaryDark }}>{companyData.company.stage}</div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Step 1: Dashboard
    {
      title: "Your Dashboard",
      content: (
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            borderRadius: 16, padding: 24, marginBottom: 24, color: '#fff',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accentSoft, marginBottom: 6 }}>
                  REMIDI WORKS • Case Study Accelerator
                </div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>{companyData.company.name}</div>
                <div style={{ fontSize: 13, color: '#d1d5db' }}>{companyData.company.industry} • {companyData.company.stage}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: colors.accentSoft }}>Commercial Maturity Score™</div>
                <div style={{ fontSize: 36, fontWeight: 800 }}>{companyData.scores.commercialMaturity.initial}<span style={{ fontSize: 18, color: '#9ca3af' }}>/10</span></div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>Segment benchmark: {companyData.scores.commercialMaturity.benchmark}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                <ScoreGauge label="Value Articulation" score={companyData.scores.initial.valueArticulation.score} status={companyData.scores.initial.valueArticulation.status} framework="Nine Value Levers™" />
                <ScoreGauge label="Differentiation" score={companyData.scores.initial.differentiation.score} status={companyData.scores.initial.differentiation.status} framework="Competitive Position Index™" />
                <ScoreGauge label="Sales Enablement" score={companyData.scores.initial.salesEnablement.score} status={companyData.scores.initial.salesEnablement.status} framework="CFO-Ready Index™" />
              </div>

              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 16, padding: 20, marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>🔴</span>
                    <span style={{ fontWeight: 700, color: '#991b1b' }}>{companyData.criticalGap.title}</span>
                  </div>
                  <ProprietaryBadge text={companyData.criticalGap.metricLabel} />
                </div>
                <p style={{ fontSize: 14, color: '#7f1d1d', margin: 0, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: companyData.criticalGap.description }} />
              </div>

              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${colors.accent}, #f97316)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, color: '#fff',
                  }}>RW</div>
                  <div>
                    <div style={{ fontWeight: 600, color: colors.textMain }}>Remidi Works AI Coach</div>
                    <div style={{ fontSize: 11, color: colors.textMuted }}>Based on analysis of 47 B2B SaaS companies</div>
                  </div>
                </div>
                <div style={{ background: colors.cream, borderRadius: 12, padding: 16 }}>
                  <p style={{ fontSize: 14, color: colors.textMain, margin: 0, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: `"${companyData.aiCoachInsight}"` }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 20 }}>
                <div style={{ fontWeight: 600, color: colors.textMain, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>📚</span> Company Knowledge Base
                </div>
                <div style={{ fontSize: 13 }}>
                  {[
                    { label: 'Website analysis', done: true },
                    { label: 'Pricing page review', done: true },
                    { label: 'Case study audit', done: true },
                    { label: 'Competitor benchmark', done: true },
                    { label: 'Your diagnostic input', done: false },
                    { label: 'Customer interviews', done: false },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', color: item.done ? '#059669' : '#9ca3af' }}>
                      <span>{item.done ? '✓' : '○'}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 12, paddingTop: 12, borderTop: '1px solid #e5e7eb' }}>
                  Knowledge accumulates with each project
                </div>
              </div>

              <div style={{
                background: `linear-gradient(135deg, ${colors.accent}, #f97316)`,
                borderRadius: 16, padding: 20, color: '#fff',
              }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Ready to dig deeper?</div>
                <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 16 }}>
                  Answer 3 quick questions to refine your scores and unlock your action plan.
                </div>
                <button
                  onClick={handleNext}
                  style={{
                    width: '100%', padding: '12px 20px', borderRadius: 999,
                    background: '#fff', color: colors.primaryDark,
                    fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer',
                  }}
                >
                  Start Diagnostic →
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Step 2: Quick Diagnostic
    {
      title: "Quick Diagnostic",
      content: (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            background: colors.cream, border: `1px solid ${colors.accentSoft}`,
            borderRadius: 12, padding: 16, marginBottom: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.primary }}>
              <span style={{ fontSize: 20 }}>📋</span>
              <span><strong>Diagnostic Interview</strong> — 3 questions to refine your assessment</span>
            </div>
            <ProprietaryBadge text="HGP Diagnostic Protocol" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 24 }}>
              {/* Q1 */}
              <div style={{ borderLeft: `4px solid ${colors.primary}`, paddingLeft: 16, marginBottom: 24 }}>
                <p style={{ fontWeight: 600, color: colors.textMain, marginBottom: 12 }}>
                  Q1: "{companyData.diagnostic.q1.question}"
                </p>
                <div style={{
                  background: '#f9fafb', borderRadius: 10, padding: 14,
                  border: questionAnswered ? '2px solid #86efac' : '1px solid #e5e7eb',
                }}>
                  <p style={{ fontSize: 14, color: colors.textMuted, margin: 0 }}>
                    {questionAnswered ? 
                      `"${companyData.diagnostic.q1.answer}"` : 
                      'Click Next to answer...'}
                  </p>
                </div>
                {questionAnswered && (
                  <div style={{ marginTop: 8, fontSize: 12, color: colors.primary }}>
                    {companyData.diagnostic.q1.insight}
                  </div>
                )}
              </div>

              {questionAnswered && (
                <>
                  {/* Q2 */}
                  <div style={{ borderLeft: `4px solid ${colors.primary}`, paddingLeft: 16, marginBottom: 24 }}>
                    <p style={{ fontWeight: 600, color: colors.textMain, marginBottom: 12 }}>
                      Q2: "{companyData.diagnostic.q2.question}"
                    </p>
                    <div style={{ background: '#f9fafb', borderRadius: 10, padding: 14, border: '2px solid #86efac' }}>
                      <p style={{ fontSize: 14, color: colors.textMuted, margin: 0 }}>
                        "{companyData.diagnostic.q2.answer}"
                      </p>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: colors.primary }}>
                      {companyData.diagnostic.q2.insight}
                    </div>
                  </div>

                  {/* Q3 */}
                  <div style={{ borderLeft: `4px solid ${colors.primary}`, paddingLeft: 16 }}>
                    <p style={{ fontWeight: 600, color: colors.textMain, marginBottom: 12 }}>
                      Q3: "{companyData.diagnostic.q3.question}"
                    </p>
                    <div style={{ background: '#f9fafb', borderRadius: 10, padding: 14, border: '2px solid #86efac' }}>
                      <p style={{ fontSize: 14, color: colors.textMuted, margin: 0 }}>
                        "{companyData.diagnostic.q3.answer}"
                      </p>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: colors.primary }}>
                      {companyData.diagnostic.q3.insight}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div>
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 20, marginBottom: 16 }}>
                <div style={{ fontWeight: 600, color: colors.textMain, marginBottom: 16 }}>Live Score Updates</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: colors.textMuted }}>Value Articulation</span>
                    <span style={{ fontWeight: 700, color: '#d97706' }}>{companyData.scores.initial.valueArticulation.score}/10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: colors.textMuted }}>Differentiation</span>
                    <span style={{ fontWeight: 700, color: '#d97706' }}>{companyData.scores.initial.differentiation.score}/10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: colors.textMuted }}>Sales Enablement</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontWeight: 700, color: '#dc2626' }}>{questionAnswered ? companyData.scores.postDiagnostic.salesEnablement.score : companyData.scores.initial.salesEnablement.score}/10</span>
                      {questionAnswered && <span style={{ fontSize: 11, color: '#dc2626' }}>↓</span>}
                    </div>
                  </div>
                </div>
              </div>

              {questionAnswered && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 16, padding: 16 }}>
                  <div style={{ fontWeight: 600, color: '#991b1b', marginBottom: 8 }}>🚨 {companyData.patternDetected.title}</div>
                  <p style={{ fontSize: 13, color: '#7f1d1d', margin: 0, lineHeight: 1.5 }}>
                    {companyData.patternDetected.description}
                  </p>
                  <div style={{ fontSize: 11, color: '#991b1b', marginTop: 8 }}>
                    {companyData.patternDetected.source}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },

    // Step 3: Updated Assessment
    {
      title: "Updated Assessment",
      content: (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            background: '#ecfdf5', border: '1px solid #a7f3d0',
            borderRadius: 12, padding: 16, marginBottom: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#065f46' }}>
              <span style={{ fontSize: 20 }}>📊</span>
              <span><strong>Assessment refined</strong> — Scores updated based on diagnostic</span>
            </div>
            <div style={{ fontSize: 12, color: '#059669' }}>Confidence: High (T1 + T2 data)</div>
          </div>

          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: colors.textMain }}>{companyData.company.name}</div>
                <div style={{ fontSize: 13, color: colors.textMuted }}>{companyData.company.industry} • {companyData.company.stage}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: colors.textMuted }}>Commercial Maturity Score™</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#d97706' }}>{scoresUpdated ? companyData.scores.commercialMaturity.postDiagnostic : companyData.scores.commercialMaturity.initial}/10</span>
                  {scoresUpdated && <span style={{ color: '#dc2626' }}>↓</span>}
                </div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>Gap to benchmark: {scoresUpdated ? (companyData.scores.commercialMaturity.benchmark - companyData.scores.commercialMaturity.postDiagnostic).toFixed(1) : (companyData.scores.commercialMaturity.benchmark - companyData.scores.commercialMaturity.initial).toFixed(1)} points</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
              <ScoreGauge label="Value Articulation" score={scoresUpdated ? companyData.scores.postDiagnostic.valueArticulation.score : companyData.scores.initial.valueArticulation.score} previousScore={companyData.scores.initial.valueArticulation.score} status={companyData.scores.postDiagnostic.valueArticulation.status} framework="Nine Value Levers™" />
              <ScoreGauge label="Differentiation" score={companyData.scores.postDiagnostic.differentiation.score} status={companyData.scores.postDiagnostic.differentiation.status} framework="Competitive Position Index™" />
              <ScoreGauge label="Sales Enablement" score={scoresUpdated ? companyData.scores.postDiagnostic.salesEnablement.score : companyData.scores.initial.salesEnablement.score} previousScore={companyData.scores.initial.salesEnablement.score} status={companyData.scores.postDiagnostic.salesEnablement.status} framework="CFO-Ready Index™" />
            </div>

            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, color: '#991b1b' }}>🔴 Critical Finding</span>
                <ProprietaryBadge text="Deal Velocity Analysis" />
              </div>
              <p style={{ fontSize: 14, color: '#7f1d1d', margin: 0, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: companyData.criticalFinding.description }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontWeight: 600, color: colors.textMain }}>Priority Ranking</span>
                <ProprietaryBadge text="HGP Priority Algorithm" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {companyData.priorities.map((priority, idx) => {
                  const statusStyles = {
                    critical: { bg: '#fef2f2', border: '2px solid #fecaca', icon: '🔴', titleColor: '#991b1b', descColor: '#7f1d1d', badge: { bg: '#fecaca', color: '#991b1b' } },
                    warning: { bg: '#fffbeb', border: '1px solid #fde68a', icon: '🟡', titleColor: '#92400e', descColor: '#a16207' },
                    good: { bg: '#f9fafb', border: '1px solid #e5e7eb', icon: '🟢', titleColor: colors.textMuted, descColor: '#9ca3af' }
                  };
                  const style = statusStyles[priority.status] || statusStyles.good;
                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: style.bg, borderRadius: 12, border: style.border }}>
                      <span style={{ fontSize: 24 }}>{style.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: style.titleColor }}>{priority.rank}. {priority.name}</div>
                        <div style={{ fontSize: 13, color: style.descColor }}>{priority.description}</div>
                      </div>
                      {priority.impact && (
                        <div style={{ textAlign: 'right' }}>
                          {priority.status === 'critical' && <span style={{ fontSize: 11, background: style.badge.bg, color: style.badge.color, padding: '4px 8px', borderRadius: 4 }}>CRITICAL</span>}
                          <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 4 }}>{priority.impact}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 20 }}>
                <div style={{ fontWeight: 600, color: colors.textMain, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🎯</span> Projected Improvement
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: colors.textMuted }}>Current Score</span>
                    <span style={{ fontWeight: 700, color: '#dc2626' }}>{companyData.projectedImprovement.current}/10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: colors.textMuted }}>After Case Study Project</span>
                    <span style={{ fontWeight: 700, color: '#059669' }}>{companyData.projectedImprovement.afterProject}/10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: colors.textMuted }}>Segment Benchmark</span>
                    <span style={{ fontWeight: 700, color: colors.textMuted }}>{companyData.projectedImprovement.benchmark}/10</span>
                  </div>
                </div>
              </div>

              <div style={{ background: colors.cream, borderRadius: 16, padding: 16, border: `1px solid ${colors.accentSoft}` }}>
                <div style={{ fontWeight: 600, color: colors.primary, marginBottom: 8 }}>💡 Expert Insight</div>
                <p style={{ fontSize: 13, color: colors.textMain, margin: 0, lineHeight: 1.6 }}>
                  "{companyData.expertInsight}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Step 4: Action Plan
    {
      title: "Your Action Plan",
      content: (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            background: colors.cream, border: `1px solid ${colors.accentSoft}`,
            borderRadius: 12, padding: 16, marginBottom: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.primary }}>
              <span style={{ fontSize: 20 }}>🎯</span>
              <span><strong>Case Study Accelerator</strong> — Your customized project plan</span>
            </div>
            <ProprietaryBadge text="HGP Proof Point Protocol" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: colors.textMain }}>Case Study Strategy & Execution</div>
                  <div style={{ fontSize: 13, color: colors.textMuted }}>4-6 weeks • 8-10 hours of your time</div>
                </div>
                <div style={{ background: '#dcfce7', color: '#166534', padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                  Active Project
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { num: 1, title: 'Audit & Gap Analysis', time: '1-2 hrs', status: 'ready', gate: 'CFO-Ready Index™ scoring' },
                  { num: 2, title: 'Customer Selection', time: '30 min', status: 'locked', gate: 'Candidate Criteria™ filter' },
                  { num: 3, title: 'Story Framework', time: '1 hr', status: 'locked', gate: 'Nine Value Levers™ template' },
                  { num: 4, title: 'Customer Interviews', time: '2-3 hrs', status: 'locked', gate: 'Value Quantification Questions™' },
                  { num: 5, title: 'Draft & Review', time: '1-2 hrs', status: 'locked', gate: 'Expert review checkpoint' },
                  { num: 6, title: 'Scale & Distribute', time: '2-3 hrs', status: 'locked', gate: 'Sales enablement playbook' },
                ].map((s) => (
                  <div key={s.num} style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderRadius: 12,
                    background: s.status === 'ready' ? colors.cream : '#f9fafb',
                    border: s.status === 'ready' ? `2px solid ${colors.primary}` : '1px solid #e5e7eb',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: s.status === 'ready' ? colors.primary : '#d1d5db',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 14,
                    }}>{s.num}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: s.status === 'ready' ? colors.primary : colors.textMuted }}>{s.title}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af' }}>Quality Gate: {s.gate}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, color: colors.textMuted }}>{s.time}</div>
                      {s.status === 'ready' ? (
                        <span style={{
                          display: 'inline-block', marginTop: 4,
                          background: colors.accent, color: '#fff', fontSize: 11, fontWeight: 600,
                          padding: '4px 12px', borderRadius: 999,
                        }}>Start →</span>
                      ) : (
                        <span style={{ fontSize: 16, color: '#d1d5db' }}>🔒</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 20 }}>
                <div style={{ fontWeight: 600, color: colors.textMain, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>📈</span> Projected Impact
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: colors.textMuted }}>Current Score</span>
                    <span style={{ fontWeight: 700, color: '#dc2626' }}>2.5/10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: colors.textMuted }}>After Project</span>
                    <span style={{ fontWeight: 700, color: '#059669' }}>6.5/10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: colors.textMuted }}>Segment Benchmark</span>
                    <span style={{ fontWeight: 700, color: colors.textMuted }}>7.0/10</span>
                  </div>
                </div>
                <div style={{
                  marginTop: 16, padding: 12, borderRadius: 10,
                  background: '#ecfdf5', fontSize: 13, color: '#065f46', textAlign: 'center',
                }}>
                  Est. win rate improvement: <strong>+15-20%</strong>
                </div>
              </div>

              <div style={{
                background: `linear-gradient(135deg, ${colors.primaryDark}, #111827)`,
                borderRadius: 16, padding: 20, color: '#e5e7eb',
              }}>
                <div style={{ fontWeight: 700, marginBottom: 12, color: '#fff' }}>How Remidi Works</div>
                <div style={{ fontSize: 13, lineHeight: 1.7 }}>
                  <p style={{ margin: '0 0 12px 0' }}>
                    <strong style={{ color: '#fff' }}>Work at your pace.</strong> Start a step, save your progress, 
                    come back anytime. Remidi Works picks up where you left off.
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#fff' }}>Quality gates built in.</strong> Each step has clear criteria — 
                    the platform won't let you cut corners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Step 5: Pause & Return
    {
      title: "Work At Your Pace",
      content: (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            borderRadius: 20, padding: 32, color: '#fff', marginBottom: 24, textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, color: colors.accentSoft, marginBottom: 8 }}>THE REMIDI WORKS DIFFERENCE</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Work Stops. Remidi Waits.</div>
            <div style={{ fontSize: 15, color: '#d1d5db', maxWidth: 500, margin: '0 auto' }}>
              Real work takes time. Leave, come back, pick up exactly where you left off.
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{
              background: colors.cream, padding: 16, borderBottom: '1px solid #e5e7eb',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>🔔</span>
                <div>
                  <div style={{ fontWeight: 600, color: colors.textMain }}>Welcome back!</div>
                  <div style={{ fontSize: 12, color: colors.textMuted }}>You left off 3 days ago</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted }}>
                Last active: Dec 9, 2025
              </div>
            </div>

            <div style={{ padding: 32 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: '0.1em', marginBottom: 12 }}>
                    YOUR PROGRESS
                  </div>
                  <div style={{ background: '#f9fafb', borderRadius: 16, padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: colors.primary, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 18,
                      }}>2</div>
                      <div>
                        <div style={{ fontWeight: 600, color: colors.textMain }}>Customer Selection</div>
                        <div style={{ fontSize: 13, color: colors.textMuted }}>60% complete</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ color: '#059669' }}>☑</span> Reviewed customer list criteria
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ color: '#059669' }}>☑</span> Identified 5 potential customers
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: colors.primary }}>☐</span> Rank by segment diversity
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: '0.1em', marginBottom: 12 }}>
                    QUICK ACTIONS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button style={{
                      padding: '16px 20px', borderRadius: 12, border: 'none',
                      background: `linear-gradient(135deg, ${colors.accent}, #f97316)`,
                      color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                      <span>Continue Where I Left Off</span>
                      <span>→</span>
                    </button>
                    <button style={{
                      padding: '16px 20px', borderRadius: 12,
                      border: `1px solid ${colors.primary}`, background: '#fff',
                      color: colors.primary, fontWeight: 600, fontSize: 14, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                      <span>Get AI Coaching on This Step</span>
                      <span>💬</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Step 6: Why Remidi Works
    {
      title: "Why Remidi Works",
      content: (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            borderRadius: 20, padding: 32, color: '#fff', marginBottom: 32, textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>What Makes Remidi Works Different</div>
            <div style={{ fontSize: 16, color: '#d1d5db', maxWidth: 600, margin: '0 auto' }}>
              This isn't ChatGPT with a wrapper. It's 25 years of commercialization expertise 
              encoded into a system that coaches you through execution.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {[
              {
                icon: '🔒', title: 'Proprietary Methodology',
                items: ['CFO-Ready Index™ scoring', 'Nine Value Levers™ framework', 'T1/T2/T3 Confidence Tiers™', 'Commercial Maturity Score™'],
              },
              {
                icon: '📊', title: 'Benchmark Data',
                items: ['47 B2B SaaS companies analyzed', 'Competitor case study database', 'Segment-specific benchmarks', '"What good looks like" examples'],
              },
              {
                icon: '🚦', title: 'Quality Gates',
                items: ['Built-in scoring at each step', 'Can\'t skip until threshold met', 'Expert review checkpoints', 'Methodology enforcement'],
              },
              {
                icon: '📚', title: 'Knowledge Accumulation',
                items: ['Every output feeds knowledge base', 'Future projects build on past work', 'System gets smarter over time', 'ChatGPT starts fresh; Remidi remembers'],
              },
            ].map((card, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 24 }}>{card.icon}</span>
                  <span style={{ fontWeight: 700, color: colors.textMain }}>{card.title}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: colors.textMuted }}>
                  {card.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#059669' }}>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 32, background: colors.cream, borderRadius: 16, padding: 24, textAlign: 'center',
          }}>
            <div style={{ fontSize: 16, color: colors.textMain, lineHeight: 1.7 }}>
              <strong>Could someone do this with ChatGPT?</strong> Technically, yes.
            </div>
            <div style={{ fontSize: 16, color: colors.textMain, lineHeight: 1.7, marginTop: 8 }}>
              Would they know the right sequence? Have the benchmarks? Apply quality gates? 
              Get expert help when stuck? <strong>No.</strong>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.primary, marginTop: 16 }}>
              That's the difference between a tool and a system.
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffffff 0%, #E0FBFC 40%, #98C1D9 100%)',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      padding: '24px 16px',
    }}>
      {/* Header */}
      <div style={{ maxWidth: 1100, margin: '0 auto 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: colors.accent, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 11,
            }}>RW</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: colors.primaryDark }}>Remidi Works</span>
          </div>
          <span style={{ fontSize: 12, color: colors.textMuted }}>Portfolio Company View</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: i === step ? 24 : 10, height: 10, borderRadius: 999,
              background: i === step ? colors.primary : i < step ? colors.accentSoft : '#d1d5db',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>

      {/* Step Title */}
      <div style={{ maxWidth: 1100, margin: '0 auto 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: colors.textMuted, marginBottom: 4 }}>
          STEP {step + 1} OF {steps.length}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: colors.textMain }}>{steps[step].title}</div>
      </div>

      {/* Content */}
      <div style={{ marginBottom: 32 }}>{steps[step].content}</div>

      {/* Navigation */}
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleBack}
          disabled={step === 0}
          style={{
            padding: '12px 24px', borderRadius: 999, border: '1px solid #e5e7eb',
            background: step === 0 ? '#f9fafb' : '#fff',
            color: step === 0 ? '#d1d5db' : colors.textMain,
            fontWeight: 600, fontSize: 14, cursor: step === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Back
        </button>

        {step < steps.length - 1 && (
          <button
            onClick={handleNext}
            disabled={showTyping}
            style={{
              padding: '12px 24px', borderRadius: 999, border: 'none',
              background: showTyping ? '#d1d5db' : `linear-gradient(135deg, ${colors.accent}, #f97316)`,
              color: '#fff', fontWeight: 600, fontSize: 14,
              cursor: showTyping ? 'not-allowed' : 'pointer',
              boxShadow: showTyping ? 'none' : '0 8px 24px rgba(238, 108, 77, 0.4)',
            }}
          >
            {showTyping ? 'Processing...' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}
