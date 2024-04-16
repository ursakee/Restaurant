import React, { useState, useEffect } from "react";

// Assets
import ArrowSVG from "../assets/arrow-dropdown.svg";

function Category({ text, children, uppercase, childrenStyle, defaultExpanded }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || false);

  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center px-10 py-5">
      <div className="flex justify-between w-full cursor-pointer" onClick={handleToggle}>
        <div
          className={`text-2xl md:text-3xl lg:text-4xl font-crimson text-black font-bold ${
            uppercase ? "uppercase" : ""
          } ml-2`}
        >
          {text}
        </div>
        <img
          className={`w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 mr-2 transform transition-transform duration-500 ${
            isExpanded ? "-rotate-90" : "rotate-90"
          }`}
          src={ArrowSVG}
          alt="Arrow icon for dropdown"
        />
      </div>
      <div className="w-full border-t-2 border-black relative" />
      {isExpanded && <div className={childrenStyle}>{children}</div>}
    </div>
  );
}

Category.defaultProps = {
  defaultExpanded: false,
};

export default Category;
