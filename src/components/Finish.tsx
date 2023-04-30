import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useQuizContext } from "../context/quiz-context";
import { useNavigate } from "react-router-dom";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Finish() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuizContext();

  const onLogout = () => {
    Cookies.remove("quiz");
    navigate("/login");
    dispatch({ type: "PLAY_AGAIN" });
    localStorage.clear();
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Container sx={{ height: "100vh" }}>
      <Box
        sx={{
          height: "70%",
          display: "grid",
          gridTemplateColumns: { xs: "auto", sm: "auto auto auto" },
          alignItems: "center",
          gap: 2,
          mt: { xs: 5, sm: 0 },
        }}
      >
        <Paper sx={{ maxHeight: "300px", p: 3 }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Correct
          </Typography>
          <Typography variant="h3" sx={{ textAlign: "center", mt: 3 }}>
            {state.result.correctAnswer}
          </Typography>
        </Paper>
        <Paper sx={{ maxHeight: "300px", p: 3 }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Not Answer
          </Typography>
          <Typography variant="h3" sx={{ textAlign: "center", mt: 3 }}>
            {state.result.notAnswer}
          </Typography>
        </Paper>
        <Paper sx={{ maxHeight: "300px", p: 3 }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Incorrect
          </Typography>
          <Typography variant="h3" sx={{ textAlign: "center", mt: 3 }}>
            {state.result.incorrectAnswer}
          </Typography>
        </Paper>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", mt: { xs: 3, sm: 0 } }}
      >
        <Button
          size="large"
          sx={{ width: "fit-content", mx: "auto" }}
          onClick={onLogout}
        >
          <LogoutIcon /> Logout
        </Button>
        <Button
          size="large"
          sx={{ width: "fit-content", mx: "auto" }}
          onClick={() => dispatch({ type: "PLAY_AGAIN" })}
        >
          <RestartAltIcon /> Play Again
        </Button>
      </Box>
    </Container>
  );
}
