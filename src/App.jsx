import React, { useState, useEffect } from 'react';
import VideoCard from './components/VideoCard';
import './App.css';

const App = () => {

  // State management for videos, loading status, pagination, and selected video
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ hasNextPage: false, totalPages: 1 });
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Fetch videos from the API based on the current page
  const fetchVideos = async (currentPage) => {
    
    // Set loading state to true before fetching data
    setLoading(true);
    try {

      // Fetch videos with pagination parameters
      const res = await fetch(`https://api.freeapi.app/api/v1/public/youtube/videos?page=${currentPage}&limit=12`);
      const json = await res.json();

      // Update state with fetched videos and pagination info
      if (json.success) {
        setVideos(json.data.data);
        setPagination({
          hasNextPage: json.data.nextPage,
          totalPages: json.data.totalPages
        });
      }
    }
    catch (err)
    {
      console.error(err); 
    }
    finally {
      setLoading(false);
    }
  };

  // Fetch videos whenever the page changes and scroll to top smoothly
  useEffect(() => {
    fetchVideos(page);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // Render the main application UI
  return (
    <div className="portal-app">
      {/* Centered Premium Navbar */}
      <nav className="portal-nav">
        <div className="nav-container">
          <div className="brand">
            <div className="logo-orb"></div>
            <span>Dev<span className="accent">Tube</span></span>
          </div>

          {/* Search Bar */}
          <div className="search-wrapper">
            <input type="text" placeholder="Explore professional content..." />
            <kbd>/</kbd>
          </div>

          <div className="user-controls">
            <button className="upload-trigger">Post Content</button>
            
          </div>
        </div>
      </nav>

      <main className="content-wrap">

        {/* Immersive Category Section */}
        <section className="filter-section">

          <div className="filter-pill-container">
            {["Discovery", "Frontend", "Backend", "System Design", "Cloud", "Security"].map(cat => (
              <button key={cat} className={`filter-pill ${cat === "Discovery" ? "active" : ""}`}>{cat}</button>
            ))}
          </div>
        </section>

        {loading ? (
          <div className="video-grid">
            {[...Array(12)].map((_, i) => <div key={i} className="skeleton-portal"></div>)}
          </div>
        ) : (
          <>
            <div className="video-grid">
              {videos.map(v => (
                <VideoCard
                  key={v.items.id}
                  video={v.items}
                  onClick={() => setSelectedVideo(v.items)}
                />
              ))}
            </div>

            {/* Clean Pagination Bar */}
            <div className="pagination-system">
              <button className="p-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
              
                <div className="page-stack">
                <span className="current">{page}</span>
                <span className="total">of {pagination.totalPages}</span>
                </div>
                
              <button className="p-btn" disabled={!pagination.hasNextPage} onClick={() => setPage(p => p + 1)}>Next</button>
            
              </div>
          </>
        )}
      </main>

      {/* Floating Watch Experience */}
      {selectedVideo && (
        <div className="theater-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="theater-box" onClick={e => e.stopPropagation()}>
            <div className="iframe-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <div className="theater-details">
              <div className="details-main">
                
                <h2>{selectedVideo.snippet.title}</h2>
                <div className="channel-info">
                  <div className="c-avatar">{selectedVideo.snippet.channelTitle[0]}</div>
                  <div>
                    <p className="c-name">{selectedVideo.snippet.channelTitle}</p>
                    <p className="c-subs">4.2M Subscribers</p>
                  </div>
                  <button className="sub-btn">Follow Channel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;