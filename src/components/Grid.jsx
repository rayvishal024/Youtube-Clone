import React from 'react'

function Grid({videoThumbnail, title,channelIcon, channelName, views, uploadTime}) {
  return (
       <div>
            <img src={videoThumbnail} alt={title} />
            <h3>{title}</h3>
            <div>
                <img src={channelIcon} alt={channelName} />
                <p>{channelName}</p>
            </div>
            <p>{views} views</p>
            <p>{uploadTime}</p>
        </div>
  )
}

export default Grid