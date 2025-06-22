import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)
    function UsernameChange(e) {
        setUsername(e.target.value)
    }

    function PasswordChange(e) {
        setPassword(e.target.value)
    }

    async function Login(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:3015/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-type': 'Application/json'},
            credentials: 'include'
        })

        if(response.status === 200) {
            response.json()
            .then(userInfo => {
                setUserInfo(userInfo)
                setRedirect(true)
            })
        }
        else {
            alert('Wrong credentials')
        }
    }
    if(redirect) {
            return <Navigate to = {'/'} />
        }

  return (
  <form onSubmit={Login}> 
    <h1>Login</h1>
    <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control bg-body-secondary" value={username} onChange={(e)=>UsernameChange(e)} />
    </div>
    <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control bg-body-secondary" value={password} onChange={(e) => PasswordChange(e)} />
    </div>
    <div>
        <button type="submit" className="btn btn-dark text-white">Login</button>
    </div>
    </form>
  )
}

export default LoginPage