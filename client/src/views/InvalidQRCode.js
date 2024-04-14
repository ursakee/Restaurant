import React from "react";

// Assets
import InvalidQRImage from "../assets/qr-code.png";

const InvalidQRCode = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-crimson text-center p-3 font-semibold text-black">
        COD QR INVALID
      </h1>
      <p className="text-black font-crimson text-2xl lg:text-3xl text-center">Vă rugăm să încercați din nou.</p>
      <img src={InvalidQRImage} alt="Invalid QR Code" className="w-64 h-64" />
    </div>
  );
};

export default InvalidQRCode;
