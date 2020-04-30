import React, { Fragment } from "react";
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
import { withStyles } from "@material-ui/core";
import useStyles from "../../useStyles";
import { notify } from "react-notify-toast";

//Components
import Copyright from "../Copyright";
import Spinner from "../Spinner";

//Regular Expression for email validation
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

//Regular Expression for password validation
const passwordRegex = RegExp(
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
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

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      password: null,
      confirmPassword: null,
      country: null,
      //birthDate: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      sendEmail: false,
      checked: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    //send email if the form is valid
    this.setState({ sendEmail: true });

    if (formValid(this.state)) {
      console.log("FORM IS VALID");
    } else {
      console.error("FORM INVALID");
    }

    //post the form input to the server
    fetch("/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ sendEmail: false });
        notify.show(data.msg);
        this.form.reset();
      })
      .catch((err) => console.log(err));

    console.log(this.state);
    this.setState({ checked: false });
  };

  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    //validation messages for a user
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "Please insert more than 3 characters" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "Please insert more than 3 characters" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Please enter the valid email address";
        break;
      case "username":
        formErrors.username =
          value.length < 6 ? "Please insert more than 6 characters" : "";
        break;
      case "password":
        formErrors.password = passwordRegex.test(value)
          ? ""
          : "Your Password needs to contain minimum 8 characters," +
            "  one uppercase letter, one lowercase letter, one number and one special character";
        break;
      case "confirmPassword":
        formErrors.confirmPassword =
          value !== this.state.password ? "Passwords don't match" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  handleCheckboxStateChange = (e) => {
    e.preventDefault();
    this.setState({ checked: e.target.checked });
  };

  render() {
    const { formErrors, sendEmail, checked } = this.state;

    return (
      <Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={this.props.classes.paper}>
            <Avatar className={this.props.classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Account
            </Typography>
            <form
              className={this.props.classes.form}
              noValidate
              onSubmit={this.handleSubmit}
              ref={(el) => (this.form = el)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={formErrors.firstName.length > 0 ? "error" : null}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={this.handleChange}
                  />
                  {formErrors.firstName.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.firstName}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={formErrors.lastName.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={this.handleChange}
                  />
                  {formErrors.lastName.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.lastName}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={formErrors.email.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.handleChange}
                  />
                  {formErrors.email.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.email}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={formErrors.username.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    onChange={this.handleChange}
                  />
                  {formErrors.username.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.username}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={formErrors.password.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                  />
                  {formErrors.password.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.password}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={
                      formErrors.confirmPassword.length > 0 ? "error" : null
                    }
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                  />
                  {formErrors.confirmPassword.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.confirmPassword}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    name="country"
                    label="Country"
                    id="country"
                  />
                </Grid>
                {/*<Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="date"
                    type="date"
                    id="date"
                  />
                </Grid>
                  */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        checked={checked}
                        onChange={this.handleCheckboxStateChange}
                      />
                    }
                    label="I agree the Terms and Conditions."
                  />
                </Grid>
              </Grid>
              <Button
                disabled={(sendEmail, !checked)}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={this.props.classes.submit}
              >
                Sign Up
                <span>&nbsp;&nbsp;</span>
                {sendEmail ? <Spinner size="1x" /> : ""}
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(Signup);
