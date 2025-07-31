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
  const getStatusIcon = (category: string, value: string | boolean) => {
    if (category === 'complex_understanding') {
      return value ? '✅' : '❌';
    }
    if (category === 'multimodal') {
      const valueStr = String(value);
      if (valueStr.includes('Yes, even voice') || valueStr.includes('Yes, includes video')) return '✅';
      if (valueStr.includes('Can see images')) return '🟡';
      return '🟢';
    }
    if (category === 'real_time') {
      const valueStr = String(value);
      if (valueStr.includes('Very current') || valueStr.includes('Taps into Google')) return '✅';
      if (valueStr.includes('Can search')) return '✅';
      return '🟡';
    }
    if (category === 'memory') {
      return '📄';
    }
    return '';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-6 text-left text-sm font-semibold text-gray-900 border-b border-r border-gray-200 w-32">Model</th>
              <th className="px-4 py-6 text-left text-sm font-semibold text-gray-900 border-b border-r border-gray-200/50">
                <span>What it's best at 💪</span>
              </th>
              <th className="px-4 py-6 text-left text-sm font-semibold text-gray-900 border-b border-r border-gray-200/50">
                <span>Understands complex stuff 🧠</span>
              </th>
              <th className="px-4 py-6 text-left text-sm font-semibold text-gray-900 border-b border-r border-gray-200/50">
                <span>Handles images or voice? 🎨📹</span>
              </th>
              <th className="px-4 py-6 text-left text-sm font-semibold text-gray-900 border-b border-r border-gray-200/50">
                <span>Knows real-time things 🌐</span>
              </th>
              <th className="px-4 py-6 text-left text-sm font-semibold text-gray-900 border-b">
                <span>How much it can "remember" 📝</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {llmData.map((llm, index) => (
              <tr key={llm.model} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-6 text-sm font-medium text-gray-900 border-b border-r border-gray-200">
                  {llm.model}
                </td>
                <td className="px-4 py-6 text-sm text-gray-700 border-b border-r border-gray-200/50">
                  {llm.best_at}
                </td>
                <td className="px-4 py-6 text-sm text-gray-700 border-b border-r border-gray-200/50">
                  <div className="flex items-center gap-2">
                    <span>{getStatusIcon('complex_understanding', llm.complex_understanding)}</span>
                    <span>{llm.complex_understanding ? 'Very smart and creative' : 'Basic understanding'}</span>
                  </div>
                </td>
                <td className="px-4 py-6 text-sm text-gray-700 border-b border-r border-gray-200/50">
                  <div className="flex items-center gap-2">
                    <span>{getStatusIcon('multimodal', llm.multimodal)}</span>
                    <span>{llm.multimodal}</span>
                  </div>
                </td>
                <td className="px-4 py-6 text-sm text-gray-700 border-b border-r border-gray-200/50">
                  <div className="flex items-center gap-2">
                    <span>{getStatusIcon('real_time', llm.real_time)}</span>
                    <span>{llm.real_time}</span>
                  </div>
                </td>
                <td className="px-4 py-6 text-sm text-gray-700 border-b">
                  <div className="flex items-center gap-2">
                    <span>{getStatusIcon('memory', llm.memory)}</span>
                    <span>{llm.memory}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LLMComparison;