import React from 'react'
import { Link } from 'react-router-dom'

export const Board = () => {
  return (
    <div>
        <div>

        </div>
        <Link to={"/post-form"}><button>글작성</button></Link>
    </div>
  )
}
