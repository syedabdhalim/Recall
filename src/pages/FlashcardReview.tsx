import React, { useState, useEffect, useCallback } from "react";
import { Button, Typography, Box, LinearProgress } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

interface FlashcardReviewProps {
  flashcards: { front: string; back: string }[];
  onReset: () => void;
}

const FlashcardReview: React.FC<FlashcardReviewProps> = ({
  flashcards,
  onReset,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 0 : 1,
    transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 1, tension: 500, friction: 30 },
  });

  const handleNext = useCallback(() => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, flashcards.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleEnd = () => {
    setIsCompleted(true);
  };

  const isLastCard = currentIndex === flashcards.length - 1;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isCompleted) return;

      switch (event.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          if (isLastCard) {
            handleEnd();
          } else {
            handleNext();
          }
          break;
        case " ":
          event.preventDefault();
          handleFlip();
          break;
        case "Enter":
          if (isLastCard) {
            handleEnd();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    currentIndex,
    isFlipped,
    isLastCard,
    isCompleted,
    handleNext,
    handlePrevious,
    handleFlip,
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {isCompleted ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            🎉 Congratulations!
          </Typography>
          <Typography variant="body1" sx={{ color: "#666" }}>
            You’ve completed all the flashcards.
          </Typography>
          <Button
            variant="contained"
            onClick={onReset}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              borderRadius: "20px",
              padding: "10px 20px",
              textTransform: "none",
            }}
          >
            Go Home
          </Button>
        </Box>
      ) : (
        <>
          <Box
            style={{
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <Typography variant="subtitle2" style={{ color: "#666" }}>
              {`Word ${currentIndex + 1} of ${flashcards.length}`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={((currentIndex + 1) / flashcards.length) * 100}
              style={{
                height: "8px",
                borderRadius: "4px",
                marginTop: "10px",
                backgroundColor: "#e0e0e0",
              }}
            />
          </Box>

          <div
            style={{
              perspective: "1000px",
              marginBottom: "30px",
              position: "relative",
              width: "350px",
              height: "250px",
            }}
          >
            <animated.div
              style={{
                opacity,
                transform,
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                background: "linear-gradient(135deg, #ffffff, #f1f1f1)",
                backfaceVisibility: "hidden",
              }}
            >
              <Typography
                variant="h5"
                align="center"
                style={{
                  fontSize: "24px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                {flashcards[currentIndex].front}
              </Typography>
            </animated.div>
            <animated.div
              style={{
                opacity: opacity.to((o) => 1 - o),
                transform: transform.to((t) => `${t} rotateY(180deg)`),
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                background: "linear-gradient(135deg, #ffffff, #f1f1f1)",
                backfaceVisibility: "hidden",
              }}
            >
              <Typography
                variant="h5"
                align="center"
                style={{
                  fontSize: "24px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                {flashcards[currentIndex].back}
              </Typography>
            </animated.div>
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              style={{
                borderRadius: "20px",
                color: "#1976d2",
                borderColor: "#1976d2",
              }}
            >
              &lt; Back
            </Button>
            <Button
              variant="contained"
              onClick={handleFlip}
              style={{
                backgroundColor: "#1976d2",
                color: "#fff",
                borderRadius: "20px",
              }}
            >
              Flip
            </Button>
            {isLastCard ? (
              <Button
                variant="contained"
                onClick={handleEnd}
                style={{
                  backgroundColor: "#d32f2f",
                  color: "#fff",
                  borderRadius: "20px",
                }}
              >
                End
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={handleNext}
                style={{
                  borderRadius: "20px",
                  color: "#1976d2",
                  borderColor: "#1976d2",
                }}
              >
                Next &gt;
              </Button>
            )}
          </div>

          <Box
            sx={{
              marginTop: "20px",
              textAlign: "center",
              color: "#666",
            }}
          >
            <Typography variant="body2">Keyboard Shortcuts:</Typography>
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              <strong>Arrow Left:</strong> Previous card &nbsp;&nbsp;&nbsp;
              <strong>Arrow Right:</strong> Next card &nbsp;&nbsp;&nbsp;
              <strong>Space:</strong> Flip card
              <br />
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "14px" }}></Typography>
          </Box>
        </>
      )}
    </div>
  );
};

export default FlashcardReview;
