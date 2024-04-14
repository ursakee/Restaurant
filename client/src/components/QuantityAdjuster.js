import React from "react";

import PlusIcon from "../assets/plus.svg";
import MinusIcon from "../assets/minus.svg";

function QuantityAdjuster({ quantity, increment, decrement }) {
  return (
    <div className="flex items-center justify-center bg-orange rounded-full drop-shadow-md">
      <button onClick={decrement} className="m-3 w-6 h-6">
        <img src={MinusIcon} alt="Decrease" />
      </button>
      <span className="mx-3 text-3xl font-crimson font-bold text-black">
        {quantity < 10 ? "0" + quantity : quantity}
      </span>
      <button onClick={increment} className="m-3 w-6 h-6">
        <img src={PlusIcon} alt="Increase" />
      </button>
    </div>
  );
}

export default QuantityAdjuster;
