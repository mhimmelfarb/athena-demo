import React from 'react';
import './Home.css';

function Home() {
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo">Remidi Works</div>
                </div>
            </header>

            <section className="hero">
                <div className="container">
                    <p className="eyebrow">For Growth Equity & Middle Market PE Investors</p>
                    <h1>Portfolio-wide GTM Strategy measurement. Smarter operating decisions.</h1>
                    <p className="subhead">Reliable visibility into portfolio GTM health showing where to focus to unlock value and tracks whether it's working.</p>
                    <div className="cta-group">
                        <a href="https://athena-demo-six.vercel.app" className="btn-primary" target="_blank" rel="noopener noreferrer">See the portfolio demo</a>
                        <a href="https://calendly.com/michaelhimmelfarb" className="btn-secondary" target="_blank" rel="noopener noreferrer">Or request a portfolio scan</a>
                    </div>
                </div>
            </section>

            <section>
                <div className="container-narrow">
                    <h2>You measure demand gen execution and sales execution. But not GTM strategy.</h2>
                    
                    {/* GTM Gap Graphic */}
                    <div style={{ margin: '40px 0', textAlign: 'center' }}>
                        <img src="/4.svg" alt="GTM Strategy Gap Diagram showing Demand Gen Execution → GTM Strategy Layer → Sales Execution" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                    </div>
                    
                    <p>Your portfolio companies report the standard metrics: MQLs, pipeline coverage, close rates, churn. Those numbers tell you about execution—how hard teams are working.</p>
                    
                    <p>But they don't tell you if the underlying strategy is sound:</p>
                    
                    <ul>
                        <li style={{ marginBottom: '16px' }}><span style={{ fontSize: '20px', marginRight: '12px' }}>🎯</span> <strong>Defensible Positioning</strong> — Is the company actually differentiated, or just a commodity?</li>
                        <li style={{ marginBottom: '16px' }}><span style={{ fontSize: '20px', marginRight: '12px' }}>💰</span> <strong>Monetization Logic</strong> — Is the pricing architecture designed to capture maximum value?</li>
                        <li style={{ marginBottom: '16px' }}><span style={{ fontSize: '20px', marginRight: '12px' }}>💡</span> <strong>Value Articulation</strong> — Can the market (and the sales team) clearly understand why this product wins?</li>
                        <li style={{ marginBottom: '16px' }}><span style={{ fontSize: '20px', marginRight: '12px' }}>🤝</span> <strong>Buyer Enablement</strong> — Is structural friction in the buying process killing conversion?</li>
                    </ul>
                    
                    <p>This is the strategic layer—the connective tissue between marketing and sales. It's invisible in your current dashboards, and it stays invisible until a quarter is missed.</p>
                    
                    <p>When this layer is broken, it doesn't matter how much you invest in execution. You're just accelerating burn on a flawed foundation. That's where 20-30% of potential revenue leaks out—and where your IRR gets crushed.</p>
                </div>
            </section>

            <section className="alt-bg">
                <div className="container-narrow">
                    <h2>Portfolio-wide GTM strategy visibility</h2>
                    
                    <p className="subhead-section">Remidi provides what your current portfolio dashboards don't:</p>
                    
                    <div className="benefit-grid">
                        <div className="benefit-item">
                            <h4>Standardized Strategic Scoring</h4>
                            <p>Replace gut feel with a rigorous framework applied across your entire portfolio. Compare GTM strategy health with the same objectivity you use for EBITDA and net retention.</p>
                        </div>
                        
                        <div className="benefit-item">
                            <h4>Vindicate Operating Interventions</h4>
                            <p>Show LPs which GTM pivots actually worked. Replace subjective progress reports with objective before-and-after scores that prove your operating playbook delivers value.</p>
                        </div>
                        
                        <div className="benefit-item">
                            <h4>LP-Ready Accountability</h4>
                            <p>Upgrade your quarterly reporting. Show LPs exactly where you identified strategic risk, what you fixed, and how the asset improved—with the same rigor you report revenue metrics.</p>
                        </div>
                        
                        <div className="benefit-item">
                            <h4>Smarter Resource Allocation</h4>
                            <p>Stop peanut-buttering operating resources across your portfolio. Identify the 20% of companies where a strategic GTM fix will drive 80% of your incremental growth.</p>
                        </div>
                        
                        <div className="benefit-item benefit-full-width">
                            <h4>Cross-Portfolio Benchmarking</h4>
                            <p>See how your portfolio's GTM health compares to other middle-market B2B SaaS companies and funds (as data scales). Identify best-in-class patterns you can replicate across your holdings.</p>
                        </div>
                    </div>
                    
                    {/* Portfolio Dashboard */}
                    <div style={{ margin: '40px 0', textAlign: 'center' }}>
                        <img src="/1.svg" alt="Portfolio Dashboard showing company health scores and individual company scorecard" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                    </div>
                </div>
            </section>

            <section>
                <div className="container-narrow">
                    <h2>Three steps. One integrated system.</h2>
                    <p className="subhead-section">Built to work with the data you're already collecting.</p>
                    
                    {/* Process Flow Graphic */}
                    <div style={{ margin: '60px auto 0', maxWidth: '900px' }}>
                        <svg viewBox="0 0 900 200" style={{ maxWidth: '100%', height: 'auto' }}>
                            {/* Stage 1: SCAN */}
                            <g>
                                <circle cx="150" cy="80" r="50" fill="#f0f7ff" stroke="#3D5A80" strokeWidth="2"/>
                                <circle cx="146" cy="76" r="15" fill="none" stroke="#3D5A80" strokeWidth="2.5"/>
                                <line x1="157" y1="87" x2="167" y2="97" stroke="#3D5A80" strokeWidth="2.5" strokeLinecap="round"/>
                                <text x="150" y="160" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#3D5A80" letterSpacing="0.5">STEP 1: SCAN</text>
                            </g>
                            
                            {/* Arrow 1 */}
                            <defs>
                                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                    <polygon points="0 0, 10 3, 0 6" fill="#98C1D9" />
                                </marker>
                            </defs>
                            <path d="M 220 80 L 330 80" stroke="#98C1D9" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
                            
                            {/* Stage 2: TRACK */}
                            <g>
                                <circle cx="450" cy="80" r="50" fill="#f0f7ff" stroke="#3D5A80" strokeWidth="2"/>
                                <rect x="428" y="68" width="44" height="26" rx="2" fill="none" stroke="#3D5A80" strokeWidth="2"/>
                                <line x1="433" y1="76" x2="445" y2="88" stroke="#3D5A80" strokeWidth="2" strokeLinecap="round"/>
                                <line x1="445" y1="88" x2="453" y2="76" stroke="#3D5A80" strokeWidth="2" strokeLinecap="round"/>
                                <line x1="453" y1="76" x2="465" y2="84" stroke="#3D5A80" strokeWidth="2" strokeLinecap="round"/>
                                <text x="450" y="160" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#3D5A80" letterSpacing="0.5">STEP 2: TRACK</text>
                            </g>
                            
                            {/* Arrow 2 */}
                            <path d="M 520 80 L 630 80" stroke="#98C1D9" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
                            
                            {/* Stage 3: DIAGNOSE */}
                            <g>
                                <circle cx="750" cy="80" r="50" fill="#f0f7ff" stroke="#3D5A80" strokeWidth="2"/>
                                <rect x="733" y="64" width="34" height="42" rx="1.5" fill="none" stroke="#3D5A80" strokeWidth="2"/>
                                <line x1="739" y1="74" x2="761" y2="74" stroke="#3D5A80" strokeWidth="1.5"/>
                                <line x1="739" y1="82" x2="761" y2="82" stroke="#3D5A80" strokeWidth="1.5"/>
                                <line x1="739" y1="90" x2="753" y2="90" stroke="#3D5A80" strokeWidth="1.5"/>
                                <text x="750" y="160" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#3D5A80" letterSpacing="0.5">STEP 3: DIAGNOSE</text>
                            </g>
                        </svg>
                    </div>
                    
                    {/* Three tile cards directly below each circle */}
                    <div className="process-tiles" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="benefit-item">
                            <p style={{ marginBottom: '12px' }}>You provide basic information on each portfolio company (URL, revenue stage, category, key metrics you're already tracking). We deliver a portfolio dashboard showing which companies have strategic GTM gaps and where they're concentrated.</p>
                            <p className="timeline" style={{ marginBottom: 0 }}>Timeline: 7 business days</p>
                        </div>
                        
                        <div className="benefit-item">
                            <p style={{ marginBottom: 0 }}>We update scores on your chosen cadence (monthly or quarterly) based on the metrics you're already collecting—supplemented by our market research and competitive intelligence. Track which companies are improving and whether your operating interventions are working. The system signals revenue plateaus 6 months before they hit the P&L.</p>
                        </div>
                        
                        <div className="benefit-item">
                            <p style={{ marginBottom: 0 }}>For companies that need intervention, we provide detailed diagnostics including root cause analysis of what's specifically broken, revenue impact modeling showing which gaps cost the most, quick wins you can implement immediately, a 90-day prioritized roadmap with measurable milestones, and revised GTM strategy guidelines your team can execute against.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="alt-bg">
                <div className="container-narrow">
                    <h2>The Charter Member Benchmark</h2>
                    <p className="subhead-section">An invitation-only program for 10-15 middle-market PE firms to build the first comprehensive B2B SaaS GTM strategy benchmark.</p>
                    
                    <div className="callout">
                        <h4>Charter Member Advantages</h4>
                        <p><strong>Priority access to aggregated benchmark data</strong> as the dataset scales—see how your portfolio compares to peers on GTM strategy health.</p>
                        <p><strong>Methodology governance.</strong> Quarterly steering committee input on which dimensions matter most and how to evolve the scoring framework.</p>
                        <p><strong>Enhanced LP narrative.</strong> Show LPs you're not just operating on gut feel—you're using objective, data-backed GTM strategy scores to drive portfolio value.</p>
                        <p><strong>Preferred pricing locked in permanently</strong> for your current and future portfolio companies.</p>
                    </div>
                    
                    <p><strong>Data commitment:</strong> Portfolio companies provide anonymized standard metrics only (ARR, NRR, GRR, Win Rate, Sales Cycle, CAC, LTV). Zero PII, institutional-grade confidentiality.</p>
                    
                    <p><strong>Why this matters:</strong> The firms that define the benchmark shape the standard. Early participants gain permanent pricing advantages and first access to cross-portfolio intelligence as the dataset scales.</p>
                    
                    {/* Data Flywheel */}
                    <div style={{ margin: '40px 0', textAlign: 'center' }}>
                        <img src="/5.svg" alt="Data Flywheel showing network effects: More portfolio companies → More precise benchmarks → Better LP reporting → More valuable platform → Attracts more participants" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                </div>
            </section>

            <section>
                <div className="container-narrow">
                    <h2>Who built this</h2>
                    
                    <p className="subhead-section">Built by operators from world-class companies</p>
                    
                    {/* LOGO GRID PLACEHOLDER - Add your company logos here */}
                    <div style={{ margin: '40px 0', padding: '40px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>Company logos from leadership roles will be displayed here</p>
                    </div>
                    
                    <p>Our team has built global analytics businesses at Nielsen, led GTM organizations at multiple growth-stage B2B companies, and advised PE-backed portfolio companies on commercial strategy.</p>
                    
                    <p>We've run 50+ B2B pricing transformations, diagnosed GTM strategy gaps across dozens of sectors, and built the proprietary methodology that powers Remidi's diagnostic framework.</p>
                    
                    <p>This isn't consulting theory. It's a systematic approach built from years of operating experience—packaged as measurement infrastructure PE firms can use across their entire portfolios.</p>
                </div>
            </section>

            <section className="alt-bg">
                <div className="container-narrow">
                    <h2>When a portfolio company needs intervention</h2>
                    <p className="subhead-section">Step 3 diagnostics provide the strategic foundation for operating decisions.</p>
                    
                    <p>Remidi's detailed company-level diagnostics give you everything you need to understand what's broken and build the roadmap to fix it:</p>
                    
                    <ul>
                        <li><strong>6-dimension health score</strong> isolating exactly where the GTM strategy is failing</li>
                        <li><strong>Root cause analysis</strong> showing what's specifically broken (not just symptoms)</li>
                        <li><strong>Revenue impact modeling</strong> quantifying which gaps cost the most</li>
                        <li><strong>Quick wins</strong> you can implement immediately to stop the bleeding</li>
                        <li><strong>90-day prioritized roadmap</strong> with measurable milestones</li>
                        <li><strong>Revised GTM strategy guidelines</strong> your team can execute against</li>
                    </ul>
                    
                    <p>This becomes the foundation for hiring decisions (do we need a new CMO or can the current team execute?), org restructuring (is the problem structural?), or bringing in implementation support.</p>
                    
                    {/* Company Scorecard Detailed */}
                    <div style={{ margin: '40px 0', textAlign: 'center' }}>
                        <img src="/3.svg" alt="Individual company scorecard showing 6 dimension bars with scores, top priorities highlighted with revenue impact" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                    </div>
                </div>
            </section>

            <section>
                <div className="container-narrow">
                    <h2>Hands-on implementation support</h2>
                    
                    <p>For hands-on implementation, we work with <strong>HG Partners</strong>—a boutique firm that uses the Remidi diagnostic methodology to coach execution and drive change.</p>
                    
                    <p>HG Partners operates as an extension of your operating team and works with a limited number of portfolio companies each quarter.</p>
                    
                    <p><a href="http://hg-partners.com" className="text-link" target="_blank" rel="noopener noreferrer">Learn more about HG Partners</a></p>
                </div>
            </section>

            <section className="final-cta">
                <div className="container">
                    <h2>See what portfolio GTM intelligence looks like</h2>
                    <p className="subtext">Built for middle-market PE firms with B2B SaaS portfolios ($5M-$60M ARR)</p>
                    
                    <div className="cta-options">
                        <div className="cta-card">
                            <h3>Portfolio Health Scan</h3>
                            <p>Get a standardized health score across your portfolio companies in 7 business days. See which companies have strategic GTM gaps and where to prioritize operating resources.</p>
                            <a href="https://calendly.com/michaelhimmelfarb" className="btn-primary" target="_blank" rel="noopener noreferrer">Request portfolio scan</a>
                        </div>
                        
                        <div className="cta-card">
                            <h3>See the Live Demo</h3>
                            <p>View a working portfolio dashboard showing how 8 companies compare on GTM strategy health. See the diagnostic methodology in action.</p>
                            <a href="https://athena-demo-six.vercel.app" className="btn-primary" target="_blank" rel="noopener noreferrer">View portfolio demo</a>
                        </div>
                    </div>
                    
                    <p className="disclaimer">All portfolio data handled with institutional-grade confidentiality.<br />
                    Charter Member applications reviewed on rolling basis.</p>
                </div>
            </section>

            <footer>
                <div className="container">
                    <p>© 2026 Remidi Works. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default Home;
