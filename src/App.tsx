import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import { useAppSelector } from "./hooks/useAppSelector";

import ProtectedPage from "./components/common/ProtectedPage";
import AppLayout from "./components/layout/AppLayout";
import { ROUTES } from "./constants/routes.constant";
import Login from "./pages/login/Login";
import { routes } from "./routers";
import { ConfigProvider } from "antd";
import { getThemeConfig } from "./configs/theme.configs";

const App = () => {
	const { theme } = useAppSelector((state) => state.theme);

	return (
		<>
			<ConfigProvider theme={getThemeConfig.custom(theme)}>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					pauseOnFocusLoss
					pauseOnHover
					theme={theme}
				/>
				<BrowserRouter>
					<Routes>
						<Route path={ROUTES.LOGIN} element={<Login />}></Route>
						<Route
							path="/"
							element={
								<ProtectedPage>
									<AppLayout />
								</ProtectedPage>
							}
						>
							{routes}
						</Route>
					</Routes>
				</BrowserRouter>
			</ConfigProvider>
		</>
	);
};

export default App;
