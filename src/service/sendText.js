export async function sendText(userText){
    const apiUrl = 'http://localhost:8080/emotion/analyze';

    const requestData = { text: userText}

    try{
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
    
          if (!response.ok) {
            throw new Error('Failed to analyze emotion');
          }
          const data = await response.text();
          if (data) {
            
            return data
          }
          
    } catch(error) {
        console.error('Error:', error);
        return { error: 'Something went wrong' };  
  } 

      
}