import { useAuthContext } from "@asgardeo/auth-react";
import {
	Box,
	Button,
	Container,
	Divider,
	Toolbar,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgLogin from "../../assets/logo-login.png";
import logoIfsCapital from "../../assets/logo-ifs-capital.png";
import logo from "../../assets/logo.png";
import LoadingPage from "../../components/common/LoadingPage";

const Login = () => {
	const { state, signIn } = useAuthContext();

	const navigate = useNavigate();

	useEffect(() => {
		if (state.isAuthenticated) {
			setTimeout(() => navigate("/"), 500);
		}
	}, [navigate, state]);

	const onNavigateWSO2 = () => {
		signIn();
	};

	if (state.isAuthenticated) {
		return <LoadingPage />;
	}

	return (
		<>
			<Box>
				<Toolbar>
					<Box sx={{ width: "60px" }}>
						<img src={logo} />
					</Box>
					<Typography color="primary">IFS Capital Limited | Monday Portal</Typography>
				</Toolbar>
				<Divider />
				<Container
					sx={{
						display: "flex",
						flexDirection: {
							xs: "column",
							sm: "row",
							md: "row",
						},
						justifyContent: "center",
						alignItems: "center",
						minHeight: "90vh",
					}}
				>
					<img src={bgLogin} />
					<Box sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						ml: {
							xs: "0",
							sm: "10%",
							md: "10%",
						}
					}}>
						<img src={logoIfsCapital}/>
						<Button
							sx={{
								mt: 2,
								width: {
									xs: "100%",
									sm: "50%",
									md: "50%",
									lg: "50%",
								},
							}}
							color="primary"
							size="large"
							variant="contained"
							onClick={onNavigateWSO2}
						>
							Login
						</Button>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Login;
