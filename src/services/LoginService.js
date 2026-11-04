import axios from "axios";
import { useUsersStore } from "../Store/UsersStore";

export const verifyLogIn = async (username, password) => {
  let user = null;
  const usersStore = useUsersStore();
  await axios.get("https://exp-hk1g.onrender.com/users").then((response) => {
    if (response) {
      let required = response.data.find(
        (i) => i.username === username.trim().toLocaleLowerCase(),
      );

      if (required) {
        if (required.password === password) {
          usersStore.allUser = response.data;
          user = required;
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
