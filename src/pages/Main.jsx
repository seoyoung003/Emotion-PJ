import React, { useEffect, useState } from 'react'
import '../styles/main.css'
import { Header } from '../components/Header'
import { Nav } from '../components/Nav'
import { Link } from 'react-router-dom'

export const Main = () => {

  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:8080/posts", {
          method: "GET",
          credentials: "include",

        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log('게시글 가져오기 실패', error);
      }
    }
    fetchPosts();

  }, []);
  return (
    <div className='main'>
      <div className='main__header-wrapper'>
        <Header />
      </div>


        <div className='main__content'>
          {
            posts.length > 0 ? (
              posts.map((post) => {
                return(
                <div key={post.id}>
                  <Link to={`posts/${post.id}`}>
                    <h3>{post.title}</h3>
                    <p>{post.createdDate}</p>
                  </Link>

                </div>
                );
                
              })

            ) : (
              <p>게시물이 없습니다.</p>
            )
          }
          <div>

          </div>


        </div>
        <div className='main__nav-wrapper'><Nav/></div>
        
    </div>
  )
}
