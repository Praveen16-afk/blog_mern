import React, { useEffect, useState } from 'react'
import {useParams, Navigate} from 'react-router-dom'

function EditPost() {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [snippet, setSnippet] = useState('')
    const [body, setBody] = useState('')
    const [files, setFiles] = useState(null)
    const [redirect, setRedirect] = useState(false)

    useEffect(()=>{
        fetch('http://localhost:3015/post/'+id)
        .then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title)
                setSnippet(postInfo.snippet)
                setBody(postInfo.body)
            })
        })
    },[])

    async function updatePost(e) {
        e.preventDefault()
        const data = new FormData()
        data.set('title', title)
        data.set('snippet', snippet)
        data.set('body', body)
        data.set('id', id)
        if(files?.[0]){
            data.set('file', files?.[0])
        }
        const response = await fetch('http://localhost:3015/post', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
        if(response.ok){
            setRedirect(true)
        }
    }

    if(redirect) {
        return (<Navigate to={'/post/'+id} />)
    }
  return (
    <div className="create-blog content">
        <form onSubmit={updatePost}>
            <label>Blog title</label>
            <input type="text" required value={title} onChange={e => setTitle(e.target.value)} />
            <label>Blog snippet:</label>
            <input type="text" required value={snippet} onChange={e => setSnippet(e.target.value)}/>
            <label>Image Upload</label>
            <input type='file' onChange={e => setFiles(e.target.files)}></input>
            <label>Blog body:</label>
            <textarea required value={body} onChange={e => setBody(e.target.value)}></textarea>
            <button className="btn btn-primary">Update Post</button>
        </form>
    </div>
  )
}

export default EditPost