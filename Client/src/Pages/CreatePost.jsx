import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function CreatePost() {
    const [title, setTitle] = useState('')
    const [snippet, setSnippet] = useState('')
    const [body, setBody] = useState('')
    const [files, setFiles] = useState(null)
    const [redirect, setRedirect] = useState(false)

    async function createNewPost(e) {
        e.preventDefault()
        const data = new FormData()
        data.set('title', title)
        data.set('snippet', snippet)
        data.set('body', body)
        if (files && files[0]) {
            data.set('file', files[0])
        }
        e.preventDefault()
        const response = await fetch('http://localhost:3015/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        })
        if(response.ok) {
            setRedirect(true)
        }
    }

    if(redirect) {
        return (<Navigate to={'/'} />)
    }
  return (
    <div className="create-blog content">
        <form onSubmit={createNewPost}>
            <label>Blog title</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} />
            <label>Blog snippet:</label>
            <input type="text" required value={snippet} onChange={e => setSnippet(e.target.value)}/>
            <label>Image Upload</label>
            <input type='file' onChange={e => setFiles(e.target.files)}></input>
            <label>Blog body:</label>
            <textarea required value={body} onChange={e => setBody(e.target.value)}></textarea>
            <button className="btn btn-primary">Create Post</button>
        </form>
    </div>
  )
}

export default CreatePost