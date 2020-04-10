/**
 * styled-components의 최신 방식으로 만드는 global styles
 */
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { getThemeVal } from '../Helper/util';

export default createGlobalStyle`
	${ reset };
	* {
		box-sizing: border-box;
	}
	body {
		background-color: ${ getThemeVal('bgColor') };
		color: ${ getThemeVal('blackColor') };
	}
	a {
		color: ${ getThemeVal('blueColor') };
		text-decoration: none;
	}
`;