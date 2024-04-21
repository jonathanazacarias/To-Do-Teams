import {listsList, friends} from './FAKEBACKEND'
import axios from "axios";

const toDoAPIBaseURL = "http://localhost:3000";

// we can put all of our backend api calls here and load all the data
// we need into our components via loaders for those routes/ components

// we can create different loader functions that make different api calls for data
// we will do this same idea for posts, but in the actions.js file

export async function listLoader() {
  
  // in app this will be an axios call to the backend

  const data = await axios.get(`${toDoAPIBaseURL}/lists`, {
    withCredentials: true,
  });
  
  return data.data;
}

export async function singleListLoader({params}) {
  const list = await getSingleList(params.listId)
  return list;
}

export async function friendsLoader() {
  return await friends;
}

export async function singleUserLoader({params}) {
  const friend = await getSingleFriend(params.userId);
  return friend;
}

function getSingleList(id) {
  let list = listsList.filter(list => list.id === id);
  return list[0];
}

function getSingleFriend(id) {
  return friends.find(friend => friend.userId === id);
}


