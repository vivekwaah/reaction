import {
	BoltSlashIcon,
	BuildingStorefrontIcon,
	ClockIcon,
	CursorArrowRaysIcon,
	HomeIcon,
	LifebuoyIcon,
	ListBulletIcon,
	UserIcon
} from '@heroicons/react/24/outline';
import AppNavigationsModel from './AppNavigationsModel';

export const AppNavigations: AppNavigationsModel[] = [
	{ id: 'Home', path: '/', icon: HomeIcon },
	{ id: 'Counter', path: '/counter', icon: LifebuoyIcon },
	{ id: 'TODOs', path: '/todos', icon: ListBulletIcon },
	{ id: 'Stopwatch', path: '/stopwatch', icon: ClockIcon },
	{ id: 'CPS', path: '/cps', icon: CursorArrowRaysIcon },
	{ id: 'Store', path: '/store', icon: BuildingStorefrontIcon },
	{ id: 'Auth', path: '/auth', icon: UserIcon },
	{ id: 'Form', path: '/form', icon: BoltSlashIcon },
];

export const getIdByPath = (path: string) => {
	const navigation = AppNavigations.find(nav => nav.path === path);
	return navigation ? navigation.id : null;
};