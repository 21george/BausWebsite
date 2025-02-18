export default async function handler(req, res) {
    const API_KEY = process.env.GOOGLE_PLACES_API_KEY; // Store API key in .env file
    const PLACE_ID = "YOUR_PLACE_ID"; // Replace with your business Place ID
  
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&key=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.result) {
        return res.status(200).json({
          rating: data.result.rating,
          totalReviews: data.result.user_ratings_total,
          reviews: data.result.reviews,
        });
      } else {
        return res.status(400).json({ error: "No data found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch Google reviews" });
    }
  }
  