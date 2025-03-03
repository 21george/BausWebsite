import React from 'react';

const Cards = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#252833]">
      <div className="w-[80%] grid grid-cols-4 grid-rows-2 gap-4">
        {/* Card 1 */}
        <div className="card content col-span-2 row-span-2 relative transition-all duration-250 ease-in-out cursor-pointer font-roboto font-light">
          <div className="card-content absolute inset-0">
            <div className="card-img absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                alt="Gamer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card-label absolute top-2 left-2 bg-[#089f8a] text-white text-xs uppercase font-light px-2 py-1">
              E-Sports
            </div>
            <div className="card-title absolute left-4 bottom-4 text-[#d6dbeb] text-sm z-5">
              Fnatic raises $19 million, shakes up leadership team
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card content relative transition-all duration-250 ease-in-out cursor-pointer font-roboto font-light">
          <div className="card-content absolute inset-0">
            <div className="card-img absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                alt="keyboard"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card-label absolute top-2 left-2 bg-[#ef4e7b] text-white text-xs uppercase font-light px-2 py-1">
              Technology
            </div>
            <div className="card-title absolute left-4 bottom-4 text-[#d6dbeb] text-sm z-5">
              Google Stadia: The Future of Gaming
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card content relative transition-all duration-250 ease-in-out cursor-pointer font-roboto font-light">
          <div className="card-content absolute inset-0">
            <div className="card-img absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1519326844852-704caea5679e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2034&q=80"
                alt="Controller"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card-label absolute top-2 left-2 bg-[#1098ad] text-white text-xs uppercase font-light px-2 py-1">
              Consoles
            </div>
            <div className="card-title absolute left-4 bottom-4 text-[#d6dbeb] text-sm z-5">
              PS5 won't launch before mid-2020
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card form col-span-2 relative transition-all duration-250 ease-in-out cursor-pointer font-roboto font-light">
          <div className="form-title absolute top-4 left-4 text-7xl font-black uppercase z-5 bg-gradient-to-r from-[#f79533] via-[#f37055] to-[#ef4e7b] text-transparent bg-clip-text">
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;