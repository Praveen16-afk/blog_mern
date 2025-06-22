import React, { useState } from 'react'

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function UsernameChange(e) {
        setUsername(e.target.value)
    }

    function PasswordChange(e) {
        setPassword(e.target.value)
    }

    async function register(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:3015/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-type': 'Application/json'}
        })
        if(response.status === 200) {
            alert('Registration successfull')
        }
        else {
            alert('Registration failed')
        }
    }
  return (
    <form onSubmit={register}>
        <h1>Register</h1>
    <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control bg-body-secondary" value={username} onChange={(e)=>{UsernameChange(e)}}/>
        <div className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control bg-body-secondary" value={password} onChange={(e) => {PasswordChange(e)}}/>
    </div>
  <button type="submit" className="btn btn-dark text-white">Register</button>
</form>
  )
}

export default RegisterPage