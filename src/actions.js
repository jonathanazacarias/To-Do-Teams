import { redirect } from "react-router-dom";

import {listsList} from './FAKEBACKEND'

export async function loginAction({ request, /*params*/ }) {
  const formData = await request.formData();
  //the body of the form is available under formData.get(nameOfInputField)
  //http method available under request.method
  if(formData.get('passwordValidation')){
    console.log(formData.get("passwordValidation"));
  }
  //here is where we would make the post request to our backend

  // once we get a response we can tell our react app to redirect to another page
  return redirect("/home/lists");
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
