import React, {useState} from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const PAGE_SIZE = 5;
const START_PAGE = 1;

const useStyles = makeStyles({
  mainContainer: {
    margin: "20px 25%"
  },
  rightButton: {
    float: "right"
  }
});

const UserList = props => {

  const {users} = props;
  const classes = useStyles();

  const [state, setState] = useState({
    page: START_PAGE
  });

  const {page} = state;
  const totalPages = users ? Math.ceil(users.length / PAGE_SIZE) : START_PAGE;
  const showPreviousButton = page !== START_PAGE;
  const showNextButton = page !== totalPages;

  const startIndex = PAGE_SIZE * (page - 1);
  const endIndex = PAGE_SIZE * (page);

  const usersToDisplay = users.slice(startIndex, endIndex);

  const onPreviousButtonClicked = () => {
    setState({page: page - 1});
  };

  const onNextButtonClicked = () => {
    setState({page: page + 1});
  };

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h4">
        List of Users
      </Typography>
      <List>
        {usersToDisplay.map(user => {
          let {name} = user;
          return (
            <ListItem button>
              <ListItemText primary={name}/>
            </ListItem>
          )
        })}
      </List>
      <div>
        {
          showPreviousButton &&
          <Button
            color="primary"
            variant="contained"
            onClick={onPreviousButtonClicked}>
            Previous
          </Button>
        }
        {
          showNextButton &&
          <Button
            color="primary"
            variant="contained"
            className={classes.rightButton}
            onClick={onNextButtonClicked}>
            Next
          </Button>}
      </div>
    </div>
  );

};

export default UserList;