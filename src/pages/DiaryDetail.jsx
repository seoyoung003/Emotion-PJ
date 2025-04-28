import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react'

export const DiaryDetail = () => {
    const { id } = useParams(); // URL에서 id 추출
    const [post, setPost] = useState(null);
;
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
       
          const res = await fetch(`http://localhost:8080/diaries/${id}`); // 백엔드 API 호출
          if (!res.ok) {
            throw new Error('불러오는 데 실패했습니다.');
          }
          const data = await res.json(); // 응답 데이터를 JSON 형식으로 파싱
          setPost(data); // 데이터를 상태에 저장
        } catch (error) {
          setError(error.message); // 에러 상태 설정
        } 
      };
  
      fetchPost();
    }, [id]); // id가 변경될 때마다 다시 실행
  
  
    return (
      <div>
        <h1>{post?.createdDate}</h1>
        <h3>{post?.date}</h3>
        <p>{post?.content}</p>
      </div>
    );
}


