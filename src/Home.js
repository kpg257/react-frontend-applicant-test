import React, {useState, useEffect} from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import UserList from "./UserList";
import Form from "./Form";

const Home = () => {

  const [state, setState] = useState({
    users: [],
    showSnackbar: false
  });

  const getUserObject = (name, email) => {
    return {
      name,
      isBiz: email.endsWith(".biz")
    }
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(response => {
        const users = response.map(user => {
          const {name, email} = user;
          return getUserObject(name, email);
        });
        users.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        setState({
          ...state,
          users
        });
      })
      .catch(error => console.log(error));
  }, []);

  const {users, showSnackbar} = state;

  const onAddUserClicked = (name, email) => {
    let isAdded = false;
    const newUsers = [];
    users.forEach(user => {
      if (!isAdded && name.toLowerCase() < user.name.toLowerCase()) {
        newUsers.push(getUserObject(name, email));
        isAdded = true;
      }
      newUsers.push(user);
    });
    if (!isAdded) {
      newUsers.push(getUserObject(name, email));
    }
    setState({
      ...state,
      users: newUsers,
      showSnackbar: true
    });
  };

  const onSnackbarCloseClicked = () => {
    setState({
      ...state,
      showSnackbar: false
    });
  };

  return (
    <div>
      <UserList {...{users}}/>
      <Form {...{onAddUserClicked}}/>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'middle',
        }}
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={onSnackbarCloseClicked}
        message="New User Added"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={onSnackbarCloseClicked}>
              <CloseIcon fontSize="small"/>
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );

};

export default Home;
