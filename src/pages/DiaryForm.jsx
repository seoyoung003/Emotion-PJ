import React, { useState } from "react";
import { sendText } from "../service/sendText.js";
import { DisplayVideo } from "./DisplayVideo";
import { useNavigate } from "react-router-dom";
import { sendDiary } from "../service/sendDiary.js";

export const DiaryForm = ({ closeWriteModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const navigate = useNavigate();


  const diaryData = {
    title: title,
    content: content,
  };
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();

      const emotion = await sendText(content);
      setAnalysisResult(emotion);
      console.log(emotion)

      const saved = await sendDiary(diaryData);
      console.log(saved);
      navigate("/");

  };
  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3>{formattedDate}</h3>
      
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
        <button onClick={closeWriteModal}>닫기</button>
        <button type="submit">저장</button>
      </form>

      {analysisResult && (
        <div>
          <h2>Analysis Result:</h2>
          <p>{analysisResult}</p>
        </div>
      )}

      {analysisResult && (
        <div>
          <DisplayVideo query={analysisResult} />
        </div>
      )}
    </div>
  );
};
