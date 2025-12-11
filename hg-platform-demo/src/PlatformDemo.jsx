import React, { useState } from 'react';

const PlatformDemo = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({
    valueArticulation: 4.0,
    competitivePosition: 5.0,
    pricingHealth: 6.5,
    salesEnablement: 3.5,
    midFunnel: null
  });
  const [overallScore, setOverallScore] = useState(4.8);
  const [showTyping, setShowTyping] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [roiData, setRoiData] = useState(null);

  const handleNext = () => {
    if (step === 2 && !questionAnswered) {
      setShowTyping(true);
      setTimeout(() => {
        setScores(prev => ({
          ...prev,
          valueArticulation: 3.5,
          salesEnablement: 3.0,
          midFunnel: 4.5
        }));
        setOverallScore(4.5);
        setShowTyping(false);
        setQuestionAnswered(true);
      }, 1500);
    } else if (step === 5) {
      setShowTyping(true);
      setTimeout(() => {
        setRoiData({
          timeSavings: 20800,
          costDisplacement: 15000,
          riskMitigation: 8500,
          total: 44300
        });
        setShowTyping(false);
        setStep(step + 1);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  const ScoreBar = ({ label, score, previousScore, showChange = true }) => {
    const width = score ? (score / 10) * 100 : 0;
    const improved = previousScore && score > previousScore;
    const declined = previousScore && score < previousScore;
    
    return (
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <div className="flex items-center gap-2">
            {score ? (
              <>
                <span className={`text-sm font-bold ${
                  score >= 7 ? 'text-green-600' : score >= 5 ? 'text-yellow-600' : 'text-red-500'
                }`}>{score.toFixed(1)}</span>
                {showChange && previousScore && score !== previousScore && (
                  <span className={`text-xs ${improved ? 'text-green-500' : 'text-red-500'}`}>
                    {improved ? '↑' : '↓'} from {previousScore.toFixed(1)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm text-gray-400 italic">No data</span>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full transition-all duration-1000 ${
              score >= 7 ? 'bg-green-500' : score >= 5 ? 'bg-yellow-500' : score ? 'bg-red-400' : 'bg-gray-300'
            }`}
            style={{ width: `${width}%` }}
          />
        </div>
      </div>
    );
  };

  const Dashboard = ({ minimal, showChanges = false, finalState = false }) => {
    const displayScores = finalState ? {
      valueArticulation: 5.5,
      competitivePosition: 5.0,
      pricingHealth: 6.5,
      salesEnablement: 3.5,
      midFunnel: 4.5
    } : scores;
    
    const displayOverall = finalState ? 5.0 : overallScore;
    
    return (
      <div className={`bg-white rounded-xl shadow-lg ${minimal ? 'p-4' : 'p-6'}`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">TechFlow Solutions</h2>
            <p className="text-sm text-gray-500">Commercial Marketing Health</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <div className="text-3xl font-bold text-indigo-600">{displayOverall}</div>
              {finalState && (
                <span className="text-sm text-green-500">↑ from 4.5</span>
              )}
            </div>
            <div className="text-xs text-gray-500">Overall Score</div>
          </div>
        </div>
        
        <div className="space-y-1">
          <ScoreBar 
            label="Value Articulation" 
            score={displayScores.valueArticulation} 
            previousScore={finalState ? 3.5 : (showChanges ? 4.0 : null)} 
          />
          <ScoreBar 
            label="Competitive Position" 
            score={displayScores.competitivePosition} 
            previousScore={null}
          />
          <ScoreBar 
            label="Pricing Health" 
            score={displayScores.pricingHealth} 
            previousScore={null}
          />
          <ScoreBar 
            label="Sales Enablement" 
            score={displayScores.salesEnablement} 
            previousScore={showChanges && !finalState ? 3.5 : null}
          />
          <ScoreBar 
            label="Mid-Funnel Conversion" 
            score={displayScores.midFunnel} 
            previousScore={null}
          />
        </div>
      </div>
    );
  };

  const steps = [
    // Step 0: Welcome
    {
      content: (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              DEMO: First-Time User Journey
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Meet Jordan</h1>
            <p className="text-lg text-gray-600">Sr. Product Marketing Manager at TechFlow Solutions</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                👤
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Jordan's Situation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><strong>Company:</strong> $15M ARR B2B SaaS, Series B, 80 employees</li>
                  <li><strong>Role:</strong> Only product marketer. Reports to VP Marketing.</li>
                  <li><strong>Problem:</strong> CRO says marketing leads "don't convert." Jordan knows positioning and enablement are weak, but doesn't know where to start.</li>
                  <li><strong>Goal:</strong> Prove marketing's impact on revenue. Stop being blamed for "bad leads."</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-500">
            Click "Next" to see Jordan's first login experience →
          </div>
        </div>
      )
    },
    
    // Step 1: First login - pre-populated dashboard
    {
      content: (
        <div className="max-w-5xl mx-auto">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-indigo-700">
              <span className="text-xl">💡</span>
              <span><strong>Jordan logs in for the first time.</strong> The platform has already analyzed TechFlow's website to generate initial scores.</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Dashboard />
            </div>
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-700 font-medium mb-2">
                  ⚠️ Observable Gaps Found
                </div>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• No published pricing</li>
                  <li>• Value claims without proof points</li>
                  <li>• No ROI calculator</li>
                  <li>• Feature-led messaging</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow p-4">
                <div className="text-sm text-gray-500 mb-1">🤖 AI Coach</div>
                <p className="text-gray-700 text-sm">
                  "These are your initial scores based on what I can see publicly. Let's make them accurate — I have a few questions for you."
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Step 2: Diagnostic questions
    {
      content: (
        <div className="max-w-5xl mx-auto">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-indigo-700">
              <span className="text-xl">📋</span>
              <span><strong>The platform asks diagnostic questions.</strong> Each answer refines the scores.</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">🤖</div>
                  <span className="font-medium text-gray-700">AI Coach</span>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-indigo-400 pl-4">
                    <p className="text-gray-800 mb-3">"What's your current MQL to SQL conversion rate?"</p>
                    <div className={`bg-gray-50 rounded-lg p-3 ${questionAnswered ? 'border-2 border-green-300' : ''}`}>
                      <p className="text-gray-600 text-sm">{questionAnswered ? 'Jordan: "About 8%, maybe 10% on a good month."' : 'Click Next to answer...'}</p>
                    </div>
                  </div>
                  
                  {questionAnswered && (
                    <>
                      <div className="border-l-4 border-indigo-400 pl-4">
                        <p className="text-gray-800 mb-3">"Does your sales team use materials marketing created?"</p>
                        <div className="bg-gray-50 rounded-lg p-3 border-2 border-green-300">
                          <p className="text-gray-600 text-sm">Jordan: "Honestly? They made their own deck. Said ours 'didn't resonate.'"</p>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-indigo-400 pl-4">
                        <p className="text-gray-800 mb-3">"When a prospect asks 'why you vs. competitors?' — consistent answer?"</p>
                        <div className="bg-gray-50 rounded-lg p-3 border-2 border-green-300">
                          <p className="text-gray-600 text-sm">Jordan: "Not really. Everyone kind of wings it."</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {showTyping && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                      <span className="text-sm">Updating scores...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <Dashboard minimal showChanges={questionAnswered} />
              {questionAnswered && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-sm text-green-700">
                    <strong>✓ Scores Updated</strong>
                    <p className="mt-1">Mid-Funnel now tracked. Other scores adjusted based on your answers.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },
    
    // Step 3: Prioritized recommendation
    {
      content: (
        <div className="max-w-5xl mx-auto">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-indigo-700">
              <span className="text-xl">🎯</span>
              <span><strong>Based on Jordan's answers, the platform identifies priorities.</strong></span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Your Prioritized Action Plan</h3>
                
                <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-5 mb-4">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">1</div>
                      <div>
                        <h4 className="font-bold text-indigo-900">Build Your Value Story</h4>
                        <p className="text-sm text-indigo-700">2-3 sessions over 1 week</p>
                      </div>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium">
                      Start Now →
                    </button>
                  </div>
                  <p className="text-sm text-indigo-800">
                    Your sales team made their own deck because yours "didn't resonate." That's a Value Articulation problem. 
                    We'll build a customer ROI story they'll actually use.
                  </p>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4 opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-gray-700">Competitive Battle Cards</h4>
                      <p className="text-sm text-gray-500">Unlocks after Value Story</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-gray-700">Sales Enablement Toolkit</h4>
                      <p className="text-sm text-gray-500">Unlocks after Battle Cards</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h4 className="font-medium text-amber-800 mb-2">🚀 Quick Wins (Do This Week)</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Add one customer quote with a specific number to homepage</li>
                  <li>• Ask your top 3 customers: "How would you describe what we do?"</li>
                </ul>
              </div>
            </div>
            
            <Dashboard minimal showChanges={true} />
          </div>
        </div>
      )
    },
    
    // Step 4: Entering Value Story workstream
    {
      content: (
        <div className="max-w-5xl mx-auto">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-indigo-700">
              <span className="text-xl">📝</span>
              <span><strong>Jordan enters the Value Story workstream.</strong> AI guides step-by-step.</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div>
                <div className="text-sm text-indigo-600 font-medium">WORKSTREAM 1 OF 4</div>
                <h2 className="text-2xl font-bold text-gray-800">Build Your Value Story</h2>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-lg font-bold text-indigo-600">Step 1 of 4</div>
              </div>
            </div>
            
            <div className="flex gap-2 mb-8">
              <div className="flex-1 h-2 bg-indigo-600 rounded-full"></div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">🤖</div>
                    <span className="font-medium text-gray-700">AI Coach</span>
                  </div>
                  
                  <p className="text-gray-800 mb-4">
                    "Let's discover where you create value for customers. I'll walk you through 9 value drivers. 
                    For each one, tell me if it applies."
                  </p>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-2">Value Driver #1: Time Savings</h4>
                    <p className="text-gray-600 mb-3">Does your product save your customers time?</p>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium border-2 border-green-300">
                        ✓ Yes, definitely
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">
                        Maybe
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">
                        Not really
                      </button>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-sm text-green-800">
                        <strong>Great!</strong> Think of a specific customer. What task does your product speed up, 
                        and roughly how much time does it save per week?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow p-4">
                  <h4 className="font-medium text-gray-700 mb-3">9 Value Drivers</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2 text-indigo-600 font-medium">
                      <span className="w-5 h-5 bg-indigo-100 rounded flex items-center justify-center text-xs">→</span>
                      Time Savings
                    </li>
                    <li className="flex items-center gap-2 text-gray-500">
                      <span className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center text-xs">2</span>
                      Cost Displacement
                    </li>
                    <li className="flex items-center gap-2 text-gray-500">
                      <span className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center text-xs">3</span>
                      Risk Mitigation
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <span className="w-5 h-5 bg-gray-50 rounded flex items-center justify-center text-xs">...</span>
                      +6 more
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-700">
                    <strong>💡 Tip:</strong> Don't have exact numbers? I'll help you estimate based on similar companies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Step 5: Answering questions, AI generating output
    {
      content: (
        <div className="max-w-5xl mx-auto">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-indigo-700">
              <span className="text-xl">⚡</span>
              <span><strong>Jordan provides answers. The AI synthesizes them into a draft ROI Calculator.</strong></span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Jordan's Inputs</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Time Savings</div>
                    <p className="text-sm text-gray-700">"Our customer Acme Corp saves about 8 hours a week on data entry."</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Cost Displacement</div>
                    <p className="text-sm text-gray-700">"They cancelled a $1,200/month tool after switching to us."</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Risk Mitigation</div>
                    <p className="text-sm text-gray-700">"One customer avoided a compliance issue. Not sure the dollar value."</p>
                  </div>
                </div>
                
                <div className="mt-4 bg-indigo-50 rounded-lg p-3">
                  <p className="text-sm text-indigo-800">
                    <strong>🤖 AI:</strong> "For Risk Mitigation, compliance violations in your industry typically cost $5,000-$15,000. 
                    Does $8,500 feel like a reasonable midpoint?"
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Generating Your ROI Calculator...</h3>
                {showTyping ? (
                  <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center justify-center h-64">
                    <div className="flex gap-1 mb-4">
                      <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <p className="text-gray-600">Synthesizing your value story...</p>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300 h-64 flex items-center justify-center">
                    <p className="text-gray-500 text-center">Click Next to generate the ROI Calculator →</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Step 6: ROI Calculator generated
    {
      content: (
        <div className="max-w-5xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-green-700">
              <span className="text-xl">✅</span>
              <span><strong>Draft ROI Calculator generated!</strong> Jordan can refine it, then share with sales.</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  <h3 className="text-xl font-bold text-gray-800">TechFlow Customer ROI Calculator</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-6 overflow-x-auto">
                  <table className="w-full min-w-[400px]">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                        <th className="pb-3">Value Driver</th>
                        <th className="pb-3 text-right">Annual Value</th>
                        <th className="pb-3 text-right">Calculation</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-800">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 font-medium">Time Savings</td>
                        <td className="py-3 text-right text-green-600 font-bold">$20,800</td>
                        <td className="py-3 text-right text-sm text-gray-500">8 hrs × $50/hr × 52 wks</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 font-medium">Cost Displacement</td>
                        <td className="py-3 text-right text-green-600 font-bold">$15,000</td>
                        <td className="py-3 text-right text-sm text-gray-500">$1,250/mo tool</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 font-medium">Risk Mitigation</td>
                        <td className="py-3 text-right text-green-600 font-bold">$8,500</td>
                        <td className="py-3 text-right text-sm text-gray-500">1 incident avoided</td>
                      </tr>
                      <tr className="bg-indigo-50">
                        <td className="py-3 font-bold text-indigo-900">Total Annual Value</td>
                        <td className="py-3 text-right text-indigo-600 font-bold text-xl">$44,300</td>
                        <td className="py-3 text-right text-sm text-indigo-600 font-medium">ROI: 3.7x</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">📝 Draft Value Narrative</h4>
                  <p className="text-sm text-blue-900">
                    "TechFlow customers typically see $44,000+ in annual value. At $12,000/year, that's a 3.7x return — payback in under 4 months."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">What Jordan Got</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-green-600">✓ ROI Calculator</li>
                  <li className="flex items-center gap-2 text-green-600">✓ Value Narrative</li>
                  <li className="flex items-center gap-2 text-green-600">✓ Sales one-pager</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow p-4">
                <div className="text-sm text-gray-500 mb-2">Value Articulation Score</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-yellow-600">5.5</span>
                  <span className="text-green-500 text-sm">↑ from 3.5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Step 7: Getting stuck - expert escalation
    {
      content: (
        <div className="max-w-5xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-amber-700">
              <span className="text-xl">🤔</span>
              <span><strong>Jordan gets stuck</strong> on competitive positioning against a dominant competitor.</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 mb-3">
                    <strong>🤖 AI:</strong> "You mentioned Salesforce is your main competitor. Where do you typically win against them?"
                  </p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-500 mb-2">Jordan:</div>
                  <p className="text-gray-700">
                    "That's the thing — I don't really know. We win some, we lose some. 
                    I honestly don't know how to position against them. They're so much bigger..."
                  </p>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-amber-700 mb-2">
                    <span>⚠️</span>
                    <span className="font-medium">Stuck Pattern Detected</span>
                  </div>
                  <p className="text-sm text-amber-800">
                    Strategic positioning against a market leader requires nuanced analysis.
                  </p>
                </div>
                
                <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-4">
                  <p className="text-sm text-indigo-800 mb-4">
                    <strong>🤖 AI:</strong> "This is a good moment to bring in an expert. Positioning against a dominant competitor 
                    isn't something you should guess at."
                  </p>
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium">
                    📅 Book Expert Working Session
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">Escalation Triggers</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• User expresses uncertainty</li>
                  <li>• Contradictory inputs</li>
                  <li>• Stalled 5+ days</li>
                  <li>• User asks for help</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-700">
                  <strong>The Model:</strong> Jordan is the human-in-the-loop. AI handles 80%. Expert time for the 20% that requires judgment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Step 8: UPDATED FINAL SCREEN - Living Dashboard with new priorities
    {
      content: (
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              WEEK 1 COMPLETE
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Jordan's Updated Dashboard</h1>
            <p className="text-gray-600">The platform reflects progress and updates priorities automatically</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Dashboard - Updated */}
            <div className="lg:col-span-2 space-y-6">
              {/* Health Score Card */}
              <Dashboard finalState={true} />
              
              {/* Updated Priority Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Updated Action Plan</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Auto-updated based on progress</span>
                </div>
                
                {/* NEW #1 Priority */}
                <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-5 mb-4">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">1</div>
                      <div>
                        <h4 className="font-bold text-indigo-900">Competitive Battle Cards</h4>
                        <p className="text-sm text-indigo-700">Expert session booked • 2-3 sessions</p>
                      </div>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium">
                      Continue →
                    </button>
                  </div>
                  <p className="text-sm text-indigo-800">
                    Now that your Value Story is stronger, differentiation is your biggest gap. 
                    Your expert session will help crack positioning against Salesforce.
                  </p>
                </div>
                
                {/* Completed - Value Story */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">✓</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-green-800">Value Story</h4>
                      <p className="text-sm text-green-600">Completed • ROI Calculator deployed</p>
                    </div>
                    <span className="text-sm text-green-600 font-medium">+2.0 score</span>
                  </div>
                </div>
                
                {/* #2 Priority */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4 opacity-70">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-gray-700">Sales Enablement Toolkit</h4>
                      <p className="text-sm text-gray-500">Unlocks after Battle Cards</p>
                    </div>
                  </div>
                </div>
                
                {/* #3 Priority */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 opacity-70">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-gray-700">Pricing Optimization</h4>
                      <p className="text-sm text-gray-500">Currently healthy (6.5) — revisit after Q2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              {/* Revenue Impact - Baseline Set */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">Revenue Impact</h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Tracking started</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">MQL → SQL</span>
                    <span className="text-sm font-medium">8% <span className="text-gray-400">(baseline)</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Win Rate</span>
                    <span className="text-sm font-medium">24% <span className="text-gray-400">(baseline)</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Deal Size</span>
                    <span className="text-sm font-medium">$18K <span className="text-gray-400">(baseline)</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Sales Cycle</span>
                    <span className="text-sm font-medium">85 days <span className="text-gray-400">(baseline)</span></span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">Next update: 30 days</p>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">Recent Activity</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-0.5">●</span>
                    <span>Value Story completed (+2.0)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 mt-0.5">●</span>
                    <span>ROI Calculator deployed</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-blue-500 mt-0.5">●</span>
                    <span>Expert session booked (Dec 15)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-gray-400 mt-0.5">●</span>
                    <span>Revenue baselines recorded</span>
                  </li>
                </ul>
              </div>
              
              {/* The Key Insight */}
              <div className="bg-indigo-50 rounded-xl p-4">
                <h4 className="font-medium text-indigo-800 mb-2">The Living Platform</h4>
                <p className="text-sm text-indigo-700">
                  Scores updated automatically. Priorities reshuffled. Revenue tracking started. 
                  This isn't a report — it's an operating system that evolves as Jordan makes progress.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => {
                setStep(0);
                setScores({
                  valueArticulation: 4.0,
                  competitivePosition: 5.0,
                  pricingHealth: 6.5,
                  salesEnablement: 3.5,
                  midFunnel: null
                });
                setOverallScore(4.8);
                setQuestionAnswered(false);
                setRoiData(null);
              }} 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              ↺ Restart Demo
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Demo Progress</span>
          <span>{step + 1} of {steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="mb-8">
        {steps[step].content}
      </div>
      
      <div className="max-w-4xl mx-auto flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            step === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
          }`}
        >
          ← Back
        </button>
        
        {step < steps.length - 1 && (
          <button
            onClick={handleNext}
            disabled={showTyping}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              showTyping
                ? 'bg-indigo-300 text-white cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow'
            }`}
          >
            {showTyping ? 'Processing...' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PlatformDemo;
