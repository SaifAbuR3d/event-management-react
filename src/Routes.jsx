import SignUp from "./shared/auth/register/SignUp";
import { createBrowserRouter } from "react-router-dom";
import SignUpAttendee from "./shared/auth/register/SignUpAttendee";
import SignUpOrganizer from "./shared/auth/register/SignUpOrganizer";
import RegisterContextProvider from "./shared/auth/context/Register";
import Home from "./components/pages/HomePage";
import AdminLayout from "./components/layouts/AdminLayout";
import MainLayout from "./components/layouts/MainLayout";
import NotFoundPage from "./components/pages/NotFoundPage";
import EventPage from "./components/pages/EventPage";
import OrganizerProfile from "./components/pages/OrganizerProfile";
import CreateEvetnPage from "./components/pages/CreateEvetnPage";
import Login from "./shared/auth/login/Login.jsx";
import ProtectedLogin from "./shared/auth/login/protectedLogin.jsx";
import ReportsTable from "./components/other/ReportsTable.jsx";
import AttendeeVerificationsTable from "./components/other/AttendeeVerificationsTable.jsx";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "event/:eventId", // event/id
        element: <EventPage />,
      },
      {
        path: "profile/:userName",
        element: <OrganizerProfile />,
      },
      {
        path: "events/create",
        element: <CreateEvetnPage />,
      },
    ],
  },
  {
    path: "admin-dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "reports",
        element: <ReportsTable />,
      },
      {
        path: "acount-verifications",
        element: <AttendeeVerificationsTable />,
      },
    ],
  },
  {
    path: "register",
    element: (
      <RegisterContextProvider>
        <SignUp />
      </RegisterContextProvider>
    ),
  },
  {
    path: "login",
    element: (
      <ProtectedLogin>
        <Login />
      </ProtectedLogin>
    ),
  },
  {
    path: "attendee",
    element: (
      <RegisterContextProvider>
        <SignUpAttendee />
      </RegisterContextProvider>
    ),
  },
  {
    path: "eventorganizer",
    element: (
      <RegisterContextProvider>
        <SignUpOrganizer />
      </RegisterContextProvider>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
