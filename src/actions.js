import { redirect } from "react-router-dom";

export async function loginAction({ request, /*params*/ }) {
  const formData = await request.formData();
  //the body of the form is available under formDate.get(nameOfInputField)
  //http method available under request.method
  console.log(formData.get("email"), request.method, '\n'+request.referrer);
  if(formData.get('passwordValidation')){
    console.log(formData.get("passwordValidation"));
  }
  //here is where we would make the post request to our backend

  // once we get a response we can tell our react app to redirect to another page
  return redirect("/home/lists");
}
