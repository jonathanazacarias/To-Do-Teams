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
      
      return res;
    } catch (error) {
      return { error: error };
    }
  } else {
    return { error: "Passwords do not match." };
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

export async function listControlActions({ request /*params*/ }) {
  if(request.method === "POST") {
    const newList = await request.json();
    try {
      await axios.post(`${toDoAPIBaseURL}/lists`, newList, {
        headers: headers,
        withCredentials: true,
      });
      return redirect("/lists/" + newList.id);
    } catch (error) {
      return null;
    }
  } else {
    const listIdJSON = await request.json(`${toDoAPIBaseURL}/lists`);
    
    try {
      await axios.delete(`${toDoAPIBaseURL}/lists/${listIdJSON.id}`, {
        headers: headers,
        withCredentials: true,
      });
      return null;
    } catch (error) {
      return error;
    }
  }
  
  
}

export async function updateListAction({ request /*params*/ }) {
  if(request.method === "POST") {
    try {
      const updatedList = await request.json();

      const result = await axios.put(`${toDoAPIBaseURL}/lists`, updatedList, {
        headers: headers,
        withCredentials: true,
      });

      return {success: result.data};
    } catch (error) {
      return {error: error};
    }
    
  }else {
    try {
      const item = await request.json();
      const deleted = await axios.delete(`${toDoAPIBaseURL}/lists/${item.listId}/${item.itemId}`, {
        headers: headers,
        withCredentials: true,
      });
      const deletedId = deleted.data;
      return {success: deletedId};
    } catch (error) {
      return {error: error};
    }
  }
  
  
}

export async function friendActions({ request }) {
  const requestData = await request.json();
  const requestAction = requestData.action;
  

  if(requestAction === "cancel" || requestAction === "deny") {
    const requestId = requestData.requestId;
    try {
      const result = await axios.delete(`${toDoAPIBaseURL}/friends/${requestId}`, {
        withCredentials: true,
      });
      return { success: result.data };
    } catch (error) {
      return { error: error };
    }
  } else if(requestAction === "approve") {
    const requestId = requestData.requestId;
    try {
      const result = await axios.patch(`${toDoAPIBaseURL}/friends/approve/${requestId}`, {
        withCredentials: true,
      });
      return { success: {approved: result.data} };
    } catch (error) {
      return {error: error};
    }
  } else if(requestAction === "search") {
    
    try {
      const searchInput = requestData.searchInput;
      const result = await axios.get(`${toDoAPIBaseURL}/friends/search/${searchInput}`,
        {
          withCredentials: true,
        }
      );
      const suggestionList = result.data;
      return { success: {list: suggestionList} };
    } catch (error) {
      return {error: error};
    }
    
  } else if(requestAction === "request") {
    const userId = requestData.userId;
    const requestId = requestData.id;
    try {
      const result = await axios.post(`${toDoAPIBaseURL}/friends/request`, { id: requestId, userId: userId },
        {
          headers: headers,
          withCredentials: true,
        }
      );

      return { success: {friendRequest: result.data} };
    } catch (error) {
      return {error: error};
    }
  } else {
    return {error: "action not found"};
  }
  
}
