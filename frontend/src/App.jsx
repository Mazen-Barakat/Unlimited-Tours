import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TourPage from './pages/TourPage/TourPage';
import TourDetailsPage from './pages/TourDetailsPage/TourDetailsPage';
import BookingPage from './pages/BookingPage/BookingPage';
import BlogsLayout from './pages/BlogsPage/BlogsLayout/BlogsLayout';
import Blogs from './pages/BlogsPage/Blogs/Blogs';
import BlogDetails from './pages/BlogsPage/BlogDetails/BlogDetails';
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import ProfileLayout from './pages/ProfilePage/ProfileLayout/ProfileLayout';
import Profile from './pages/ProfilePage/Profile/Profile';
import MyBooking from './pages/ProfilePage/MyBooking/MyBooking';
import Notifications from './pages/ProfilePage/Notifications/Notifications';
import Settings from './pages/ProfilePage/Settings/Settings';

function App() {
  const Router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/signin',
      element: <AuthenticationPage />,
    },
    {
      path: '/signup',
      element: <AuthenticationPage />,
    },
    {
      path: '/trip',
      element: <TourPage type={'T'} />,
    },
    {
      path: '/cruise',
      element: <TourPage type={'C'} />,
    },
    {
      path: '/activity',
      element: <TourPage type={'A'} />,
    },
    {
      path: '/tour/:slug',
      element: <TourDetailsPage />,
    },
    {
      path: '/tour/:slug/booking',
      element: <BookingPage />,
    },
    {
      path: '/blogs',
      element: <BlogsLayout />,
      children: [
        {
          index: true,
          element: <Blogs />,
        },
        {
          path: ':blogId',
          element: <BlogDetails />,
        },
      ],
    },
    {
      path: '/profile',
      element: <ProfileLayout />,
      children: [
        {
          index: true,
          element: <Profile />,
        },
        {
          path: 'my-booking',
          element: <MyBooking />,
        },
        {
          path: 'notification',
          element: <Notifications />,
        },
        {
          path: 'settings',
          element: <Settings />,
        },
      ],
    },
  ]);

  return (
    <div className='appStyle'>
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
