import Router from "next/router";
const { postRequest } = require("../fetch");

export async function logout() {
  try {
    const response = await postRequest({
      url: "/api/logout",
    });
    if (response.isSuccess) {
      Router.push("/");
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}
