import React, { useEffect, useRef, useState } from 'react'
import { sendText } from '../service/sendText';
import { DisplayVideo } from './DisplayVideo';
import { sendPost } from '../service/sendPost';

export const VoiceForDiary = () => {
    const recognitionRef = useRef(null);
    const [title, setTitle] = useState(""); // 제목
    const [analysisResult, setAnalysisResult] = useState(""); // 분석 결과
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [fullText, setFullText] = useState(""); 

    const postData = {
        title: title,
        content: fullText,
      };
    
        

    useEffect(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
        return;
      }
  
      const recognition = new SpeechRecognition();
      recognition.lang = 'ko-KR'; // 한국어 설정
      recognition.interimResults = false; // 중간 결과는 필요하지 않음
      recognition.continuous = true; // 연속 인식 가능하도록 설정
  
      recognition.onresult = (event) => {
        const result = event.results[event.resultIndex];
        const transcript = result[0].transcript;
  
        // 첫 문장은 제목으로 설정
        if (!title) {
          setTitle(transcript.trim());
        }
  
        // 그 외에는 본문 내용으로 누적
        setFullText((prevText) => prevText + " " + transcript);
      };
  
      recognition.onerror = (event) => {
        console.error('❌ 오류 발생:', event.error);
      };
  
      recognition.onend = () => {
        console.log("종료");
      };
  
      recognitionRef.current = recognition;
    }, []);
  
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

        // 음성 인식 종료 후 최종 텍스트를 content에 설정
       
        console.log('🗣 전체 텍스트:', fullText);

        // 감정 분석 요청
        const emotion = await sendText(fullText);

        // 게시글 저장 요청
        await sendPost(postData);

        // 감정 분석 결과 설정
        setAnalysisResult(emotion);
      }
    };
  
    return (
      <div>
        <h1>{formattedDate}</h1>
        <button onClick={startListening}>시작</button>
        <button onClick={stopListening}>멈추기</button>

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
}
