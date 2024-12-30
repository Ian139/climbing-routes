import { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import RouteList from "./components/RouteList";
import mockData from "./data/mockClimbs.json";

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
	// const [routes, setRoutes] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [page, setPage] = useState(1);

	// const fetchRoutes = async () => {
	// 	setLoading(true);
	// 	try {
	// 		const response = await fetch(
	// 			`http://localhost:5000/api/boards/kilter/routes?page=${page}`
	// 		);
	// 		const data = await response.json();
	// 		setRoutes((prevRoutes) => [...prevRoutes, ...data]);
	// 	} catch (error) {
	// 		console.error("Error fetching routes:", error);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchRoutes();
	// }, [page]);

	// const handleLoadMore = () => {
	// 	setPage((prevPage) => prevPage + 1);
	// };

	return (
		<>
			<GlobalStyle />
			<RouteList routes={mockData.routes} />;
		</>
	);
}

export default App;
