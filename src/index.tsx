import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import App from './App';
import Loader from './components/Layouts/Loader';
import SomethingWentWrong from './components/Layouts/SomethingWentWrong';
import Quiz from './components/Apps/Quiz/Quiz';


const Counter = lazy(() => import('./components/Apps/Counter/Counter'));
const Home = lazy(() => import('./components/Home'));
const TodosApp = lazy(() => import('./components/Apps/TodoList/TodosApp'));
const Stopwatch = lazy(() => import('./components/Apps/Stopwatch/Stopwatch'));
const ClickCounter = lazy(() => import('./components/Apps/ClickPerSecond/ClickCounter'));
const Auth = lazy(() => import('./components/Apps/Auth/Auth'));
const User = lazy(() => import('./components/Apps/Auth/User'));
const ProductDetail = lazy(() => import('./components/Apps/ProductStore/ProductDetail'));
const NoMatch = lazy(() => import('./components/Layouts/NoMatch'));
const StoreCart = lazy(() => import('./components/Apps/ProductStore/StoreCart'));
const Products = lazy(() => import('./components/Apps/ProductStore/Products'));
const ProtectedRoute = lazy(() => import('./components/Apps/Auth/routes/ProtectedRoute'));
const Form = lazy(() => import('./components/Apps/Form/Form'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <SomethingWentWrong />,
    children: [
      {
        path: '/', element: <Suspense fallback={<Loader />}><Home /></Suspense>
      },
      { path: '/counter', element: <Suspense fallback={<Loader />}><Counter /></Suspense> },
      {
        path: '/todos', element: <Suspense fallback={<Loader />}><TodosApp /></Suspense>
      },
      {
        path: '/stopwatch', element: <Suspense fallback={<Loader />}><Stopwatch /></Suspense>
      },
      {
        path: '/cps', element: <Suspense fallback={<Loader />}><ClickCounter /></Suspense>
      },
      {
        path: '/store', element: <Suspense fallback={<Loader />}><Products /></Suspense>
      },
      {
        path: "/store/product/:id", element: <Suspense fallback={<Loader />}><ProductDetail /></Suspense>
      },
      {
        path: "/store/cart", element: <Suspense fallback={<Loader />}><StoreCart /></Suspense>
      },
      {
        path: '/auth', element: <Suspense fallback={<Loader />}><Auth /></Suspense>,
      },
      {
        path: '*', element: <Suspense fallback={<Loader />}><NoMatch /></Suspense>,
      },
      {
        path: 'auth/user',
        element: (<Suspense fallback={<Loader />}><ProtectedRoute component={User} /></ Suspense>),
      },
      {
        path: '/form',
        element: (<Suspense fallback={<Loader />}><Form /></ Suspense>),
      },
      {
        path: '/quiz',
        element: (<Suspense fallback={<Loader />}><Quiz /></ Suspense>),
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