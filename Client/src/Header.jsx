/* import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:3015/profile', {
      credentials: 'include',
    }).then(response => {
      if(response.ok) {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
      });
    } else {
      setUserInfo(null)
    }
    });
  }, []);

  function logout() {
    fetch('http://localhost:3015/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <span>({username})</span>
            <Link to="/create"><button>Create new post</button></Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
} */

import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3015/profile', {
      credentials: 'include', // Required for cookies
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then((userInfo) => setUserInfo(userInfo))
      .catch(() => setUserInfo(null))
      .finally(() => setIsLoading(false));
  }, []);

  async function logout() {
    try {
      const res = await fetch('http://localhost:3015/logout', {
        method: 'POST',
        credentials: 'include', // Required for cookies
      });
      if (res.ok) setUserInfo(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  if (isLoading) return <header>Loading...</header>;

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username ? (
          <>
            <span>({username})</span>
            <Link to="/create"><button>Create new post</button></Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

