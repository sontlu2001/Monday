import Box from "@mui/material/Box";
import logo from "../../assets/logo.png";

const LoadingPage = () => {
	return (
		<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
			<img src={logo} alt="Logo" style={{ maxWidth: "100%", height: "auto" }} />
		</Box>
	);
};

export default LoadingPage;
