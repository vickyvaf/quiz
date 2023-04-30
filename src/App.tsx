import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/quiz-context";
import ProtectAuthScreen from "./middlewares/ProtectAuthScreen";
import ProtectRoute from "./middlewares/ProtectRoute";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Home from "./screens/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <QuizProvider>
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            </QuizProvider>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectAuthScreen>
              <Login />
            </ProtectAuthScreen>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectAuthScreen>
              <Register />
            </ProtectAuthScreen>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
