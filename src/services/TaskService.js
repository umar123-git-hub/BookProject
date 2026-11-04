import axios from "axios";

export const getAllTasks = async () => {
  let marker = null;
  await axios.get("https://exp-hk1g.onrender.com/tasks").then((response) => {
    if (response) {
      marker = response.data;
    }
  });
  return marker;
};

export const addTask = async (obj) => {
  let marker = false;
  await axios
    .post("https://exp-hk1g.onrender.com/tasks", obj)
    .then((response) => {
      if (response) {
        marker = true;
      }
    });
  return marker;
};
