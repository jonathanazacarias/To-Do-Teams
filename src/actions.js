import { redirect } from "react-router-dom";
import axios from "axios";
// import { listsList } from "./FAKEBACKEND";


const toDoAPIBaseURL = "http://localhost:3000";
// create headers that will go with the requests
const headers = { "Content-Type": "application/json" };

export async function registerAction({ request /*params*/ }) {
  // get the data passed in by the registration form
  const formData = await request.formData();
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const passwordValidation = formData.get("passwordValidation");

  // create the info to be passed to the server
  const user = JSON.stringify({
    email: email,
    username: username,
    password: password,
  });
  const headers = { "Content-Type": "application/json" };

  // check that what user typed in for password equals what they typed in for password validation
  if (password === passwordValidation) {
    try {
      const response = await axios.post(`${toDoAPIBaseURL}/register`, user, {
        headers: headers,
        withCredentials: true,
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
  // get the data put in by user from the form and set data to json
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const loginUser = JSON.stringify({ username: email, password: password });

  try {
    
    const response = await axios.post(`${toDoAPIBaseURL}/login`, loginUser, {
      headers: headers,
      withCredentials: true,
    });

    const user = response.data;
    return user;

  } catch (error) {
    
    return {error: error};

  }
}

export async function newListAction({ request /*params*/ }) {
  const newList = await request.json();
  console.log(newList);
  try {
    const response = await axios.post(`${toDoAPIBaseURL}/lists`, newList, {
      headers: headers,
      withCredentials: true,
    });
    console.log(response);
    return redirect("/lists/" + newList.id);
  } catch (error) {
    return null;
  }
  
}

export async function updateListAction({ request /*params*/ }) {
  const updatedList = await request.json();
  console.log(updatedList);
  const response = await axios.put(`${toDoAPIBaseURL}/list/${updatedList.id}`, updatedList, {
    headers: headers,
    withCredentials: true,
  });
  console.log(response);
  return null;
}
