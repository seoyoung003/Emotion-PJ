import React, { useEffect, useRef, useState } from 'react'

export const VoiceForAI = ({ onFullTextUpdate }) => {
  const [fullText, setFullText] = useState("");
  const recognitionRef = useRef(null);
  
        

    useEffect(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
        return;
      }
  
      const recognition = new SpeechRecognition();
      recognition.lang = 'ko-KR';
      recognition.interimResults = false; 
      recognition.continuous = true; 
  
      recognition.onresult = (event) => {
        const result = event.results[event.resultIndex];
        const transcript = result[0].transcript;
  
        const updatedText = fullText + " " + transcript;
        setFullText(updatedText);  
  
        
        if (onFullTextUpdate) {
          onFullTextUpdate(updatedText); 
        }
      };
  
      recognition.onerror = (event) => {
        console.error('❌ 오류 발생:', event.error);
      };
  
      recognition.onend = () => {
        console.log("종료");
      };
  
      recognitionRef.current = recognition;
    }, [onFullTextUpdate]);
  
    const startListening = () => {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        console.log("시작");
      }
    };
  
    const stopListening = async () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        console.log("종료");
       
        console.log('전체 텍스트:', fullText);
      }

 
    };
  
    return (
      <div>
        <button onClick={startListening}>시작</button>
        <button onClick={stopListening}>멈추기</button>

       
      </div>
    );

}
