import {createBrowserRouter, Navigate} from "react-router-dom";

export const MainRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Navigate to={'/courses'} />
    },
    {
      path: '/courses',
      lazy: async () => {
        const {Courses} = await import('./pages/courses/courses');
        return {Component: Courses};
      }
    },
  ])
}
