import React from 'react';

const RagPipelineVisual: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="bg-white/5 rounded-xl p-8 border border-white/10">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-8 font-open-sauce">
          Basic RAG Pipeline
        </h2>
        
        {/* User Query */}
        <div className="flex flex-col items-center mb-8">
          <span className="text-[#5CE1E6] font-medium mb-2 font-open-sauce">User Query</span>
          <div className="bg-[#5CE1E6]/20 border border-[#5CE1E6]/50 rounded-lg px-6 py-3 min-w-32 text-center">
            <span className="text-white font-mono">?</span>
          </div>
        </div>

        {/* Arrow down */}
        <div className="flex justify-center mb-6">
          <div className="text-white/60 text-2xl">↓</div>
        </div>

        {/* Main Pipeline */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-8">
          {/* Step 1: Documents to Vector DB */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
              {/* Documents Stack */}
              <div className="relative">
                <div className="bg-gray-300 border border-gray-400 rounded-lg w-20 h-16 absolute top-1 left-1"></div>
                <div className="bg-gray-200 border border-gray-400 rounded-lg w-20 h-16 absolute top-0.5 left-0.5"></div>
                <div className="bg-gray-100 border border-gray-400 rounded-lg w-20 h-16 flex items-center justify-center relative z-10">
                  <span className="text-gray-700 font-medium text-sm font-open-sauce">Documents</span>
                </div>
              </div>
              
              <div className="text-white/60 text-xl hidden lg:block">→</div>
              
              {/* Vector DB */}
              <div className="bg-yellow-300 border border-yellow-400 rounded-lg w-24 h-16 flex items-center justify-center">
                <span className="text-gray-800 font-medium text-sm font-open-sauce">Vector DB</span>
              </div>
            </div>
            <span className="text-white font-medium text-sm font-open-sauce">Step 1: Data Indexing</span>
          </div>

          <div className="text-white/60 text-xl hidden lg:block">→</div>

          {/* Step 2: Retrieval and Generation */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
              {/* Top-K Chunks */}
              <div className="flex flex-col gap-1">
                <span className="text-red-400 font-medium text-xs font-open-sauce mb-1">Top-K Chunks</span>
                <div className="bg-red-200 border border-red-300 rounded w-20 h-3"></div>
                <div className="bg-red-200 border border-red-300 rounded w-20 h-3"></div>
                <div className="bg-red-200 border border-red-300 rounded w-20 h-3"></div>
              </div>
              
              <div className="text-white/60 text-xl hidden lg:block">→</div>
              
              {/* LLM */}
              <div className="bg-purple-300 border border-purple-400 rounded-lg w-20 h-16 flex items-center justify-center">
                <span className="text-gray-800 font-medium text-sm font-open-sauce">LLM</span>
              </div>
              
              <div className="text-white/60 text-xl hidden lg:block">→</div>
              
              {/* Response */}
              <div className="bg-teal-300 border border-teal-400 rounded-lg w-20 h-16 flex items-center justify-center">
                <span className="text-gray-800 font-medium text-sm font-open-sauce">Response</span>
              </div>
            </div>
            <span className="text-white font-medium text-sm font-open-sauce">Step 2: Data Retrieval & Generation</span>
          </div>
        </div>

        {/* Mobile arrows for vertical layout */}
        <div className="flex justify-center mb-4 lg:hidden">
          <div className="text-white/60 text-2xl">↓</div>
        </div>
        <div className="flex justify-center mb-4 lg:hidden">
          <div className="text-white/60 text-2xl">↓</div>
        </div>
        <div className="flex justify-center mb-4 lg:hidden">
          <div className="text-white/60 text-2xl">↓</div>
        </div>
      </div>
    </div>
  );
};

export default RagPipelineVisual;