import React, { useEffect, useState } from 'react'
import { Api } from '../api/Api'


export const DisplayVideo = ({query}) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            if (!query) return; 
            try {
              const fetchedVideos = await Api(query); 
              setVideos(fetchedVideos);  
            } catch (err) {
                setError(err.message);  
            } finally {
                setLoading(false); 
            }
        }
        fetchData();
    }, [query]);

    return (
        <div>
          <h1>YouTube Video List</h1>
    
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          
          <div>
            {videos.length === 0 && !loading && <p>No videos found.</p>}
            {videos.map((video) => {
              const { title, thumbnails } = video.snippet;
              const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    
              return (
                <div key={video.id.videoId}>
                  <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                    <img src={thumbnails.medium.url} alt={title} />
                    <p>{title}</p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      );
    };
    


