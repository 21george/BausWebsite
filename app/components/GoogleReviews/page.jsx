import { useEffect, useState } from "react";

export default function GoogleReviews() {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetch("/api/googleReviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching Google reviews:", err));
  }, []);

  if (!reviews) return <p>Loading reviews...</p>;

  return (
    <div>
      <h2>Google Rating: {reviews.rating} ⭐ ({reviews.totalReviews} reviews)</h2>
      <ul>
        {reviews.reviews?.map((review, index) => (
          <li key={index}>
            <strong>{review.author_name}</strong>: {review.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
