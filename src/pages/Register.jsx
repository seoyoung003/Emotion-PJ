import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/users/register",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(userData),
                
            });

            if(!res){
                throw new Error("서버와의 통신 실패")
            }
            const data = await res.text();
            navigate('/login');
            console.log("전송성공", data);
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
            <h1>회원가입</h1>
            <div>
                <label htmlFor="username">아이디</label>
                <input type="text" name='username' value={userData.username} id='username' onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <input type="text" name='password' value={userData.password} id='password' onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="email">이메일</label>
                <input type="text" name='email' value={userData.email} id='email' onChange={handleChange}/>
            </div>
            <button type='submit'>가입하기</button>
        </form>
       
    </div>
  )
}
