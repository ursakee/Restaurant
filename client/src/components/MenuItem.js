import React from "react";
import { Link } from "react-router-dom";
import PlusIcon from "../assets/plus.svg";
import Vegetarian from "../assets/vegan.svg";
import Spicy from "../assets/spicy.svg";

function MenuItem({ id, name, weight, calories, price, image, vegetarian, spicy }) {
  function veganSpicy() {
    if (vegetarian && spicy) {
      return (
        <div className="absolute bottom-0 w-full flex justify-center items-center">
          <img className="w-1/6 mx-2" src={Vegetarian} alt={"Vegetarian"} />
          <img className="w-1/6 mx-2" src={Spicy} alt={"Spicy"} />
        </div>
      );
    } else if (vegetarian) {
      return (
        <div className="absolute bottom-0 w-full flex justify-center items-center p-3">
          <img className="w-1/6" src={Vegetarian} alt={"Vegetarian"} />
        </div>
      );
    } else if (spicy) {
      return (
        <div className="absolute bottom-0 w-full flex justify-center items-center p-3">
          <img className="w-1/6" src={Spicy} alt={"Spicy"} />
        </div>
      );
    }
    return <></>;
  }

  return (
    <Link
      to={`/item/${id}`}
      className="relative rounded-3xl shadow-xl bg-creme overflow-hidden flex flex-col justify-end"
    >
      {veganSpicy()}
      <div className="w-full flex justify-center items-center p-3">
        <img className="w-5/6" src={`data:image/png;base64,${image}`} alt={name} />
      </div>

      <div className="px-6 py-4 mb-6">
        <div className="font-semibold font-crimson text-2xl mb-2 text-center text-black">{name}</div>
        <div className="flex justify-between">
          <p className="text-lg  text-black opacity-50 font-crimson">{weight}g</p>
          <p className="text-lg text-black opacity-50 font-crimson">{calories} kcal</p>
        </div>
        <div className="text-2xl text-black font-semibold font-crimson md:ml-2 lg:ml-4 mt-2">{price} lei</div>
      </div>

      <button className="absolute w-8 h-8 md:w-7 md:h-7 lg:w-9 lg:h-9 bottom-0 right-0 p-2 bg-orange rounded-tl-md">
        <img src={PlusIcon} alt="Add" />
      </button>
    </Link>
  );
}

export default MenuItem;
