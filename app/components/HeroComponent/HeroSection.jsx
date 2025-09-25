'use client'

import Image from 'next/image'

export function HeroSection({
backgroundImage,
backgroundImageMobile, // optional mobile image
title,
subtitle,
buttonText = 'EXPLORE COLLECTION',
overlayColor = 'bg-gradient-to-t from-black/70 to-transparent',
imageAlt = 'Hero background image',
}) {
return (
<section className="min-h-screen relative flex items-center z-0">
    {/* Background Image */}
    <div className="absolute inset-0">
            {backgroundImageMobile && (
            <source media="(max-width:768px)" srcSet={backgroundImageMobile} />
            )}
            <Image 
                src={backgroundImage || '/placeholder.svg'} 
                alt={imageAlt} 
                fill
                quality={100}
                priority
                sizes="100vw"
                className="w-full h-full object-cover lg:object-contain" 
                style={{ objectFit: 'cover', objectPosition: 'center' }} 
            />
        {/* Overlay Gradient */}
        <div className={`absolute inset-0 ${overlayColor}`}></div>
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-[2000px] mx-auto px-4 sm:px-8 pt-32">
        <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-white md:text-[7vw] font-light leading-[0.9] mb-8 opacity-0 animate-fadeIn" style={{
                animationDelay: '0.8s' }}>
                {title}
                <br />
                </h1>
                 <p className="mt-4 font-bold text-lg text-white tracking-[0.1em] mb-8  animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                {subtitle}
            </p>
            <div className="h-[1px] bg-white mb-12 opacity-0 animate-revealLine" style={{ animationDelay: '1.2s'
                }}></div>
        </div>
    </div>

    {/* Tailwind Animations */}
    <style jsx>
        {
            ` @keyframes fadeIn {
                to {
                    opacity: 1;
                }
            }

            .animate-fadeIn {
                animation: fadeIn 1s forwards;
            }

            @keyframes revealLine {
                0% {
                    transform: scaleX(0);
                    opacity: 0;
                }

                100% {
                    transform: scaleX(1);
                    opacity: 1;
                }
            }

            .animate-revealLine {
                transform-origin: left;
                animation: revealLine 1s forwards;
            }

            `
        }
    </style>
</section>
)
}