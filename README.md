# Recall - Interactive Flashcard App

Recall is an interactive web application designed to help users create and review flashcards for efficient learning. With features like drag-and-drop file upload, shuffle functionality, and keyboard shortcuts, Recall makes studying easy and engaging.

---

## Features

- **File Upload**: Upload `.xls` or `.xlsx` files to create custom flashcards.
- **Drag-and-Drop Support**: Easily upload files by dragging them into the designated area.
- **Shuffle Flashcards**: Randomize the order of flashcards for better learning.
- **Interactive Review**:
  - Flip animations for a smooth experience.
  - Navigation buttons: "Back," "Flip," "Next," and "End."
- **Keyboard Shortcuts**:
  - `Arrow Left`: Go to the previous card.
  - `Arrow Right`: Go to the next card.
  - `Space`: Flip the card.
  - `Enter`: End the session (on the last card).
- **Progress Tracking**: Visual progress bar during the review.
- **Responsive Design**: Works seamlessly across devices.

---

## Technologies Used

- **Frontend**: React, TypeScript
- **UI Components**: Material-UI (MUI)
- **Animations**: React Spring, Framer Motion
- **Excel Parsing**: xlsx library
- **Styling**: CSS and Material-UI

---

## How to Use

### 1. Upload Your File
- Upload an Excel file (`.xls` or `.xlsx`) containing two columns:
  - **Column 1**: Front side of the flashcard.
  - **Column 2**: Back side of the flashcard.

### 2. Shuffle and Review
- Select the "Shuffle Flashcards" option if you want the order randomized.
- Use the navigation buttons or keyboard shortcuts to move through the flashcards.

### 3. Completion
- A congratulatory message appears when all flashcards are reviewed. Click "Go Home" to restart.

---
## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recall.git
   cd recall
   
1. Install dependencies:
   ```bash
   npm install

   
1. Run the development server:
   ```bash
   npm run dev

1. Open the app in your browser:
   ```bash
   http://localhost:5173/

   
1. To build for production:
   ```bash
   npm run build
