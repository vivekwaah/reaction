import { ClockIcon, CursorArrowRaysIcon, HomeIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import Home from '../components/Home';
import TodosApp from '../components/Apps/TodoList/TodosApp';
import Stopwatch from '../components/Apps/Stopwatch/Stopwatch';
import ClickCounter from '../components/Apps/ClickCounter/ClickCounter';

type NavigationItem = {
	name: string;
	route: string;
	icon: any;
	component: React.ComponentType<any>;
}

export const AppNavigations: NavigationItem[] = [
	{ name: 'Home', route: '/', icon: HomeIcon, component: Home },
	{ name: 'TODOs', route: '/todos', icon: ListBulletIcon, component: TodosApp },
	{ name: 'Stopwatch', route: '/stopwatch', icon: ClockIcon, component: Stopwatch },
	{ name: 'Click Counter', route: '/click-counter', icon: CursorArrowRaysIcon, component: ClickCounter },

];
