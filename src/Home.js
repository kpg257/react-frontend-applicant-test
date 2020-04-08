import React, {useState, useEffect} from 'react';
import UserList from "./UserList";
import Form from "./Form";

const Home = () => {

  const [state, setState] = useState({
    users: []
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(response => {
        let users = response.map(user => {
          let {name, email} = user;
          return {
            name,
            isBiz: email.endsWith(".biz")
          };
        });
        users.sort((a, b) => a.name < b.name);
        setState({users});
      })
      .catch(error => console.log(error));
  });

  let {users} = state;

  return (
    <div>
      <UserList {...{users}}/>
      <Form/>
    </div>
  );

};

export default Home;
