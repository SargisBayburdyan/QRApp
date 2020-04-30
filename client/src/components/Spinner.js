import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

//Spinner information
export default (props) => (
  <i className="fa fa-spin">
    <FontAwesomeIcon icon={faSpinner} size={props.size} rotation={90} />
  </i>
);
