import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { calculateARLScore } from '@/lib/arlScoring';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { incrementSubmissionCount } from '@/lib/supabase';

const ARLResults = () => {
  const { surveyData } = useSurvey();
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(75);
  
  const scoreResult = calculateARLScore(surveyData);

  // Get and increment submission count on component mount
  useEffect(() => {
    const updateCount = async () => {
      const count = await incrementSubmissionCount();
      setSubmissionCount(count);
    };
    updateCount();
  }, []);
  
  useEffect(() => {
    // Animate score counter
    const duration = 2000;
    const steps = 60;
    const increment = scoreResult.normalizedScore / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= scoreResult.normalizedScore) {
        setAnimatedScore(scoreResult.normalizedScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [scoreResult.normalizedScore]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Email submitted:', email);
      setEmailSubmitted(true);
    }
  };

  // Helper function to get color based on score position
  const getScoreColor = (position: number) => {
    const normalizedPos = position / 9; // 0 to 1
    if (normalizedPos <= 0.33) {
      // Red to yellow transition
      const factor = normalizedPos / 0.33;
      const red = 255;
      const green = Math.floor(factor * 255);
      return `rgb(${red}, ${green}, 0)`;
    } else if (normalizedPos <= 0.66) {
      // Yellow to green transition
      const factor = (normalizedPos - 0.33) / 0.33;
      const red = Math.floor(255 * (1 - factor));
      const green = 255;
      return `rgb(${red}, ${green}, 0)`;
    } else {
      // Green
      return `rgb(0, 255, 0)`;
    }
  };

  // Calculate needle rotation (from -90 to +90 degrees)
  const needleRotation = -90 + ((animatedScore - 1) / 8) * 180;

  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">
      {/* Hexagonal logo in top left */}
      <div className="absolute top-6 left-6 md:top-12 md:left-16 z-10 flex items-end animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-center" style={{
          width: 'clamp(4rem, 6vw, 6.25rem)',
          height: 'clamp(4rem, 6vw, 6.25rem)'
        }}>
          <img src="/lovable-uploads/a8d760f4-8e0c-410d-ae83-a3e6dd4b23e9.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* User label in top right */}
      <div className="absolute top-6 right-6 md:top-12 md:right-16 z-10 flex items-end animate-fade-in" style={{ animationDelay: '150ms' }}>
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">arl_results</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="max-w-4xl w-full text-center" style={{ paddingTop: 'clamp(2rem, 5vh, 3rem)' }}>
          
          {/* Title */}
          <div className="space-y-4 mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-open-sauce leading-relaxed">
              Your AI Readiness Level: <span className="text-[#5CE1E6]">{scoreResult.level}</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 font-open-sauce">
              Assessment Complete - Here's your personalized feedback
            </p>
          </div>

          {/* Main content area - organized for desktop */}
          <div className="max-w-7xl mx-auto">
            
            {/* Top section: Speedometer and Feedback side by side */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 mb-12 items-center">
              
              {/* Left: Professional Speedometer */}
              <div className="flex justify-center xl:justify-end">
                <div className="relative w-80 h-48 md:w-96 md:h-56">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 400 240"
                    className="w-full h-full filter drop-shadow-2xl"
                  >
                    <defs>
                      {/* Enhanced gradient with smooth transitions */}
                      <linearGradient id="speedometerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#dc2626" />
                        <stop offset="15%" stopColor="#ea580c" />
                        <stop offset="35%" stopColor="#f59e0b" />
                        <stop offset="55%" stopColor="#eab308" />
                        <stop offset="75%" stopColor="#65a30d" />
                        <stop offset="90%" stopColor="#16a34a" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                      
                      {/* Glow effect */}
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      
                      {/* Subtle shadow */}
                      <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.3"/>
                      </filter>
                    </defs>
                    
                    {/* Outer ring - decorative */}
                    <circle
                      cx="200"
                      cy="200"
                      r="160"
                      fill="none"
                      stroke="rgba(92, 225, 230, 0.1)"
                      strokeWidth="2"
                    />
                    
                    {/* Background track */}
                    <path
                      d="M 60 200 A 140 140 0 0 1 340 200"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="20"
                      strokeLinecap="round"
                      filter="url(#dropshadow)"
                    />
                    
                    {/* Progress arc with enhanced styling */}
                    <path
                      d="M 60 200 A 140 140 0 0 1 340 200"
                      fill="none"
                      stroke="url(#speedometerGradient)"
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray={`${(animatedScore / 9) * 439.6} 439.6`}
                      className="transition-all duration-2000 ease-out"
                      filter="url(#glow)"
                    />
                    
                    {/* Tick marks */}
                    {[...Array(9)].map((_, i) => {
                      const angle = -90 + (i * 22.5);
                      const tickLength = i % 3 === 0 ? 15 : 10;
                      const innerRadius = 140 - tickLength;
                      const outerRadius = 140;
                      const startX = 200 + innerRadius * Math.cos((angle * Math.PI) / 180);
                      const startY = 200 + innerRadius * Math.sin((angle * Math.PI) / 180);
                      const endX = 200 + outerRadius * Math.cos((angle * Math.PI) / 180);
                      const endY = 200 + outerRadius * Math.sin((angle * Math.PI) / 180);
                      
                      return (
                        <line
                          key={i}
                          x1={startX}
                          y1={startY}
                          x2={endX}
                          y2={endY}
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth={i % 3 === 0 ? "3" : "2"}
                          strokeLinecap="round"
                        />
                      );
                    })}
                    
                    {/* Enhanced needle */}
                    <g transform={`rotate(${needleRotation} 200 200)`} className="transition-transform duration-2000 ease-out">
                      {/* Needle shadow */}
                      <line
                        x1="200"
                        y1="200"
                        x2="200"
                        y2="80"
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        transform="translate(2,2)"
                      />
                      {/* Main needle */}
                      <line
                        x1="200"
                        y1="200"
                        x2="200"
                        y2="80"
                        stroke="#5CE1E6"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#glow)"
                      />
                      {/* Center hub */}
                      <circle
                        cx="200"
                        cy="200"
                        r="12"
                        fill="#5CE1E6"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                        filter="url(#glow)"
                      />
                    </g>
                    
                    {/* Scale numbers with better positioning */}
                    <text x="85" y="210" textAnchor="middle" className="text-sm font-bold fill-white/80">1</text>
                    <text x="200" y="75" textAnchor="middle" className="text-sm font-bold fill-white/80">5</text>
                    <text x="315" y="210" textAnchor="middle" className="text-sm font-bold fill-white/80">9</text>
                  </svg>
                  
                  {/* Enhanced score display */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#5CE1E6] tabular-nums filter drop-shadow-lg">
                      {animatedScore}
                    </div>
                    <div className="text-xs md:text-sm text-white/60 font-medium tracking-wider uppercase mt-1">
                      ARL Score
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Feedback */}
              <div className="flex justify-center xl:justify-start">
                <div className="max-w-lg space-y-6">
                  {/* Comment */}
                  <div className="bg-white/5 border border-white/20 rounded-lg p-6">
                    <p className="text-base text-slate-300 font-open-sauce leading-relaxed">
                      {scoreResult.comment}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section: User stats and Email signup side by side - reduced padding */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-start">
              
              {/* Left: User completion number - centered below speedometer */}
              <div className="flex justify-center xl:justify-end xl:mt-4">
                <div className="bg-[#5CE1E6]/10 border border-[#5CE1E6]/30 rounded-lg p-6 max-w-md w-full text-center">
                  <div className="text-3xl font-bold text-[#5CE1E6] mb-3">#{submissionCount}</div>
                  <p className="text-base text-slate-300 font-open-sauce">
                    You're the {submissionCount}th professional to complete this assessment!
                  </p>
                </div>
              </div>

              {/* Right: Industry report email signup */}
              <div className="flex justify-center xl:justify-start">
                <div className="w-full max-w-md">
                  <div className="bg-gradient-to-r from-[#5CE1E6]/20 to-blue-500/20 border-2 border-[#5CE1E6]/50 rounded-xl p-6 shadow-xl shadow-[#5CE1E6]/20 relative overflow-hidden">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5CE1E6]/10 to-blue-500/10 blur-xl"></div>
                    <div className="relative z-10">
                      {!emailSubmitted ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                          <div className="text-center space-y-2 mb-4">
                            <h3 className="text-lg font-bold text-white font-open-sauce flex items-center justify-center gap-2">
                              <span className="text-2xl">📊</span>
                              Get Your Industry Report
                            </h3>
                            <p className="text-sm text-slate-300 font-open-sauce">
                              See how your industry stacks up against others in AI readiness
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-slate-400"
                            />
                            <Button 
                              type="submit" 
                              className="bg-[#5CE1E6] hover:bg-[#5CE1E6]/80 text-[#0a1628] font-open-sauce px-6"
                            >
                              Send Report
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="text-center space-y-4">
                          <div className="text-[#5CE1E6] text-3xl">✅</div>
                          <p className="text-white font-bold font-open-sauce text-lg">Report Sent!</p>
                          <p className="text-sm text-slate-300 font-open-sauce">
                            Check your inbox for industry insights
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">assessment_complete.exe</span>
        </div>
      </div>
    </div>
  );
};

export default ARLResults;