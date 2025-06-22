import React, { useContext, useEffect, useState } from 'react'
import Post from '../Post'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'

function HomePage() {
    const {userInfo} = useContext(UserContext)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3015/post', {
            credentials: 'include'
        })
        .then(response => {
            response.json().then(posts => {
            console.log(posts)
            setPosts(posts)
        })
        })
    },[])

    if(!userInfo?.username) {
        return <Navigate to='/login' />
    }

  return (
    <>
        {posts.length > 0 && posts.map(post => (
            <Post key={post._id} {...post} />
        ))}
    </>
  )
}

export default HomePage