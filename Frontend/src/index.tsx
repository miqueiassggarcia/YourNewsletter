import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/global.css"
import Root from './Root';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EmailAuthentication } from './pages/emailAuthenticationPage';
import { HomePage } from './pages/homePage';
import { SingUpPage } from './pages/singUpPage';
import { Error404Page } from './pages/error404Page';
import { SingInPage } from './pages/singInPage';
import AuthenticationRoot from './pages/authenticationRoot';
import { HomePageLogged } from './pages/homePageLogged';
import { CreateNewsletterPage } from './pages/createNewsletterPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/home",
        element: <HomePageLogged />
      },
      {
        path: "/create-newsletter",
        element: <CreateNewsletterPage />
      }
    ]
  },
  {
  path: "/authentication",
  element: <AuthenticationRoot />,
  errorElement: <Error404Page />,
  children: [
    {
      path: "singup",
      element: <SingUpPage />,
    },
    {
      path: "singin",
      element: <SingInPage />,
    },
    {
      path: "email-authentication",
      element: <EmailAuthentication />
    }
  ]}
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  );
  root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
