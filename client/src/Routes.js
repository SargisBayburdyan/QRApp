import React, { Fragment } from "react";

import User from "./components/user/UserInfo";
import Signup from "./components/signup/Signup";
import ConfirmSignup from "./components/signup/ConfirmSignup";
import Login from "./components/login/Login";
import ResetPassword from "./components/login/ResetPassword";

export default class Routes extends React.Component {
  render() {
    const { params } = this.props.match;

    return (
      <Fragment>
        <main>
          {(function () {
            switch (params.pageName) {
              case "vcard":
                return <User />;
              case "signup":
                return <Signup />;
              case "signup/confirm/:id":
                return <ConfirmSignup />;
              case "login":
                return <Login />;
              case "resetpassword":
                return <ResetPassword />;
              default:
                return null;
            }
          })()}
        </main>
      </Fragment>
    );
  }
}
