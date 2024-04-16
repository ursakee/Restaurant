import React, { useEffect, useState } from "react";

// Context
import { useNavbarContext } from "../context/NavbarContext";
import { useQRContext } from "../context/QRContext";
import { useCart } from "../context/CartContext";

// Service
import { sendOrder, getTableOrder } from "../services/orderAPI";

// Components
import Category from "../components/Category";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import OrderItem from "../components/OrderItem";
import SubCategory from "../components/SubCategory";

function Order() {
  const { qrData } = useQRContext();
  const { setShowBackArrow } = useNavbarContext();
  const { cart, removeFromCart, updateItemQuantity, processOrder } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [tableOrder, setTableOrder] = useState({ items: [] });

  const handleIncreaseQuantity = (itemId) => {
    const item = cart.waitingItems.find((item) => item.id === itemId);
    if (item) {
      const newQuantity = item.cantitate + 1;
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cart.waitingItems.find((item) => item.id === itemId);
    if (item) {
      if (item.cantitate > 1) {
        const newQuantity = item.cantitate - 1;
        updateItemQuantity(itemId, newQuantity);
      } else {
        removeFromCart(itemId);
      }
    }
  };

  useEffect(() => {
    setShowBackArrow(true);
    return () => setShowBackArrow(false);
  }, [setShowBackArrow]);

  useEffect(() => {
    const fetchTableOrder = async () => {
      try {
        const data = await getTableOrder(qrData.tableId);
        if (data) {
          setTableOrder(data);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
      setIsLoading(false);
    };

    fetchTableOrder();
  }, [qrData.tableId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-screen overscroll-x-none">
      <div className="relative bg-orange h-1/6 flex justify-center items-center ">
        <div className="absolute bg-white w-full h-5/6 rounded-t-[50px] bottom-0" />
        <div className="absolute flex justify-center w-full">
          <div className="text-3xl md:text-4xl lg:text-5xl font-crimson text-center p-3 font-semibold text-black">
            COMANDĂ
          </div>
        </div>
      </div>
      <Category text={"Comanda mea"} uppercase={true} defaultExpanded={true}>
        {cart.waitingItems.length > 0 && (
          <SubCategory text={"În coș"} defaultExpanded={true}>
            {cart.waitingItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onClickPlus={() => handleIncreaseQuantity(item.id)}
                onClickMinus={() => handleDecreaseQuantity(item.id)}
              />
            ))}
          </SubCategory>
        )}
        {cart.orderedItems.length > 0 && (
          <SubCategory text={"Comandate"} defaultExpanded={true}>
            {cart.orderedItems.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </SubCategory>
        )}
      </Category>
      <Category text={"Comanda mesei"} uppercase={true} defaultExpanded={true}>
        {tableOrder &&
          Array.isArray(tableOrder.items) &&
          tableOrder.items.map((item) => <OrderItem key={item.id} item={item} />)}
      </Category>
      <Button
        additionalClasses="bg-orange text-black my-4"
        onClick={() => {
          sendOrder(qrData.tableId, cart.waitingItems);
          processOrder();
        }}
      >
        TRIMITE COMANDA
      </Button>
      <Button additionalClasses="bg-black text-orange mb-48">CERE NOTA</Button>
    </div>
  );
}

export default Order;
