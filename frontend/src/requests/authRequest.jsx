const API_AUTH_DOMAIN = import.meta.env.VITE_REACT_API_AUTH_DOMAIN;

export const post = async (path, data) => {
  try {
    const response = await fetch(API_AUTH_DOMAIN + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: "error" };
  }
};

export const get = async (path) => {
  try {
    const response = await fetch(API_AUTH_DOMAIN + path, {
      method: "GET",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: "error" };
  }
};

export const del = async (path) => {
  try {
    const response = await fetch(API_AUTH_DOMAIN + path, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: "error" };
  }
};
