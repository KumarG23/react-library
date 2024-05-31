import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from "./authContext";
import { getToken, createUser } from "./api";
import Header from "./Header";

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
  
    const submit = () => {
      createUser({ username, password, firstName, lastName })
    }
  
    return (
      <div id='login' className="p-5">
        <h1>Create User</h1>
        <div>
          <div>Username:</div>
          <input
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <div>Password:</div>
          <input type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <div>First Name:</div>
          <input
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div>
          <div>Last Name:</div>
          <input
            onChange={e => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
  
        <div style={{ marginTop: 20 }}>
          <button onClick={() => submit()}>Sign Up</button>
        </div>
  
      </div>
    )
  }

  export default SignUp;