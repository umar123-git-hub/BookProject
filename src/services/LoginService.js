import axios from "axios";

export const verifyLogIn = async (username, password) => {
  let user = null;
  await axios
    .get("https://json-server-v7m9.onrender.com/users")
    .then((response) => {
      if (response) {
        let required = response.data.find(
          (i) => i.userName === username.trim().toLocaleLowerCase(),
        );

        if (required) {
          if (required.password === password) {
            console.log("required", required);
            user = required;
            return;
          }
        }
        user = null;
      }
      user = null;
    });
  return user;
};
