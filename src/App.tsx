import React, { useState } from "react";
import FileUpload from "./pages/FileUpload";
import FlashcardReview from "./pages/FlashcardReview";
import { CssBaseline, Container, Typography, Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

interface Flashcard {
  front: string;
  back: string;
}

const App: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            padding: "16px 0",
            backgroundColor: "#1976d2",
            color: "#fff",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            setFlashcards(null);

          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Recall
          </Typography>
        </Box>

        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            flex: 1,
            padding: "24px 16px",
            textAlign: "center",
          }}
        >
          <AnimatePresence mode="wait">
            {!flashcards ? (
              <motion.div
                key="fileUpload"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                style={{ width: "100%" }}
              >
                <Box sx={{ marginBottom: "24px" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginBottom: "8px" }}
                  >
                    Welcome to Recall
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", marginBottom: "16px" }}
                  >
                    Quickly create and review flashcards to master your learning
                    materials. Upload your Excel file with front and back
                    columns to get started.
                  </Typography>
                </Box>

                <FileUpload onUpload={setFlashcards} />
              </motion.div>
            ) : (
              <motion.div
                key="flashcardReview"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                style={{ width: "100%" }}
              >
                <FlashcardReview
                  flashcards={flashcards}
                  onReset={() => setFlashcards(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Container>

        <Box
          sx={{
            padding: "8px 16px",
            backgroundColor: "#1976d2",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            Any inquiry/feedback please send email to{" "}
            <a
              href="mailto:syedabdhalim7@gmail.com"
              style={{
                color: "#fff",
                textDecoration: "underline",
              }}
            >
              syedabdhalim7@gmail.com
            </a>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default App;
