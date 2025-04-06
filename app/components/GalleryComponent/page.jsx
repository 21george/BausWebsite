import Link from "next/link";

export default function Gallery  ({ title, description, images})  {
  return (
    <div className="h-full py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 container">
        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
          <div className="flex items-center gap-12">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl ">
              {title}
            </h2>
            {description && (
              <p className="hidden max-w-screen-sm text-gray-500 dark:text-gray-300 md:block">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8 ">
          {images.map((image, index) => (
            <Link key={index} href="#" className={`group  bg-fixed  h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg container ${image.spanCols ? "md:col-span-2" : ""} md:h-80`}>
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="inset-0 h-full w-full object-cover hover:scale-[1.02] transition-transform duration-700 "
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t  via-transparent to-transparent opacity-50"></div>
              <span className="ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                {image.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


