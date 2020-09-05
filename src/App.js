import React, { Component } from 'react';
import {useEffect, useState} from 'react';
import './App.css';
import { db } from './firebase';      
import UserDisplaytemplate from './components/UserDisplaytemplate'

const App = () => {
  const [users,setUsers] = useState([])   //"users" state contains the list of all the users present in the firebase database.

  const allUsers = users.map(({id, user}) => (
    <UserDisplaytemplate key={id} userId={id} real_name={user.real_name} country={user.country} city={user.city}/>
  ));


  useEffect(() => {
    db.collection("time_data").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          user: doc.data(),
        }))
      );
    });
  }, []);

  

  return (
    <div className="App">
      <div className="mb-5 p-2 text-dark app-heading">
        <p><strong>Check User's Activity Here</strong></p>
      </div>

      <div className="subheading text-dark">
        <p>Click on a User To See Their Activity</p>
      </div>

      <div className="col p-1">
          {allUsers}
      </div>

    </div>
  );
}

export default App;
