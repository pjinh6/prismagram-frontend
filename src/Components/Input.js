import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getThemeVal } from '../Helper/util';

const Container = styled.input`
	border: 0;
	border: ${ getThemeVal('boxBorder') };
	border-radius: ${ getThemeVal('borderRadius') };
	background-color: ${ getThemeVal('bgColor') };
	height: 35px;
	font-size: 12px;
	padding: 0px 15px;
`;

const Input = ({ placeholder }) => <Container placeholder={ placeholder } />;

Input.propTypes = {
	placeholder: PropTypes.string.isRequired,
}

export default Input;