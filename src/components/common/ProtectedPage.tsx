import { useAuthContext } from "@asgardeo/auth-react";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes.constant";
import LoadingPage from "./LoadingPage";
interface ProtectedPageProps {
	children: React.ReactNode;
}

const ProtectedPage: FC<ProtectedPageProps> = ({ children }) => {
	const { state } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!state.isAuthenticated && !state.isLoading) {
			setTimeout(() => navigate(ROUTES.LOGIN), 300);
		}
	}, [navigate, state]);

	return (
		<>{state.isAuthenticated && !state.isLoading ? children : <LoadingPage />}</>
	);
};

export default ProtectedPage;
