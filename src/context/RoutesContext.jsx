import React, { createContext, useState, useContext } from "react";
import mockData from "../data/mockClimbs.json";

const RoutesContext = createContext();

export function RoutesProvider({ children }) {
	const [routes, setRoutes] = useState(mockData.routes);

	const updateRouteRating = (routeId, newRating) => {
		setRoutes((currentRoutes) =>
			currentRoutes.map((route) => {
				if (route.id === routeId) {
					return {
						...route,
						rating:
							(route.rating * route.totalRatings + newRating) /
							(route.totalRatings + 1),
						totalRatings: route.totalRatings + 1,
					};
				}
				return route;
			})
		);
	};

	return (
		<RoutesContext.Provider value={{ routes, updateRouteRating }}>
			{children}
		</RoutesContext.Provider>
	);
}

export function useRoutes() {
	return useContext(RoutesContext);
}
