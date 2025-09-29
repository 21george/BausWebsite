'use client';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

const Gallery = ({ title, description = '', images = [] }) => {
  return (
    <div className="h-full py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
          <div className="flex items-center gap-12">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
              {title}
            </h2>
            {description && (
              <p className="hidden max-w-screen-sm text-gray-500 dark:text-gray-300 md:block">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:grid-cols-3 md:gap-6 xl:gap-2">
          {images.map((image) => (
            <Link
              key={image.id || image.src}
              href="#"
              className={`group relative h-48 overflow-hidden bg-gray-100 shadow-lg md:h-80 ${
                image.spanCols ? 'md:col-span-2' : ''
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt || ''}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50"></div>
              {image.label && (
                <span className="absolute bottom-3 left-4 text-sm text-white md:left-5 md:text-lg">
                  {image.label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// PropTypes for better development experience
Gallery.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      spanCols: PropTypes.bool,
      label: PropTypes.string,
    })
  ),
};

export default Gallery;