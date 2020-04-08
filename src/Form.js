import React, {useState} from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  mainContainer: {
    margin: "20px",
    textAlign: "center"
  },
  inputField: {
    margin: "10px"
  },
  actionButton: {
    margin: "10px"
  }
});

/**
 * Source: https://www.w3resource.com/javascript/form/email-validation.php
 */
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Form = props => {

  const {onAddUserClicked} = props;

  const classes = useStyles();

  const [state, setState] = useState({
    name: "",
    email: "",
    nameErrorMessage: "",
    emailErrorMessage: ""
  });

  const {name, email, nameErrorMessage, emailErrorMessage} = state;

  const onValueChanged = (key, value) => {
    setState({
      ...state,
      [key]: value
    });
  };

  const onAddButtonClicked = () => {
    let isError = false;
    let newNameErrorMessage = "";
    let newEmailErrorMessage = "";
    if (!name) {
      newNameErrorMessage = "Name cannot be empty."
      isError = true;
    }
    if (name && name.split(" ").length !== 2) {
      newNameErrorMessage = "Name format should be '[first name][space][last name]'."
      isError = true;
    }
    if (!email) {
      newEmailErrorMessage = "Email cannot be empty."
      isError = true;
    } else if (!EMAIL_REGEX.test(email)) {
      newEmailErrorMessage = "Email is invalid."
      isError = true;
    }

    if (isError) {
      setState({
        ...state,
        nameErrorMessage: newNameErrorMessage,
        emailErrorMessage: newEmailErrorMessage
      });
    } else {
      onAddUserClicked(name, email);
      setState({
        name: "",
        email: "",
        nameErrorMessage: "",
        emailErrorMessage: ""
      });
    }
  };

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h4">
        Add a New User
      </Typography>
      <div>
        <TextField
          error={!!nameErrorMessage}
          label="Name"
          value={name}
          className={classes.inputField}
          type="text"
          onChange={event => onValueChanged("name", event.target.value)}
          helperText={nameErrorMessage}/>
        <TextField
          error={!!emailErrorMessage}
          label="Email"
          value={email}
          className={classes.inputField}
          type="email"
          onChange={event => onValueChanged("email", event.target.value)}
          helperText={emailErrorMessage}/>
      </div>
      <Button
        color="primary"
        variant="contained"
        className={classes.actionButton}
        onClick={onAddButtonClicked}>
        Add User
      </Button>
    </div>
  );

};

export default Form;
