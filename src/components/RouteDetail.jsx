import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
// import mockData from "../data/mockClimbs.json";
import StarRating from "./StarRating";
import { useRoutes } from "../context/RoutesContext";
import ClimbingBoardDisplay from "./ClimbingBoardDisplay";

const RouteDetailContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
	background-color: rgba(42, 46, 55, 0.98);
	border-radius: 10px;
	color: white;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40px;
`;

const BackButton = styled.button`
	background: none;
	border: none;
	color: #8b8f96;
	cursor: pointer;
	font-size: 18px;

	&:hover {
		color: white;
	}
`;

const RouteInfo = styled.div`
	text-align: center;
`;

const RouteName = styled.h1`
	margin: 0;
	font-size: 32px;
`;

const RouteAuthor = styled.div`
	color: #8b8f96;
	font-size: 18px;
	margin-top: 8px;
`;

const BoardSection = styled.div`
	width: 100%;
`;

const GradeAndAngle = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-top: 10px;
	color: #8b8f96;
	font-size: 18px;
`;

const RatingSection = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

function RouteDetail() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { routes, updateRouteRating } = useRoutes();
	const route = routes.find((r) => r.id === parseInt(id));

	const handleRate = (newRating) => {
		updateRouteRating(route.id, newRating);
	};

	if (!route) {
		return <div>Route not found</div>;
	}

	return (
		<RouteDetailContainer>
			<Header>
				<BackButton onClick={() => navigate(-1)}>← Back</BackButton>
				<RouteInfo>
					<RouteName>{route.name}</RouteName>
					<RouteAuthor>{route.author}</RouteAuthor>
					<GradeAndAngle>
						<span>{route.grade}</span>
						<span>•</span>
						<span>{route.angle}°</span>
					</GradeAndAngle>
					<RatingSection>
						<StarRating
							initialRating={route.rating}
							totalRatings={route.totalRatings}
							onRate={handleRate}
						/>
					</RatingSection>
				</RouteInfo>
				<div style={{ width: "60px" }} /> {/* Spacer for alignment */}
			</Header>

			<BoardSection>
				<ClimbingBoardDisplay />
			</BoardSection>
		</RouteDetailContainer>
	);
}

export default RouteDetail;
