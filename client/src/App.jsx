import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './App.css'
import Homepage from "./user/Homepage"
import Layout from "./components/Layout";
import About from "./user/About";
import Events from "./user/Events";
import Login from "./user/Login";
import Signup from "./user/Signup";
import EventDetails from "./user/eventdetails";
import AdminDashboard from "./components/admindashboard";
import Userdahboard from "./components/userdahboard";
import CreateEvent from "./components/createevents";
import EventList from "./components/manageevents";
import EventUpdate from "./components/updateevent";
import Payment from "./user/Payment";
import UsersList from "./components/userslist";

import MyBookings from "./user/MyBookings";
import BookingPage from "./user/Bookings"

import ReceiptPage from "./user/Recipet";
import Ticket from "./components/TicketList"
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "about",
          element: <About />,
        },
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "events",
          element: <Events />,
        },
       
        {
          path: "/api/events/eventdetails/:eventId",
          element: <EventDetails />
        },
        
       



        {
          path: "login",
          element: <Login />,
        },
        {
          path: "/admin-dashboard",
          element: <AdminDashboard />
        },
        {
          path: "/createevents",
          element: <CreateEvent />
        },
        {
          path: "/eventlist",
          element: <EventList />
        },
       {
  path: "/events/update/:eventId",
  element: <EventUpdate />
},

        {
          path: "/ticketlist",
          element: <Ticket />
        },
        {
          path: "/user-dashboard",
          element: < Userdahboard />
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "/mybookings",
          element: <MyBookings />,
        },


        {
  path: "payment/:bookingId",
  element: <Payment />
}
,
        {
          path: "/userslist",
          element: < UsersList />,
        },
        {
  path: "booking/:eventId",
  element: <BookingPage />,
},

{
  path: "/receipt/:bookingId",
  element: <ReceiptPage />,
}
      ]
    }
  ])


  return <RouterProvider router={router} />;
}

export default App
