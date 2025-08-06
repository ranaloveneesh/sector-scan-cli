import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { calculateARLScore } from '@/lib/arlScoring';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import brainIcon from '@/assets/brain-minimal.png';

const ARLResults = () => {
  const { surveyData } = useSurvey();
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const scoreResult = calculateARLScore(surveyData);
  
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
      // Here you would typically send the email to your backend
      console.log('Email submitted:', email);
      setEmailSubmitted(true);
    }
  };

  // Calculate needle rotation (from -90 to +90 degrees)
  const needleRotation = -90 + ((scoreResult.normalizedScore - 1) / 8) * 180;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(94,225,230,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(94,225,230,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      
      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <img src={brainIcon} alt="AI Brain" className="w-12 h-12" />
      </div>

      {/* User label */}
      <div className="absolute top-8 right-8 z-20">
        <div className="bg-primary/20 border border-primary/30 rounded-lg px-4 py-2">
          <span className="text-primary font-mono text-sm">user_#{scoreResult.userNumber}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 relative z-10">
        <div className="max-w-4xl w-full text-center space-y-8">
          
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-primary animate-fade-in">
              Your ARL Score
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in delay-200">
              AI Readiness Level Assessment Complete
            </p>
          </div>

          {/* Speedometer */}
          <div className="relative w-80 h-40 mx-auto animate-scale-in delay-500">
            {/* Speedometer arc */}
            <svg
              width="320"
              height="160"
              viewBox="0 0 320 160"
              className="absolute inset-0"
            >
              {/* Background arc */}
              <path
                d="M 40 140 A 120 120 0 0 1 280 140"
                fill="none"
                stroke="rgba(148, 163, 184, 0.3)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              
              {/* Colored segments */}
              {[...Array(9)].map((_, i) => {
                const startAngle = -90 + (i * 20);
                const endAngle = -90 + ((i + 1) * 20);
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                
                const x1 = 160 + 120 * Math.cos(startRad);
                const y1 = 140 + 120 * Math.sin(startRad);
                const x2 = 160 + 120 * Math.cos(endRad);
                const y2 = 140 + 120 * Math.sin(endRad);
                
                let color;
                if (i < 3) color = "#ef4444"; // Red for 1-3
                else if (i < 6) color = "#f59e0b"; // Yellow for 4-6  
                else color = "#10b981"; // Green for 7-9
                
                return (
                  <path
                    key={i}
                    d={`M 160 140 L ${x1} ${y1} A 120 120 0 0 1 ${x2} ${y2} Z`}
                    fill={animatedScore > i ? color : "rgba(148, 163, 184, 0.1)"}
                    className="transition-all duration-300"
                  />
                );
              })}
              
              {/* Needle */}
              <g transform={`rotate(${needleRotation} 160 140)`}>
                <line
                  x1="160"
                  y1="140"
                  x2="160"
                  y2="40"
                  stroke="#5CE1E6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="drop-shadow-lg"
                />
                <circle
                  cx="160"
                  cy="140"
                  r="8"
                  fill="#5CE1E6"
                  className="drop-shadow-lg"
                />
              </g>
              
              {/* Scale numbers */}
              {[1, 3, 5, 7, 9].map((num) => {
                const angle = -90 + ((num - 1) * 22.5);
                const rad = (angle * Math.PI) / 180;
                const x = 160 + 100 * Math.cos(rad);
                const y = 140 + 100 * Math.sin(rad) + 5;
                
                return (
                  <text
                    key={num}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    className="text-sm font-bold fill-foreground"
                  >
                    {num}
                  </text>
                );
              })}
            </svg>
            
            {/* Score display */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-6xl font-bold text-primary tabular-nums">
                {animatedScore}
              </div>
              <div className="text-primary font-semibold text-lg">
                {scoreResult.level}
              </div>
            </div>
          </div>

          {/* Comment */}
          <div className="bg-card/50 border border-border rounded-xl p-6 max-w-2xl mx-auto animate-fade-in delay-1000">
            <p className="text-lg text-foreground leading-relaxed">
              {scoreResult.comment}
            </p>
          </div>

          {/* Stats */}
          <div className="text-center animate-fade-in delay-1200">
            <p className="text-xl text-primary font-semibold mb-2">
              🎉 You're the {scoreResult.userNumber}th professional to complete this assessment!
            </p>
            <p className="text-muted-foreground">
              Want to see how your industry stacks up against others?
            </p>
          </div>

          {/* Email form */}
          <div className="bg-card/30 border border-border rounded-xl p-6 max-w-md mx-auto animate-fade-in delay-1500">
            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Get Your Industry Report
                </h3>
                <p className="text-sm text-muted-foreground">
                  Receive detailed AI adoption insights for your industry and role
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Send Report
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-2">
                <div className="text-green-500 text-2xl">✅</div>
                <p className="text-foreground font-semibold">Report sent!</p>
                <p className="text-sm text-muted-foreground">
                  Check your inbox for industry insights
                </p>
              </div>
            )}
          </div>

          {/* Terminal text */}
          <div className="absolute bottom-8 left-8 font-mono text-sm text-primary/60">
            <span className="animate-pulse">assessment_complete.exe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARLResults;