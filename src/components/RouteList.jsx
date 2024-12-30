import styled from "styled-components";
import RouteItem from "./RouteItem";

const RouteListContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
	background-color: #2a2e37;
	border-radius: 8px;
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

function RouteList({ routes }) {
	const totalClimbs = routes.length;

	return (
		<RouteListContainer>
			<Header>
				Climbs <Count>{totalClimbs.toLocaleString()}</Count>
			</Header>
			{routes.map((route) => (
				<RouteItem key={route.id} route={route} />
			))}
		</RouteListContainer>
	);
}

export default RouteList;
