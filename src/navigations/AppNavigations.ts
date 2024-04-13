import { BuildingStorefrontIcon, ClockIcon, CursorArrowRaysIcon, HomeIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import Home from '../components/Home';
import TodosApp from '../components/Apps/TodoList/TodosApp';
import Stopwatch from '../components/Apps/Stopwatch/Stopwatch';
import ClickCounter from '../components/Apps/ClickCounter/ClickCounter';
import AppNavigationsModel from './AppNavigationsModel';
import Store from '../components/Apps/Store/Products';

// TODO: Add sub navigation
export const AppNavigations: AppNavigationsModel[] = [
	{ name: 'Home', route: '/', icon: HomeIcon, component: Home },
	{ name: 'TODOs', route: '/todos', icon: ListBulletIcon, component: TodosApp },
	{ name: 'Stopwatch', route: '/stopwatch', icon: ClockIcon, component: Stopwatch },
	{ name: 'Click Counter', route: '/click-counter', icon: CursorArrowRaysIcon, component: ClickCounter },
	{ name: 'Store', route: '/store', icon: BuildingStorefrontIcon, component: Store },
];
