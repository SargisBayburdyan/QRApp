import React, { Fragment } from "react";

import User from "./components/user/UserInfo";
import Signup from "./components/signup/Signup";
import ConfirmSignup from "./components/signup/ConfirmSignup";

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
              default:
                return null;
            }
          })()}
        </main>
      </Fragment>
    );
  }
}
