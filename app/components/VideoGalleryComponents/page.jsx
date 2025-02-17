"use client";
import React, { useState, useEffect } from "react";
import About from "./AboutComponents/page";
import Videos from "./VideoCompnents/page";
import VideoModal from "./VideoModelComponents/pages";
import WorkDetails from "./DetailsComponents/page";

export default function VideoGallery() {
  const [workDetails, setWorkDetails] = useState([]);
  const [about, setAbout] = useState({});
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/videos")
      .then((response) => response.json())
      .then((data) => {
        setWorkDetails(data.workdetails);
        setAbout(data.about);
        setVideos(data.videos);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <workDetails workDetails={workDetails} />
      <About about={about} />
      <Videos videos={videos} />
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedVideo={selectedVideo}
      />
    </div>
  );
}
