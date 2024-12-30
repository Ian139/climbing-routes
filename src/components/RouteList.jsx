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

const SearchContainer = styled.div`
	display: flex;
	gap: 10px;
	margin-bottom: 20px;
	margin-left: 4px;
	margin-right: 4px;
	padding: 0 12px;
`;

const SearchInput = styled.input`
	width: 70%;
	padding: 12px 16px;
	border: none;
	border-radius: 6px;
	font-size: 20px;
	background-color: rgba(255, 255, 255, 0.05);
	color: #fff;
	transition: all 0.2s ease;

	&::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	&:focus {
		outline: none;
	}

	&:hover {
		background-color: rgba(255, 255, 255, 0.08);
	}
`;

const SortSelect = styled.select`
	width: 30%;
	padding: 10px 16px;
	padding-right: 40px;
	font-size: 18px;
	font-weight: 400;
	border: none;
	border-radius: 6px;
	background-color: rgba(255, 255, 255, 0.05);
	color: #fff;
	cursor: pointer;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
	font-weight: 400;
	appearance: none;
	background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-width='2'/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: right 10px center;
	transition: all 0.2s ease;

	&:focus {
		outline: none;
	}

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

const RouteListContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding-top: 20px;
	padding-bottom: 0;
	padding-left: 0;
	border-radius: 10px;
	padding-right: 0;
	background-color: rgba(42, 46, 55, 0.98);
	position: relative;
	overflow: hidden;
	z-index: 1;
`;

const Header = styled.div`
	color: #fff;
	font-size: 36px;
	margin-bottom: 20px;
	margin-left: 12px;
	display: flex;
	align-items: baseline;
	gap: 12px;
	padding: 0 12px;
`;

const Count = styled.span`
	color: #fff;
	opacity: 0.5;
	font-size: 36px;
`;

const ShowMoreButton = styled.button`
	padding: 24px 0px;
	background-color: transparent;
	color: #8b8f96;
	border: none;
	cursor: pointer;
	width: 100%;
	font-weight: 500;
	font-size: 20px;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
	text-align: left;
	padding-left: 16px;
	transition: all 0.2s ease;

	&:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}
`;

const RouteList = ({ routes }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("most_climbed");
	const [visibleRoutes, setVisibleRoutes] = useState(10);
	const [isOpen, setIsOpen] = useState(false);

	const sortRoutes = (routes) => {
		switch (sortBy) {
			case "most_climbed":
				return [...routes].sort((a, b) => b.climbers - a.climbers);
			case "easiest":
				return [...routes].sort(
					(a, b) => parseInt(a.grade.slice(1)) - parseInt(b.grade.slice(1))
				);
			case "hardest":
				return [...routes].sort(
					(a, b) => parseInt(b.grade.slice(1)) - parseInt(a.grade.slice(1))
				);
			default:
				return routes;
		}
	};

	const filteredRoutes = routes.filter((route) =>
		route.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const sortedRoutes = sortRoutes(filteredRoutes);
	const displayedRoutes = sortedRoutes.slice(0, visibleRoutes);
	const hasMoreRoutes = visibleRoutes < sortedRoutes.length;

	const handleShowMore = () => {
		setVisibleRoutes((prev) => prev + 10);
	};

	return (
		<>
			<BackgroundOverlay />
			<RouteListContainer>
				<Header>
					Climbs <Count>{filteredRoutes.length}</Count>
				</Header>
				<SearchContainer>
					<SearchInput
						type="text"
						placeholder="Search routes..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<SortSelect
						value={sortBy}
						className={isOpen ? "open" : ""}
						onChange={(e) => setSortBy(e.target.value)}
						onFocus={() => setIsOpen(true)}
						onBlur={() => setIsOpen(false)}
					>
						<option value="most_climbed">Most Climbed</option>
						<option value="rating">Rating</option>
						<option value="easiest">Easiest</option>
						<option value="hardest">Hardest</option>
					</SortSelect>
				</SearchContainer>
				{displayedRoutes.map((route) => (
					<RouteItem key={route.id} route={route} />
				))}
				{hasMoreRoutes && (
					<ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>
				)}
			</RouteListContainer>
		</>
	);
};

export default RouteList;
