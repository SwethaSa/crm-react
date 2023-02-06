import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormHelperText,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  textField: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:100/reset-password/${token}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ password }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to reset password");
      }

      setMessage(
        "Password reset successful😍👍!! Click the Login link below to Login"
      );
    } catch (error) {
      console.error(error);
      setMessage("Invalid token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h6">Reset Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          className={classes.button}
          type="submit"
          disabled={loading}
          variant="contained"
          color="primary"
          disabled={loading || password.length < 8}
        >
          Reset
        </Button>
        <FormHelperText>
          Password Must be greater than 8 characters
        </FormHelperText>

        {loading && <CircularProgress />}
        {message && window.alert(message)}
        <Button color="primary" component={Link} to="/login">
          <Typography variant="h6">Login</Typography>
        </Button>
      </form>
    </Paper>
  );
};

export default ResetPassword;
