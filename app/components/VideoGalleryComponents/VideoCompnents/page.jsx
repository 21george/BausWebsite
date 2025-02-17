const Videos = ({ videos, openModal }) => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <button
                onClick={() => openModal(video)}
                className="w-full relative"
              >
                <video className="w-full h-48 object-cover" muted loop>
                  <source src={video.thumbnailUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 flex items-end justify-start p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white text-lg font-semibold">
                    {video.title}
                  </h3>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Videos;
