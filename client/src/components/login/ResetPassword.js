import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { notify } from "react-notify-toast";
import Grid from "@material-ui/core/Grid";
//Components
import useStyles from "../../useStyles";
import Copyright from "../Copyright";
import Spinner from "../Spinner";

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

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      password: "",
      passwordIsReset: false,
      formErrors: {
        currentPassword: "",
        password: "",
        confirmPassword: "",
      },
      isLoading: false,
    };
  }

  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    //validation messages for a user
    switch (name) {
      case "currentPassword":
        formErrors.currentPassword = passwordRegex.test(value)
          ? ""
          : "Your current Passwordcontains minimum 8 characters with" +
            " at least one Uppercase letter, one Lowercase letter, one Number and one Special Character";
        break;
      case "password":
        formErrors.password = passwordRegex.test(value)
          ? ""
          : "Your Password needs to contain minimum 8 characters" +
            " at least one Uppercase letter, one Lowercase letter, one Number and one Special Character";
        break;
      case "confirmPassword":
        formErrors.confirmPassword =
          value !== this.state.password ? "Please Enter the same password" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const { id } = this.props.match.params;

    if (formValid(this.state)) {
      console.log("FORM IS VALID");
    } else {
      console.error("FORM INVALID");
    }

    fetch(`/resetpassword/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          isLoading: false,
          passwordUpdated: true,
        });
        notify.show(data.msg);
      })
      .catch((err) => console.log(err));
  };

  render() {
    let { formErrors, passwordUpdated, isLoading } = this.state;
    if (passwordUpdated === true) {
      console.log("Password reset successfully");
      return <Redirect to="/signin" />;
    }

    return (
      <Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={this.props.classes.paper}>
            <Avatar className={this.props.classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <form
              onSubmit={this.handleSubmit}
              className={this.props.classes.form}
              noValidate
            >
              <Grid className={this.props.classes.resetPasswordGrid}>
                <TextField
                  className={
                    formErrors.currentPassword.length > 0 ? "error" : null
                  }
                  variant="outlined"
                  required
                  fullWidth
                  name="currentPassword"
                  label="Currentt Password"
                  type="password"
                  id="currentpassword"
                  onChange={this.handleChange}
                />
                {formErrors.currentPassword.length > 0 && (
                  <span className={this.props.classes.errormessage}>
                    {formErrors.currentPassword}
                  </span>
                )}
              </Grid>
              <Grid className={this.props.classes.resetPasswordGrid}>
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
              <Grid>
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
              <Button
                disabled={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={this.props.classes.submit}
              >
                Reset
                <span>&nbsp;&nbsp;</span>
                {isLoading ? <Spinner size="1x" /> : ""}
              </Button>
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

export default withStyles(useStyles)(ResetPassword);
