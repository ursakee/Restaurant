import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Context
import { useNavbarContext } from "../context/NavbarContext";
import { useCart } from "../context/CartContext";

// Components
import IngredientCheckbox from "../components/IngredientCheckbox";
import QuantityAdjuster from "../components/QuantityAdjuster";
import Category from "../components/Category";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";

// API
import { getFoodDetails } from "../services/foodsAPI";

function Item() {
  let { id } = useParams();
  const { setShowBackArrow } = useNavbarContext();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedExtras, setCheckedExtras] = useState(new Map());
  const [checkedRemoved, setCheckedRemoved] = useState(new Map());
  const [showPopup, setShowPopup] = useState(false);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const toggleExtraIngredient = (ingredient, isChecked) => {
    setCheckedExtras((prev) => new Map(prev).set(ingredient.id, isChecked));
    updateTotalPrice();
  };

  const toggleRemovedIngredient = (ingredient, isChecked) => {
    setCheckedRemoved((prev) => new Map(prev).set(ingredient.id, isChecked));
    updateTotalPrice();
  };

  const updateTotalPrice = useCallback(() => {
    if (itemDetails) {
      let newTotalPrice = parseFloat(itemDetails.pret) * quantity;

      checkedExtras.forEach((isChecked, id) => {
        if (isChecked) {
          const extraIngredient = itemDetails.extra.find((i) => i.id === id);
          newTotalPrice += parseFloat(extraIngredient.pret) * quantity;
        }
      });

      setTotalPrice(newTotalPrice);
    }
  }, [itemDetails, quantity, checkedExtras]);

  const handleCheckout = () => {
    const extrasDetails = Array.from(checkedExtras)
      .filter(([id, isChecked]) => isChecked)
      .map(([id]) => {
        const ingredient = itemDetails.extra.find((i) => i.id === id);
        return { id, nume: ingredient.denumire, pret: ingredient.pret };
      });

    const removedDetails = Array.from(checkedRemoved)
      .filter(([id, isChecked]) => isChecked)
      .map(([id]) => {
        const ingredient = itemDetails.eliminabile.find((i) => i.id === id);
        return { id, nume: ingredient.denumire };
      });

    const orderSummary = {
      id: parseInt(id),
      imagine: itemDetails.imagine,
      denumire: itemDetails.denumire,
      pret: totalPrice.toFixed(2),
      scoase: removedDetails,
      extra: extrasDetails,
      cantitate: quantity,
    };

    addToCart(orderSummary);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setCheckedExtras(new Map());
      setCheckedRemoved(new Map());
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    setShowBackArrow(true);
    return () => setShowBackArrow(false);
  }, [setShowBackArrow]);

  useEffect(() => {
    const fetchItemDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getFoodDetails(id);
        setItemDetails(data);
        setTotalPrice(parseFloat(data.pret));
      } catch (error) {}
      setIsLoading(false);
    };

    fetchItemDetails();
  }, [id]);

  useEffect(() => {
    updateTotalPrice();
  }, [updateTotalPrice]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-screen overscroll-x-none">
      {showPopup && (
        <div className="fixed drop-shadow-orange top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 border-2 border-black rounded-lg z-10 bg-white text-black font-crimson font-bold text-4xl">
          Adăugat în coș!
        </div>
      )}
      <div className="relative bg-orange h-1/3 flex justify-center items-center">
        <div className="absolute bg-white w-full h-2/3 rounded-t-[50px] bottom-0" />
        {itemDetails && (
          <div className="absolute flex justify-center w-full">
            <img
              className="w-56 lg:w-64 xl:w-72 drop-shadow-orange"
              src={`data:image/png;base64,${itemDetails.imagine}`}
              alt={itemDetails.denumire}
            />
          </div>
        )}
      </div>
      <div className="flex justify-center lg:mt-10">
        <QuantityAdjuster quantity={quantity} increment={incrementQuantity} decrement={decrementQuantity} />
      </div>
      <div className="flex justify-center text-center text-3xl md:text-4xl lg:text-5xl font-crimson text-black font-bold mt-8">
        {itemDetails.denumire}
      </div>

      <div className="flex justify-center text-center text-xl md:text-2xl lg:text-3xl font-crimson text-black font-semibold my-4 opacity-50 px-8 lg:px-48">
        {itemDetails.ingrediente.map((ingredient) => ingredient.denumire).join(", ")}
      </div>

      <div className="flex justify-around text-lg md:text-2xl lg:text-3xl font-crimson text-black font-bold opacity-50 px-10 py-4">
        <div>{itemDetails.gramaj + "g"}</div>
        <div>{itemDetails.calorii + "kcal"}</div>
      </div>

      {itemDetails.eliminabile.length > 0 ? (
        <Category text={"Scoateți ingrediente"} childrenStyle={"py-4"}>
          {itemDetails.eliminabile.map((ingredient) => (
            <IngredientCheckbox
              key={ingredient.id}
              name={ingredient.denumire}
              isChecked={checkedRemoved.get(ingredient.id) || false}
              onToggle={(isChecked) => toggleRemovedIngredient(ingredient, isChecked)}
            />
          ))}
        </Category>
      ) : (
        <div />
      )}

      {itemDetails.extra.length > 0 ? (
        <Category text={"Ingrediente extra"} childrenStyle={"py-4"}>
          {itemDetails.extra.map((ingredient) => (
            <IngredientCheckbox
              key={ingredient.id}
              id={ingredient.id}
              name={ingredient.denumire}
              price={ingredient.pret}
              isChecked={checkedExtras.get(ingredient.id) || false}
              onToggle={(isChecked) => toggleExtraIngredient(ingredient, isChecked)}
            />
          ))}
        </Category>
      ) : (
        <div />
      )}
      <Button onClick={handleCheckout} additionalClasses="bg-orange text-black mt-6 mb-8">
        ADAUGAȚI ÎN COȘ ({totalPrice.toFixed(2)} LEI)
      </Button>
    </div>
  );
}

export default Item;
