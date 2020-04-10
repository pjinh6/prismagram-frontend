import React, { useState } from 'react';
import styled from 'styled-components';

import { getThemeVal } from '../Helper/util';

const Wrapper = styled.div`
	min-height: 80vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Box = styled.div`
	${ getThemeVal('whiteBox') };
`;

export default () => {

	const [action, setAction] = useState('logIn');

	return (
		<Wrapper>
			<Box>
				{ action === 'logIn' ? 'Log In' : 'Sign Up' }
			</Box>
		</Wrapper>
	);
}