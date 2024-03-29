import React from 'react';
import PropTypes from 'prop-types';
// Switch는 딱 하나의 라우트만 렌더링해준다.
import { Route, Switch, Redirect } from 'react-router-dom';

import Auth from '../Routes/Auth';
import Feed from '../Routes/Feed';
import Explore from '../Routes/Explore';
import Profile from '../Routes/Profile';
import Search from '../Routes/Search';
import Post from '../Routes/Post';

/**
 * Profile이 Explore보다 앞에 있으면 /explore로 가는 사람들은
 * 항상 profile을 받게 된다
 */
const LoggedInRoutes = () => (
	<Switch>
		<Route exact path="/" component={ Feed } />
		<Route exact path="/explore" component={ Explore } />
		<Route exact path="/search" component={ Search } />
		<Route exact path="/u/:username" component={ Profile } />
		<Route exact path="/p/:postId" component={ Post } />
		<Redirect from="*" to="/" />
	</Switch>
);

const LoggedOutRoutes = () => (
	<Switch>
		<Route exact path="/" component={ Auth } />
		<Redirect from="*" to="/" />
	</Switch>
);

const AppRouter = ({ isLoggedIn }) => (
	<Switch>
		{
			isLoggedIn
			? <LoggedInRoutes />
			: <LoggedOutRoutes />
		}
	</Switch>
);

AppRouter.propType = {
	isLoggedIn: PropTypes.bool.isRequired
}

export default AppRouter;