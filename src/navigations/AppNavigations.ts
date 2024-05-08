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
	{ name: 'Home', route: '/', icon: HomeIcon, component: Home },
	{ name: 'Counter', route: '/counter', icon: LifebuoyIcon, component: Counter },
	{ name: 'TODOs', route: '/todos', icon: ListBulletIcon, component: TodosApp },
	{ name: 'Stopwatch', route: '/stopwatch', icon: ClockIcon, component: Stopwatch },
	{ name: 'CPS', route: '/cps', icon: CursorArrowRaysIcon, component: ClickCounter },
	{ name: 'Store', route: '/store', icon: BuildingStorefrontIcon, component: Store },
	{ name: 'Auth', route: '/auth', icon: UserIcon, component: Auth },
];
