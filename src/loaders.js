import { redirect } from 'react-router-dom';
import { friends} from './FAKEBACKEND'
import axios from "axios";

const toDoAPIBaseURL = "http://localhost:3000";

export async function listLoader() {
  
  try {
    const data = await axios.get(`${toDoAPIBaseURL}/lists`, {
      withCredentials: true,
    });
    
    return data.data;
    
  } catch (error) {
    return redirect("/login");
  }

  
}

export async function singleListLoader({params}) {
  const id =params.listId;
  try {
    const data = await axios.get(`${toDoAPIBaseURL}/lists/${id}`, {
      withCredentials: true,
    });
    return data.data;
  } catch(error) {
    console.log(error);
    return null;
  }
}

export async function friendsLoader() {
  return await friends;
}

export async function singleUserLoader({params}) {
  const friend = await getSingleFriend(params.userId);
  return friend;
}

function getSingleFriend(id) {
  return friends.find(friend => friend.userId === id);
}


