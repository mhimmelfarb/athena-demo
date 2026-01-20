import React, { useState, useEffect } from 'react';

const RemidiLandingPage = () => {
  const [arr, setArr] = useState(10);
  const [acv, setAcv] = useState(50);
  const [winRate, setWinRate] = useState(25);
  const [salesCycle, setSalesCycle] = useState(90);
  const [nrr, setNrr] = useState(100);
  
  const [results, setResults] = useState({
    score: 5.0,
    interpretation: '',
    revenueAtRisk: '$2.0M',
    biggestGap: 'Win Rate',
    gapDescription: '',
    calcARR: '$10.0M',
    calcScore: '5.0/10',
    calcWinRate: '+5%',
    calcCycle: '-15 days',
    calcImpact: '$2.0M'
  });

  useEffect(() => {
    // Load HubSpot form script
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/45784330.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    calculateResults();
  }, [arr, acv, winRate, salesCycle, nrr]);

  const calculateResults = () => {
    // Calculate current customer base
    const currentCustomers = Math.round((arr * 1000) / acv);
    
    // Industry benchmarks
    let benchmarkWinRate, benchmarkSalesCycle, benchmarkNRR;
    
    if (acv < 25) {
      benchmarkWinRate = 30;
      benchmarkSalesCycle = 45;
      benchmarkNRR = 110;
    } else if (acv < 100) {
      benchmarkWinRate = 25;
      benchmarkSalesCycle = 75;
      benchmarkNRR = 115;
    } else {
      benchmarkWinRate = 20;
      benchmarkSalesCycle = 120;
      benchmarkNRR = 120;
    }
    
    // Calculate gaps
    const winRateGap = benchmarkWinRate - winRate;
    const salesCycleGap = salesCycle - benchmarkSalesCycle;
    const nrrGap = benchmarkNRR - nrr;
    
    // WIN RATE IMPACT
    let revenueFromWinRate = 0;
    if (winRateGap > 0) {
      const impliedOpportunities = currentCustomers / (winRate / 100);
      const customersAtBenchmark = impliedOpportunities * (benchmarkWinRate / 100);
      const additionalCustomers = customersAtBenchmark - currentCustomers;
      revenueFromWinRate = (additionalCustomers * acv) / 1000;
    }
    
    // NRR IMPACT
    let revenueFromNRR = 0;
    if (nrrGap > 0) {
      const additionalCustomersRetained = currentCustomers * (nrrGap / 100);
      revenueFromNRR = (additionalCustomersRetained * acv) / 1000;
    }
    
    // SALES CYCLE IMPACT
    let revenueFromCycle = 0;
    if (salesCycleGap > 0) {
      const velocityImprovement = (salesCycle / benchmarkSalesCycle) - 1;
      const additionalDealsPerYear = currentCustomers * velocityImprovement * 0.5;
      revenueFromCycle = (additionalDealsPerYear * acv) / 1000;
    }
    
    const totalRevenue = revenueFromWinRate + revenueFromNRR + revenueFromCycle;
    
    // Performance score
    const winRateScore = Math.max(0, Math.min(3.5, 3.5 * (winRate / benchmarkWinRate)));
    const salesCycleScore = Math.max(0, Math.min(3, 3 * (benchmarkSalesCycle / salesCycle)));
    const nrrScore = Math.max(0, Math.min(3.5, 3.5 * (nrr / benchmarkNRR)));
    const totalScore = winRateScore + salesCycleScore + nrrScore;
    
    // Determine primary gap
    const gaps = [
      { 
        name: "Win Rate", 
        impact: revenueFromWinRate, 
        desc: `Your ${winRate}% win rate is ${winRateGap.toFixed(1)}% below benchmark. That's ${Math.round((revenueFromWinRate * 1000) / acv)} fewer customers won annually.`
      },
      { 
        name: "Sales Velocity", 
        impact: revenueFromCycle, 
        desc: `Your ${salesCycle}-day cycle is ${salesCycleGap} days slower than benchmark. Faster cycles would let you close ${Math.round((revenueFromCycle * 1000) / acv)} more deals per year.`
      },
      { 
        name: "Retention & Expansion", 
        impact: revenueFromNRR, 
        desc: `Your ${nrr}% NRR is ${nrrGap.toFixed(0)}% below benchmark. You're losing ${Math.round((revenueFromNRR * 1000) / acv)} customers annually that benchmark companies retain.`
      }
    ];
    
    gaps.sort((a, b) => b.impact - a.impact);
    const topGap = gaps[0];
    
    let scoreInterpretation;
    if (totalScore < 5) {
      scoreInterpretation = 'Significant underperformance vs. industry benchmarks';
    } else if (totalScore < 7) {
      scoreInterpretation = 'Below benchmark with clear opportunities to improve';
    } else if (totalScore < 9) {
      scoreInterpretation = 'Near benchmark performance with optimization opportunities';
    } else {
      scoreInterpretation = 'Strong performance at or above industry benchmarks';
    }
    
    setResults({
      score: totalScore.toFixed(1),
      interpretation: scoreInterpretation,
      revenueAtRisk: totalRevenue > 0 ? `$${totalRevenue.toFixed(1)}M` : '$0',
      biggestGap: topGap.impact > 0 ? topGap.name : 'Optimization',
      gapDescription: topGap.impact > 0 ? topGap.desc : 'Performance at or above benchmarks across all metrics',
      calcARR: `$${arr.toFixed(1)}M`,
      calcScore: `${totalScore.toFixed(1)}/10`,
      calcWinRate: winRateGap > 0 ? `+${winRateGap.toFixed(1)}%` : 'At benchmark',
      calcCycle: salesCycleGap > 0 ? `-${salesCycleGap} days` : 'At benchmark',
      calcImpact: `$${totalRevenue.toFixed(1)}M`
    });
  };

  const getScoreClass = () => {
    const score = parseFloat(results.score);
    if (score < 5) return 'score-low';
    if (score < 7) return 'score-medium';
    return 'score-high';
  };

  return (
    <div className="remidi-landing-page">
      <style>{`
        :root {
          --color-primary: #3D5A80;
          --color-accent: #EE6C4D;
          --color-light-bg: #E0FBFC;
          --color-bg: #f8fafc;
          --color-white: #ffffff;
          --color-text-dark: #293241;
          --color-text-gray: #6b7280;
          --color-text-light: #9ca3af;
          --color-border: #e5e7eb;
        }

        .remidi-landing-page {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--color-bg);
          color: var(--color-text-dark);
          line-height: 1.6;
        }

        nav {
          background: var(--color-white);
          border-bottom: 1px solid var(--color-border);
          padding: 1.25rem 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        nav .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--color-primary);
        }

        .nav-cta {
          background: var(--color-accent);
          color: var(--color-white);
          padding: 0.625rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .nav-cta:hover {
          background: #d45a3e;
          transform: translateY(-1px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero {
          padding: 5rem 2rem 4rem;
          background: var(--color-white);
        }

        .hero-label {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-primary);
          margin-bottom: 1.5rem;
          padding: 0.5rem 1rem;
          background: var(--color-light-bg);
          border-radius: 4px;
        }

        h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--color-text-dark);
        }

        .hero-subtitle {
          font-size: clamp(1.125rem, 2.5vw, 1.375rem);
          color: var(--color-text-gray);
          max-width: 800px;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .hero-tagline {
          font-size: clamp(1.125rem, 2.5vw, 1.25rem);
          color: var(--color-primary);
          max-width: 800px;
          margin-bottom: 2.5rem;
          font-weight: 600;
        }

        .hero-cta-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: var(--color-accent);
          color: var(--color-white);
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover {
          background: #d45a3e;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(238, 108, 77, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: var(--color-primary);
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s;
          font-size: 1.1rem;
          border: 2px solid var(--color-primary);
        }

        .btn-secondary:hover {
          background: var(--color-primary);
          color: var(--color-white);
        }

        section {
          padding: 4rem 2rem;
        }

        .section-alt {
          background: var(--color-white);
        }

        .section-label {
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          margin-bottom: 1rem;
        }

        h2 {
          font-size: clamp(1.875rem, 4vw, 2.5rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: var(--color-text-dark);
        }

        .lead-text {
          font-size: 1.25rem;
          color: var(--color-text-gray);
          max-width: 800px;
          margin-bottom: 3rem;
        }

        .problem-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .problem-card {
          background: var(--color-white);
          padding: 2rem;
          border-radius: 12px;
          border: 2px solid var(--color-border);
          transition: all 0.3s;
        }

        .problem-card:hover {
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(61, 90, 128, 0.1);
        }

        .problem-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .problem-card h3 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .problem-card p {
          color: var(--color-text-gray);
        }

        .callout-box {
          margin-top: 3rem;
          padding: 2rem;
          background: var(--color-light-bg);
          border-left: 4px solid var(--color-accent);
          border-radius: 8px;
        }

        .callout-box p {
          color: var(--color-text-dark);
          font-size: 1.125rem;
          font-weight: 600;
        }

        .solution-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .step {
          display: flex;
          gap: 1rem;
        }

        .step-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-accent);
          flex-shrink: 0;
        }

        .step-content h3 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .step-content p {
          color: var(--color-text-gray);
          font-size: 0.95rem;
        }

        .example-box {
          margin-top: 3rem;
          padding: 2.5rem;
          background: var(--color-white);
          border: 2px solid var(--color-border);
          border-radius: 12px;
        }

        .example-box h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .example-lead {
          color: var(--color-text-gray);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .example-items {
          display: grid;
          gap: 1rem;
        }

        .example-item {
          padding: 1.25rem;
          background: var(--color-light-bg);
          border-left: 3px solid var(--color-accent);
          border-radius: 4px;
        }

        .example-item strong {
          color: var(--color-accent);
          display: block;
          margin-bottom: 0.25rem;
        }

        .calculator-section {
          background: linear-gradient(135deg, var(--color-primary) 0%, #2a4260 100%);
          padding: 4rem 2rem;
        }

        .calculator-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .calculator-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .calculator-header h2 {
          color: var(--color-white);
          margin-bottom: 0.75rem;
        }

        .calculator-header p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.125rem;
        }

        .calculator-body {
          background: var(--color-white);
          border-radius: 16px;
          padding: 3rem 2.5rem;
        }

        .input-group {
          margin-bottom: 2rem;
        }

        .input-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .input-label span:first-child {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .input-label span:last-child {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .slider {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: var(--color-bg);
          outline: none;
          -webkit-appearance: none;
          margin-bottom: 0.5rem;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-accent);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-accent);
          cursor: pointer;
          border: none;
        }

        .slider-scale {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--color-text-light);
        }

        .results-section {
          background: var(--color-light-bg);
          border: 2px solid var(--color-primary);
          border-radius: 12px;
          padding: 2.5rem;
          margin-top: 2.5rem;
        }

        .results-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid var(--color-border);
        }

        .results-header h3 {
          font-size: 1.375rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .results-score {
          display: flex;
          justify-content: center;
          align-items: baseline;
          gap: 0.5rem;
          margin: 1.5rem 0;
        }

        .score-value {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1;
        }

        .score-max {
          font-size: 1.75rem;
          color: var(--color-text-gray);
        }

        .score-low { color: #dc2626; }
        .score-medium { color: #f59e0b; }
        .score-high { color: #10b981; }

        .score-interpretation {
          color: var(--color-text-gray);
          font-size: 1rem;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .result-item {
          background: var(--color-white);
          padding: 1.5rem;
          border-radius: 8px;
        }

        .result-item h4 {
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-gray);
          margin-bottom: 0.75rem;
        }

        .result-item .value {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--color-primary);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .result-item .description {
          color: var(--color-text-gray);
          font-size: 0.875rem;
        }

        .result-breakdown {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--color-white);
          border-radius: 8px;
        }

        .result-breakdown h4 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .breakdown-items {
          display: grid;
          gap: 0.75rem;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem;
          background: var(--color-bg);
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .breakdown-item .label {
          color: var(--color-text-gray);
        }

        .breakdown-item .value {
          font-weight: 700;
        }

        .calculator-cta {
          margin-top: 2rem;
          padding: 2rem;
          background: var(--color-primary);
          border-radius: 12px;
          text-align: center;
        }

        .calculator-cta h3 {
          font-size: 1.5rem;
          color: var(--color-white);
          margin-bottom: 0.75rem;
        }

        .calculator-cta p {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .pricing-card {
          background: var(--color-white);
          border: 2px solid var(--color-border);
          border-radius: 12px;
          padding: 2.5rem;
          transition: all 0.3s;
          position: relative;
        }

        .pricing-card:hover {
          border-color: var(--color-primary);
          box-shadow: 0 8px 24px rgba(61, 90, 128, 0.15);
          transform: translateY(-4px);
        }

        .pricing-card.featured {
          border-color: var(--color-accent);
          box-shadow: 0 4px 16px rgba(238, 108, 77, 0.2);
        }

        .pricing-badge {
          position: absolute;
          top: -12px;
          right: 2rem;
          background: var(--color-accent);
          color: var(--color-white);
          padding: 0.375rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .pricing-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .pricing-price {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-primary);
          margin: 1rem 0;
          line-height: 1;
        }

        .pricing-price small {
          font-size: 1rem;
          color: var(--color-text-gray);
          font-weight: 400;
        }

        .pricing-description {
          color: var(--color-text-gray);
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        .pricing-features {
          list-style: none;
          margin-bottom: 2rem;
        }

        .pricing-features li {
          padding: 0.75rem 0;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: var(--color-text-gray);
        }

        .pricing-features li::before {
          content: '✓';
          color: var(--color-accent);
          font-weight: 700;
          flex-shrink: 0;
        }

        .pricing-cta {
          width: 100%;
          background: transparent;
          color: var(--color-primary);
          padding: 1rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: block;
          text-align: center;
          transition: all 0.3s;
          border: 2px solid var(--color-primary);
        }

        .pricing-cta:hover {
          background: var(--color-primary);
          color: var(--color-white);
        }

        .featured .pricing-cta {
          background: var(--color-accent);
          color: var(--color-white);
          border-color: var(--color-accent);
        }

        .featured .pricing-cta:hover {
          background: #d45a3e;
        }

        .pricing-note {
          margin-top: 1rem;
          font-size: 0.875rem;
          color: var(--color-text-light);
          text-align: center;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .comparison-card {
          background: var(--color-white);
          border: 2px solid var(--color-border);
          border-radius: 12px;
          padding: 2rem;
        }

        .comparison-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-light);
          margin-bottom: 0.75rem;
        }

        .comparison-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .comparison-list {
          list-style: none;
        }

        .comparison-list li {
          padding: 0.5rem 0;
          color: var(--color-text-gray);
          font-size: 0.9rem;
        }

        .comparison-list li.positive::before {
          content: '✓ ';
          color: var(--color-accent);
          font-weight: 700;
        }

        .comparison-list li.negative {
          opacity: 0.6;
        }

        .comparison-list li.negative::before {
          content: '✗ ';
          color: var(--color-text-light);
        }

        .cta-section {
          background: var(--color-accent);
          padding: 5rem 2rem;
          text-align: center;
        }

        .cta-section h2 {
          color: var(--color-white);
          margin-bottom: 1rem;
        }

        .cta-section p {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto 2rem;
        }

        .cta-section .btn-primary {
          background: var(--color-primary);
          font-size: 1.2rem;
          padding: 1.25rem 3rem;
        }

        .cta-section .btn-primary:hover {
          background: #2a4260;
        }

        footer {
          background: var(--color-white);
          border-top: 1px solid var(--color-border);
          padding: 3rem 2rem;
          text-align: center;
          color: var(--color-text-gray);
        }

        footer p {
          font-size: 0.9rem;
        }

        footer a {
          color: var(--color-primary);
          text-decoration: none;
        }

        footer a:hover {
          color: var(--color-accent);
        }

        @media (max-width: 768px) {
          .hero {
            padding: 3rem 1.5rem 2rem;
          }

          .hero-cta-group {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            text-align: center;
          }

          .calculator-body {
            padding: 2rem 1.5rem;
          }

          .score-value {
            font-size: 3rem;
          }
        }
      `}</style>

      <nav>
        <div className="container">
          <div className="logo">Remidi Works</div>
          <a href="#pricing" className="nav-cta">See Pricing</a>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-label">For B2B SaaS Companies $10M-$60M ARR</div>
          <h1>Find and Fix<br/>Your GTM Gaps</h1>
          <p className="hero-subtitle">We diagnose which positioning, pricing, or sales enablement gaps are costing you revenue—benchmarked against companies in your category. Then we coach your team through fixing them with guided workflows and expert validation.</p>
          <div className="hero-cta-group">
            <a href="#calculator" className="btn-primary">See Your Performance Gap →</a>
            <a href="#solution" className="btn-secondary">How It Works</a>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-label">The Problem</div>
          <h2>Every company could improve their GTM. The hard part is knowing which problems to fix first and how.</h2>
          <p className="lead-text">Every B2B company has a list of 20+ things they could fix. New messaging. Pricing changes. Battle cards. ROI calculators. Case studies. The question isn't what's wrong—it's which problems are actually costing you revenue.</p>
          
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">📊</div>
              <h3>Marketing's Priorities</h3>
              <p>Rebrand the website, build more top-of-funnel content, launch ABM campaigns, get more MQLs in the pipeline.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">💰</div>
              <h3>Sales' Priorities</h3>
              <p>Lower pricing, build competitive battle cards, create better demos, get more qualified leads from marketing.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🎯</div>
              <h3>Product's Priorities</h3>
              <p>Add features competitors have, build integrations customers request, improve the UI, close feature gaps.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">👔</div>
              <h3>CEO's Problem</h3>
              <p>Everyone has a different opinion about what's broken. No data to know who's right. Deals are still dying and nobody knows why.</p>
            </div>
          </div>

          <div className="callout-box">
            <p>Result: You spend 6 months fixing the wrong problem while the real revenue killers go unaddressed.</p>
          </div>
        </div>
      </section>

      <section className="section-alt" id="solution">
        <div className="container">
          <div className="section-label">The Solution</div>
          <h2>Systematic Diagnosis + Guided Execution</h2>
          <p className="lead-text">We analyze your entire commercial model across 30 factors—value articulation, pricing architecture, competitive positioning, sales enablement, buyer trust—benchmarked against comparable companies in your category. Then we give you the execution platform to actually fix what matters.</p>
          
          <div className="solution-steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Diagnostic</h3>
                <p>Score your GTM across 5 dimensions with 30 underlying factors. No surveys, no 6-week consulting engagements. Just your website, sales materials, and competitive intel.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Prioritized Roadmap</h3>
                <p>Not a balanced scorecard. A prioritized punch list: "Your pricing is fine. Your buyer enablement is costing you $2M. Fix it first, here's how."</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Guided Execution</h3>
                <p>Platform with workflow templates, progress tracking, and expert coaching. We review your work, validate you're on track, measure the revenue impact quarterly.</p>
              </div>
            </div>
          </div>

          <div className="example-box">
            <h3>The Output: Benchmark Data, Not Consultant Opinions</h3>
            <p className="example-lead">Example from a recent $25M ARR SaaS company:</p>
            <div className="example-items">
              <div className="example-item">
                <strong>Priority 1:</strong>
                <span>Pricing architecture is costing you $1.8M annually. You have no usage tiers and your enterprise pricing is 40% below market.</span>
              </div>
              <div className="example-item">
                <strong>Priority 2:</strong>
                <span>Your buyers can't self-qualify. 60% of deals stall in procurement because they don't have ROI calculators or business case templates.</span>
              </div>
              <div className="example-item">
                <strong>Priority 3:</strong>
                <span>Your competitive positioning is fine. Stop obsessing over the website redesign. Sales needs battle cards, not new messaging.</span>
              </div>
            </div>
            <p style={{ marginTop: '2rem', color: 'var(--color-text-gray)' }}>Then you get workflow templates to fix each priority: pricing tier calculator, ROI template builder, battle card framework—with expert review at each milestone.</p>
          </div>
        </div>
      </section>

      <section className="calculator-section" id="calculator">
        <div className="calculator-container">
          <div className="calculator-header">
            <h2>Are You Underperforming Your Category?</h2>
            <p>Compare your metrics to industry benchmarks in 60 seconds</p>
          </div>

          <div className="calculator-body">
            <div className="input-section">
              <div className="input-group">
                <div className="input-label">
                  <span>Annual Recurring Revenue (ARR)</span>
                  <span>${arr}M</span>
                </div>
                <input 
                  type="range" 
                  className="slider" 
                  min="1" 
                  max="100" 
                  step="1" 
                  value={arr}
                  onChange={(e) => setArr(parseInt(e.target.value))}
                />
                <div className="slider-scale">
                  <span>$1M</span>
                  <span>$100M</span>
                </div>
              </div>

              <div className="input-group">
                <div className="input-label">
                  <span>Average Contract Value (ACV)</span>
                  <span>${acv}K</span>
                </div>
                <input 
                  type="range" 
                  className="slider" 
                  min="5" 
                  max="500" 
                  step="5" 
                  value={acv}
                  onChange={(e) => setAcv(parseInt(e.target.value))}
                />
                <div className="slider-scale">
                  <span>$5K</span>
                  <span>$500K</span>
                </div>
              </div>

              <div className="input-group">
                <div className="input-label">
                  <span>Win Rate (Closed-Won / Total Opportunities)</span>
                  <span>{winRate}%</span>
                </div>
                <input 
                  type="range" 
                  className="slider" 
                  min="10" 
                  max="60" 
                  step="5" 
                  value={winRate}
                  onChange={(e) => setWinRate(parseInt(e.target.value))}
                />
                <div className="slider-scale">
                  <span>10%</span>
                  <span>60%</span>
                </div>
              </div>

              <div className="input-group">
                <div className="input-label">
                  <span>Average Sales Cycle Length (Days)</span>
                  <span>{salesCycle} days</span>
                </div>
                <input 
                  type="range" 
                  className="slider" 
                  min="30" 
                  max="365" 
                  step="15" 
                  value={salesCycle}
                  onChange={(e) => setSalesCycle(parseInt(e.target.value))}
                />
                <div className="slider-scale">
                  <span>30 days</span>
                  <span>365 days</span>
                </div>
              </div>

              <div className="input-group">
                <div className="input-label">
                  <span>Net Revenue Retention (NRR)</span>
                  <span>{nrr}%</span>
                </div>
                <input 
                  type="range" 
                  className="slider" 
                  min="80" 
                  max="150" 
                  step="5" 
                  value={nrr}
                  onChange={(e) => setNrr(parseInt(e.target.value))}
                />
                <div className="slider-scale">
                  <span>80%</span>
                  <span>150%</span>
                </div>
              </div>
            </div>

            <div className="results-section">
              <div className="results-header">
                <h3>Your Performance vs. Industry Benchmark</h3>
                <div className="results-score">
                  <span className={`score-value ${getScoreClass()}`}>{results.score}</span>
                  <span className="score-max">/10</span>
                </div>
                <p className="score-interpretation">{results.interpretation}</p>
              </div>

              <div className="results-grid">
                <div className="result-item">
                  <h4>Recoverable Revenue</h4>
                  <div className="value">{results.revenueAtRisk}</div>
                  <div className="description">Annual opportunity from closing performance gap to industry benchmark</div>
                </div>

                <div className="result-item">
                  <h4>Primary Performance Gap</h4>
                  <div className="value" style={{ fontSize: '1.5rem' }}>{results.biggestGap}</div>
                  <div className="description">{results.gapDescription}</div>
                </div>
              </div>

              <div className="result-breakdown">
                <h4>Benchmark Comparison</h4>
                <div className="breakdown-items">
                  <div className="breakdown-item">
                    <span className="label">Your Current ARR</span>
                    <span className="value">{results.calcARR}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Performance Score</span>
                    <span className="value">{results.calcScore}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Win rate gap vs. benchmark</span>
                    <span className="value">{results.calcWinRate}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Sales cycle gap vs. benchmark</span>
                    <span className="value">{results.calcCycle}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Revenue opportunity (annual)</span>
                    <span className="value">{results.calcImpact}</span>
                  </div>
                </div>
              </div>

              <div className="calculator-cta">
                <h3>Want to Know WHY You're Underperforming?</h3>
                <p>Get a free GTM diagnostic showing exactly which gaps are causing your low win rate or long sales cycle—and how to fix them.<br/><strong>Delivered within 48 hours.</strong></p>
                <a href="#free-report" className="btn-primary">Get Your Free Diagnostic →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="container">
          <div className="section-label">Pricing</div>
          <h2>Pick Your Starting Point</h2>
          <p className="lead-text">No long-term contracts. Clear pricing. Just pick the tier that matches where you are.</p>
          
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Free Diagnostic</h3>
                <div className="pricing-price">$0</div>
                <p className="pricing-description">Get your GTM score and top 3 priorities. No platform access, no expert support.</p>
              </div>
              <ul className="pricing-features">
                <li>Website analysis (48-hour turnaround)</li>
                <li>GTM Health Score across 5 dimensions</li>
                <li>Top 3 priority gaps identified</li>
                <li>Brief recommendations for each</li>
                <li>Benchmarked vs. your category</li>
                <li>Optional 15-min results review call</li>
              </ul>
              <a href="#free-report" className="pricing-cta">Request Free Diagnostic</a>
              <p className="pricing-note">Best for: "How bad is it really?"</p>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Quick Win</h3>
                <div className="pricing-price">$1,995<small>/month</small></div>
                <p className="pricing-description">Rapid diagnostic across all 5 dimensions. We tell you your #1 priority and help you fix it in 90 days.</p>
              </div>
              <ul className="pricing-features">
                <li>Rapid diagnostic (all 5 dimensions, 5-7 days)</li>
                <li>We identify your #1 revenue-killing gap</li>
                <li>90-day focused roadmap</li>
                <li>Platform access (priority-focused workflows)</li>
                <li>3 expert coaching hours per month</li>
                <li>Progress tracking & quarterly check-in</li>
              </ul>
              <a href="#free-report" className="pricing-cta">Get Started</a>
              <p className="pricing-note">3-month minimum • $5,985 billed upfront</p>
            </div>

            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Full Picture</h3>
                <div className="pricing-price">$2,995<small>/month</small></div>
                <p className="pricing-description">Comprehensive diagnostic with complete prioritized roadmap across all 5 dimensions.</p>
              </div>
              <ul className="pricing-features">
                <li>Deep diagnostic (all 5 dimensions, 10-14 days)</li>
                <li>Complete prioritized roadmap (12 months)</li>
                <li>Revenue impact modeling for each priority</li>
                <li>Platform access (all dimension workflows)</li>
                <li>5 expert coaching hours per month</li>
                <li>Quarterly business reviews with benchmarking</li>
              </ul>
              <a href="#free-report" className="pricing-cta">Get Started</a>
              <p className="pricing-note">6-month minimum • $17,970 billed upfront</p>
            </div>
          </div>

          <div className="callout-box" style={{ marginTop: '3rem' }}>
            <p style={{ marginBottom: '1rem' }}><strong>Need more expert time?</strong> Purchase service packs beyond your included hours:</p>
            <p style={{ color: 'var(--color-text-gray)', fontWeight: 400 }}>
              • 10-Hour Pack: $1,800 (save 10%)<br/>
              • 20-Hour Pack: $3,400 (save 15%)<br/>
              • 40-Hour Pack: $6,400 (save 20%)
            </p>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="section-label">Why This, Not That</div>
          <h2>vs. Your Other Options</h2>
          
          <div className="comparison-grid">
            <div className="comparison-card">
              <div className="comparison-label">Traditional Consulting</div>
              <h3>Bain / McKinsey</h3>
              <ul className="comparison-list">
                <li className="positive">Strategic thinking</li>
                <li className="positive">Executive credibility</li>
                <li className="negative">$100K+ price tag</li>
                <li className="negative">6-8 week timeline</li>
                <li className="negative">No benchmark data</li>
                <li className="negative">No execution support</li>
              </ul>
            </div>

            <div className="comparison-card">
              <div className="comparison-label">Hiring</div>
              <h3>VP Product Marketing</h3>
              <ul className="comparison-list">
                <li className="positive">Dedicated resource</li>
                <li className="positive">Owns execution</li>
                <li className="negative">$200K+ fully loaded</li>
                <li className="negative">3-6 month ramp time</li>
                <li className="negative">No external benchmarks</li>
                <li className="negative">Their opinions, not data</li>
              </ul>
            </div>

            <div className="comparison-card">
              <div className="comparison-label">Remidi Works</div>
              <h3>Platform + Expert Validation</h3>
              <ul className="comparison-list">
                <li className="positive">Category benchmark data</li>
                <li className="positive">Systematic methodology</li>
                <li className="positive">$2K-$3K/month platform</li>
                <li className="positive">5-14 day turnaround</li>
                <li className="positive">Guided execution workflows</li>
                <li className="positive">Expert validation + coaching</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" id="free-report">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Request your free GTM diagnostic or book a 15-minute call to discuss your specific situation.</p>
          
          <div className="hs-form-frame" data-region="na1" data-form-id="29ab8810-c12e-4d57-8eb5-a17c5fa94d5b" data-portal-id="45784330"></div>
          
          <div style={{ marginTop: '2rem' }}>
            <a href="https://calendly.com/michaelhimmelfarb" className="btn-primary">Or Schedule a Call</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© 2026 Remidi Works. Built by <a href="https://www.linkedin.com/in/michaelhimmelfarb/">Michael Himmelfarb</a>, Ex-Nielsen Global GM | 3x CMO | PE Operating Partner</p>
          <p style={{ marginTop: '1rem' }}>Questions? Email <a href="mailto:michael@remidiworks.com">michael@remidiworks.com</a></p>
        </div>
      </footer>
    </div>
  );
};

export default RemidiLandingPage;
