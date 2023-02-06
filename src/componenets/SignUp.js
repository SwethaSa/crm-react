import React, { useState } from "react";
import {
  Container,
  Box,
  FormControl,
  TextField,
  Button,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import axios from "axios";
import EmailIcon from "@material-ui/icons/Email";
import FaceIcon from "@material-ui/icons/Face";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  formControl: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },

  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "550%",
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState(null);
  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password || !firstName || !lastName || !userType) {
      alert("OOPS!!👀All the fields are required");
      return;
    }
    try {
      const response = await axios
        .post("https://crm-node-delta.vercel.app/users/register", {
          email,
          password,
          firstName,
          lastName,
          type: userType,
        })
        .then((res) => {
          location.href = "/login";
        });
      console.log(response);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setUserType("");
      if (response) {
        <Alert variant="filled" severity="success">
          alert(User Created Successfully!);
        </Alert>;
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <Container className={classes.form}>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box p={3} bgcolor="background.paper">
        <FormControl className={classes.formControl}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar className={classes.avatar}>
              <EmailIcon />
            </Avatar>
            <TextField
              required
              margin="normal"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={classes.textField}
              variant="outlined"
              fullWidth
            />
          </div>
          {error === "OOPS!!👀Email already exists" && (
            <FormHelperText error>{error}</FormHelperText>
          )}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>

            <TextField
              required
              margin="normal"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={classes.textField}
              variant="outlined"
              fullWidth
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar className={classes.avatar}>
              <FaceIcon />
            </Avatar>

            <TextField
              required
              margin="normal"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className={classes.textField}
              variant="outlined"
              fullWidth
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar className={classes.avatar}>
              <FaceIcon />
            </Avatar>

            <TextField
              required
              margin="normal"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className={classes.textField}
              variant="outlined"
              fullWidth
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar className={classes.avatar}>
              <FaceIcon />
            </Avatar>

            <TextField
              required
              margin="normal"
              label="User Type"
              name="usertype"
              autoComplete="usertype"
              autoFocus
              type="text"
              value={userType}
              onChange={(event) => setUserType(event.target.value)}
              className={classes.textField}
              variant="outlined"
              fullWidth
            />
          </div>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            className={classes.button}
            fullWidth
          >
            Sign Up
          </Button>
          <br></br>
          <div>
            <Link to="/login">Already a user? Click here to Login </Link>
          </div>
        </FormControl>
      </Box>
    </Container>
  );
};

export default SignUpForm;
