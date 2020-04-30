import React, { Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
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

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      firstName: null,
      lastName: null,
      emailPersonal: null,
      emailBusinness: null,
      phoneNumberPersonal: null,
      phoneNumberBusinness: null,
      street: null,
      appartment: null,
      zipCode: null,
      country: null,
      birthDate: null,
      website: null,
      formErrors: {
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        appartment: "",
        zipCode: "",
        country: "",
        birthDate: "",
      },
      isLoading: false,
      checked: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    //send email if the form is valid
    this.setState({ isLoading: true });

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
        // notify.show(data.msg);
        // this.form.reset();
      })
      .catch((err) => console.log(err));
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
      case "emailPersonal":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Please enter the valid email address";
        break;
      case "emailBusinness":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Please enter the valid email address";
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
    const { formErrors, isLoading, checked, title } = this.state;

    return (
      <Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={this.props.classes.paper}>
            <Avatar className={this.props.classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Personal Information
            </Typography>
            <form
              className={this.props.classes.form}
              noValidate
              onSubmit={this.handleSubmit}
              ref={(el) => (this.form = el)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl className={this.props.classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Title</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={title}
                      onChange={this.handleChange}
                    >
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Mrs.">Mrs.</MenuItem>
                      <MenuItem value="Dr.">Dr.</MenuItem>
                      <MenuItem value="Prof. Dr.">Prof. Dr.</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                    label="Personal Email Address"
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
                    className={formErrors.email.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Businness Email Address"
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
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    name="country"
                    label="Country"
                    id="country"
                  />
                </Grid>
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
                disabled={(isLoading, !checked)}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={this.props.classes.submit}
              >
                Generate QR Code
                <span>&nbsp;&nbsp;</span>
                {isLoading ? <Spinner size="1x" /> : ""}
              </Button>
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

export default withStyles(useStyles)(UserInfo);
