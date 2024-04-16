import React from "react";

function SubCategory({ text, children, uppercase, childrenStyle }) {
  return (
    <div className="flex flex-col items-center px-10 py-5">
      <div className="flex justify-between w-full cursor-pointer">
        <div
          className={`text-2xl md:text-3xl lg:text-4xl font-crimson text-black font-semibold ${
            uppercase ? "uppercase" : ""
          } ml-2`}
        >
          {text}
        </div>
      </div>
      <div className="w-full border-t-2 border-black relative" />
      <div className={childrenStyle}>{children}</div>
    </div>
  );
}

export default SubCategory;
