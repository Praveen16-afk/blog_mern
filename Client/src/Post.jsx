/* import React from 'react'
import {formatISO9075, format} from 'date-fns'
import { Link } from 'react-router-dom'

function Post({title, snippet, cover, body, createdAt, author, _id}) {
  return (
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={`http://localhost:3015/${cover}`}></img>
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <a className="author">{author?.username || 'unknown author'}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className='summary'>{snippet}</p>
        </div>
      </div>
  )
}

export default Post */

import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";

export default function Post({_id,title,summary,cover,content,createdAt,author}) {

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:3015/'+cover} alt=""/>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author?.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}