import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { notify } from "react-notify-toast";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

//Components
import Spinner from "../Spinner";
import useStyles from "../../useStyles";
class ConfirmSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirming: true,
      buttonPressed: false,
    };
  }
  componentDidMount = () => {
    const { id } = this.props.match.params;
    console.log("Confirmation");

    fetch(`/signup/confirm/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ isConfirming: false });
        notify.show(data.msg);
      })
      .catch((err) => console.log(err));
  };

  goToLogin = () => {
    console.log("Button Pressed");
    this.setState({ buttonPressed: true });
  };

  render() {
    if (this.state.buttonPressed === true) {
      return <Redirect to="/login" />;
    }

    return (
      <Fragment>
        {this.state.isConfirming ? (
          <Spinner className={this.props.classes.confirmSignup} size="1x" />
        ) : (
          <Button
            onClick={this.goToLogin}
            variant="contained"
            color="primary"
            className={this.props.classes.confirmSignup}
          >
            Congratulations! You have a new account. Press this button for Sign
            In
          </Button>
        )}
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(ConfirmSignup);
