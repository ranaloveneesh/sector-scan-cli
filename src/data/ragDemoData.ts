export const ragDemoData = {
  explainer_title: "LLM vs RAG workflow: An interactive example",
  explainer_description: "This short simulation will demonstrate the power of Retrieval-Augmented Generation (RAG). You will see how providing an AI with specific, relevant information dramatically improves the quality of its answers.",
  topics: [
    {
      id: "project_apollo",
      button_label: "Internal Project Budget",
      user_query: "What is the budget for Project Apollo?",
      llm_only_flow: {
        slide_title: "Step 1: Asking the AI From Memory",
        description: "You've asked the standard AI your question. It will answer using only its vast, general knowledge. Click 'Get Answer' to see what it says.",
        visual_description: "A simple chat interface. The user's query is visible. A button below says 'Get Answer'.",
        llm_output: "I do not have access to private, real-time information about internal company projects like 'Project Apollo.' Generally, strategic initiatives can have budgets ranging widely, but I cannot provide a specific number."
      },
      rag_flow: {
        slide_title: "Step 2: Giving the AI an 'Open Book'",
        description: "Now, let's give the AI a relevant document before we ask again. Drag the 'Project Memo' into the AI's workspace to provide it with context.",
        rag_context_document: {
          title: "Project Memo",
          content: "Q3 Update: The budget for Project Apollo has been finalized at $450,000 to complete the 'Helios' milestone."
        },
        interaction_description: "A draggable icon labeled 'Project Memo' is on one side of the screen. A 'drop zone' labeled 'Provide Context to AI' is on the other. The user must drag the memo to the drop zone. The 'Get New Answer' button only becomes active after the drop.",
        llm_plus_rag_output: "According to the Q3 Project Memo, the finalized budget for Project Apollo to complete the 'Helios' milestone is $450,000."
      }
    },
    {
      id: "product_launch",
      button_label: "New Product Features",
      user_query: "What are the new features of the Omni-Gadget 9000?",
      llm_only_flow: {
        slide_title: "Step 1: Asking the AI From Memory",
        description: "You've asked the standard AI about a brand new product. It will answer using its pre-existing knowledge. Click 'Get Answer' to see what it says.",
        visual_description: "A simple chat interface. The user's query is visible. A button below says 'Get Answer'.",
        llm_output: "My knowledge base does not include information about the 'Omni-Gadget 9000,' as it may have been released after my last update. The previous model, the 8000, was known for its battery life."
      },
      rag_flow: {
        slide_title: "Step 2: Giving the AI an 'Open Book'",
        description: "Now, let's give the AI the official press release before we ask again. Drag the 'Press Release' into the AI's workspace to provide it with context.",
        rag_context_document: {
          title: "Press Release",
          content: "For Immediate Release: The new Omni-Gadget 9000 launches today, featuring our breakthrough 'Quantum-Link' connectivity and a 48-hour battery."
        },
        interaction_description: "A draggable icon labeled 'Press Release' is on one side of the screen. A 'drop zone' labeled 'Provide Context to AI' is on the other. The user must drag the document to the drop zone. The 'Get New Answer' button only becomes active after the drop.",
        llm_plus_rag_output: "Based on the official press release, the new Omni-Gadget 9000 features 'Quantum-Link' connectivity and a 48-hour battery."
      }
    },
    {
      id: "company_policy",
      button_label: "Company Travel Policy",
      user_query: "How do I book international travel?",
      llm_only_flow: {
        slide_title: "Step 1: Asking the AI From Memory",
        description: "You've asked the standard AI a question about a specific company policy. Click 'Get Answer' to see what it says.",
        visual_description: "A simple chat interface. The user's query is visible. A button below says 'Get Answer'.",
        llm_output: "Generally, to book international travel, employees often go through a corporate travel portal or contact an approved travel agent. You should check your company's specific guidelines."
      },
      rag_flow: {
        slide_title: "Step 2: Giving the AI an 'Open Book'",
        description: "Now, let's give the AI the official travel policy before we ask again. Drag the 'Travel Policy PDF' into the AI's workspace to provide it with context.",
        rag_context_document: {
          title: "Travel Policy PDF",
          content: "Policy #4.1b: All international travel must be approved via the 'TravelNow' portal at least 14 days in advance. For trips to the EU, pre-approval from the Compliance department is also required."
        },
        interaction_description: "A draggable icon labeled 'Travel Policy PDF' is on one side of the screen. A 'drop zone' labeled 'Provide Context to AI' is on the other. The user must drag the document to the drop zone. The 'Get New Answer' button only becomes active after the drop.",
        llm_plus_rag_output: "According to the company travel policy, all international travel must be booked through the 'TravelNow' portal 14 days in advance. Note that trips to the EU require additional pre-approval from Compliance."
      }
    }
  ],
  summary_slide: {
    slide_title: "That's the RAG Difference!",
    visual_description: "A simple side-by-side comparison showing a generic answer next to a factual, sourced answer.",
    summary_text: "Without RAG, the AI answers from memory, which can be generic, outdated, or wrong.\n\nWith RAG, the AI first **retrieves** relevant facts from your provided documents and then uses those facts to **generate** a smart, accurate, and trustworthy answer. It turns a generalist into a domain expert."
  }
};