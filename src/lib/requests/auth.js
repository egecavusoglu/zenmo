import Router from "next/router";
import { useAuthStore } from "src/store";
const { postRequest } = require("../fetch");

export async function logout() {
  try {
    const response = await postRequest({
      url: "/api/logout",
    });
    if (response.isSuccess) {
      useAuthStore.setState({
        user: null,
        isLoggedIn: false,
      });
      Router.push("/");
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}
