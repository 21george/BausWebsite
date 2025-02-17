import React from "react";

const ProductCard = ({ title, videoSrc }) => (
  <div className="product-card w-[300px] rounded-md shadow-xl h-96  bottom-14  overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 flex flex-col justify-center gap-4 duration-300 group">
    <video
      controls
      preload="none"
      className="absolute inset-0 w-full h-full object-cover z-0"
      aria-label="Background video"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>

    <div className="btn ">
      <button className="uppercase  font-semibold text-xs px-2 whitespace-nowrap py-1">
        {title}
      </button>
    </div>
  </div>
);

export default ProductCard;


