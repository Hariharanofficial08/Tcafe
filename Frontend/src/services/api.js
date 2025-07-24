// import axios from "axios";

// const API_BASE = "http://localhost:8000/pi";

// export const getCategories = async () => {
//   try {
//     const res = await axios.get(`${API_BASE}/categories/`);
//     return res.data;
//   } catch (error) {
//     console.error("Failed to fetch categories:", error);
//     throw new Error("Backend unavailable");
//   }
// };

// export const getProducts = async (categoryId = null) => {
//   try {
//     const url = categoryId ? `${API_BASE}/products/?category=${categoryId}` : `${API_BASE}/products/`;
//     const res = await axios.get(url);
//     return res.data;
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//     throw new Error("Backend unavailable");
//   }
// };

import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const getCategories = async () => {
  try {
    const res = await axios.get(`${API_BASE}/categories/`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Backend unavailable");
  }
};

export const getProducts = async (categoryId = null) => {
  try {
    const url = categoryId ? `${API_BASE}/products/?category=${categoryId}` : `${API_BASE}/products/`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Backend unavailable");
  }
};
