import { cache } from "react";

export const getDialoBlog = async () => {
  try {
    const res = await axios.get("http://localhost:4000/workdetails", {
      cache: "no -store",
    });
    if (!res.ok) {
      throw new Error("Data not funde");
    }
    return res.json();
  } catch {
    console.log("Error loading topics", error);
  }
};

export const getFooter = async () => {
  try {
    const res = await axios.get("http://localhost:4000/workdetails", {
      cache: "no -store",
    });
    if (!res.ok) {
      throw new Error("Data not funde");
    }
    return res.json();
  } catch {
    console.log("Error loading topics", error);
  }
};

export const GetMoltivation = async () => {
  try {
    const res = await axios.get("", {
      cache: "no -store",
    });
    if (!res.ok) {
      throw new Error("Data not Found!");
    }
    return res.json();
  } catch {
    console.log("data not found");
  }
};

export const GetAboutme = async () => {
  try {
    const res = await axios.get("", {
      cache: "no -store",
    });
    if (!res.ok) {
      throw new Error("data not found");
    }
    return res.json();
  } catch {
    console.log("No data found");
  }
};
