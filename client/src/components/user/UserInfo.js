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
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core";
import useStyles from "../../useStyles";
import { notify } from "react-notify-toast";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import PhoneInput from "material-ui-phone-number";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
//import MomentUtils from "@date-io/moment";

//Components
import Copyright from "../Copyright";
import Spinner from "../Spinner";

//Regular Expression for email validation
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const zipCodeRegex = RegExp(/^[0-9]{1,6}$/);

const websiteRegex = RegExp(
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
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
      emailBusiness: null,
      phonePersonal: null,
      phoneBusiness: null,
      street: null,
      zipcode: null,
      country: null,
      birthDate: null,
      website: null,
      linkedin: null,
      company: null,

      formErrors: {
        title: "",
        firstName: "",
        lastName: "",
        emailPersonal: "",
        emailBusiness: "",
        street: "",
        zipcode: "",
        country: "",
        birthDate: "",
        website: "",
        linkedin: "",
        company: "",
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
    fetch("/userdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ isLoading: false });
        notify.show(data.msg);
        this.form.reset();
      })
      .catch((err) => console.log(err));
    this.setState({ checked: false });

    console.log(this.state);
  };

  handleChange = (e) => {
    // e.preventDefault();

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
        formErrors.emailPersonal = emailRegex.test(value)
          ? ""
          : "Please enter the valid email address";
        break;
      case "emailBusiness":
        formErrors.emailBusiness = emailRegex.test(value)
          ? ""
          : "Please enter the valid email address";
        break;
      case "street":
        formErrors.street =
          value.length < 50 ? "" : "Please enter less than 50 characters";
        break;
      case "zipcode":
        formErrors.zipcode = zipCodeRegex.test(value)
          ? ""
          : "Please enter the zip code";
        break;
      case "website":
        formErrors.website = websiteRegex.test(value)
          ? ""
          : "Please enter the valid URL starting with http:// or https://";
        break;
      case "linkedin":
        formErrors.website = websiteRegex.test(value)
          ? ""
          : "Please enter the valid URL";
        break;
      case "company":
        formErrors.company =
          value.length < 20 ? "" : "Please enter less than 20 characters";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  handleTitleChange = (e) => {
    e.preventDefault();

    this.setState({ title: e.target.value });
  };

  handleDateChange = (date) => {
    console.log(date);
    this.setState({ birthDate: date });
  };

  handleCheckboxStateChange = (e) => {
    e.preventDefault();
    this.setState({ checked: e.target.checked });
  };

  handlePhonePersonalChange = (value) => {
    this.setState({
      phonePersonal: value,
    });
  };

  handlePhoneBusinessChange = (value) => {
    this.setState({
      phoneBusiness: value,
    });
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
                      value={title || ""}
                      onChange={this.handleTitleChange}
                    >
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Mrs.">Mrs.</MenuItem>
                      <MenuItem value="B. Sc.">B. Sc.</MenuItem>
                      <MenuItem value="M. Sc.">M. Sc.</MenuItem>
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
                {/*  <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      keyboard
                      fullWidth
                      required
                      variant="outlined"
                      label="Date of Birth"
                      format={"dd/MM/yyyy"}
                      mask={(value) =>
                        value
                          ? [
                              /\d/,
                              /\d/,
                              "/",
                              /\d/,
                              /\d/,
                              "/",
                              /\d/,
                              /\d/,
                              /\d/,
                              /\d/,
                            ]
                          : []
                      }
                      value={this.state.birthDate}
                      onChange={this.handleDateChange}
                      disableOpenOnEnter
                      animateYearScrolling={false}
                      autoOk={true}
                      clearable
                    />
                  </MuiPickersUtilsProvider>
                    </Grid> */}
                {/*
                  <Grid item xs={12}>
                    <TextField type="date" fullWidth required />
                  </Grid>
                */}
                {/*
                  <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      fullWidth
                      variant="outlined"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="birthDate"
                      name="birthDate"
                      label="Birth Date"
                      value={birthDate}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                */}
                <Grid item xs={12}>
                  <TextField
                    className={
                      formErrors.emailPersonal.length > 0 ? "error" : null
                    }
                    variant="outlined"
                    required
                    fullWidth
                    id="emailPersonal"
                    label="Personal Email Address"
                    name="emailPersonal"
                    autoComplete="email"
                    onChange={this.handleChange}
                  />
                  {formErrors.emailPersonal.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.emailPersonal}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={
                      formErrors.emailBusiness.length > 0 ? "error" : null
                    }
                    variant="outlined"
                    fullWidth
                    id="emailBusiness"
                    label="Business Email Address"
                    name="emailBusiness"
                    autoComplete="email"
                    onChange={this.handleChange}
                  />
                  {formErrors.emailBusiness.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.emailBusiness}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput
                    variant="outlined"
                    fullWidth
                    disableAreaCodes
                    defaultCountry="de"
                    name="phonePersonal"
                    onChange={this.handlePhonePersonalChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput
                    variant="outlined"
                    fullWidth
                    disableAreaCodes
                    defaultCountry="de"
                    name="phoneBusiness"
                    onChange={this.handlePhoneBusinessChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={formErrors.street.length > 0 ? "error" : null}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    name="street"
                    label="Street"
                    id="street"
                  />
                  {formErrors.street.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.street}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={formErrors.zipcode.length > 0 ? "error" : null}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    name="zipcode"
                    label="Zip Code"
                    id="zipcode"
                  />
                  {formErrors.zipcode.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.zipcode}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    name="country"
                    label="Country"
                    id="country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={formErrors.website.length > 0 ? "error" : null}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    name="website"
                    label="Website"
                    id="website"
                  />
                  {formErrors.website.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.website}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={formErrors.linkedin.length > 0 ? "error" : null}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    name="linkedin"
                    label="Linkedin URL"
                    id="linkedin"
                  />
                  {formErrors.linkedin.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.linkedin}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={formErrors.company.length > 0 ? "error" : null}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    name="company"
                    label="Company"
                    id="company"
                  />
                  {formErrors.company.length > 0 && (
                    <span className={this.props.classes.errormessage}>
                      {formErrors.company}
                    </span>
                  )}
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
