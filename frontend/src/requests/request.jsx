const API_DOMAIN = import.meta.env.VITE_REACT_API_DOMAIN;

export const get = async (path) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: "error" };
  }
};

export const post = async (path, data) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: "error" };
  }
};

export const del = async (path) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: "error" };
  }
};

export const patch = async (path, data) => {
  try {
    const response = await fetch(API_DOMAIN + path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: "error" };
  }
};
