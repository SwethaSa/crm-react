import React, { useState } from "react";
import { TextField, Button, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(10),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "30%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  Alert: {
    alignItems: "flex-start",
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }
    axios
      .post("https://crm-node-delta.vercel.app/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.open("/dashboard");
      })
      .catch((err) => {
        if (err.response.data.msg) {
          setError(err.response.data.msg);
        } else {
          setError("An error occurred, please try again");
        }
      });
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5">Login</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className={classes.submit}
        >
          Login
        </Button>
        <div>
          <Link to="/">
            Do not have an Account? Click here to Sign Up{" "}
          </Link>
        </div>{" "}
        <br></br>
        <Link to="/forgot-password">Forgot Password?</Link>
      </form>
      {error && (
        <Typography color="error" align="center">
          <Alert variant="filled" severity="error">
            Error: {error}
          </Alert>
        </Typography>
      )}
    </div>
  );
}

export default Login;