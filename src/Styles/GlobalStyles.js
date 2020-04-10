/**
 * styled-components의 최신 방식으로 만드는 global styles
 */
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { getThemeVal } from '../Helper/util';

export default createGlobalStyle`
	${ reset };
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
	* {
		box-sizing: border-box;
	}
	body {
		background-color: ${ getThemeVal('bgColor') };
		color: ${ getThemeVal('blackColor') };
		font-size: 14px;
		font-family: 'Open Sans', sans-serif;
	}
	a {
		color: ${ getThemeVal('blueColor') };
		text-decoration: none;
	}
	input: focus {
		outline: none;
	}
`;