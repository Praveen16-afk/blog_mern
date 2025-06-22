import React, { useCallback, useContext, useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { formatISO9075 } from 'date-fns'
import { UserContext } from '../UserContext'
import editIcon from '../assets/edit.png'

function PostPage() {
    const [postInfo, setPostInfo] = useState(null)
    const {userInfo} = useContext(UserContext)
    const { id } = useParams()
    useEffect(() => {
        fetch(`http://localhost:3015/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            })
        })
    }, [])

    if(!postInfo) {
        return (<div>Loading</div>)
    }
  return (
    <div className='postpage'>
        <h1>{postInfo.title}</h1>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className='author'>by {postInfo?.author?.username}</div>
        {userInfo?.id === postInfo.author?._id && (
            <div className="edit-row">
                <Link to={`/edit/${postInfo._id}`} className="edit-btn">
                    <img src={editIcon} className='icon'></img>
                    Edit Post
                </Link>
            </div>
        )}
        <div className='image'>
            <img src={`http://localhost:3015/${postInfo.cover}`}></img>
        </div>
        <div className='content' dangerouslySetInnerHTML={{__html: postInfo.body}}></div>
    </div>
  )
}

export default PostPage