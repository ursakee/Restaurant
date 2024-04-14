import { BASE_URL } from "./API";

export const getFoods = async () => {
  try {
    const response = await fetch(`${BASE_URL}foods`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error fetching the menu data!", error);
    throw error;
  }
};

export const getFoodDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}foods/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const imageBlob = new Blob([Uint8Array.from(data.imagine.data)], {
      type: "image/png",
    });
    const imageUrl = URL.createObjectURL(imageBlob);
    return { ...data, imagine: imageUrl };
  } catch (error) {
    console.error("There was an error fetching the food details!", error);
    throw error;
  }
};
