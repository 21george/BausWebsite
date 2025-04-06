"use client";
import React, { useEffect, useState } from 'react';

export default function Ratingpage() {
  const [reviews, setReviews] = useState([]);

  const fetchGoogleReviews = async () => {
    const API_KEY = 'YOUR_GOOGLE_API_KEY';
    const PLACE_ID = 'PLACE_ID_OF_YOUR_BUSINESS';

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.result && data.result.reviews) {
        setReviews(data.result.reviews.map(review => ({
          name: review.author_name,
          feedback: review.text,
          rating: review.rating,
        })));
      }
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
    }
  };

  useEffect(() => {
    fetchGoogleReviews();
  }, []);

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
    <section className="px-4 py-12 md:py-24">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-black text-center text-2xl leading-none max-w-2xl mx-auto mb-12">
          Bewertungen bei Google
        </h2>
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 relative">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg p-8 text-center md:w-1/3"
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
      </div>
    </section>
  );
}
