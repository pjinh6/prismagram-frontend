import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const getSize = size => {
	let number;
	switch (size) {
	case 'md':
		number = 50;
		break;
	case 'lg':
		number = 150;
		break;
	default:
		number = 30;
	}
	return `
		width: ${ number }px;
		height: ${ number }px;
	`
}

const Container = styled.div`
	${ props => getSize(props.size) }
	background-image: url(${ props => props.url });
	background-size: cover;
	border-radius: 50%;
`;

const Avatar = ({ size = 'sm', url }) => (
	<Container size={ size } url={ url } />
);

Avatar.propTypes = {
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	url: PropTypes.string.isRequired,
};

export default Avatar;