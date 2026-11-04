import axios from "axios";
import { useUsersStore } from "../Store/UsersStore";

export const verifyLogIn = async (username, password) => {
  let user = null;

  const usersStore = useUsersStore();

  usersStore.loadMarker = true;
  console.log("before axios", usersStore.loadMarker);
  await axios.get("https://exp-hk1g.onrender.com/users").then((response) => {
    if (response) {
      let required = response.data.find(
        (i) => i.username === username.trim().toLocaleLowerCase(),
      );

      if (required) {
        if (required.password === password) {
          usersStore.allUser = response.data;
          user = required;
          console.log("in axios before false", usersStore.loadMarker);
          usersStore.loadMarker = false;
          return;
        }
      }
      user = null;
      usersStore.allUser = [];
    }
    user = null;
    usersStore.allUser = [];
  });
  return user;
};
