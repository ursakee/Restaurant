import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Utils
import { getQRDataWithExpiry, setQRDataWithExpiry } from "../utils/storageUtils";

//API
import { validateQRCode } from "../services/qrAPI";

export const QRContext = createContext();
export const useQRContext = () => useContext(QRContext);

export const QRProvider = ({ children }) => {
  const [qrData, setQRData] = useState(() => getQRDataWithExpiry("qrData"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkExpiry = () => {
      const currentQRData = getQRDataWithExpiry("qrData");
      if (!currentQRData) {
        navigate("/invalid-qr", { replace: true });
      }
    };

    checkExpiry();
    const intervalId = setInterval(checkExpiry, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const updateQRData = (data, expiryDuration) => {
    setQRDataWithExpiry("qrData", data, expiryDuration);
    setQRData(data);
  };

  const clearQRData = () => {
    localStorage.removeItem("qrData");
    setQRData(null);
    navigate("/invalid-qr", { replace: true });
  };

  return <QRContext.Provider value={{ qrData, updateQRData, clearQRData }}>{children}</QRContext.Provider>;
};

export const QRValidator = ({ children }) => {
  const [isQRValidated, setIsQRValidated] = useState(false);

  const { qrData, updateQRData, clearQRData } = useQRContext();

  const navigate = useNavigate();

  useEffect(() => {
    const timeUntillExpired = 5 * 60 * 60 * 1000;

    const params = new URLSearchParams(window.location.search);
    const tableId = params.get("tableId");
    const signature = params.get("signature");

    if (!isQRValidated && tableId && signature) {
      validateQRCode(tableId, signature).then((data) => {
        if (data.valid) {
          updateQRData({ tableId, signature }, timeUntillExpired);
          setIsQRValidated(true);
          navigate("/", { replace: true });
        } else {
          clearQRData();
          navigate("/invalid-qr", { replace: true });
        }
      });
    }
  }, [qrData, updateQRData, clearQRData, navigate, isQRValidated]);

  return <>{children}</>;
};
