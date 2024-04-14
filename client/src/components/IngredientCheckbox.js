import React from "react";
import CheckIcon from "../assets/check.svg";
import UncheckIcon from "../assets/uncheck.svg";

function IngredientCheckbox({ id, name, price, isChecked, onToggle }) {
  const toggleCheck = () => {
    onToggle(!isChecked);
  };
  return (
    <div className="flex items-center justify-between px-6 md:px-14 my-3 bg-white align-middle w-screen">
      <button onClick={toggleCheck} className="flex items-center">
        {isChecked ? (
          <img
            src={CheckIcon}
            alt="Checked"
            className="w-6 h-6  lg:w-10 lg:h-10 mr-2"
          />
        ) : (
          <img
            src={UncheckIcon}
            alt="Unchecked"
            className="w-6 h-6  lg:w-10 lg:h-10 mr-2"
          />
        )}
        <span className="text-2xl lg:text-3xl capitalize font-crimson font-semibold text-black">
          {name}
        </span>
      </button>
      {price && (
        <span className="text-2xl lg:text-3xl font-crimson font-semibold text-black opacity-50">
          + {price} lei
        </span>
      )}
    </div>
  );
}

export default IngredientCheckbox;
