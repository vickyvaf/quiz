import { Box, Grid } from "@mui/material";
import { useQuizContext } from "../context/quiz-context";

type Props = {
  answers: string[];
};

export default function Answer({ answers }: Props) {
  const { state, dispatch } = useQuizContext();

  const onAnswer = (data: string) => {
    state.quizHasAnswered[state.currentQuestion] = data || data;
    localStorage.setItem(
      "quizHasAnswered",
      JSON.stringify(state.quizHasAnswered)
    );
    const checkHasAnswered = state.questionHasAnswered.find((x) => {
      return x === state.currentQuestion + 1;
    });
    if (checkHasAnswered === undefined) {
      dispatch({ type: "CHOOSE_ANSWER", payload: state.currentQuestion + 1 });
    } else {
      state.quizHasAnswered[state.currentQuestion] = data || data;
      dispatch({ type: "RESUME_QUIZ" });
    }

    /**  Move on to the next question once has provided an answer  */
    if (state.currentQuestion < state.quiz.length - 1) {
      setTimeout(() => {
        dispatch({ type: "NEXT_QUIZ" });
      }, 1000);
    }
  };

  return (
    <Box
      sx={{
        mt: 5,
        display: "grid",
        gridTemplateColumns: { xs: "auto", md: "auto auto" },
        gap: 1,
      }}
    >
      {answers?.map((data: string, i: number) => {
        const checkHasAnswerd =
          state.quizHasAnswered[state.currentQuestion] === data;

        return (
          <Grid
            item
            container
            key={i}
            sx={{
              placeItems: "center",
              justifyContent: "center",
              textAlign: "center",
              border: "1px solid #2BA900",
              borderRadius: "8px",
              backgroundColor: checkHasAnswerd ? "#2BA900" : "#fff",
              color: checkHasAnswerd ? "#FFFFFF" : "#2BA900",
              fontSize: { xs: "14px", md: "20px" },
              ":hover": {
                cursor: "pointer",
                boxShadow: "1px 1px 10px #2BA90030",
              },
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `${data}`,
              }}
              onClick={() => onAnswer(data)}
              style={{ width: "100%", padding: "30px 0" }}
            />
          </Grid>
        );
      })}
    </Box>
  );
}
