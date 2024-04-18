import { redirect } from "react-router-dom";
import axios from "axios";
import {listsList} from './FAKEBACKEND'

const toDoAPIBaseURL = "http://localhost:3000";

export async function loginAction({ request, /*params*/ }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const user = JSON.stringify({email: email,password: password});
  const headers = { "Content-Type": "application/json" };

  // if there is password validating then they are creating an account, otherwise login
  if(formData.get('passwordValidation')){

    // check that what user typed in for password equals what they typed in for password validation
    const passwordVal = formData.get('passwordValidation');
    if(password === passwordVal) {
      try {
        const response = await axios.post(`${toDoAPIBaseURL}/register`, user, {headers:headers});
        const res = response.data;
        console.log(res);
      } catch (error) {
        console.log(`error:` + error);
      }
    } else {
      return true;
    }
    
    
  } else {

    // they are making a login request
    
    try {
      const response = await axios.post(`${toDoAPIBaseURL}/login`, user, {headers: headers,});
      const res = response.data;

      console.log(res);
      // return redirect("/home/lists");
      return true;
    } catch (error) {
      console.log(`error:` + error);
    }
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
  let index = listsList.findIndex( list => list.id === updatedList.id);
  listsList.splice(index, 1, updatedList);
  return null;
}
