import React from "react";
import styled from "styled-components";

const BoardContainer = styled.div`
	position: relative;
	aspect-ratio: 1;
	width: 100%;
	max-width: 700px;
	margin: 10px;
	padding: 40px;
	border-radius: 12px;
`;

const ImageOverlay = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const HoldsOverlay = styled(ImageOverlay)`
	opacity: 0.8;
`;

const FeetOverlay = styled(ImageOverlay)`
	opacity: 0.6;
`;

function ClimbingBoardDisplay() {
	return (
		<BoardContainer>
			<HoldsOverlay src="/holds.png" alt="Climbing Holds" />
			<FeetOverlay src="/feet.png" alt="Climbing Feet" />
		</BoardContainer>
	);
}

export default ClimbingBoardDisplay;
