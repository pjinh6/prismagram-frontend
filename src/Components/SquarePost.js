import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


import { HeartFull, CommentFull } from './Icons';
import { Link } from 'react-router-dom';

const Overlay = styled.div`
	background-color: rgba(0, 0, 0, .6);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: opacity .5s linear;
	svg {
		fill: white;
	}
`;

const Container = styled.div`
	background-image: url(${ props => props.bg });
	background-size: cover;
	cursor: pointer;
	&:hover {
		${ Overlay } {
			opacity: 1;
		}
	}
`;

const Count = styled.div`
	color: white;
	display: flex;
	align-items: center;
	&:first-child {
		margin-right: 30px;
	}
`;

const CountText = styled.span`
	margin-left: 10px;
	font-size: 16px;
`;

const SquarePost = ({
	id,
	likeCount,
	commentCount,
	file
}) => (
	<Container bg={ file }>
		<Link to={ `/p/${ id }` }>
			<Overlay>
				<Count>
					<HeartFull />
					<CountText>{ likeCount }</CountText>
				</Count>
				<Count>
					<CommentFull />
					<CountText>{ commentCount }</CountText>
				</Count>
			</Overlay>
		</Link>
	</Container>
);

SquarePost.propTypes = {
	id: PropTypes.string.isRequired,
	likeCount: PropTypes.number.isRequired,
	commentCount: PropTypes.number.isRequired,
	file: PropTypes.string.isRequired,
};

export default SquarePost;