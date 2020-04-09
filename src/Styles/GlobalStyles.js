/**
 * styled-components의 최신 방식으로 만드는 global styles
 */
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
	${ reset };
	* {
		box-sizing: border-box;
	}
`;