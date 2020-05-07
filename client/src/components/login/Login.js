import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "../../useStyles";
import Copyright from "../Copyright";
import { notify } from "react-notify-toast";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Spinner from "../Spinner";

//Regular Expression for email validation
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

//form validation
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailForPassReset: "",
      formErrors: {
        emailForPassReset: "",
      },
      isLoggedIn: false,
      sendEmailText: "",
      isDialogOpen: false,
      open: true,
      isLoading: false,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then(() => {
        this.setState({ isLoggedIn: true });
      })
      .catch((err) => console.log(err));
  };

  forgotpassword = (e) => {
    e.preventDefault();
    this.setState({ isDialogOpen: true });
  };

  openDialogBox = (e) => {
    e.preventDefault();
    this.setState({ open: true });
  };

  confirmDialogBox = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log("FORM IS VALID");
    } else {
      console.error("FORM INVALID");
    }

    //Send signup Token to Frontend
    fetch(`/checkemailpassreset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        notify.show(data.msg);
      })
      .catch((err) => console.log(err));

    this.setState({
      sendEmailText: "* Email with the confirmation link was sent",
    });
  };

  handleChangeForPassReset = (e) => {
    e.preventDefault();
    let formErrors = { ...this.state.formErrors };
    const { name, value } = e.target;

    switch (name) {
      case "emailForPassReset":
        formErrors.emailForPassReset = emailRegex.test(value)
          ? ""
          : "Please enter the valid email address";

        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  closeDialogBox = (e) => {
    e.preventDefault();
    this.setState({
      isDialogOpen: false,
      open: false,
    });
    window.location.reload();
  };

  render() {
    let {
      isLoggedIn,
      sendEmailText,
      isLoading,
      isDialogOpen,
      open,
      formErrors,
    } = this.state;

    if (isDialogOpen === true) {
      return (
        <Fragment>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={this.props.classes.paper}>
              <Dialog open={open}>
                <Avatar className={this.props.classes.resetPassAvatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <DialogTitle>
                  {" "}
                  Please confirm your email to reset the password
                </DialogTitle>

                <DialogContent>
                  <Grid item xs={12}>
                    <TextField
                      className={
                        formErrors.emailForPassReset.length > 0 ? "error" : null
                      }
                      variant="outlined"
                      required
                      fullWidth
                      id="emailForPassReset"
                      label="Email "
                      name="emailForPassReset"
                      autoComplete="email"
                      onChange={this.handleChangeForPassReset}
                    />
                    {formErrors.emailForPassReset.length > 0 && (
                      <span className={this.props.classes.errormessage}>
                        {formErrors.email}
                      </span>
                    )}
                  </Grid>
                  <Button
                    onClick={this.closeDialogBox}
                    small
                    variant="contained"
                    color="primary"
                    className={this.props.classes.submit}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={this.confirmDialogBox}
                    small
                    variant="contained"
                    color="primary"
                    className={this.props.classes.resetPassButton}
                  >
                    Send Email
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </Container>
        </Fragment>
      );
    }

    if (isLoggedIn === true) {
      console.log("Login Successful");
      return <Redirect to="/dashboard" />;
    }

    if (isDialogOpen === false) {
      return (
        <Fragment>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={this.props.classes.paper}>
              <Avatar className={this.props.classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form
                className={this.props.classes.form}
                noValidate
                onSubmit={this.handleSubmit}
              >
                <Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                  />
                </Grid>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  disabled={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.props.classes.submit}
                >
                  {isLoading ? <Spinner size="lg" spinning="spinning" /> : ""}
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="#"
                      onClick={this.forgotpassword}
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#/signup" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </Fragment>
      );
    }
  }
}

export default withStyles(useStyles)(Login);
