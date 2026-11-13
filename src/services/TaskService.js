import api from "./ax";

export const getAllTasks = async () => {
  let marker = null;
  await api.get("/tasks").then((response) => {
    if (response) {
      marker = response.data;
    }
  });
  return marker;
};

export const addTask = async (obj) => {
  let marker = false;
  await api
    .post("/tasks", obj)
    .then((response) => {
      if (response) {
        marker = true;
      }
    });
  return marker;
};

export const editTask = async (obj) => {
  let marker = false;
  await api
    .put(`/tasks/${obj.id}`, obj)
    .then((response) => {
      if (response) {
        marker = true;
      }
    });
  return marker;
};

export const deleteTask = async (id) => {
  let marker = false;
  await api
    .delete(`/tasks/${id}`)
    .then((response) => {
      if (response) {
        marker = true;
      }
    });
  return marker;
};


// post - create - no id - id will set by BE
// put - edit - FE must provide id