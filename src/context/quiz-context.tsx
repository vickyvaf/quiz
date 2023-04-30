import { createContext, useContext, useReducer } from "react";

type QuizContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

type QuizProviderProps = {
  children: React.ReactNode;
};

type Quiz = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

type Result = {
  correctAnswer: number;
  incorrectAnswer: number;
  notAnswer: number;
};

type State = {
  tag: "idle" | "fetching" | "loaded" | "error" | "finish" | "onplay_quiz";
  quiz: Quiz[];
  answers: string[];
  currentQuestion: number;
  questionHasAnswered: number[];
  quizHasAnswered: any;
  result: Result;
  errorMessage: string;
};

type Action =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: Quiz[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "START_QUIZ" }
  | { type: "RESUME_QUIZ" }
  | { type: "NEXT_QUIZ" }
  | { type: "PREV_QUIZ" }
  | { type: "CHOOSE_QUIZ"; payload: number }
  | { type: "CHOOSE_ANSWER"; payload: number }
  | { type: "FINISH"; payload: Result }
  | { type: "PLAY_AGAIN" };

export const QuizContext = createContext<QuizContextType>({
  state: {
    tag: JSON.parse(localStorage.getItem("tag") as string) ?? "idle",
    quiz: JSON.parse(localStorage.getItem("quiz") as string) ?? [],
    answers: [],
    currentQuestion:
      JSON.parse(localStorage.getItem("currentQuestion") as string) ?? 0,
    questionHasAnswered:
      JSON.parse(localStorage.getItem("questionHasAnswered") as string) ?? [],
    quizHasAnswered:
      JSON.parse(localStorage.getItem("quizHasAnswered") as string) ?? {},
    result: {
      correctAnswer: 0,
      incorrectAnswer: 0,
      notAnswer: 0,
    },
    errorMessage: "",
  },
  dispatch() {},
});

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const initialState: State = {
    tag: JSON.parse(localStorage.getItem("tag") as string) ?? "idle",
    quiz: JSON.parse(localStorage.getItem("quiz") as string) ?? [],
    answers: [],
    currentQuestion:
      JSON.parse(localStorage.getItem("currentQuestion") as string) ?? 0,
    questionHasAnswered:
      JSON.parse(localStorage.getItem("questionHasAnswered") as string) ?? [],
    quizHasAnswered:
      JSON.parse(localStorage.getItem("quizHasAnswered") as string) ?? {},
    result: {
      correctAnswer: 0,
      incorrectAnswer: 0,
      notAnswer: 0,
    },
    errorMessage: "",
  };

  const reducer = (state: State, action: Action): State => {
    switch (state.tag) {
      case "idle": {
        switch (action.type) {
          case "FETCH": {
            return {
              ...state,
              tag: "fetching",
            };
          }
          default: {
            return state;
          }
        }
      }
      case "fetching": {
        switch (action.type) {
          case "FETCH_SUCCESS": {
            return {
              ...state,
              tag: "loaded",
              quiz: action.payload,
            };
          }
          case "FETCH_ERROR": {
            return {
              ...state,
              tag: "error",
              quiz: [],
              errorMessage: action.payload,
            };
          }
          default:
            return state;
        }
      }
      case "error": {
        switch (action.type) {
          case "FETCH": {
            return {
              ...state,
              tag: "fetching",
            };
          }
          default:
            return state;
        }
      }
      case "onplay_quiz": {
        switch (action.type) {
          case "RESUME_QUIZ": {
            return {
              ...state,
              tag: "onplay_quiz",
              answers: [
                state.quiz[state.currentQuestion].correct_answer,
                ...state.quiz[state.currentQuestion].incorrect_answers,
              ],
            };
          }
          case "CHOOSE_QUIZ": {
            return {
              ...state,
              currentQuestion: action.payload,
              answers: [
                state.quiz[action.payload].correct_answer,
                ...state.quiz[action.payload].incorrect_answers,
              ],
            };
          }
          case "CHOOSE_ANSWER": {
            return {
              ...state,
              questionHasAnswered: [
                ...state.questionHasAnswered,
                action.payload,
              ],
            };
          }
          case "NEXT_QUIZ": {
            return {
              ...state,
              currentQuestion: state.currentQuestion + 1,
              answers: [
                state.quiz[state.currentQuestion + 1].correct_answer,
                ...state.quiz[state.currentQuestion + 1].incorrect_answers,
              ],
            };
          }
          case "PREV_QUIZ": {
            return {
              ...state,
              currentQuestion: state.currentQuestion - 1,
              answers: [
                state.quiz[state.currentQuestion - 1].correct_answer,
                ...state.quiz[state.currentQuestion - 1].incorrect_answers,
              ],
            };
          }
          case "FINISH": {
            return {
              ...state,
              tag: "finish",
              result: action.payload,
            };
          }
          default:
            return state;
        }
      }
      case "loaded": {
        switch (action.type) {
          case "START_QUIZ": {
            return {
              ...state,
              tag: "onplay_quiz",
              answers: [
                state.quiz[state.currentQuestion].correct_answer,
                ...state.quiz[state.currentQuestion].incorrect_answers,
              ],
            };
          }
          default:
            return state;
        }
      }
      case "finish": {
        switch (action.type) {
          case "PLAY_AGAIN": {
            return {
              ...state,
              tag: "idle",
              quiz: [],
              answers: [],
              currentQuestion: 0,
              questionHasAnswered: [],
              quizHasAnswered: {},
              result: {
                correctAnswer: 0,
                incorrectAnswer: 0,
                notAnswer: 0,
              },
              errorMessage: "",
            };
          }
          default:
            return state;
        }
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const quizContextValue = {
    state,
    dispatch,
  };

  return (
    <QuizContext.Provider value={quizContextValue}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  return useContext(QuizContext);
};
