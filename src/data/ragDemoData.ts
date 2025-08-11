export const ragDemoData = {
  explainer_title: "LLM vs RAG workflow: An interactive example",
  explainer_description: "This short simulation will demonstrate the power of Retrieval-Augmented Generation (RAG). You will see how providing an AI with specific, relevant information dramatically improves the quality of its answers. To start, choose one topic below.",
  topics: [
    {
      id: "satellite_deployment",
      button_label: "Satellite Deployment Mission",
      user_query: "What is the timeline for the Sentinel-7 satellite deployment?",
      llm_only_flow: {
        slide_title: "Step 1: Asking the AI From Memory",
        description: "You've asked the standard AI your question. It will answer using only its vast, general knowledge. Click 'Get Answer' to see what it says.",
        visual_description: "A simple chat interface. The user's query is visible. A button below says 'Get Answer'.",
        llm_output: "Satellite deployments typically involve multiple phases including manufacturing, testing, and launch windows. However, specific mission timelines vary greatly based on payload requirements, launch vehicle availability, and orbital mechanics considerations."
      },
      rag_flow: {
        slide_title: "Step 2: Giving the AI an 'Open Book'",
        description: "Now, let's give the AI a relevant mission document before we ask again. Drag the 'Mission Brief' into the AI's workspace to provide it with context.",
        rag_context_document: {
          title: "Mission Brief",
          content: "CLASSIFIED - SENTINEL-7 DEPLOYMENT: Launch window opens December 15th. Payload integration complete. Primary mission: Advanced surveillance capabilities for deep space monitoring. Estimated mission duration: 5 years."
        },
        interaction_description: "A draggable icon labeled 'Mission Brief' is on one side of the screen. A 'drop zone' labeled 'Provide Context to AI' is on the other. The user must drag the memo to the drop zone. The 'Get New Answer' button only becomes active after the drop.",
        llm_plus_rag_output: "According to the mission brief, Sentinel-7 deployment has a launch window opening December 15th, with payload integration already complete. The mission focuses on advanced surveillance for deep space monitoring with an estimated 5-year duration."
      }
    },
    {
      id: "defense_contract",
      button_label: "Defense System Specifications",
      user_query: "What are the technical specifications for the Aegis-X defense platform?",
      llm_only_flow: {
        slide_title: "Step 1: Asking the AI From Memory",
        description: "You've asked the standard AI about a classified defense system. It will answer using its pre-existing knowledge. Click 'Get Answer' to see what it says.",
        visual_description: "A simple chat interface. The user's query is visible. A button below says 'Get Answer'.",
        llm_output: "Defense platforms typically incorporate radar systems, missile interceptors, and command networks. However, specific technical specifications for classified military systems are not publicly available and would require appropriate security clearance."
      },
      rag_flow: {
        slide_title: "Step 2: Giving the AI an 'Open Book'",
        description: "Now, let's give the AI the technical specifications document. Drag the 'Tech Specs' into the AI's workspace to provide it with context.",
        rag_context_document: {
          title: "Tech Specs",
          content: "AEGIS-X SPECIFICATIONS: Multi-band radar array with 400km detection range. Hypersonic interceptor capability. Quantum-encrypted communications. Power requirements: 2MW grid connection with 72-hour backup capacity."
        },
        interaction_description: "A draggable icon labeled 'Tech Specs' is on one side of the screen. A 'drop zone' labeled 'Provide Context to AI' is on the other. The user must drag the document to the drop zone. The 'Get New Answer' button only becomes active after the drop.",
        llm_plus_rag_output: "Based on the technical specifications, Aegis-X features a multi-band radar array with 400km detection range, hypersonic interceptor capability, quantum-encrypted communications, and requires 2MW power with 72-hour backup capacity."
      }
    },
    {
      id: "deep_tech_research",
      button_label: "Quantum Computing Research",
      user_query: "What is the current status of Project Heisenberg?",
      llm_only_flow: {
        slide_title: "Step 1: Asking the AI From Memory",
        description: "You've asked the standard AI a question about a specific research project. Click 'Get Answer' to see what it says.",
        visual_description: "A simple chat interface. The user's query is visible. A button below says 'Get Answer'.",
        llm_output: "Quantum computing research involves developing systems that leverage quantum mechanical phenomena for computation. Research projects typically focus on improving qubit stability, error correction, and practical applications, though specific project details would depend on the organization."
      },
      rag_flow: {
        slide_title: "Step 2: Giving the AI an 'Open Book'",
        description: "Now, let's give the AI the research status report. Drag the 'Research Update' into the AI's workspace to provide it with context.",
        rag_context_document: {
          title: "Research Update",
          content: "PROJECT HEISENBERG STATUS: 128-qubit processor achieved 99.2% fidelity. Breakthrough in error correction algorithms reduces decoherence by 40%. Next milestone: 1000-qubit system by Q2. Commercial applications targeting cryptography and optimization."
        },
        interaction_description: "A draggable icon labeled 'Research Update' is on one side of the screen. A 'drop zone' labeled 'Provide Context to AI' is on the other. The user must drag the document to the drop zone. The 'Get New Answer' button only becomes active after the drop.",
        llm_plus_rag_output: "According to the research update, Project Heisenberg has achieved a 128-qubit processor with 99.2% fidelity and breakthrough error correction algorithms reducing decoherence by 40%. The next milestone is a 1000-qubit system by Q2, targeting commercial cryptography and optimization applications."
      }
    }
  ],
  summary_slide: {
    slide_title: "That's the RAG Difference!",
    visual_description: "A simple side-by-side comparison showing a generic answer next to a factual, sourced answer.",
    summary_text: "Without RAG, the AI answers from memory, which can be generic, outdated, or wrong.\n\nWith RAG, the AI first **retrieves** relevant facts from your provided documents and then uses those facts to **generate** a smart, accurate, and trustworthy answer. It turns a generalist into a domain expert."
  }
};