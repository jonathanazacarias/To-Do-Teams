import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import Login from './routes/Login'
import { friendsLoader, listLoader, singleListLoader, singleUserLoader } from './loaders'
import { loginAction, listControlActions, updateListAction, registerAction, friendActions } from './actions'
import Home from './routes/Home'
import Lists from './routes/Lists'
import Friends from './routes/Friends'
import ListPage from './routes/ListPage'
import FriendPage from './routes/FriendPage'
import ProtectedRoute from './routes/ProtectedRoute'
import Register from './routes/Register'
import { AuthProvider } from './utils/AuthProvider'




const router = createBrowserRouter([
  {
    element: <AuthProvider/>,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'lists',
            element: <Lists />,
            loader: listLoader,
            action: listControlActions,
          },
          {
            path: 'friends',
            element: <Friends />,
            loader: friendsLoader,
            action: friendActions,
          },
          {
            path: 'lists/:listId',
            element: <ListPage />,
            loader: singleListLoader,
            action: updateListAction,
          },
          {
            path: 'friends/:userId',
            element: <FriendPage />,
            loader: singleUserLoader,
          },
        ]
      }
    ]
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
      <RouterProvider router={router} />
   
  </React.StrictMode>,
)
