import { useQuizContext } from "../context/quiz-context";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import Cookies from "js-cookie";

type Props = {
  playQuiz: () => void;
};

export default function Confirm({ playQuiz }: Props) {
  const navigate = useNavigate();
  const { dispatch } = useQuizContext();

  const onLogout = () => {
    Cookies.remove("quiz");
    navigate("/login");
    dispatch({ type: "PLAY_AGAIN" });
    localStorage.clear();
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">Are you ready ?</Typography>
        <Box sx={{ pt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="outlined" onClick={onLogout}>
            Cancel
          </Button>
          <Button variant="contained" disableElevation onClick={playQuiz}>
            Play
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
