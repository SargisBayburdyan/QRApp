import React, { Fragment } from "react";

import User from "./components/user/UserInfo";

export default class Routes extends React.Component {
  render() {
    const { params } = this.props.match;

    return (
      <Fragment>
        <main>
          {(function () {
            switch (params.pageName) {
              case "user":
                return <User />;
              default:
                return null;
            }
          })()}
        </main>
      </Fragment>
    );
  }
}
