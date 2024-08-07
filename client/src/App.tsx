import React, { FC, useEffect, useState } from 'react';
import './index.css';
import LoginForm from './components/LoginForm';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { logout, checkAuth } from './redux/store/reducers/actionCreators';
import userService from './services/userService';
import { iUser } from './redux/models/iUser';

function App () {
  const dispatch = useAppDispatch()
  const {user, isAuth, isLoading} = useAppSelector(state => state.authReducer)
  const [users, setUsers] = useState<iUser[]>([])

  useEffect(()=>{
    if(localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  },[])

  async function getUsers() {
    try {
      const response = await userService.fetchUsers()
      setUsers(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  if(!isAuth) {
    return (
      <LoginForm/>
    )
  }

  if(isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className="App">
      <h1>Logged as {user.email}</h1>
      <h1>{user.isActivated ? 'Account is activated' : 'Please, activate your account using the letter, that was sent to your email'}</h1>
      <button onClick={() => dispatch(logout())}>Log out</button>
      <div>
        <button onClick={getUsers}>Show users</button>
      </div>
      {users.map(user =>
        <div>
          <h2 key={user.id}>{user.email}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
