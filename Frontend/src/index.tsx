import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/global.css"
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EmailAuthentication } from './pages/authentication/EmailAuthenticationPage';
import { HomePage } from './pages/home/homePage';
import { SingUpPage } from './pages/authentication/SingUpPage';
import { Error404Page } from './pages/error/error404Page';
import { SingInPage } from './pages/authentication/SingInPage';
import { AuthenticationRoot } from './pages/root/AuthenticationRoot';
import { HomePageLogged } from './pages/home/homePageLogged';
import { CreateNewsletterPage } from './pages/newsletter/createNewsletterPage';
import { SearchNewsletterPage } from './pages/newsletter/searchNewsletterPage';
import { UserNewslettersPage } from './pages/newsletter/userNewslettersPage';
import StaticSizePage from './pages/root/StaticSizePages';
import DinamicSizePage from './pages/root/DinamicSizePages';
import { UserSubscriptions } from './pages/newsletter/userSubscriptions';
import ConfigurationPage from './pages/configuration/configurationPage';
import CreateNewsletterPostPage from './pages/newsletter/createNewsletterPostPage';

// const style = {"--primary-color": "white"} as React.CSSProperties;

const router = createBrowserRouter([
  {
    path: "/",
    element: <StaticSizePage />,
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
        path: "/configuration",
        element: <ConfigurationPage />
      }
    ]
  },
  {
    path: "/",
    element: <DinamicSizePage />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "/create-newsletter",
        element: <CreateNewsletterPage />
      },
      {
        path: "/search-newsletter",
        element: <SearchNewsletterPage />
      },
      {
        path: "/user-newsletters",
        element: <UserNewslettersPage />
      },
      {
        path: "/user-subscriptions",
        element: <UserSubscriptions />
      },
      {
        path: "/create-newsletter-post",
        element: <CreateNewsletterPostPage />
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
