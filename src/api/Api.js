

export const Api = async (query) => {

    const apiKey = 'AIzaSyAE2D-AD-Qwh6kX22JNf_ltF9Ujmub0syA';


const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&maxResults=5`;
try{
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
} catch (error) {
    console.error("api 호출 에러: ", error);
    return [];
}
}



