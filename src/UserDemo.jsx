import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const colors = {
  primary: '#3D5A80',
  primaryDark: '#293241',
  accent: '#EE6C4D',
  accentSoft: '#98C1D9',
  cream: '#E0FBFC',
  white: '#FFFFFF',
  green: '#2D936C',
  yellow: '#F4A300',
  red: '#C1292E',
};

export default function UserDemo() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({
    valueArticulation: 4.5,
    pricingArchitecture: 5.2,
    competitivePositioning: 4.8,
    salesEnablement: 3.9,
    customerROI: 5.0,
  });

  const typeText = (text, callback) => {
    setTyping(true);
    setDisplayedText('');
    setShowActions(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setTyping(false);
        setTimeout(() => setShowActions(true), 300);
        if (callback) callback();
      }
    }, 15);
  };

  const questions = [
    {
      id: 'q1',
      text: "Looking at your website and public materials, I see you're positioned as a CDP for enterprises. Let me ask: How do your customers typically describe the main problem you solve for them?",
      options: [
        { label: "Data unification and identity resolution", scoreImpact: { valueArticulation: 0.8, customerROI: 0.5 } },
        { label: "Reducing martech stack complexity", scoreImpact: { pricingArchitecture: 0.6, valueArticulation: 0.4 } },
        { label: "Enabling personalized customer experiences", scoreImpact: { competitivePositioning: 0.5, salesEnablement: 0.3 } },
        { label: "We're still refining our positioning", scoreImpact: { valueArticulation: -0.2, salesEnablement: -0.3 } },
      ]
    },
    {
      id: 'q2',
      text: "I noticed your pricing isn't published. When you're in a competitive deal, how do prospects typically react to your pricing versus alternatives like Segment or mParticle?",
      options: [
        { label: "We're usually 30-50% lower and win on value", scoreImpact: { pricingArchitecture: 0.7, competitivePositioning: 0.8 } },
        { label: "Similar pricing but we differentiate on capabilities", scoreImpact: { competitivePositioning: 0.5, salesEnablement: 0.4 } },
        { label: "We often have to discount to win", scoreImpact: { valueArticulation: -0.4, pricingArchitecture: -0.3 } },
        { label: "We rarely go head-to-head with those players", scoreImpact: { competitivePositioning: 0.3, customerROI: 0.2 } },
      ]
    },
    {
      id: 'q3',
      text: "When your sales team is trying to get a deal approved internally at the customer, what tools or evidence do they have to help the champion build a business case?",
      options: [
        { label: "ROI calculator with customer-specific inputs", scoreImpact: { salesEnablement: 1.0, customerROI: 0.8 } },
        { label: "Case studies with quantified results", scoreImpact: { customerROI: 0.6, salesEnablement: 0.5 } },
        { label: "Generic value proposition slides", scoreImpact: { salesEnablement: 0.2, valueArticulation: 0.1 } },
        { label: "We rely on the champion to build the case", scoreImpact: { salesEnablement: -0.5, customerROI: -0.3 } },
      ]
    },
  ];

  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option.label }));
    
    setScores(prev => {
      const newScores = { ...prev };
      Object.entries(option.scoreImpact).forEach(([key, value]) => {
        newScores[key] = Math.min(10, Math.max(0, newScores[key] + value));
      });
      return newScores;
    });

    const currentQuestionIndex = questions.findIndex(q => q.id === questionId);
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        typeText(questions[currentQuestionIndex + 1].text);
      }, 500);
    } else {
      setTimeout(() => setStep(3), 500);
    }
  };

  useEffect(() => {
    if (step === 2) {
      typeText(questions[0].text);
    }
  }, [step]);

  const getScoreColor = (score) => {
    if (score >= 7) return colors.green;
    if (score >= 5) return colors.yellow;
    return colors.red;
  };

  const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;

  const ScoreBadge = ({ label, score, prevScore }) => (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: '16px 20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      border: '1px solid #e5e7eb',
    }}>
      <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 8, fontWeight: 500 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: getScoreColor(score) }}>{score.toFixed(1)}</span>
        {prevScore && score !== prevScore && (
          <span style={{ fontSize: 12, fontWeight: 600, color: score > prevScore ? colors.green : colors.red }}>
            {score > prevScore ? '↑' : '↓'} from {prevScore.toFixed(1)}
          </span>
        )}
      </div>
    </div>
  );

  const FrameworkBadge = ({ text }) => (
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
    // STEP 0: The Situation
    {
      title: "The Situation",
      content: (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            borderRadius: 16, padding: 40, marginBottom: 32, color: '#fff',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accentSoft, marginBottom: 16 }}>
              The Situation
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
              NovaTech is missing pipeline targets.
            </div>
            <div style={{ fontSize: 16, color: '#d1d5db', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
              The board suspects the root cause isn't sales execution—it's gaps in your revenue model and commercialization fundamentals.
            </div>
          </div>

          <div style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 32,
            border: '1px solid #e5e7eb',
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 16, color: colors.primaryDark, lineHeight: 1.8, marginBottom: 24 }}>
              You've tasked your CMO and Head of Sales to diagnose the problem and build an action plan. 
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
                <div style={{ fontWeight: 600, color: colors.primaryDark }}>NovaTech</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Industry</div>
                <div style={{ fontWeight: 600, color: colors.primaryDark }}>Customer Data Platform</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>ARR</div>
                <div style={{ fontWeight: 600, color: colors.primaryDark }}>$12M</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Stage</div>
                <div style={{ fontWeight: 600, color: colors.primaryDark }}>Series B</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(1)}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: `linear-gradient(135deg, ${colors.accent}, #f97316)`,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(238, 108, 77, 0.3)',
            }}
          >
            See the Diagnostic Results →
          </button>
        </div>
      )
    },

    // STEP 1: Dashboard Home
    {
      title: "Your Dashboard",
      content: (
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            borderRadius: 16, padding: 24, marginBottom: 24, color: '#fff',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.accentSoft, marginBottom: 6 }}>
                  REMIDI WORKS • Case Study Accelerator
                </div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>NovaTech</div>
                <div style={{ fontSize: 13, color: '#d1d5db' }}>Customer Data Platform • Series B</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: colors.accentSoft }}>Commercial Maturity Score™</div>
                <div style={{ fontSize: 36, fontWeight: 800 }}>4.7<span style={{ fontSize: 18, color: '#9ca3af' }}>/10</span></div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>Segment benchmark: 6.2</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* Main Content */}
            <div style={{ minWidth: 0 }}>
              {/* Scores */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
                <ScoreBadge label="Value Articulation" score={4.5} />
                <ScoreBadge label="Pricing Architecture" score={5.2} />
                <ScoreBadge label="Competitive Position" score={4.8} />
                <ScoreBadge label="Sales Enablement" score={3.9} />
                <ScoreBadge label="Customer ROI Proof" score={5.0} />
              </div>

              {/* Analysis Source */}
              <div style={{
                backgroundColor: colors.cream,
                borderRadius: 12,
                padding: 16,
                marginBottom: 24,
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.primary, marginBottom: 8 }}>
                  📊 Analysis based on observable data:
                </div>
                <div style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6 }}>
                  Website content, pricing page (not found), G2 reviews (4.5★, 23 reviews), 
                  LinkedIn (127 employees), job postings (3 open sales roles), press releases, 
                  and competitive positioning materials.
                </div>
              </div>

              {/* Key Gaps */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 20,
                border: '1px solid #e5e7eb',
              }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: colors.primaryDark, marginBottom: 16 }}>
                  Preliminary Gaps Identified
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12, backgroundColor: '#fef2f2', borderRadius: 8 }}>
                    <span style={{ fontSize: 16 }}>🔴</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#991b1b' }}>No published ROI calculator</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>Competitors Segment and mParticle have interactive value tools</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12, backgroundColor: '#fef2f2', borderRadius: 8 }}>
                    <span style={{ fontSize: 16 }}>🔴</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#991b1b' }}>Value props feature-focused, not outcome-focused</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>Website describes capabilities, not customer business impact</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12, backgroundColor: '#fffbeb', borderRadius: 8 }}>
                    <span style={{ fontSize: 16 }}>🟡</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e' }}>Pricing hidden from website</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>May be intentional, but creates friction in buyer journey</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 20,
                border: `2px solid ${colors.accent}`,
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.accent, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Recommended Next Step
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: colors.primaryDark, marginBottom: 8 }}>
                  Refine Your Assessment
                </div>
                <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16, lineHeight: 1.6 }}>
                  Answer 3 quick questions to sharpen this analysis with information only you know.
                </div>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: `linear-gradient(135deg, ${colors.accent}, #f97316)`,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(238, 108, 77, 0.3)',
                  }}
                >
                  Start Quick Diagnostic →
                </button>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 8, textAlign: 'center' }}>
                  Takes about 3 minutes
                </div>
              </div>

              <div style={{
                backgroundColor: colors.cream,
                borderRadius: 12,
                padding: 16,
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.primary, marginBottom: 12 }}>
                  How Remidi Works
                </div>
                <div style={{ fontSize: 12, color: '#4b5563', lineHeight: 1.7 }}>
                  <div style={{ marginBottom: 8 }}>✓ Scores update as you add information</div>
                  <div style={{ marginBottom: 8 }}>✓ Pause and resume anytime</div>
                  <div style={{ marginBottom: 8 }}>✓ Expert backup when you need it</div>
                  <div>✓ Board-ready outputs guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // STEP 2: Quick Diagnostic
    {
      title: "Quick Diagnostic",
      content: (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            borderRadius: 16, padding: 24, marginBottom: 24, color: '#fff',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.1em', color: colors.accentSoft, marginBottom: 4 }}>REFINING ASSESSMENT</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>NovaTech • Quick Diagnostic</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: colors.accentSoft }}>Current Score</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{overallScore.toFixed(1)}</div>
              </div>
            </div>
          </div>

          {/* Live Scores */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 24 }}>
            {Object.entries(scores).map(([key, value]) => (
              <div key={key} style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 12,
                textAlign: 'center',
                border: '1px solid #e5e7eb',
              }}>
                <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: getScoreColor(value) }}>
                  {value.toFixed(1)}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Interface */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
          }}>
            <div style={{ padding: 20, borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: 14,
                }}>RW</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: colors.primaryDark }}>Remidi Works AI Coach</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>Powered by HG Partners methodology</div>
                </div>
              </div>
            </div>

            <div style={{ padding: 24 }}>
              <div style={{ 
                fontSize: 15, 
                color: '#374151', 
                lineHeight: 1.7,
                minHeight: 80,
              }}>
                {displayedText}
                {typing && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
              </div>

              {showActions && !typing && (
                <div style={{ marginTop: 20 }}>
                  {questions.map((q, qIndex) => {
                    if (answers[q.id]) return null;
                    if (qIndex > 0 && !answers[questions[qIndex - 1].id]) return null;
                    
                    return (
                      <div key={q.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {q.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => handleAnswer(q.id, option)}
                            style={{
                              padding: '12px 16px',
                              backgroundColor: '#f3f4f6',
                              border: '1px solid #e5e7eb',
                              borderRadius: 8,
                              fontSize: 14,
                              color: '#374151',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.2s',
                            }}
                            onMouseOver={e => {
                              e.target.style.backgroundColor = colors.cream;
                              e.target.style.borderColor = colors.primary;
                            }}
                            onMouseOut={e => {
                              e.target.style.backgroundColor = '#f3f4f6';
                              e.target.style.borderColor = '#e5e7eb';
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },

    // STEP 3: Updated Assessment
    {
      title: "Updated Assessment",
      content: (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.green} 0%, #065f46 100%)`,
            borderRadius: 16, padding: 24, marginBottom: 24, color: '#fff',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 12, letterSpacing: '0.1em', marginBottom: 8 }}>✓ ASSESSMENT REFINED</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
              Your score improved to {overallScore.toFixed(1)}
            </div>
            <div style={{ fontSize: 14, opacity: 0.9 }}>
              Based on your responses, we've updated our analysis
            </div>
          </div>

          {/* Updated Scores */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <ScoreBadge label="Value Articulation" score={scores.valueArticulation} prevScore={4.5} />
            <ScoreBadge label="Pricing Architecture" score={scores.pricingArchitecture} prevScore={5.2} />
            <ScoreBadge label="Competitive Position" score={scores.competitivePositioning} prevScore={4.8} />
            <ScoreBadge label="Sales Enablement" score={scores.salesEnablement} prevScore={3.9} />
            <ScoreBadge label="Customer ROI Proof" score={scores.customerROI} prevScore={5.0} />
          </div>

          {/* Priority Workstreams */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 24,
            border: '1px solid #e5e7eb',
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.primaryDark, marginBottom: 16 }}>
              Recommended Priority Order
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { rank: 1, name: 'Build Customer ROI Calculator', impact: 'High', effort: 'Medium', dimension: 'Sales Enablement' },
                { rank: 2, name: 'Develop Value Story Framework', impact: 'High', effort: 'Low', dimension: 'Value Articulation' },
                { rank: 3, name: 'Create Competitive Battle Cards', impact: 'Medium', effort: 'Low', dimension: 'Competitive Position' },
              ].map(item => (
                <div key={item.rank} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: 16,
                  backgroundColor: item.rank === 1 ? `${colors.accent}10` : '#f9fafb',
                  borderRadius: 8,
                  border: item.rank === 1 ? `2px solid ${colors.accent}` : '1px solid #e5e7eb',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    backgroundColor: item.rank === 1 ? colors.accent : colors.primary,
                    color: '#fff', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{item.rank}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.primaryDark }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>Improves: {item.dimension}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 11, padding: '4px 8px', backgroundColor: colors.green + '20', color: colors.green, borderRadius: 4 }}>
                      {item.impact} Impact
                    </span>
                    <span style={{ fontSize: 11, padding: '4px 8px', backgroundColor: '#e5e7eb', color: '#6b7280', borderRadius: 4 }}>
                      {item.effort} Effort
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(4)}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: `linear-gradient(135deg, ${colors.accent}, #f97316)`,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(238, 108, 77, 0.3)',
            }}
          >
            View Your Action Plan →
          </button>
        </div>
      )
    },

    // STEP 4: Action Plan
    {
      title: "Your Action Plan",
      content: (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            borderRadius: 16, padding: 24, marginBottom: 24, color: '#fff',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.1em', color: colors.accentSoft, marginBottom: 4 }}>WORKSTREAM</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>Build Customer ROI Calculator</div>
                <div style={{ fontSize: 13, color: '#d1d5db', marginTop: 4 }}>6-step guided process • ~4 hours total</div>
              </div>
              <FrameworkBadge text="CFO-Ready Index" />
            </div>
          </div>

          {/* Steps */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
          }}>
            {[
              { num: 1, title: 'Identify Value Drivers', time: '30 min', status: 'ready' },
              { num: 2, title: 'Quantify Customer Outcomes', time: '45 min', status: 'locked' },
              { num: 3, title: 'Build Input Variables', time: '30 min', status: 'locked' },
              { num: 4, title: 'Design Calculator Logic', time: '60 min', status: 'locked' },
              { num: 5, title: 'Create Visual Output', time: '45 min', status: 'locked' },
              { num: 6, title: 'Quality Gate Review', time: '30 min', status: 'locked' },
            ].map((s, i) => (
              <div key={s.num} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 20,
                borderBottom: i < 5 ? '1px solid #e5e7eb' : 'none',
                backgroundColor: s.status === 'ready' ? `${colors.accent}08` : '#fff',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  backgroundColor: s.status === 'ready' ? colors.accent : '#e5e7eb',
                  color: s.status === 'ready' ? '#fff' : '#9ca3af',
                  fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{s.num}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: s.status === 'ready' ? colors.primaryDark : '#9ca3af' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{s.time}</div>
                </div>
                {s.status === 'ready' && (
                  <button
                    onClick={() => setStep(5)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: colors.accent,
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Start →
                  </button>
                )}
                {s.status === 'locked' && (
                  <span style={{ fontSize: 12, color: '#9ca3af' }}>🔒 Complete previous</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },

    // STEP 5: Executing Step 1
    {
      title: "Identify Value Drivers",
      content: (
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            borderRadius: 16, padding: 24, marginBottom: 24, color: '#fff',
          }}>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', color: colors.accentSoft, marginBottom: 4 }}>
              STEP 1 OF 6 • CFO-Ready Index™
            </div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Identify Value Drivers</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Left: AI Analysis */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 20,
              border: '1px solid #e5e7eb',
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.primaryDark, marginBottom: 16 }}>
                🔍 Gap Analysis: Your ROI Evidence
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Component</th>
                    <th style={{ padding: 12, textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>You</th>
                    <th style={{ padding: 12, textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>Best Practice</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['ROI Calculator', '❌', '✅'],
                    ['Case Studies w/ $', '⚠️ 1', '✅ 5+'],
                    ['TCO Comparison', '❌', '✅'],
                    ['Time-to-Value Data', '❌', '✅'],
                    ['Customer Quotes', '✅', '✅'],
                  ].map(([comp, you, best], i) => (
                    <tr key={i}>
                      <td style={{ padding: 12, borderBottom: '1px solid #e5e7eb' }}>{comp}</td>
                      <td style={{ padding: 12, textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>{you}</td>
                      <td style={{ padding: 12, textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>{best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right: Competitor Benchmark */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 20,
              border: '1px solid #e5e7eb',
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.primaryDark, marginBottom: 16 }}>
                📊 Competitor ROI Tools
              </div>
              
              {[
                { name: 'Segment', hasCalc: true, hasStudies: true, rating: 'Strong' },
                { name: 'mParticle', hasCalc: true, hasStudies: true, rating: 'Strong' },
                { name: 'Tealium', hasCalc: false, hasStudies: true, rating: 'Medium' },
                { name: 'NovaTech (You)', hasCalc: false, hasStudies: false, rating: 'Weak' },
              ].map((c, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: i < 3 ? '1px solid #e5e7eb' : 'none',
                  backgroundColor: c.name.includes('You') ? `${colors.accent}10` : 'transparent',
                  margin: c.name.includes('You') ? '0 -12px' : 0,
                  padding: c.name.includes('You') ? '12px' : '12px 0',
                  borderRadius: c.name.includes('You') ? 8 : 0,
                }}>
                  <span style={{ fontWeight: c.name.includes('You') ? 600 : 400 }}>{c.name}</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 11, padding: '2px 6px', backgroundColor: c.hasCalc ? colors.green + '20' : '#fee2e2', color: c.hasCalc ? colors.green : colors.red, borderRadius: 4 }}>
                      {c.hasCalc ? '✓ Calc' : '✗ Calc'}
                    </span>
                    <span style={{ fontSize: 11, padding: '2px 6px', backgroundColor: c.hasStudies ? colors.green + '20' : '#fee2e2', color: c.hasStudies ? colors.green : colors.red, borderRadius: 4 }}>
                      {c.hasStudies ? '✓ Studies' : '✗ Studies'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <button
              onClick={() => setStep(6)}
              style={{
                width: '100%',
                padding: '16px 24px',
                background: `linear-gradient(135deg, ${colors.accent}, #f97316)`,
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(238, 108, 77, 0.3)',
              }}
            >
              Continue to Value Driver Selection →
            </button>
          </div>
        </div>
      )
    },

    // STEP 6: Pause & Resume
    {
      title: "Work At Your Pace",
      content: (
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            borderRadius: 16, padding: 40, marginBottom: 24, color: '#fff',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏸️</div>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              Welcome back! You left off 3 days ago.
            </div>
            <div style={{ fontSize: 15, color: colors.accentSoft }}>
              Your progress is saved. Pick up right where you left off.
            </div>
          </div>

          <div style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 24,
            border: '1px solid #e5e7eb',
            marginBottom: 24,
            textAlign: 'left',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.primaryDark, marginBottom: 16 }}>
              Your Progress
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 8, backgroundColor: '#e5e7eb', borderRadius: 4 }}>
                <div style={{ width: '17%', height: '100%', backgroundColor: colors.green, borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: colors.primaryDark }}>1/6 steps</span>
            </div>

            <div style={{ padding: 16, backgroundColor: '#f9fafb', borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Currently working on:</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.primaryDark }}>
                Build Customer ROI Calculator → Step 2: Quantify Customer Outcomes
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: colors.cream,
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 13, color: colors.primary, fontWeight: 500 }}>
              💡 This is what makes Remidi Works different from ChatGPT. Real work takes time. 
              Your context is preserved across sessions.
            </div>
          </div>

          <button
            onClick={() => setStep(7)}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: `linear-gradient(135deg, ${colors.accent}, #f97316)`,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(238, 108, 77, 0.3)',
            }}
          >
            Continue Where I Left Off →
          </button>
        </div>
      )
    },

    // STEP 7: Why Remidi Works
    {
      title: "Why Remidi Works",
      content: (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            borderRadius: 16, padding: 32, marginBottom: 24, color: '#fff',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
              Why Remidi Works
            </div>
            <div style={{ fontSize: 15, color: colors.accentSoft }}>
              The best of AI speed with human expertise
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 24 }}>
            {[
              { icon: '🎯', title: 'Trained by Doing', desc: 'Your team learns commercial strategy by executing it, not reading a deck.' },
              { icon: '📊', title: 'Benchmarked', desc: 'Every score is compared against 100+ similar companies. You know where you stand.' },
              { icon: '⏸️', title: 'Pause & Resume', desc: 'Real work takes time. Pick up where you left off. Context preserved.' },
              { icon: '👤', title: 'Expert Backup', desc: 'When you get stuck, escalate to a human who knows the frameworks.' },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 24,
                border: '1px solid #e5e7eb',
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: colors.primaryDark, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <div style={{
            backgroundColor: colors.cream,
            borderRadius: 12,
            padding: 24,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.primary, marginBottom: 8 }}>
              The Bottom Line
            </div>
            <div style={{ fontSize: 16, color: colors.primaryDark, lineHeight: 1.6 }}>
              Remidi Works is a <strong>system</strong>, not a tool. It doesn't just give you answers—
              it builds your team's capability while delivering board-ready outputs.
            </div>
          </div>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button
              onClick={() => setStep(0)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#fff',
                color: colors.primary,
                border: `2px solid ${colors.primary}`,
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                marginRight: 12,
              }}
            >
              ← Back to Start
            </button>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: colors.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Explore Other Demos
              </button>
            </Link>
          </div>
        </div>
      )
    },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: colors.primary, 
        padding: '12px 24px',
        borderBottom: `3px solid ${colors.accent}`
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
              <span style={{ fontSize: '16px' }}>←</span> All Demos
            </Link>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                backgroundColor: colors.accent, 
                width: '28px', 
                height: '28px', 
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#fff',
                fontSize: '10px'
              }}>RW</span>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>Remidi Works</span>
              <span style={{ fontSize: '11px', color: colors.accentSoft }}>Portfolio Company View</span>
            </div>
          </div>
          
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
            Step {step + 1} of {steps.length}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '32px 24px' }}>
        {steps[step].content}
      </main>

      {/* Navigation */}
      <div style={{ 
        position: 'fixed', 
        bottom: 24, 
        left: '50%', 
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8,
        backgroundColor: '#fff',
        padding: '8px 12px',
        borderRadius: 999,
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
      }}>
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              border: 'none',
              backgroundColor: i === step ? colors.accent : '#d1d5db',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
