import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useQuizContext } from "../context/quiz-context";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../components/countdown.css";

export default function Countdown() {
  const [countdown, setCountdown] = useState<number>(
    Number(localStorage.getItem("countdown")) || 60
  );
  const { state, dispatch } = useQuizContext();
  let correctAnswer = 0;
  let incorrectAnswer = 0;
  let notAnswer = 0;

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      localStorage.setItem("countdown", JSON.parse(countdown.toString()));
    }
    if (countdown === 0) {
      for (const key in state.quizHasAnswered) {
        if (
          state.quizHasAnswered[key] === state.quiz[key as any]?.correct_answer
        ) {
          correctAnswer += 1;
        }
        if (
          state.quizHasAnswered[key] !== state.quiz[key as any]?.correct_answer
        ) {
          incorrectAnswer += 1;
        }
      }
      localStorage.setItem("countdown", JSON.parse("60"));
      notAnswer = state.quiz.length - correctAnswer - incorrectAnswer;
      dispatch({
        type: "FINISH",
        payload: { correctAnswer, incorrectAnswer, notAnswer },
      });
    }
  }, [countdown]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button
        size="large"
        onClick={() => dispatch({ type: "PREV_QUIZ" })}
        disabled={state.currentQuestion === 0 ? true : false}
      >
        <ChevronRightIcon sx={{ rotate: "180deg" }} /> Prev
      </Button>
      <div className="stacked">
        <Typography variant="h6">{countdown}</Typography>
        <img src="/icons/timer.svg" height={65} />
      </div>
      <Button
        size="large"
        onClick={() => dispatch({ type: "NEXT_QUIZ" })}
        disabled={state.currentQuestion === 9 ? true : false}
      >
        Next <ChevronRightIcon />
      </Button>
    </Box>
  );
}
