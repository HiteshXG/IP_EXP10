import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("image");

  useEffect(() => {
    fetch("http://localhost:5000/api/media")
      .then((response) => response.json())
      .then((data) => setMediaFiles(data))
      .catch((error) => console.error("Error fetching media files:", error));
  }, []);

  const renderMediaItem = (item) => {
    switch (item.type) {
      case "image":
        return (
          <div className="media-card">
            <img src={`http://localhost:5000${item.url}`} alt={item.name} className="media-img" />
            <div className="media-headline">{item.name}</div>
            {item.location && <div className="media-location">{item.location}</div>}
          </div>
        );
      case "video":
        return (
          <div className="media-card">
            <video controls className="media-video">
              <source src={`http://localhost:5000${item.url}`} type={`video/${item.name.split(".").pop()}`} />
              Your browser does not support the video tag.
            </video>
            <p className="media-headline">{item.name}</p>
          </div>
        );
      case "audio":
        return (
          <div className="media-card audio-player">
            <img 
              src={item.albumArt ? `http://localhost:5000/media/${item.albumArt}` : "http://localhost:5000/media/The Dawn FM Album Cover.jpg"} 
              alt="Album Art" 
              className="album-art" 
            />
            <div className="audio-info">
              <p className="song-title">{item.name}</p>
              <p className="song-artist">{item.artist || "The Weeknd"}</p>
            </div>
            <audio controls className="audio-controls">
              <source src={`http://localhost:5000${item.url}`} type={`audio/${item.name.split(".").pop()}`} />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      default:
        return <p>Unsupported media type</p>;
    }
  };

  const filteredMedia = mediaFiles.filter((item) => item.type === activeTab);

  return (
    <div className="App">
      <h1 className="weeknd-header">THE WEEKND</h1>

      <div className="tabs-container">
        <div className="tabs">
          <button onClick={() => setActiveTab("image")} className={activeTab === "image" ? "active" : ""}>
            Images
          </button>
          <button onClick={() => setActiveTab("video")} className={activeTab === "video" ? "active" : ""}>
            Videos
          </button>
          <button onClick={() => setActiveTab("audio")} className={activeTab === "audio" ? "active" : ""}>
            Audio
          </button>
        </div>
      </div>

      {activeTab === "image" && <h2 className="media-headline">Photos from Concert and Events</h2>}
      {activeTab === "video" && <h2 className="media-headline">The Weeknd's Music Videos</h2>}
      {activeTab === "audio" && <h2 className="media-headline">Featured Songs</h2>}

      <div className="media-container">
        {filteredMedia.length > 0 ? (
          filteredMedia.map((item, index) => (
            <div key={index} className="media-item">
              {renderMediaItem(item)}
            </div>
          ))
        ) : (
          <p>No media available</p>
        )}
      </div>
    </div>
  );
}

export default App;
