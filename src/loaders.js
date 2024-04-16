// we can put all of our backend api calls here and load all the data
// we need into our components via loaders for those routes/ components

// we can create different loader functions that make different api calls for data
// we will do this same idea for posts, but in the actions.js file

export async function listLoader() {
  // in app this will be an axios call to the backend
  const data = await getLists();
  return data;
}

export async function singleListLoader({params}) {
  const list = await getSingleList(params.listId)
  return list;
}

export async function friendsLoader() {
  const friends = await getFriends();
  return friends;
}

function getSingleList(id) {
  let parsedId = parseInt(id);
  let list = getLists().filter(list => list.id === parsedId);
  return list[0];
}

// place holder data
function getLists() {

  const listsList = [
    {
      id: 1,
      title: "List 1",
      description: "A list of thing to do",
      items: [
        {
          id: 1,
          title: "Get milk",
          description: "Go to the store to get milk",
        },
        {
          id: 2,
          title: "Get dog food",
          description: "Go to store for dog food",
        },
        {
          id: 3,
          title: "Walk dog",
          description: "Take the dog outside for a walk",
        },
      ],
      owner: { userId: "123456", userName: "jon", avatar: "" },
      contributers: [],
      created: "2024-04-14T14:30:15.449Z",
      modified: "2024-04-14T14:38:15.449Z",
      modifiedBy: { userId: "123456", userName: "jon", avatar: "" },
    },
    {
      id: 2,
      title: "List 2",
      description: "A list of thing to do",
      items: [
        {
          id: 1,
          title: "Get cheese",
          description: "Go to the store to get cheese",
        },
        {
          id: 2,
          title: "Get cat food",
          description: "Go to store for cat food",
        },
        {
          id: 3,
          title: "Walk cat",
          description: "Take the cat outside for a walk",
        },
      ],
      owner: { userId: "123456", userName: "jon", avatar: "" },
      contributers: [{ userId: "654321", userName: "car", avatar: "" }],
      created: "2024-04-14T14:30:15.449Z",
      modified: "2024-04-14T14:38:15.449Z",
      modifiedBy: { userId: "123456", userName: "jon", avatar: "" },
    },
  ];

  return listsList;
}


function getFriends() {
  const friends = [
    {
      userId: "654321",
      fName: "",
      lName: "",
      userName: "Car",
      avatar: "",
      sharedLists: [2 /* this is a list id*/],
    },
    {
      userId: "362514",
      fName: "",
      lName: "",
      userName: "Dom",
      avatar: "",
      sharedLists: [1 /* this is a list id*/],
    },
  ];
  return friends;
}