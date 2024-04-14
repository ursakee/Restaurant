import React, { useState, useEffect } from "react";

const OrderItem = ({ item }) => {
  const { imagine, denumire, scoase, extra, cantitate } = item;
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (imagine && imagine.data) {
      const blob = new Blob([Uint8Array.from(imagine.data)], {
        type: "image/png",
      });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [imagine]);

  return (
    <div className="py-8 flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-col md:flex-row items-center px-4 md:w-full">
        <img src={imageUrl} alt={denumire} className="w-32 lg:w-40 mb-4 md:mb-0 md:mr-10 flex-none" />
        <div className="flex-grow">
          <h3 className="text-3xl lg:text-4xl font-semibold flex justify-between font-crimson text-black">
            {denumire}
            <span className="opacity-50 pl-2">x{cantitate}</span>
          </h3>
          <div className="flex flex-col md:block">
            {extra.map((ingredient) => (
              <div
                key={ingredient.id}
                className="flex justify-between items-center text-lg lg:text-2xl font-crimson font-bold text-black opacity-50"
              >
                <span>+ {ingredient.denumire}</span>
              </div>
            ))}
            {scoase.length > 0 && extra.length > 0 ? (
              <div className="w-1/2 border-t-2 border-black relative opacity-50" />
            ) : (
              <div />
            )}
            {scoase.map((ingredient) => (
              <div key={ingredient.id} className="text-lg lg:text-2xl font-crimson font-bold text-black opacity-50">
                - {ingredient.denumire}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
