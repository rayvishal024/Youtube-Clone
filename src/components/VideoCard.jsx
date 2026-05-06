import React from 'react';

// VideoCard component to display individual video details
const VideoCard = ({ video, onClick }) => {

     // Destructure necessary properties from the video object
     const { snippet, statistics, contentDetails } = video;

     // High-fidelity duration formatting
     const duration = contentDetails.duration
          .replace('PT', '').replace('H', ':').replace('M', ':').replace('S', '');

     return (

          // Main card container with click handler
          <div className="portal-card" onClick={onClick}>
               <div className="thumb-wrapper">
                    <img src={snippet.thumbnails.medium.url} alt="thumbnail" />
                    <div className="time-tag">{duration}</div>
               </div>

               {/* Video Info Stack */}
               <div className="card-info-stack">
                    <div className="channel-avatar">
                         {snippet.channelTitle[0]}
                    </div>

                    {/* Text Content */}
                    <div className="text-content">
                         <h3 className="video-title">{snippet.title}</h3>
                         <p className="channel-name">{snippet.channelTitle}</p>
                         <div className="meta-row">
                              <span>{parseInt(statistics.viewCount).toLocaleString()} views</span>
                              <span className="separator">•</span>
                              <span>2 hours ago</span>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default VideoCard;