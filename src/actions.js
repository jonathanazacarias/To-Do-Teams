import { redirect } from "react-router-dom";
import axios from "axios";
import { listsList } from "./FAKEBACKEND";

const toDoAPIBaseURL = "http://localhost:3000";

export async function registerAction({ request /*params*/ }) {
  // get the data passed in by the registration form
  const formData = await request.formData();
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const passwordValidation = formData.get("passwordValidation");

  // create the info to be passed to the server
  const user = JSON.stringify({ email: email, username: username, password: password });
  const headers = { "Content-Type": "application/json" };
  
  // check that what user typed in for password equals what they typed in for password validation
  if (password === passwordValidation) {
    try {
      const response = await axios.post(`${toDoAPIBaseURL}/register`, user, {
        headers: headers,
      });
      const res = response.data;
      console.log(res);
      return true;
    } catch (error) {
      console.log(`error:` + error);
    }
  } else {
    return true;
  }
}

export async function loginAction({ request /*params*/ }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const user = JSON.stringify({ username: email, password: password });
  const headers = { "Content-Type": "application/json" };

  try {
    const response = await axios.post(`${toDoAPIBaseURL}/login`, user, {
      headers: headers,
    });
    const res = response.data;

    console.log(res);
    if (res) {
      return redirect("../lists");
    } else {
      return true;
    }
  } catch (error) {
    console.log(`error:` + error);
  }

  return true;
}

export async function newListAction({ request /*params*/ }) {
  const newList = await request.json();
  listsList.push(newList);
  return redirect("/home/lists/" + newList.id);
}

export async function updateListAction({ request /*params*/ }) {
  const updatedList = await request.json();
  let index = listsList.findIndex((list) => list.id === updatedList.id);
  listsList.splice(index, 1, updatedList);
  return null;
}
