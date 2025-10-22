import React from 'react';

const IndiaMapIcon = ({ className = "h-6 w-6", color = "currentColor" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* India Map Outline */}
      <path 
        d="M12 2C8.5 2 6 4.5 6 8C6 9.5 6.5 11 7.5 12C8.5 13 9 14.5 9 16C9 17.5 8.5 19 7.5 20C6.5 21 5 22 3 22C2.5 22 2 21.5 2 21C2 20.5 2.5 20 3 20C4 20 5 19 5 18C5 17 4.5 16 4 15C3.5 14 3 13 3 12C3 11 3.5 10 4 9C4.5 8 5 7 6 6C7 5 8 4 9 3C10 2 11 2 12 2Z" 
        fill={color}
        opacity="0.3"
      />
      
      {/* Main India Shape */}
      <path 
        d="M12 3C9.5 3 7.5 4.5 7 6.5C6.5 8.5 7 10.5 8 12C9 13.5 10 15 11 16.5C12 18 13 19.5 14 21C15 22.5 16 23 17 23C18 23 19 22.5 20 21.5C21 20.5 21.5 19 21.5 17.5C21.5 16 21 14.5 20 13C19 11.5 18 10 17 8.5C16 7 15 5.5 14 4C13 2.5 12 2 12 3Z" 
        fill={color}
      />
      
      {/* Northern Region */}
      <path 
        d="M12 4C10.5 4 9.5 5 9 6.5C8.5 8 9 9.5 10 10.5C11 11.5 12 12.5 13 13.5C14 14.5 15 15.5 16 16.5C17 17.5 18 18 19 18C20 18 21 17.5 21.5 16.5C22 15.5 22 14 21.5 12.5C21 11 20 9.5 19 8C18 6.5 17 5 16 3.5C15 2 14 1.5 13 2C12 2.5 12 3.5 12 4Z" 
        fill={color}
        opacity="0.7"
      />
      
      {/* Southern Region */}
      <path 
        d="M12 15C11 15 10 16 9.5 17C9 18 9.5 19 10.5 19.5C11.5 20 12.5 20 13.5 19.5C14.5 19 15 18 15 17C15 16 14.5 15 14 14.5C13.5 14 13 14 12 15Z" 
        fill={color}
        opacity="0.8"
      />
      
      {/* Eastern Region */}
      <path 
        d="M18 8C17.5 8 17 8.5 17 9C17 9.5 17.5 10 18 10C18.5 10 19 9.5 19 9C19 8.5 18.5 8 18 8Z" 
        fill={color}
        opacity="0.9"
      />
      
      {/* Western Region */}
      <path 
        d="M6 8C5.5 8 5 8.5 5 9C5 9.5 5.5 10 6 10C6.5 10 7 9.5 7 9C7 8.5 6.5 8 6 8Z" 
        fill={color}
        opacity="0.9"
      />
      
      {/* Central Region */}
      <path 
        d="M12 8C11.5 8 11 8.5 11 9C11 9.5 11.5 10 12 10C12.5 10 13 9.5 13 9C13 8.5 12.5 8 12 8Z" 
        fill={color}
        opacity="0.9"
      />
    </svg>
  );
};

export default IndiaMapIcon;


