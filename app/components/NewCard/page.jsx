import Link from 'next/link';

const NewsCard = () => {
  const newsItems = [
    {
      id: 1,
      title: "Amazing First Title",
      date: "Jan 29, 2018",
      excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur…",
      image: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
    {
      id: 2,
      title: "Amazing Second Title that is Quite Long",
      date: "Jan 29, 2018",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit…",
      image: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
    {
      id: 3,
      title: "Amazing Title",
      date: "Jan 29, 2018",
      excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae…",
      image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
      id: 4,
      title: "Amazing Forth Title that is Quite Long",
      date: "Jan 29, 2018",
      excerpt: "Lorem ipsum dolor sit amet!",
      image: "https://images.pexels.com/photos/248486/pexels-photo-248486.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
    {
      id: 5,
      title: "Amazing Fifth Title",
      date: "Jan 29, 2018",
      excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio…",
      image: "https://images.pexels.com/photos/206660/pexels-photo-206660.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    },
    {
      id: 6,
      title: "Amazing 6th Title",
      date: "Jan 29, 2018",
      excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia.",
      image: "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    }
  ];

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="relative h-48 sm:h-80 overflow-hidden rounded-lg shadow-lg group">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 transition-all duration-300 group-hover:bg-opacity-70">
                <h2 className="text-white text-xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">{item.title}</h2>
                <div className="text-gray-300 text-sm mb-2">{item.date}</div>
                <div className="max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  <p className="text-gray-200 text-sm">{item.excerpt}</p>
                  <Link href="#" className="mt-2 inline-block bg-black text-gray-400 px-3 py-1 rounded text-sm border border-gray-600 hover:bg-gray-800 hover:text-yellow-300 transition-colors duration-300">
                    Read more <i className="fas fa-long-arrow-alt-right ml-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default NewsCard;