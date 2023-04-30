import { CircularProgress, Container } from "@mui/material";

export default function Loader() {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="success" />
    </Container>
  );
}
