import { Button, Container, Grid, Typography } from "@mui/material";
import { useQuizContext } from "../context/quiz-context";
import Countdown from "./Countdown";
import Answer from "./Answer";

export default function Quiz() {
  const { state, dispatch } = useQuizContext();

  const onFinish = () => {
    let correctAnswer = 0;
    let incorrectAnswer = 0;
    let notAnswer = 0;
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
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 0, md: 3 }, height: "100vh" }}>
      <Grid container height="100%" justifyContent="space-between">
        <Grid item xs={1} sm={4}>
          <Typography
            variant="h4"
            sx={{
              pt: 5,
              textAlign: "center",
              fontSize: { xs: "14px", md: "24px" },
            }}
          >
            Questions
          </Typography>
          <Grid container gap={1} mt={5}>
            {state.quiz.map((_, i) => {
              const checkHasAnswered = state.questionHasAnswered.find(
                (x) => x === i + 1
              );
              return (
                <Button
                  key={i}
                  variant={checkHasAnswered ? "contained" : "outlined"}
                  sx={{ textAlign: "center" }}
                  onClick={() => dispatch({ type: "CHOOSE_QUIZ", payload: i })}
                  disableElevation
                >
                  {i + 1}
                </Button>
              );
            })}
            <Grid item xs={12} sx={{ mt: { xs: 5, md: 60 } }}>
              {state.questionHasAnswered.length === 10 && (
                <Button variant="contained" disableElevation onClick={onFinish}>
                  Finish
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} height="90%">
          <Typography
            variant="h4"
            sx={{
              pt: 5,
              textAlign: "center",
              fontSize: { xs: "14px", md: "24px" },
            }}
          >
            # {state.currentQuestion + 1}
          </Typography>
          <Typography
            variant="h4"
            sx={{ pt: 5, fontSize: { xs: "14px", md: "24px" } }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `${state.quiz[state.currentQuestion].question}`,
              }}
            />
          </Typography>
          <Answer answers={state.answers} />
        </Grid>
        <Grid item xs={12} height="10">
          <Countdown />
        </Grid>
      </Grid>
    </Container>
  );
}
