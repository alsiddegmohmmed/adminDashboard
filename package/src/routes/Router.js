import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute.jsx';
import WelcomePage from '../components/WelcomePage.jsx';
import Students from '../views/ui/Students.js';

/*****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts.js"));
const Badges = lazy(() => import("../views/ui/Badges.js"));
const Buttons = lazy(() => import("../views/ui/Buttons.js"));
const Cards = lazy(() => import("../views/ui/Cards.js"));
const Grid = lazy(() => import("../views/ui/Grid.js"));
const Tables = lazy(() => import("../views/ui/Tables.js"));
const Forms = lazy(() => import("../views/ui/Forms.js"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs.js"));

/*****Routes******/
const ThemeRoutes = [
  {
    path: "/",
    element: <Navigate to="/welcome" replace />,
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
  {
    path: "/",
    element: <PrivateRoute />, // Protect all routes under FullLayout
    children: [
      {
        path: "/",
        element: <FullLayout />,
        children: [
          { path: "starter", element: <Starter /> },
          { path: "about", element: <About /> },
          { path: "students", element: <Students /> },
          { path: "alerts", element: <Alerts /> },
          { path: "badges", element: <Badges /> },
          { path: "buttons", element: <Buttons /> },
          { path: "cards", element: <Cards /> },
          { path: "grid", element: <Grid /> },
          { path: "table", element: <Tables /> },
          { path: "forms", element: <Forms /> },
          { path: "breadcrumbs", element: <Breadcrumbs /> },
        ],
      }
    ],
  },
];

export default ThemeRoutes;
