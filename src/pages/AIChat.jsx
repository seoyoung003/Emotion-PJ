import React, { useEffect, useState } from "react";
import { VoiceForAI } from "./VoiceForAI";

export const AIChat = () => {
  const [mode, setMode] = useState("comfort");
  const [content, setContent] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMode, setInputMode] = useState("text");

  const handleFullTextUpdate = (newText) => {
    const clean = newText.trim().replace(/\s+/g, ' ');
    setContent(clean);
  }
 

  useEffect(() => {
    const getChatHistory = async () => {
      try {
        const res = await fetch("http://localhost:8080/ai-chat/get-history", {
          credentials: "include",
        });
        const data = await res.json();
        setChatHistory(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getChatHistory();
  }, []);

  const handleChatMode = () => {
    setMode((prev) => (prev === "comfort" ? "advice" : "comfort"));
  };

  const handleInputMode = () => {
    setInputMode((prev) => (prev === "text" ? "voice" : "text"));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/ai-chat/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode, content }),
        credentials: "include",
      });
      setContent("");

      const data = await res.json();
    

      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: content, createdAt: new Date().toISOString() },
        {
          role: "ai",
          content: data.reply,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.log("error", error);
    }
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; 
}
  return (
    <div>
      <div>
        {chatHistory.map((msg, index) => (
          <div key={index}>
            <p >
              <strong>{msg.role}</strong>
              {msg.content}
            </p>
            <div>
                {msg.createdAt && formatDate(msg.createdAt)};
            </div>
          </div>
        ))}
      </div>

      <div>
        <div>현재: {mode}</div>
        <button onClick={handleChatMode}>
          {mode === "comfort" ? "상담" : "위로"}
        </button>

        <button onClick={handleInputMode}>
          {inputMode === "text" ? "음성" : "텍스트"}
        </button>

        {inputMode === "text"  && (
            <textarea
            value={content}
            placeholder="질문을 입력해주세요..."
            onChange={(e) => setContent(e.target.value)}
          />
          )}

        {inputMode === "voice" && (
          <VoiceForAI onFullTextUpdate={handleFullTextUpdate} />
          
        )}

       

        <button onClick={handleSubmit}>전송</button>
      </div>
    </div>
  );
};
