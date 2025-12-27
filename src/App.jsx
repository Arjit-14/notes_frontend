import { useState } from 'react';
import Dashboard from './Dashboard';
import Api from './Api';

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [isSignup, setIsSignup] = useState(false);

  //res.json() - returns a promise

  const signup = async () => {
    
    // const res = await fetch("http://localhost:9876/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username, password })
    // });

    // const data = await res.json();

    const {ok, data} = await Api("/signup", "POST", {username: username, password: password}, null)

    if(ok)
    {
      alert("Signup successfull. Please login");
      setIsSignup(false);
      setUsername("");
      setPassword("");
    }
    else
    {
      alert(data.message || `Sign up failed`);
    }

  };

  const login = async () => {
    // const res = await fetch("http://localhost:9876/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username, password })
    // });

    // const data = await res.json();

    const {data} = await Api("/login", "POST", {username: username, password: password});

    if(data.token)
    {
      localStorage.setItem("token", data.token);
      setToken(data.token)
    }
    else
    {
      alert(data.message || "Login failed");
    }

  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");

    setUsername("");
    setPassword("");
  }


  return (
    <div style={{ padding: 20 }}>
      {!token ? (
        <>

          <h3>{isSignup? "Signup" : "Login" }</h3>

          <input
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />

          <br />

          <input
            placeholder='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />

          {isSignup ? (
            <>
              <button onClick={signup}>Signup</button>
              <p onClick={() => setIsSignup(false) } style = {{ cursor: "pointer" }}>
                Already have an account? Login
              </p>
            </>
          ): (
            <>
              <button onClick={login}>Login</button>
              <p onClick={() => setIsSignup(true) }  style={{ cursor: "pointer "}}>
                New user? Sign up
              </p>
            </>
          )}
        </>
      ):
      (
        <>
          <Dashboard token = {token}/>
          <button onClick={logout}> Logout </button>
        </>
      )
      }
    </div>
  );
}

export default App


