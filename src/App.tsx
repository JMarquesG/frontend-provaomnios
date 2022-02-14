import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import logo from './logo.svg';
import './App.css';
import List from './pages/List';
import Upload from './pages/UploadPage';


function App() {
  const [token, setToken] = useState();
  
  const loginpost = async (username: string, password: string) => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    setToken((await response.json()).token);
    

}

const registerpost = async (username: string, password: string) => {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    setToken((await response.json()).token);
}

  if(token) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={  <List {...{token:{token}}} /> } />
          <Route path="/upload" element={  <Upload  {...{token:{token}}} />} />
        </Routes>
      </div>
    );
  }
  else{
      return (
        <div>
              <h1>Login</h1>
              <form onSubmit={(e: any) => {
                  e.preventDefault();
                  loginpost(e.target.username.value, e.target.password.value);
              }
              }>
                  <input type="text" name="username" placeholder="username" />
                  <input type="password" name="password" placeholder="password" />
                  <button type="submit">Login</button>
              </form>
              <h1>Register</h1>
              <form onSubmit={(e: any) => {
                  e.preventDefault();
                  registerpost(e.target.username.value, e.target.password.value);
              }
              }>
                  <input type="text" name="username" placeholder="username" />
                  <input type="password" name="password" placeholder="password" />
                  <button type="submit">Register</button>
              </form>
          </div>

   );
          }
}

export default App;
