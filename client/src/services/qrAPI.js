import { BASE_URL } from "./API";

export const validateQRCode = async (tableId, signature) => {
  try {
    const response = await fetch(`${BASE_URL}validate-qr?tableId=${tableId}&signature=${signature}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error validating the QR code!", error);
    throw error;
  }
};
