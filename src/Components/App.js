import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router } from 'react-router-dom';

import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import { getThemeVal } from '../Helper/util';
import Routes from './Routes';
import Footer from './Footer';
import Header from './Header';

const QUERY = gql`
	{
		isLoggedIn @client
	}
`;

const Wrapper = styled.div`
	margin: 0 auto;
	max-width: ${ getThemeVal('maxWidth') };
	width: 100%;
`;

export default () => {
	const { 
		data: { isLoggedIn }
	} = useQuery(QUERY);
	return (
		<ThemeProvider theme={ Theme }>
			<>
				<GlobalStyles />
				<Router>
					<>
						{ isLoggedIn && <Header /> }
						<Wrapper>
							<Routes isLoggedIn={ isLoggedIn } />
							<Footer />
						</Wrapper>
					</>
				</Router>
				<ToastContainer position={ toast.POSITION.BOTTOM_LEFT } />
			</>
		</ThemeProvider>
	);
}