import Link from "next/link";
import React from "react";

export default function Ratingpage() {
  const reviews = [
    {
      name: "John Doe",
      feedback:
        "This podcast is amazing! The storytelling and production quality are top-notch. I can't wait for the next episode!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      feedback:
        "This podcast kept me on the edge of my seat. It's a must-listen for true crime enthusiasts!",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      feedback:
        "I can't get enough of this podcast! The host's voice is so soothing, and the stories are gripping. Highly recommend!",
      rating: 5,
    },
  ];

  const renderStars = (count) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className="text-yellow-500 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div className="w-full">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-black text-center text-2xl leading-none max-w-2xl mx-auto mb-12">
          Bewertungen bei Google
        </h2>
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 relative">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-sm bg-white p-8 shadow-two duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8"
            >
              <p className="font-bold uppercase">{review.name}</p>
              <p className="text-xl font-light italic text-gray-700 mt-4">
                {review.feedback}
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                {renderStars(review.rating)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center flex-1 p-6">
          <Link href={"https://g.co/kgs/hpMMftt"}>
            <button
              type="button"
              className="self-start bg-amber-950 w-40 h-11 rounded-sm text-yellow-50"
            >
              Alle Bewertungen
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}