import React from "react";

const Button = ({ children, onClick, additionalClasses }) => {
  const baseClasses =
    "font-crimson font-bold rounded-full text-xl md:text-2xl lg:text-3xl px-4 py-3 mt-2 lg:mt-6";
  const combinedClasses = `${baseClasses} ${additionalClasses}`;

  return (
    <div className="flex justify-center ">
      <button onClick={onClick} className={combinedClasses}>
        {children}
      </button>
    </div>
  );
};

export default Button;
