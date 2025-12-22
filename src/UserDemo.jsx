import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const colors = {
  navy: '#3D5A80',
  coral: '#EE6C4D',
  lightBlue: '#98C1D9',
  darkNavy: '#293241',
  cream: '#E0FBFC',
  green: '#2D936C',
  yellow: '#F4A300',
  red: '#C1292E'
};

// Default company data (used if no client param)
const defaultCompany = {
  company: 'Aqfer',
  industry: 'Customer Data Platform',
  arr: '$12M',
  stage: 'Series B',
  website: 'aqfer.com',
  scores: {
    valueArticulation: 6.2,
    pricingArchitecture: 7.5,
    competitivePositioning: 5.8,
    salesEnablement: 4.5,
    customerROI: 6.0
  },
  actionPlan: [
    { name: 'CFO-Ready Value Story', priority: 'High', weeks: 2, dimension: 'customerROI' },
    { name: 'Competitive Battlecards', priority: 'High', weeks: 1, dimension: 'competitivePositioning' },
    { name: 'Sales Enablement Toolkit', priority: 'Medium', weeks: 3, dimension: 'salesEnablement' },
    { name: 'Pricing Page Optimization', priority: 'Medium', weeks: 2, dimension: 'pricingArchitecture' },
    { name: 'Case Study Development', priority: 'Low', weeks: 4, dimension: 'customerROI' }
  ]
};

// Dynamic import for client data files
const loadClientData = async (clientId) => {
  try {
    const module = await import(`./data/${clientId}.json`);
    return module.default;
  } catch (e) {
    console.log(`No data file found for client: ${clientId}, using default`);
    return null;
  }
};

const diagnosticQuestions = [
  {
    id: 1,
    question: "How would you rate your team's ability to articulate ROI in customer terms?",
    dimension: 'customerROI',
    options: [
      { label: 'We struggle to quantify value', adjustment: -1.5 },
      { label: 'We have some metrics but they vary', adjustment: 0 },
      { label: 'We have consistent ROI frameworks', adjustment: 1.5 }
    ]
  },
  {
    id: 2,
    question: "How differentiated is your positioning from competitors?",
    dimension: 'competitivePositioning',
    options: [
      { label: 'We sound similar to others', adjustment: -1 },
      { label: 'Some differentiation but not sharp', adjustment: 0.5 },
      { label: 'Clear and defensible positioning', adjustment: 2 }
    ]
  },
  {
    id: 3,
    question: "How equipped is your sales team to handle pricing objections?",
    dimension: 'salesEnablement',
    options: [
      { label: 'They often discount to close', adjustment: -1.5 },
      { label: 'Inconsistent across reps', adjustment: 0 },
      { label: 'Strong value-based selling', adjustment: 2 }
    ]
  }
];

const StepIndicator = ({ current, total }) => (
  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
    {Array.from({ length: total }, (_, i) => (
      <div
        key={i}
        style={{
          width: 8, height: 8, borderRadius: '50%',
          backgroundColor: i <= current ? colors.coral : '#d1d5db'
        }}
      />
    ))}
  </div>
);

export default function UserDemo() {
  const [searchParams] = useSearchParams();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState(null);
  const [initialScores, setInitialScores] = useState(null);
  const [answers, setAnswers] = useState({});
  const [typing, setTyping] = useState(false);
  const [typedText, setTypedText] = useState('');

  // Load client data based on URL parameter
  useEffect(() => {
    const loadData = async () => {
      const clientId = searchParams.get('client');
      
      if (clientId) {
        const clientData = await loadClientData(clientId);
        if (clientData) {
          setCompanyData(clientData);
          setScores({ ...clientData.scores });
          setInitialScores({ ...clientData.scores });
        } else {
          setCompanyData(defaultCompany);
          setScores({ ...defaultCompany.scores });
          setInitialScores({ ...defaultCompany.scores });
        }
      } else {
        setCompanyData(defaultCompany);
        setScores({ ...defaultCompany.scores });
        setInitialScores({ ...defaultCompany.scores });
      }
      setLoading(false);
    };
    
    loadData();
  }, [searchParams]);

  if (loading || !companyData || !scores) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: colors.navy, marginBottom: 8 }}>Loading...</div>
          <div style={{ color: '#6b7280' }}>Preparing diagnostic</div>
        </div>
      </div>
    );
  }

  const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;

  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
    const question = diagnosticQuestions.find(q => q.id === questionId);
    setScores({
      ...scores,
      [question.dimension]: Math.min(10, Math.max(0, scores[question.dimension] + option.adjustment))
    });
  };

  const simulateTyping = (text, callback) => {
    setTyping(true);
    setTypedText('');
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setTyping(false);
        if (callback) callback();
      }
    }, 20);
  };

  const handleNext = () => {
    if (step === 4) {
      simulateTyping("Analyzing your responses and generating recommendations...", () => {
        setTimeout(() => setStep(step + 1), 500);
      });
    } else {
      setStep(step + 1);
    }
  };

  const ScoreBar = ({ label, score, benchmark = 6.0 }) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
        <span style={{ color: colors.darkNavy }}>{label}</span>
        <span style={{ fontWeight: 600 }}>{score.toFixed(1)} / {benchmark.toFixed(1)} avg</span>
      </div>
      <div style={{ position: 'relative', height: 8, backgroundColor: '#e5e7eb', borderRadius: 4 }}>
        <div style={{
          position: 'absolute', height: '100%', borderRadius: 4,
          width: `${(score / 10) * 100}%`,
          backgroundColor: score >= 7 ? colors.green : score >= 5 ? colors.yellow : colors.red
        }} />
        <div style={{
          position: 'absolute', top: -4, bottom: -4, width: 2,
          left: `${(benchmark / 10) * 100}%`,
          backgroundColor: colors.darkNavy, opacity: 0.3
        }} />
      </div>
    </div>
  );

  const steps = [
    // Step 0: The Situation
    <div key="situation" style={{ padding: 20 }}>
      <div style={{ 
        fontSize: 13, 
        fontWeight: 600, 
        color: colors.coral, 
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        The Situation
      </div>
      
      <div style={{ 
        fontSize: 18, 
        color: colors.darkNavy, 
        lineHeight: 1.7,
        marginBottom: 32
      }}>
        <strong>{companyData.company}</strong> is missing pipeline targets. The board suspects the root cause isn't sales execution—it's gaps in your revenue model and commercialization fundamentals.
        <br /><br />
        You've tasked your CMO and Head of Sales to diagnose the problem and build an action plan. <strong>This is what they found.</strong>
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
          <div style={{ fontWeight: 600, color: colors.darkNavy }}>{companyData.company}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Industry</div>
          <div style={{ fontWeight: 600, color: colors.darkNavy }}>{companyData.industry}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>ARR</div>
          <div style={{ fontWeight: 600, color: colors.darkNavy }}>{companyData.arr}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Stage</div>
          <div style={{ fontWeight: 600, color: colors.darkNavy }}>{companyData.stage}</div>
        </div>
      </div>
    </div>,

    // Step 1: Pre-populated dashboard
    <div key="dashboard">
      <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.darkNavy, marginBottom: 8 }}>
        Initial Assessment
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>
        Based on observable data from {companyData.company}'s website, reviews, and market presence:
      </p>
      <div style={{ 
        display: 'grid', gridTemplateColumns: '1fr 200px', gap: 32,
        backgroundColor: '#f9fafb', borderRadius: 12, padding: 24
      }}>
        <div>
          <ScoreBar label="Value Articulation" score={initialScores.valueArticulation} />
          <ScoreBar label="Pricing Architecture" score={initialScores.pricingArchitecture} />
          <ScoreBar label="Competitive Positioning" score={initialScores.competitivePositioning} />
          <ScoreBar label="Sales Enablement" score={initialScores.salesEnablement} />
          <ScoreBar label="Customer ROI" score={initialScores.customerROI} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: colors.coral }}>
            {(Object.values(initialScores).reduce((a, b) => a + b, 0) / 5).toFixed(1)}
          </div>
          <div style={{ fontSize: 14, color: '#6b7280' }}>Overall Score</div>
        </div>
      </div>
    </div>,

    // Steps 2-4: Diagnostic Questions
    ...diagnosticQuestions.map((q, idx) => (
      <div key={`q${q.id}`}>
        <div style={{ fontSize: 12, color: colors.coral, fontWeight: 600, marginBottom: 8 }}>
          QUESTION {idx + 1} OF 3
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: colors.darkNavy, marginBottom: 24 }}>
          {q.question}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleAnswer(q.id, opt)}
              style={{
                padding: 16, borderRadius: 8, textAlign: 'left',
                border: answers[q.id] === opt ? `2px solid ${colors.coral}` : '2px solid #e5e7eb',
                backgroundColor: answers[q.id] === opt ? `${colors.coral}10` : '#fff',
                cursor: 'pointer', fontSize: 14
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    )),

    // Step 5: Updated scores
    <div key="updated">
      <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.darkNavy, marginBottom: 8 }}>
        Refined Assessment
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>
        Based on your inputs, here's {companyData.company}'s updated commercialization health:
      </p>
      <div style={{ 
        display: 'grid', gridTemplateColumns: '1fr 200px', gap: 32,
        backgroundColor: '#f9fafb', borderRadius: 12, padding: 24
      }}>
        <div>
          <ScoreBar label="Value Articulation" score={scores.valueArticulation} />
          <ScoreBar label="Pricing Architecture" score={scores.pricingArchitecture} />
          <ScoreBar label="Competitive Positioning" score={scores.competitivePositioning} />
          <ScoreBar label="Sales Enablement" score={scores.salesEnablement} />
          <ScoreBar label="Customer ROI" score={scores.customerROI} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: colors.coral }}>{avgScore.toFixed(1)}</div>
          <div style={{ fontSize: 14, color: '#6b7280' }}>Updated Score</div>
        </div>
      </div>
    </div>,

    // Step 6: Action Plan
    <div key="plan">
      <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.darkNavy, marginBottom: 8 }}>
        {companyData.company}'s Action Plan
      </h2>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>
        Prioritized workstreams based on impact and current gaps:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {companyData.actionPlan.map((item, idx) => (
          <div 
            key={idx}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: 16, backgroundColor: '#fff', borderRadius: 8,
              border: '1px solid #e5e7eb',
              opacity: idx >= 3 ? 0.5 : 1
            }}
          >
            <div style={{ 
              width: 32, height: 32, borderRadius: '50%',
              backgroundColor: idx < 3 ? colors.coral : '#e5e7eb',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 600, fontSize: 14
            }}>
              {idx + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: colors.darkNavy }}>{item.name}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{item.weeks} weeks</div>
            </div>
            <div style={{
              padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600,
              backgroundColor: item.priority === 'High' ? `${colors.red}15` : item.priority === 'Medium' ? `${colors.yellow}15` : '#f3f4f6',
              color: item.priority === 'High' ? colors.red : item.priority === 'Medium' ? colors.yellow : '#6b7280'
            }}>
              {item.priority}
            </div>
          </div>
        ))}
      </div>
    </div>,

    // Step 7: Why Remidi Works
    <div key="why" style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, color: colors.darkNavy, marginBottom: 24 }}>
        Why Remidi Works?
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, textAlign: 'left' }}>
        {[
          { icon: '🎯', title: 'You Build Capability', desc: 'Platform guides, you execute. Lasting skills, not consultant dependency.' },
          { icon: '⏸️', title: 'Pause & Resume', desc: 'Pick up where you left off. Context preserved.' },
          { icon: '📊', title: 'Continuous Intelligence', desc: 'Dashboard updates as you complete work. Real-time progress.' },
          { icon: '🔥', title: 'Expert Backup', desc: 'Escalate when you need senior judgment.' }
        ].map((item, i) => (
          <div key={i} style={{ padding: 20, backgroundColor: '#f9fafb', borderRadius: 12 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontWeight: 600, color: colors.darkNavy, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  ];

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
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 13 }}>← All Demos</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ 
                backgroundColor: colors.coral, 
                padding: '5px 8px', borderRadius: 6,
                fontWeight: 700, color: '#fff', fontSize: 11, letterSpacing: '-0.5px'
              }}>RW</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>Remidi Works</span>
              <span style={{ fontSize: 12, color: colors.lightBlue }}>• {companyData.company}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
        <StepIndicator current={step} total={steps.length} />
        
        <div style={{ 
          backgroundColor: '#fff', 
          borderRadius: 16, 
          padding: 32,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          minHeight: 400
        }}>
          {typing ? (
            <div style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              minHeight: 300, flexDirection: 'column', gap: 16 
            }}>
              <div style={{ 
                width: 40, height: 40, borderRadius: '50%',
                border: `3px solid ${colors.lightBlue}`,
                borderTopColor: colors.coral,
                animation: 'spin 1s linear infinite'
              }} />
              <div style={{ color: '#6b7280' }}>{typedText}</div>
            </div>
          ) : (
            steps[step]
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0 || typing}
            style={{
              padding: '10px 20px', borderRadius: 8, border: 'none', cursor: step === 0 ? 'not-allowed' : 'pointer',
              backgroundColor: step === 0 ? '#f3f4f6' : '#fff',
              color: step === 0 ? '#9ca3af' : colors.darkNavy,
              fontWeight: 500
            }}
          >
            ← Back
          </button>
          {step < steps.length - 1 && (
            <button
              onClick={handleNext}
              disabled={typing || (step >= 2 && step <= 4 && !answers[diagnosticQuestions[step - 2]?.id])}
              style={{
                padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
                backgroundColor: typing ? '#d1d5db' : colors.coral,
                color: '#fff', fontWeight: 600,
                boxShadow: typing ? 'none' : '0 4px 12px rgba(238, 108, 77, 0.3)'
              }}
            >
              {typing ? 'Processing...' : 'Next →'}
            </button>
          )}
        </div>
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
