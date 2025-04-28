import React from 'react'
import "../styles/header.css"
import { useNavigate } from "react-router-dom";


export const Header = () => {
    const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      const res = await fetch("http://localhost:8080/users/logout", {
        method: "POST",
        credentials: "include",  
      });

      if (res.ok) {
        console.log("로그아웃 성공");
        navigate("/login");
      } else {
        console.error("로그아웃 실패");
      }
    } catch (error) {
        console.error("에러 발생:", error);
    }
  }

  return (
    <div>
       <div className='h-container'>당신의 감정은?</div>
       <button onClick={handleLogout}>logout</button>
    </div>
   
  )
}
