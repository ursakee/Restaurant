import React from "react";

// Assets
import PlusIcon from "../assets/plus.svg";
import MinusIcon from "../assets/minus.svg";

// Context
import { useCart } from "../context/CartContext";

const CartItem = ({ item, onClickPlus, onClickMinus }) => {
  const { imagine, denumire, pret, scoase, extra, cantitate } = item;

  const { removeFromCart } = useCart();

  const handleMinus = () => {
    if (item.cantitate > 1) {
      onClickMinus(item.id);
    } else {
      removeFromCart(item.id);
    }
  };

  const handlePlus = () => {
    onClickPlus(item.id);
  };

  return (
    <div className="py-8 flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-col md:flex-row items-center px-4 md:w-full">
        <img src={imagine} alt={denumire} className="w-32 lg:w-40 mb-4 md:mb-0 md:mr-10 flex-none" />
        <div className="flex-grow">
          <h3 className="text-3xl lg:text-4xl font-semibold font-crimson text-black">{denumire}</h3>
          <div className="flex flex-col md:block">
            {extra.map((ingredient) => (
              <div
                key={ingredient.id}
                className="flex justify-between items-center text-lg lg:text-2xl font-crimson font-bold text-black opacity-50"
              >
                <span>+ {ingredient.nume}</span>
                <span className="md:ml-4">+ {ingredient.pret} lei</span>
              </div>
            ))}
            {scoase.length > 0 && extra.length > 0 ? (
              <div className="w-full border-t-2 border-black relative opacity-50" />
            ) : (
              <div />
            )}
            {scoase.map((ingredient) => (
              <div key={ingredient.id} className="text-lg lg:text-2xl font-crimson font-bold text-black opacity-50">
                - {ingredient.nume}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center md:justify-end text-2xl lg:text-4xl font-bold mt-2 font-crimson text-black">
            <span className="md:hidden">{parseFloat(pret).toFixed(2)} lei</span>
            <span className="hidden md:inline">{parseFloat(pret).toFixed(2)} lei</span>
            <span className="opacity-50 pl-2">x{cantitate}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around w-full md:w-fit md:justify-start ml-2 md:flex-col md:mt-0 mt-3 flex-row-reverse">
        <button onClick={handlePlus} className="bg-orange p-2 rounded-lg">
          <img src={PlusIcon} className="w-6 h-6" alt="Plus" />
        </button>

        <button onClick={handleMinus} className="bg-creme p-2 rounded-lg">
          <img src={MinusIcon} className="w-6 h-6" alt="Minus" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
