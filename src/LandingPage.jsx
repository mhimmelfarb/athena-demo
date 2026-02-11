import React from 'react';
import './Home.css';

function Home() {
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-container">
                        <img src="/rw-logo.png" alt="Remidi Works" className="logo-img" />
                        <span className="logo-text">Remidi Works</span>
                    </div>
                </div>
            </header>

            <section className="hero">
                <div className="container">
                    <div className="hero-content-wrapper">
                        <div className="hero-text">
                            <p className="eyebrow">For Growth Equity & Middle Market PE Investors</p>
                            <h1>Portfolio-wide GTM Strategy measurement. Smarter operating decisions.</h1>
                            <p className="subhead">Reliable visibility into portfolio GTM health showing where to focus to unlock value and track progress.</p>
                            <div className="cta-group">
                                <a href="https://athena-demo-six.vercel.app" className="btn-primary" target="_blank" rel="noopener noreferrer">See the portfolio demo</a>
                                <a href="https://calendly.com/michaelhimmelfarb" className="btn-secondary" target="_blank" rel="noopener noreferrer">Request a portfolio scan</a>
                            </div>
                        </div>

                        <div className="hero-image">
                            <p className="hero-image-caption">Live portfolio dashboard showing GTM health across 10 companies →</p>
                            <img src="/portfolio-dashboard.png" alt="Portfolio dashboard preview" />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container-narrow">
                    <h2>You track your top of funnel and sales execution metrics. What about GTM Strategy effectiveness?</h2>
                    
                    <p>Your portfolio companies report MQLs, pipeline coverage, close rates, churn. Those numbers tell you about execution—how hard teams are working. But they don't tell you if the underlying Strategy is sound:</p>
                    
                    <ul>
                        <li>
                            <span className="icon-bullet">1</span>
                            <span>Is the company actually differentiated, or just a commodity?</span>
                        </li>
                        <li>
                            <span className="icon-bullet">2</span>
                            <span>Is the pricing architecture designed to capture maximum value?</span>
                        </li>
                        <li>
                            <span className="icon-bullet">3</span>
                            <span>Can the market clearly understand why this product wins?</span>
                        </li>
                        <li>
                            <span className="icon-bullet">4</span>
                            <span>Is structural friction in the buying process killing conversion?</span>
                        </li>
                    </ul>
                    
                    <p>This strategic layer is invisible in your current dashboards. When it's broken, you're accelerating burn on a flawed foundation. That's where 20-30% of potential revenue leaks out.</p>
                    
                    <div className="content-image">
                        <img src="/4.svg" alt="GTM Strategy gap showing the invisible layer between demand gen and sales execution" />
                    </div>
                </div>
            </section>

            <section className="alt-bg">
                <div className="container">
                    <h2 style={{ textAlign: 'center' }}>What portfolio-wide GTM Strategy visibility gives you</h2>
                    <p className="section-intro">Remidi provides what your current portfolio dashboards don't:</p>
                    
                    {/* Benefit 1: Standardized Strategic Scoring */}
                    <div className="benefit-row">
                        <div className="benefit-content">
                            <h3>Standardized Strategic Scoring</h3>
                            <p>Replace gut feel with a rigorous framework applied across your entire portfolio. Compare GTM Strategy health with the same objectivity you use for EBITDA and net retention.</p>
                        </div>
                        <div className="benefit-image">
                            <img src="/benefit-1-scoring.png" alt="Portfolio table showing standardized GTM health scores across companies" />
                        </div>
                    </div>

                    {/* Benefit 2: Vindicate Operating Interventions */}
                    <div className="benefit-row reverse">
                        <div className="benefit-content">
                            <h3>Vindicate Operating Interventions</h3>
                            <p>Show LPs which GTM pivots actually worked. Replace subjective progress reports with objective before-and-after scores that prove your operating playbook delivers value.</p>
                        </div>
                        <div className="benefit-image">
                            <img src="/benefit-2-interventions.png" alt="Dimension insights showing gaps to top quartile with portfolio upside values" />
                        </div>
                    </div>

                    {/* Benefit 3: LP-Ready Accountability */}
                    <div className="benefit-row">
                        <div className="benefit-content">
                            <h3>LP-Ready Accountability</h3>
                            <p>Upgrade your quarterly reporting. Show LPs exactly where you identified strategic risk, what you fixed, and how the asset improved—with the same rigor you report revenue metrics.</p>
                        </div>
                        <div className="benefit-image">
                            <img src="/benefit-3-accountability.png" alt="Strategic priority callout with detailed dimension scorecards" />
                        </div>
                    </div>

                    {/* Benefit 4: Smarter Resource Allocation */}
                    <div className="benefit-row reverse">
                        <div className="benefit-content">
                            <h3>Smarter Resource Allocation</h3>
                            <p>Stop peanut-buttering operating resources across your portfolio. Identify the 20% of companies where a strategic GTM fix will drive 80% of your incremental growth.</p>
                        </div>
                        <div className="benefit-image">
                            <img src="/benefit-4-allocation.png" alt="Prioritized opportunity ranking showing initiatives by impact and effort" />
                        </div>
                    </div>

                    {/* Benefit 5: Cross-Portfolio Benchmarking */}
                    <div className="benefit-row">
                        <div className="benefit-content">
                            <h3>Cross-Portfolio Benchmarking</h3>
                            <p>See how your portfolio's GTM health compares to other middle-market B2B SaaS companies and funds (as data scales). Identify best-in-class patterns you can replicate across your holdings.</p>
                        </div>
                        <div className="benefit-image">
                            <img src="/benefit-5-benchmarking.png" alt="Fund performance ranking comparing portfolio to peer funds" />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container-narrow">
                    <h2>Expert Built</h2>
                    <p className="section-intro" style={{ marginBottom: '40px' }}>Bringing together marketing leadership, large-scale data business experience, and PE operating expertise.</p>

                    <div className="bio-section">
                        <div className="bio-image">
                            <img src="/headshot.png" alt="Michael Himmelfarb" />
                        </div>

                        <div className="bio-content">
                            <h3>Michael Himmelfarb</h3>
                            <p className="bio-title">Founder & Lead Diagnostician</p>

                            <ul style={{ marginTop: '24px' }}>
                                <li>
                                    <span className="icon-bullet">•</span>
                                    <span><strong>Data & Analytics Business Builder</strong> — 14 years at Nielsen running $100M+ measurement businesses. Six Sigma Black Belt.</span>
                                </li>
                                <li>
                                    <span className="icon-bullet">•</span>
                                    <span><strong>Operating Partner at 3 Venture Funds</strong> — Perspective from both sides of the table.</span>
                                </li>
                                <li>
                                    <span className="icon-bullet">•</span>
                                    <span><strong>GTM Strategy Operator</strong> — Former CMO at 4 B2B SaaS companies. Led 40 GTM transformations.</span>
                                </li>
                                <li>
                                    <span className="icon-bullet">•</span>
                                    <span><strong>All-Star Advisory Team</strong> — Marketing leaders, AI/tech experts, PE investors, and operators.</span>
                                </li>
                            </ul>

                            <p style={{ marginTop: '24px' }}><a href="https://www.linkedin.com/in/michaelhimmelfarb" target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn</a></p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="final-cta">
                <div className="container">
                    <h2>See your portfolio's GTM health</h2>
                    <p className="subtext">Built for middle-market PE firms with B2B SaaS portfolios ($5M-$60M ARR)</p>
                    
                    <div className="cta-options">
                        <div className="cta-card">
                            <h3>Request Portfolio Scan</h3>
                            <p>Get standardized GTM health scores across your portfolio in 7 business days. See which companies need attention and where to focus operating resources.</p>
                            <a href="https://calendly.com/michaelhimmelfarb" className="btn-primary" target="_blank" rel="noopener noreferrer">Schedule call</a>
                        </div>
                        
                        <div className="cta-card">
                            <h3>See Live Demo</h3>
                            <p>View a working portfolio dashboard showing how 8 companies compare on GTM Strategy health. See the methodology in action.</p>
                            <a href="https://athena-demo-six.vercel.app" className="btn-primary" target="_blank" rel="noopener noreferrer">View demo</a>
                        </div>
                    </div>
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