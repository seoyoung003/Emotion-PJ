export async function sendDiary({ id, title, content }) {
    const apiUrl = 'http://localhost:8080/diaries/save';  // 게시글 저장 URL
    const postData = { id, title, content };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) throw new Error('Failed to save post');
      const saved = response.text();
      console.log(saved);
      return saved; // 저장 결과 반환

    } catch (error) {
      console.error('Save error:', error);
      return null;  // 에러 시 null 반환
    }
  }
  