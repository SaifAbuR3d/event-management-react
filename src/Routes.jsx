import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/HomePage";
import AdminLayout from "./components/layouts/AdminLayout";
import MainLayout from "./components/layouts/MainLayout";
import NotFoundPage from "./components/pages/NotFoundPage";
import EventPage from "./components/pages/EventPage";
import OrganizerProfile from "./components/pages/OrganizerProfilePage.jsx";
import CreateEvetnPage from "./components/pages/CreateEvetnPage";
import EventDashboardHome from "./components/pages/EventDashboard/views/EventDashboardHome.jsx";
import AttendeeList from "./components/pages/EventDashboard/views/AttendeeList.jsx";
import RegistrationRequest from "./components/pages/EventDashboard/views/RegistrationRequest.jsx";
import EventDashboardLayout from "./components/layouts/EventDashboardLayout.jsx";
import VerificationRequest from "./components/pages/VerificationRequestPage.jsx";
import AttendeeRequestTable from "./components/other/AdminDashboardComponents/AttendeeRequestTable.jsx";
import OrganizerRequestsData from "./components/other/AdminDashboardComponents/OrganizerRequestsData.jsx";
import AttendeeProfilePage from "./components/pages/AttendeeProfilePage.jsx";
import AllAttendeesTable from "./components/other/AdminDashboardComponents/AllAttendeesTable.jsx";
import AllOrganizersTable from "./components/other/AdminDashboardComponents/AllOrganizersTable.jsx";
import SearchPage from "./components/pages/SearchPage.jsx";
import EventReportTable from "./components/other/AdminDashboardComponents/EventReportTable.jsx";
import ReviewReportTable from "./components/other/AdminDashboardComponents/ReviewReportTable.jsx";
import AuthenticationProtectedRoute from "./permissions/AuthenticationProtectedRoute.jsx";
import AdminProtectedRoute from "./permissions/AdminProtectedRoute.jsx";
import OrganizerProtectedRoute from "./permissions/OrganizerProtectedRoute.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignUpPage from "./components/pages/SignUpPage.jsx";

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
        path: "event/:eventId",
        element: <EventPage />,
      },
      {
        path: "organizer-profile/:userName",
        element: <OrganizerProfile />,
      },
      {
        path: "attendee-profile/:userName",
        element: <AttendeeProfilePage />,
      },
      {
        path: "events/create",
        element: (
          <OrganizerProtectedRoute>
            <CreateEvetnPage />
          </OrganizerProtectedRoute>
        ),
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "verification",
        element: <VerificationRequest />,
      },
    ],
  },
  {
    path: "event-dashboard/:eventId",
    element: <EventDashboardLayout />,
    children: [
      {
        index: true,
        element: <EventDashboardHome />,
      },
      {
        path: "Attendee-list",
        element: <AttendeeList />,
      },
      {
        path: "registration-request",
        element: <RegistrationRequest />,
      },
    ],
  },
  {
    path: "admin-dashboard",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="event-reports" />,
        index: true,
      },
      {
        path: "event-reports",
        element: <EventReportTable />,
      },
      {
        path: "review-reports",
        element: <ReviewReportTable />,
      },
      {
        path: "iv-request/attendee",
        element: <AttendeeRequestTable />,
      },
      {
        path: "iv-request/organizer",
        element: <OrganizerRequestsData />,
      },
      {
        path: "attendees",
        element: <AllAttendeesTable />,
      },
      {
        path: "organizers",
        element: <AllOrganizersTable />,
      },
    ],
  },
  {
    path: "register",
    element: (
      <AuthenticationProtectedRoute>
        <SignUpPage />
      </AuthenticationProtectedRoute>
    ),
  },
  {
    path: "login",
    element: (
      <AuthenticationProtectedRoute>
        <LoginPage />
      </AuthenticationProtectedRoute>
    ),
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
