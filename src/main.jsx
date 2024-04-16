import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root'
import ErrorPage from './error-page'
import Login from './routes/Login'
import { friendsLoader, listLoader, singleListLoader } from './loaders'
import { loginAction } from './actions'
import Home from './routes/Home'
import Lists from './routes/Lists'
import Friends from './routes/Friends'
import ListPage from './routes/ListPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:'login',
        element: <Login />,
        action: loginAction,
      }
    ]
  },
  {
    path: 'home',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'lists',
        element: <Lists />,
        loader: listLoader,
      },
      {
        path: 'friends',
        element: <Friends />,
        loader: friendsLoader,
      },
      {
        path: 'lists/:listId',
        element: <ListPage />,
        loader: singleListLoader,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
