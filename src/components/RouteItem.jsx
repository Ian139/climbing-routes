import styled from "styled-components";

const RouteItemContainer = styled.div`
	padding: 15px;
	border-radius: 4px;
	margin-bottom: 8px;
	background-color: rgba(255, 255, 255, 0.05);
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

const RouteInfo = styled.div`
	color: #fff;
`;

const RouteName = styled.div`
	font-size: 16px;
	font-weight: 500;
`;

const RouteAuthor = styled.div`
	color: #8b8f96;
	font-size: 14px;
`;

const RouteStats = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
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

	&::before {
		content: "👤";
	}
`;

function RouteItem({ route }) {
	const getGradeColor = (grade) => {
		switch (grade[0]) {
			case "V":
				return "#4CAF50";
			case "V0":
				return "#4CAF50";
			case "V1":
				return "#4CAF50";
			case "V3":
				return "#FFC107";
			case "V4":
				return "#FF9800";
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
