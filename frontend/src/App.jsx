import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TourPage from './pages/TourPage/TourPage'; 
import TourDetailsPage from './pages/TourDetailsPage/TourDetailsPage';
import BookingPage from './pages/BookingPage/BookingPage';
import BlogsLayout from './pages/BlogsPage/BlogsLayout/BlogsLayout';
import Blogs from './pages/BlogsPage/Blogs/Blogs';
import BlogDetails from './pages/BlogsPage/BlogDetails/BlogDetails';
import Loader from './components/Loader/Loader';
import { useEffect, useState } from 'react';

function App() {
  /*const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  }, []);

  if (loading) {
    return <Loader />; 
  }*/

  const Router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
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
        }
      ],
    }
  ]);

  return (
    <div className='appStyle'>
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
