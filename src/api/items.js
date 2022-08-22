import axios from "axios";

export const fetchAllItems = async () => {
  try {
    const { data } = await axios.get("/api/items");
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchSingleItem = async (id) => {
  try {
    const { data } = await axios.get(`/api/items/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchItemsByFloor = async (id) => {
  const response = await fetch(`/api/items/floor/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
};
