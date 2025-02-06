import React from "react";
import RouteList from "./RouteList";
import { useRoutes } from "../context/RoutesContext";

function BoardRoutes() {
	const { routes } = useRoutes();

	return <RouteList routes={routes} />;
}

export default BoardRoutes;
