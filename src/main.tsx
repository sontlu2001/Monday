import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import store, { persistor } from "./redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "@asgardeo/auth-react";
import { authConfig } from "./configs/auth.config.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AuthProvider config={authConfig}>
					<App />
				</AuthProvider>
			</PersistGate>
		</Provider>
	</StrictMode>
);
