import { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import BoardRoutes from "./components/BoardRoutes";
import RouteDetail from "./components/RouteDetail";
import { RoutesProvider } from "./context/RoutesContext";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 20px;
    background-color: #1a1d23;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const currentUser = localStorage.getItem("currentUser");
		setIsAuthenticated(!!currentUser);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("currentUser");
		setIsAuthenticated(false);
	};

	if (!isAuthenticated) {
		return (
			<>
				<GlobalStyle />
				<AuthPage />
			</>
		);
	}

	return (
		<BrowserRouter>
			<RoutesProvider>
				<GlobalStyle />
				<button
					onClick={handleLogout}
					style={{
						position: "absolute",
						top: "20px",
						right: "20px",
						padding: "8px 16px",
						background: "rgba(255, 255, 255, 0.1)",
						border: "none",
						borderRadius: "4px",
						color: "white",
						cursor: "pointer",
					}}
				>
					Logout
				</button>
				<Routes>
					<Route path="/" element={<BoardRoutes />} />
					<Route path="/route/:id" element={<RouteDetail />} />
				</Routes>
			</RoutesProvider>
		</BrowserRouter>
	);
}

export default App;
