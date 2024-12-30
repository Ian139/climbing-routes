import styled from "styled-components";
import RouteItem from "./RouteItem";
import { useState } from "react";

const BackgroundOverlay = styled.div`
	position: fixed;
	top: -1px;
	left: -1px;
	width: 101vw;
	height: 101vh;
	background-image: url("/rb.png");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	z-index: -1;
	opacity: 0.25;
`;

const SearchInput = styled.input`
	width: 100%;
	padding: 10px;
	margin-bottom: 20px;
	border: 1px solid #ccc;
	border-radius: 4px;

	&:focus {
		outline: none;
		border-color: #007bff;
	}
`;

const RouteListContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
	background-color: rgba(42, 46, 55, 0.98);
	border-radius: 8px;
	position: relative;
	z-index: 1;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
	color: #fff;
	font-size: 24px;
	margin-bottom: 20px;
	display: flex;
	align-items: center;
	gap: 10px;
`;

const Count = styled.span`
	color: #8b8f96;
	font-size: 20px;
`;

const RouteList = ({ routes }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredRoutes = routes.filter((route) =>
		route.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalClimbs = filteredRoutes.length;

	return (
		<>
			<BackgroundOverlay />
			<RouteListContainer>
				<Header>
					Climbs <Count>{totalClimbs.toLocaleString()}</Count>
				</Header>
				<SearchInput
					type="text"
					placeholder="Search routes..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				{filteredRoutes.map((route) => (
					<RouteItem key={route.id} route={route} />
				))}
			</RouteListContainer>
		</>
	);
};

export default RouteList;
