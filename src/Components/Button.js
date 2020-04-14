import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getThemeVal } from '../Helper/util';

const Container = styled.button`
	width: 100%;
	border: 0;
	border-radius: ${ getThemeVal('borderRadius') };
	color: white;
	font-weight: 600;
	background-color: ${ getThemeVal('blueColor') };
	text-align: center;
	padding: 7px 0px;
	font-size: 14px;
	cursor: pointer;
`;

const Button = ({ text, onClick }) => (
	<Container onClick={ onClick }>{ text }</Container>
);

Button.propTypes = {
	text: PropTypes.string.isRequired,
};

export default Button;