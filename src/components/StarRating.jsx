import React, { useState } from "react";
import styled from "styled-components";

const StarContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const Star = styled.button`
	background: none;
	border: none;
	font-size: 24px;
	color: ${(props) => (props.filled ? "#FFD700" : "#8b8f96")};
	cursor: pointer;
	transition: color 0.2s;
	padding: 0;
	line-height: 1;

	&:hover {
		color: #ffd700;
	}
`;

const RatingCount = styled.span`
	color: #8b8f96;
	font-size: 16px;
	margin-left: 8px;
`;

function StarRating({ initialRating = 0, totalRatings = 0, onRate }) {
	const [userRating, setUserRating] = useState(0);
	const [hover, setHover] = useState(0);

	const handleClick = (value) => {
		setUserRating(value);
		if (onRate) onRate(value);
	};

	const displayRating = userRating || initialRating;

	return (
		<StarContainer>
			{[1, 2, 3, 4, 5].map((star) => (
				<Star
					key={star}
					filled={star <= (hover || displayRating)}
					onClick={() => handleClick(star)}
					onMouseEnter={() => setHover(star)}
					onMouseLeave={() => setHover(0)}
				>
					★
				</Star>
			))}
			<RatingCount>
				({totalRatings}) {totalRatings > 0 && `${initialRating.toFixed(1)}`}
			</RatingCount>
		</StarContainer>
	);
}

export default StarRating;
