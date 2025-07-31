import React from 'react';

const RagPipelineVisual: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold text-black text-center mb-12 font-open-sauce">
          Basic RAG Pipeline
        </h2>
        
        {/* User Query */}
        <div className="flex flex-col items-center mb-8">
          <span className="text-blue-600 font-medium mb-3 text-lg font-open-sauce">User Query</span>
          <div className="bg-blue-200 border-2 border-blue-400 rounded-lg px-8 py-4 min-w-40">
            <span className="text-black font-medium"></span>
          </div>
        </div>

        {/* Arrow down */}
        <div className="flex justify-center mb-8">
          <div className="text-gray-600 text-3xl">↓</div>
        </div>

        {/* Main Pipeline Flow */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          {/* Documents Stack */}
          <div className="relative flex-shrink-0">
            <div className="bg-gray-200 border-2 border-black rounded-xl w-32 h-24 absolute top-2 left-2"></div>
            <div className="bg-gray-300 border-2 border-black rounded-xl w-32 h-24 absolute top-1 left-1"></div>
            <div className="bg-gray-100 border-2 border-black rounded-xl w-32 h-24 flex items-center justify-center relative z-10">
              <span className="text-black font-bold text-lg font-open-sauce">Documents</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="text-gray-600 text-3xl flex-shrink-0">→</div>
          
          {/* Vector DB */}
          <div className="bg-yellow-200 border-2 border-black rounded-xl w-32 h-24 flex items-center justify-center flex-shrink-0">
            <span className="text-black font-bold text-lg font-open-sauce">Vector DB</span>
          </div>
          
          {/* Arrow */}
          <div className="text-gray-600 text-3xl flex-shrink-0">→</div>
          
          {/* Split Docs in Chunks */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <span className="text-red-600 font-bold text-lg font-open-sauce text-center mb-2">Split docs in chunks</span>
            <div className="bg-red-200 border-2 border-red-400 rounded w-28 h-4"></div>
            <div className="bg-red-200 border-2 border-red-400 rounded w-28 h-4"></div>
            <div className="bg-red-200 border-2 border-red-400 rounded w-28 h-4"></div>
          </div>
          
          {/* Arrow */}
          <div className="text-gray-600 text-3xl flex-shrink-0">→</div>
          
          {/* LLM */}
          <div className="bg-purple-200 border-2 border-black rounded-xl w-32 h-24 flex items-center justify-center flex-shrink-0">
            <span className="text-black font-bold text-lg font-open-sauce">LLM</span>
          </div>
          
          {/* Arrow */}
          <div className="text-gray-600 text-3xl flex-shrink-0">→</div>
          
          {/* Response */}
          <div className="bg-teal-200 border-2 border-black rounded-xl w-32 h-24 flex items-center justify-center flex-shrink-0">
            <span className="text-black font-bold text-lg font-open-sauce">Response</span>
          </div>
        </div>

        {/* Step Labels */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mt-8">
          <div className="text-center flex-1">
            <span className="text-black font-bold text-xl font-open-sauce">Step 1: Data Ingestion</span>
          </div>
          <div className="text-center flex-1">
            <span className="text-black font-bold text-xl font-open-sauce">Step 2: Data Retrieval & Generation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RagPipelineVisual;