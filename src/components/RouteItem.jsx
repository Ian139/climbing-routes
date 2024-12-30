import styled from "styled-components";

const RouteItemContainer = styled.div`
	padding: 20px;
	border-radius: 6px;
	margin-bottom: 10px;
	background-color: rgba(255, 255, 255, 0.05);
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

const RouteInfo = styled.div`
	color: #fff;
`;

const RouteName = styled.div`
	font-size: 22px;
	font-weight: 500;
`;

const RouteAuthor = styled.div`
	color: #8b8f96;
	font-size: 20px;
`;

const RouteStats = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
	font-size: 20px;
`;

const Grade = styled.span`
	color: ${(props) => props.color};
	font-weight: 500;
`;

const Angle = styled.span`
	color: #8b8f96;
`;

const Climbers = styled.div`
	color: #8b8f96;
	display: flex;
	align-items: center;
	gap: 5px;
	min-width: 60px;

	&::before {
		content: "👤";
	}
`;

function RouteItem({ route }) {
	const getGradeColor = (grade) => {
		switch (grade) {
			case "V0":
				return "#00FF00"; // Lime
			case "V1":
				return "#33ff00";
			case "V2":
				return "#66ff00";
			case "V3":
				return "#99ff00";
			case "V4":
				return "#ccff00";
			case "V5":
				return "#FFFF00"; // Yellow
			case "V6":
				return "#FFCC00"; // Gold
			case "V7":
				return "#ff9900";
			case "V8":
				return "#ff6600";
			case "V9":
				return "#FF3300"; // Red-Orange
			case "V10":
				return "#FF0000"; // Red
			default:
				return "#fff";
		}
	};

	return (
		<RouteItemContainer>
			<RouteInfo>
				<RouteName>{route.name}</RouteName>
				<RouteAuthor>{route.author}</RouteAuthor>
			</RouteInfo>
			<RouteStats>
				<Grade color={getGradeColor(route.grade)}>{route.grade}</Grade>
				<Angle>{route.angle}°</Angle>
				<Climbers>{route.climbers.toLocaleString()}</Climbers>
			</RouteStats>
		</RouteItemContainer>
	);
}

export default RouteItem;
