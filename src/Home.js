import React, {useState, useEffect} from 'react';
import UserList from "./UserList";
import Form from "./Form";

const Home = () => {

  const [state, setState] = useState({
    users: []
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
        setState({users});
      })
      .catch(error => console.log(error));
  }, []);

  const {users} = state;

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
      users: newUsers
    });
  };

  return (
    <div>
      <UserList {...{users}}/>
      <Form {...{onAddUserClicked}}/>
    </div>
  );

};

export default Home;
