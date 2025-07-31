import React from 'react';

interface LLMData {
  model: string;
  best_at: string;
  complex_understanding: boolean;
  multimodal: string;
  real_time: string;
  memory: string;
}

const llmData: LLMData[] = [
  {
    model: "GPT-4o",
    best_at: "General-purpose, everyday tasks (emails, writing, research)",
    complex_understanding: true,
    multimodal: "Yes, even voice replies",
    real_time: "Not always up to date",
    memory: "A big document (~300 pages)"
  },
  {
    model: "Claude 3",
    best_at: "Long documents, thoughtful replies, summaries",
    complex_understanding: true,
    multimodal: "Can see images, not video/audio",
    real_time: "Can search the web",
    memory: "Even longer memory (~500 pages)"
  },
  {
    model: "Gemini 2.5",
    best_at: "Working with images, slides, translations",
    complex_understanding: true,
    multimodal: "Yes, includes video too",
    real_time: "Taps into Google Search",
    memory: "Huge memory (thousands of pages)"
  },
  {
    model: "Grok 4",
    best_at: "Fast answers, real-time info, social media stuff",
    complex_understanding: true,
    multimodal: "Voice & images, mostly for X (Twitter)",
    real_time: "Very current, gets info live",
    memory: "Medium memory (~600 pages)"
  }
];

const LLMComparison: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 px-4">
      {/* Header Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
        <div className="hidden md:block"></div>
        {llmData.map((llm, index) => (
          <div 
            key={llm.model}
            className="text-center animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <h3 className="text-[#5CE1E6] font-mono text-lg md:text-xl font-bold mb-2">
              {llm.model}
            </h3>
          </div>
        ))}
      </div>

      {/* Comparison Rows */}
      <div className="space-y-4">
        {/* Best At */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-3 md:p-4">
            <h4 className="text-[#5CE1E6] font-mono font-bold text-sm md:text-base mb-2">Best at</h4>
          </div>
          {llmData.map((llm) => (
            <div key={`${llm.model}-best`} className="bg-slate-900/60 border border-slate-700 rounded-lg p-3 md:p-4 hover:border-[#5CE1E6]/50 transition-all duration-300">
              <p className="text-slate-200 font-open-sauce text-sm md:text-base leading-relaxed">
                {llm.best_at}
              </p>
            </div>
          ))}
        </div>

        {/* Multimodal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-3 md:p-4">
            <h4 className="text-[#5CE1E6] font-mono font-bold text-sm md:text-base mb-2">Multimodal</h4>
          </div>
          {llmData.map((llm) => (
            <div key={`${llm.model}-multimodal`} className="bg-slate-900/60 border border-slate-700 rounded-lg p-3 md:p-4 hover:border-[#5CE1E6]/50 transition-all duration-300">
              <p className="text-slate-200 font-open-sauce text-sm md:text-base leading-relaxed">
                {llm.multimodal}
              </p>
            </div>
          ))}
        </div>

        {/* Real Time */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-3 md:p-4">
            <h4 className="text-[#5CE1E6] font-mono font-bold text-sm md:text-base mb-2">Real-time</h4>
          </div>
          {llmData.map((llm) => (
            <div key={`${llm.model}-realtime`} className="bg-slate-900/60 border border-slate-700 rounded-lg p-3 md:p-4 hover:border-[#5CE1E6]/50 transition-all duration-300">
              <p className="text-slate-200 font-open-sauce text-sm md:text-base leading-relaxed">
                {llm.real_time}
              </p>
            </div>
          ))}
        </div>

        {/* Memory */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="bg-slate-800/60 border border-slate-600 rounded-lg p-3 md:p-4">
            <h4 className="text-[#5CE1E6] font-mono font-bold text-sm md:text-base mb-2">Memory</h4>
          </div>
          {llmData.map((llm) => (
            <div key={`${llm.model}-memory`} className="bg-slate-900/60 border border-slate-700 rounded-lg p-3 md:p-4 hover:border-[#5CE1E6]/50 transition-all duration-300">
              <p className="text-slate-200 font-open-sauce text-sm md:text-base leading-relaxed">
                {llm.memory}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LLMComparison;