import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import UnauthorizedContent from '../UnauthorizedContent';
import { RootState } from '../../../../state/store';

const ProtectedRoute: React.FC = () => {
	const user = useSelector((state: RootState) => state.authenticate.user);

	if (!user?.token) {
		return <UnauthorizedContent />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
