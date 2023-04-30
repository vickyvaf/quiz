import { useEffect } from "react";
import { useQuizContext } from "../context/quiz-context";
import Confirm from "../components/Confirm";
import Error from "../components/Error";
import Finish from "../components/Finish";
import Loader from "../components/Loader";
import Quiz from "../components/Quiz";
import axios from "axios";

export default function Home() {
  const { state, dispatch } = useQuizContext();

  const playQuiz = () => {
    dispatch({ type: "START_QUIZ" });
  };

  const refetch = () => {
    dispatch({ type: "FETCH" });
  };

  useEffect(() => {
    switch (state.tag) {
      case "idle":
        dispatch({ type: "FETCH" });
        break;
      case "fetching":
        axios(import.meta.env.VITE_QUIZ)
          .then((res) => {
            dispatch({ type: "FETCH_SUCCESS", payload: res.data.results });
            localStorage.setItem("quiz", JSON.stringify(res.data.results));
          })
          .catch((err) => {
            dispatch({ type: "FETCH_ERROR", payload: err?.message });
          });
        break;
      case "onplay_quiz":
        dispatch({ type: "RESUME_QUIZ" });
        break;
      default:
        break;
    }
    localStorage.setItem("tag", JSON.stringify(state.tag));
    localStorage.setItem(
      "currentQuestion",
      JSON.stringify(state.currentQuestion)
    );
    localStorage.setItem(
      "questionHasAnswered",
      JSON.stringify(state.questionHasAnswered)
    );
  }, [state]);

  return (
    <>
      {state.tag === "fetching" && <Loader />}
      {state.tag === "error" && (
        <Error errorMsg={state.errorMessage} refetch={refetch} />
      )}
      {state.tag === "loaded" && <Confirm playQuiz={playQuiz} />}
      {state.tag === "onplay_quiz" && <Quiz />}
      {state.tag === "finish" && <Finish />}
    </>
  );
}
