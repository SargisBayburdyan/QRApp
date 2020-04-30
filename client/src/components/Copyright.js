import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
function Copyright() {
  return (
    <Fragment>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://google.com">
          QR App
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Fragment>
  );
}

export default Copyright;
