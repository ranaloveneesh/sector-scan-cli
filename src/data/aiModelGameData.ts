export const aiModelGameData = {
  game_title: "What is an AI Model?",
  game_description: "This short interactive game will help you understand the core components that make up an AI model.",
  knowledge_test_slide: {
    slide_title: "First, a Quick Question...",
    question: "At its core, what is the main job of an AI model?",
    options: [
      {
        id: "a",
        text: "A physical robot that performs tasks."
      },
      {
        id: "b",
        text: "A system trained on data to recognize patterns and make predictions."
      },
      {
        id: "c",
        text: "A database that just stores a lot of information."
      },
      {
        id: "d",
        text: "A user-friendly dashboard with charts and graphs."
      }
    ],
    correct_answer_id: "b",
    feedback_correct: "Exactly! It's all about finding patterns to make intelligent predictions.",
    feedback_incorrect: "Not quite! The correct answer is that a model finds patterns in data to make predictions. Let's see how it's built."
  },
  interactive_game_slide: {
    slide_title: "Let's Build an AI Model!",
    instruction: "An AI Model is like a recipe for a decision. Drag the 4 essential 'ingredients' from the list on the left into the 'Model Core' on the right.",
    visual_description: "The screen is split. On the left is a list of 8 component icons. On the right is a large, central shape labeled 'Model Core' with 4 empty, glowing slots.",
    components: [
      {
        id: "data",
        label: "Data",
        is_correct: true,
        explanation: "Correct! Data is the main ingredient. It's the collection of examples the model learns from, like all the recipes in a cookbook."
      },
      {
        id: "algorithms",
        label: "Algorithms",
        is_correct: true,
        explanation: "Perfect! Algorithms are the instructions. They tell the model HOW to learn from the data, like the cooking techniques in the recipe."
      },
      {
        id: "weights",
        label: "Weights",
        is_correct: true,
        explanation: "Yes! Weights are the learned knowledge. After training, these numbers represent the unique patterns the model discovered, like the chef's secret adjustments to the recipe."
      },
      {
        id: "inference",
        label: "Inference",
        is_correct: true,
        explanation: "That's it! Inference is the final step: using the trained model (the recipe) to make a new prediction on new data. This is the act of 'cooking' to get a result."
      },
      {
        id: "dashboard",
        label: "Dashboard",
        is_correct: false,
        rejection_feedback: "Not quite. A Dashboard is used to SHOW a model's results, but it's not part of the core model itself."
      },
      {
        id: "cloud",
        label: "Cloud",
        is_correct: false,
        rejection_feedback: "Close, but no. The Cloud is WHERE a model often runs, but it's the kitchen, not part of the recipe itself."
      },
      {
        id: "prompt",
        label: "Prompt",
        is_correct: false,
        rejection_feedback: "Good thought! A Prompt is the QUESTION you ask the model, not a core component of the model's 'brain'."
      },
      {
        id: "ui",
        label: "UI (User Interface)",
        is_correct: false,
        rejection_feedback: "Almost! The UI is HOW you interact with the model, like the menu at a restaurant, but not the recipe in the kitchen."
      }
    ],
    game_mechanics: "Guided trial and error. When a user drags a component, if it's correct (is_correct: true), it snaps into an empty slot, a checkmark appears, and its 'explanation' text is shown. If it's incorrect, it bounces back to the list and its 'rejection_feedback' is shown briefly as a tooltip.",
    completion_message: "Success! You've assembled the 4 core components of an AI Model. Click 'Next' to see what it all means."
  },
  summary_slide: {
    slide_title: "You've Built an AI Model!",
    visual_description: "A clean visual showing the completed 'Model Core' with the four correct components (Data, Algorithms, Weights, Inference) clearly labeled.",
    summary_text: "You've successfully built a model! Think of it this way:\n\nYou use **Data** and **Algorithms** to train a model and produce its **Weights** (its knowledge). Then, you use those weights for **Inference** to make new predictions.\n\nEverything else, like dashboards and user interfaces, are important parts of an AI *product*, but these four are the heart of the AI *model* itself."
  }
};