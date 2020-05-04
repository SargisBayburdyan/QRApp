const useStyles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  confirmSignup: {
    marginTop: theme.spacing(55),
    marginLeft: theme.spacing(80),
  },
  errormessage: {
    color: "red",
  },
  resetPasswordGrid: {
    marginBottom: theme.spacing(3),
  },
  resetPassButton: {
    marginTop: theme.spacing(1),
    marginLeft: "220px",
  },
  resetPassAvatar: {
    marginLeft: theme.spacing(26),
    backgroundColor: theme.palette.secondary.main,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  qrcode: {
    textAlign: "center",
  },
});

export default useStyles;
