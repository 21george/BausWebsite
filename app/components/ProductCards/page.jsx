import { useState } from "react";

const cardsData = [
  {
    title: "Yoga",
    description: "",
    meta: ["Playlist", "14 videos", "FullHD", "2:23:04"],
    img: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=2070&auto=format&fit=crop",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Physiotherapy",
    description:
      "A real-life circuit is filled with negatively charged electrons flowing from negative to positive poles.",
    meta: ["Playlist", "7 videos", "FullHD", "54:23"],
    video: "https://www.w3schools.com/html/movie.mp4",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
  },
  {
    title: "",
    description:
      "Practice of converting data to a graphical interface, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that data.",
    meta: ["Playlist", "104 videos", "4K", "1:03:03"],
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
  },
];

export default function PromoCards() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo("");
  };

  return (
    <div className="flex flex-col items-center p-10 text-white">
      <div className="flex justify-center items-center space-x-5">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className={`relative flex flex-col justify-end w-1/2 h-[272px] gap-2 cursor-pointer overflow-hidden transition-all duration-500 ${
              currentCard === index ? "w-2/3" : "opacity-90"
            }`}
            onMouseEnter={() => setCurrentCard(index)}
          >
            <img
              src={card.img}
              alt={card.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            <div className="relative z-10 p-5">
              <h2 className="text-5xl z-10 font-extrabold leading-tight">
                {card.title.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h2>
              {currentCard === index && (
                <p className="mt-1 text-sl  transition-opacity z-10 duration-300">
                  {card.description}
                </p>
              )}
            
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative bg-black p-5 rounded">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
