import React, { useState, useEffect } from 'react';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Call to FreeAPI
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10');
        const json = await response.json();

        // Navigation: response -> data object -> data array
        if (json.success) {
          setVideos(json.data.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div style={{ background: '#0f0f0f', color: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <h2>Loading ViteTube...</h2>
      </div>
    );
  }

  // 2. Video Detail View (Condition: selectedVideo is NOT null)
  if (selectedVideo) {
    const video = selectedVideo.items;
    return (
      <div style={{ background: '#0f0f0f', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
        <button
          onClick={() => setSelectedVideo(null)}
          style={{ background: '#333', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}
        >
          ← Back to Home
        </button>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Responsive YouTube Embed */}
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', background: '#000' }}>
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <h1 style={{ fontSize: '24px', margin: '20px 0 10px 0' }}>{video.snippet.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{video.snippet.channelTitle}</div>
            <div style={{ color: '#aaa' }}>{parseInt(video.statistics.viewCount).toLocaleString()} views</div>
          </div>

          <div style={{ background: '#272727', padding: '15px', borderRadius: '12px' }}>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5', fontSize: '14px' }}>
              {video.snippet.description || "No description provided."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Home Grid View (Condition: selectedVideo IS null)
  return (
    <div style={{ background: '#0f0f0f', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ paddingBottom: '20px', marginBottom: '20px', borderBottom: '1px solid #333' }}>
        <h1 style={{ color: '#FF0000', margin: 0 }}>ViteTube</h1>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {videos.map((video) => (
          <div
            key={video.items.id}
            onClick={() => setSelectedVideo(video)}
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={video.items.snippet.thumbnails.high.url}
              alt="thumbnail"
              style={{ width: '100%', borderRadius: '12px', aspectRatio: '16/9', objectFit: 'cover' }}
            />
            <div style={{ marginTop: '10px' }}>
              <h3 style={{
                margin: '0 0 5px 0',
                fontSize: '16px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {video.items.snippet.title}
              </h3>
              <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>{video.items.snippet.channelTitle}</p>
              <p style={{ margin: 0, color: '#aaa', fontSize: '12px' }}>
                {parseInt(video.items.statistics.viewCount).toLocaleString()} views
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;