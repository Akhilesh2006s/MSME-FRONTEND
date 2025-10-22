import React from 'react';

const Header = () => {
  return (
    <div className="absolute top-0 left-0 z-20 p-6 md:p-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white glow-effect">
          Export Console
        </h1>
        <p className="text-sm md:text-base text-gray-300 font-light">
          Empowering Andhra MSMEs to Export Globally
        </p>
      </div>
    </div>
  );
};

export default Header;




