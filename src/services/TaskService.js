import api from "./ax";

// get all tasks with filters
export const getAllTasks = async (filters = {}) => {
  let marker = null;

  await api
    .get("/tasks", {
      params: filters,
    })
    .then((response) => {
      if (response) {
        marker = response.data;
      }
    });

  return marker;
};
// get all tasks with filters

// tasks global search
export const searchTasks = async (search) => {
  try {
    const response = await api.get("/tasks/search", {
      params: {
        search,
      },
    });

    return response.data;
  } catch (error) {
    console.error("SEARCH TASKS ERROR:", error.response?.data || error.message);

    return null;
  }
};
// tasks global search

// add task
export const addTask = async (obj) => {
  let marker = false;
  await api.post("/tasks", obj).then((response) => {
    if (response) {
      marker = true;
    }
  });
  return marker;
};
// add task

// edit task
export const editTask = async (obj) => {
  let marker = false;
  await api.put(`/tasks/${obj.id}`, obj).then((response) => {
    if (response) {
      marker = true;
    }
  });
  return marker;
};
// edit task

// delete task
export const deleteTask = async (id) => {
  let marker = false;
  await api.delete(`/tasks/${id}`).then((response) => {
    if (response) {
      marker = true;
    }
  });
  return marker;
};
// delete task

// post - create - no id - id will set by BE
// put - edit - FE must provide id
