import React from 'react';

export default function AboutMe({ name="",title="",description="",imageUrl }) {
  return (
    <section className="pt-10 overflow-hidden md:pt-0 sm:pt-16 2xl:pt-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">
          <div>
            <p className="hidden max-w-screen-sm text-gray-500 dark:text-gray-300 md:block">
              {description}
            </p>
            <h2 className="text-3xl font-bold leading-tight text-blacksm:text-4xl lg:text-5xl">
              {title}
              <br className="block sm:hidden" />
              {name}
            </h2>
          </div>
          <div>
            <img
              className="w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom"
              src={imageUrl}
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
