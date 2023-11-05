import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.scss';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
