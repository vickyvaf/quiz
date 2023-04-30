import { Alert, Container, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

type Props = {
  errorMsg: string;
  refetch?: () => void;
};

export default function Error({ errorMsg, refetch }: Props) {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Alert severity="error">{errorMsg}</Alert>
      <Button variant="outlined" onClick={refetch}>
        Try Again <RefreshIcon />
      </Button>
    </Container>
  );
}
