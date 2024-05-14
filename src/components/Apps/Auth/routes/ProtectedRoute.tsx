import { useSelector } from 'react-redux';
import UnauthorizedContent from '../UnauthorizedContent';
import { RootState } from '../../../../state/store';
import React from 'react';

interface Props {
	component: React.FC;
}

const ProtectedRoute: React.FC<Props> = ({ component }) => {
	const user = useSelector((state: RootState) => state.authenticate.user);

	if (!user?.token) {
		return <UnauthorizedContent />;
	}

	return React.createElement(component);
};

export default ProtectedRoute;
