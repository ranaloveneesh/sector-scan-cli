import React from 'react';

interface Explanation {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const explanations: Explanation[] = [
  {
    id: 'data',
    title: 'Data',
    description: 'The raw information (text, images, numbers) used to train the model. It teaches the model patterns, behaviors, and relationships.',
    icon: '📊'
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    description: 'The math and logic that guide how the model learns from the data. Often built as neural networks, they adjust themselves based on examples.',
    icon: '🧮'
  },
  {
    id: 'weights',
    title: 'Weights',
    description: 'The "memories" the model forms during training. They store what the model has learned and shape how it makes decisions.',
    icon: '⚖️'
  },
  {
    id: 'inference',
    title: 'Inference',
    description: 'The moment the model uses what it learned to give an answer or make a prediction — like answering a question or generating text.',
    icon: '⚡'
  }
];

const AIExplanations: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {explanations.map((explanation, index) => (
          <div 
            key={explanation.id}
            className="group relative bg-slate-900/60 border border-slate-700 rounded-lg p-4 md:p-6 hover:border-[#5CE1E6]/50 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Glowing border effect on hover */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#5CE1E6]/0 via-[#5CE1E6]/10 to-[#5CE1E6]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{explanation.icon}</span>
                <h3 className="text-[#5CE1E6] font-mono text-lg md:text-xl font-bold">
                  {explanation.title}
                </h3>
              </div>
              <p className="text-slate-200 font-open-sauce leading-relaxed text-sm md:text-base">
                {explanation.description}
              </p>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-lg bg-[#5CE1E6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIExplanations;