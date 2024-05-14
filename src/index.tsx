import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Home from './components/Home';
import Counter from './components/Apps/Counter/Counter';
import App from './App';
import TodosApp from './components/Apps/TodoList/TodosApp';
import Stopwatch from './components/Apps/Stopwatch/Stopwatch';
import ClickCounter from './components/Apps/ClickPerSecond/ClickCounter';
import Products from './components/Apps/ProductStore/Products';
import Auth from './components/Apps/Auth/Auth';
import User from './components/Apps/Auth/User';
import ProductDetail from './components/Apps/ProductStore/ProductDetail';
import StoreCart from './components/Apps/ProductStore/StoreCart';
import NoMatch from './components/Layouts/NoMatch';
import ProtectedRoute from './components/Apps/Auth/routes/ProtectedRoute';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/counter', element: <Counter /> },
      { path: '/todos', element: <TodosApp /> },
      { path: '/stopwatch', element: <Stopwatch /> },
      { path: '/cps', element: <ClickCounter /> },
      { path: '/store', element: <Products />, },
      { path: "/store/product/:id", element: <ProductDetail /> },
      { path: "/store/cart", element: <StoreCart /> },
      { path: '/auth', element: <Auth />, },
      { path: '*', element: <NoMatch />, },
      {
        path: 'auth/user',
        element: (<ProtectedRoute component={User} />),
      },
    ],
  },
]);

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);