import React, { useState } from 'react'

export const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);

 
  const handleSubmit = async() => {
    try {
      const res = await fetch("http://localhost:8080/ai-chat/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, isChecked}),
        credentials: "include",
      });
    } catch{

      }
     

      const data = await res.json();
    
    

  }

  const handleCheck = () => {
    setIsChecked(!isChecked);
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요..."
          />
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요..."
        />
        <label><input type="checkbox" checked={isChecked} onChange={handleCheck}/>익명</label>
        <input type="file" accept="image/*" id="fileInput" onchange="handleFileChange(event)" capture="camera"></input>
        <div id="previewContainer"></div>
  
        <button type="submit">저장</button>
      </form>
     
    </div>
  )
}
