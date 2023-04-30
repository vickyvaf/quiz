import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    toast.remove();

    axios
      .post(import.meta.env.VITE_LOGIN, {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((res) => {
        if (res.status === 200) {
          Cookies.set("quiz", res.data.accessToken);
          return navigate("/");
        }
      })
      .catch((err) => toast.error(err.response.data || err?.message));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disableElevation
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#2BA900" }}>
                Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
