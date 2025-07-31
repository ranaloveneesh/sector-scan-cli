import React from 'react';

const RagPipelineVisual: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
        {/* Title */}
        <h2 className="text-xl font-bold text-black text-center mb-6 font-open-sauce">
          Basic RAG Pipeline
        </h2>
        
        {/* Main Pipeline Flow */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-6">
          {/* Documents Stack */}
          <div className="relative flex-shrink-0">
            <div className="bg-gray-200 border-2 border-black rounded-lg w-20 h-16 absolute top-1 left-1"></div>
            <div className="bg-gray-300 border-2 border-black rounded-lg w-20 h-16 absolute top-0.5 left-0.5"></div>
            <div className="bg-gray-100 border-2 border-black rounded-lg w-20 h-16 flex items-center justify-center relative z-10">
              <span className="text-black font-medium text-xs font-open-sauce">Documents</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="text-gray-600 text-xl flex-shrink-0">→</div>
          
          {/* Vector DB with User Query above */}
          <div className="flex flex-col items-center flex-shrink-0">
            {/* User Query */}
            <div className="mb-2">
              <span className="text-blue-600 font-medium text-xs font-open-sauce mb-1 block text-center">User Query</span>
              <div className="bg-blue-200 border-2 border-blue-400 rounded px-3 py-1">
                <span className="text-black text-xs"></span>
              </div>
            </div>
            {/* Arrow down */}
            <div className="text-gray-600 text-lg mb-1">↓</div>
            {/* Vector DB */}
            <div className="bg-yellow-200 border-2 border-black rounded-lg w-20 h-16 flex items-center justify-center">
              <span className="text-black font-medium text-xs font-open-sauce">Vector DB</span>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="text-gray-600 text-xl flex-shrink-0">→</div>
          
          {/* Split Docs in Chunks */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <span className="text-red-600 font-medium text-xs font-open-sauce text-center mb-1">Split docs in chunks</span>
            <div className="bg-red-200 border-2 border-red-400 rounded w-16 h-2"></div>
            <div className="bg-red-200 border-2 border-red-400 rounded w-16 h-2"></div>
            <div className="bg-red-200 border-2 border-red-400 rounded w-16 h-2"></div>
          </div>
          
          {/* Arrow */}
          <div className="text-gray-600 text-xl flex-shrink-0">→</div>
          
          {/* LLM */}
          <div className="bg-purple-200 border-2 border-black rounded-lg w-20 h-16 flex items-center justify-center flex-shrink-0">
            <span className="text-black font-medium text-xs font-open-sauce">LLM</span>
          </div>
          
          {/* Arrow */}
          <div className="text-gray-600 text-xl flex-shrink-0">→</div>
          
          {/* Response */}
          <div className="bg-teal-200 border-2 border-black rounded-lg w-20 h-16 flex items-center justify-center flex-shrink-0">
            <span className="text-black font-medium text-xs font-open-sauce">Response</span>
          </div>
        </div>

        {/* Step Labels */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-4">
          <div className="text-center flex-1">
            <span className="text-black font-medium text-sm font-open-sauce">Step 1: Data Ingestion</span>
          </div>
          <div className="text-center flex-1">
            <span className="text-black font-medium text-sm font-open-sauce">Step 2: Data Retrieval & Generation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RagPipelineVisual;