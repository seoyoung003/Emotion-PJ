import React, { useState } from 'react'

export const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

 
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
      const data = await res.json();
    } catch (error){
        console.log("게시물 전송 에러", error);
      }
     

      
    
    

  }

  const handleCheck = () => {
    setIsChecked(!isChecked);
  }
  const handleFileChange = (e) => {
    const files = Array;
    if (files) {
      setSelectedFiles(files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(files);
    }
  };

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
 
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleCheck} />
        익명
      </label>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        capture="environment" 
      />


      <div id="previewContainer">
        {previewUrl && 
          previewUrl.map((url, index) => (
            <img src={url} key={index} alt="미리보기" />
          ))
        }
      </div>
        <button type="submit">저장</button>
      </form>
     
    </div>
  )
}
