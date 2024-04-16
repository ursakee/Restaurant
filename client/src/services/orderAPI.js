import { BASE_URL } from "./API";

export const sendOrder = async (tableId, cart) => {
  try {
    const itemsWithoutImages = cart.map(({ imagine, ...item }) => item);

    const response = await fetch(`${BASE_URL}order/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: itemsWithoutImages, tableId: tableId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending order:", error);
    throw error;
  }
};

export const getTableOrder = async (tableId) => {
  try {
    const response = await fetch(`${BASE_URL}order/table_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableId: tableId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending order:", error);
    throw error;
  }
};
