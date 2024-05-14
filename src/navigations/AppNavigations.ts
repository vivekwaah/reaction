import { BuildingStorefrontIcon, ClockIcon, CursorArrowRaysIcon, HomeIcon, LifebuoyIcon, ListBulletIcon, UserIcon } from '@heroicons/react/24/outline';
import Home from '../components/Home';
import TodosApp from '../components/Apps/TodoList/TodosApp';
import Stopwatch from '../components/Apps/Stopwatch/Stopwatch';
import ClickCounter from '../components/Apps/ClickPerSecond/ClickCounter';
import AppNavigationsModel from './AppNavigationsModel';
import Store from '../components/Apps/ProductStore/Products';
import Counter from '../components/Apps/Counter/Counter';
import Auth from '../components/Apps/Auth/Auth';

// TODO: Add sub navigation
export const AppNavigations: AppNavigationsModel[] = [
	{ id: 'Home', path: '/', icon: HomeIcon, element: Home },
	{ id: 'Counter', path: '/counter', icon: LifebuoyIcon, element: Counter },
	{ id: 'TODOs', path: '/todos', icon: ListBulletIcon, element: TodosApp },
	{ id: 'Stopwatch', path: '/stopwatch', icon: ClockIcon, element: Stopwatch },
	{ id: 'CPS', path: '/cps', icon: CursorArrowRaysIcon, element: ClickCounter },
	{ id: 'Store', path: '/store', icon: BuildingStorefrontIcon, element: Store },
	{ id: 'Auth', path: '/auth', icon: UserIcon, element: Auth },
];
