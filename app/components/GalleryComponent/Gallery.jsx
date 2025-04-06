'use client';
import Image from 'next/image';

const Gallery = ({ 
  images = [],
  collectionId = '1346951',
  baseSize = 150,
  className = '',
  imgClassName = 'hover:opacity-75 transition-opacity duration-300'
}) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 p-4 max-w-[400px] md:max-w-[600px] place-items-center ${className}`}>
      {images.map((image, index) => (
        <Image
          key={image.sig || index}
          src={image.src || `https://source.unsplash.com/collection/${collectionId}/${baseSize}x${baseSize}?sig=${image.sig || index}`}
          alt={image.alt || `Gallery image ${index + 1}`}
          width={baseSize}
          height={baseSize}
          className={imgClassName}
        />
      ))}
    </div>
  );
};

export default Gallery;