const About = ({ about }) => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Über Mich</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          {about.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {about.images &&
            about.images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={`About Image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            ))}
        </div>
      </div>
    </section>
  );
};
export default About;