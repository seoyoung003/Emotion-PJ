import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

   const [userData, setUserData] = useState({
          username: '',
          password: '',
      });
  
      const handleSubmit = async (e) => {
          e.preventDefault();
          try {
              const res = await fetch("http://localhost:8080/users/login",{
                  method: "POST",
                  headers: {
                      "Content-Type" : "application/json",
                  },
                  body: JSON.stringify(userData),
                  credentials: "include",
              });
  
              if(!res){
                  throw new Error("로그인: 서버와의 통신 실패")
              }
              const data = await res.json();
              if(data.redirectUrl) {
                navigate(data.redirectUrl);
              }else {
                alert(data.message);
              }
          } catch (error) {
              console.error("전송실패", error);
          }
  
      }
  
      const handleChange = (e) => {
          const {name, value} = e.target;
          setUserData((prevData) => ({
                ...prevData,
              [name]: value,
          }))
      }
    return (
      <div>
          <form onSubmit={handleSubmit}>
              <h1>로그인</h1>
              <div>
                  <label htmlFor="username">아이디</label>
                  <input type="text" name='username' value={userData.username} id='username' onChange={handleChange}/>
              </div>
              <div>
                  <label htmlFor="password">비밀번호</label>
                  <input type="text" name='password' value={userData.password} id='password' onChange={handleChange}/>
              </div>
              
              <button type='submit'>로그인하기</button>
          </form>
         
      </div>
    )
}
