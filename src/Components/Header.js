import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';

import { getThemeVal } from '../Helper/util';
import Input from './Input';
import useInput from '../Hooks/useInput';
import { Compass, HeartEmpty, User, Logo } from './Icons';
import { useQuery } from 'react-apollo-hooks';

const Header = styled.header`
	width: 100%;
	border: 0px;
	background-color: white;
	border-bottom: ${ getThemeVal('boxBorder') };
	border-radius: 0px;
	margin-bottom: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 25px 0px;
`;

const HeaderWrapper = styled.div`
	width: 100%;
	text-align: center;
	max-width: ${ getThemeVal('maxWidth') };
	display: flex;
`;

const HeaderColumn = styled.div`
	width: 33%;
	&:first-child {
		margin-right: auto;
		text-align: left;
	}
	&:last-child {
		margin-left: auto;
		text-align: right;
	}
`;

const SearchInput = styled(Input)`
	background-color: ${ getThemeVal('bgColor') };
	padding: 5px;
	height: auto;
	font-size: 14px;
	border-radius: 3px;
	text-align: center;
	width: 70%;
	&::placeholder {
		opacity: .8;
		font-weight: 200;
	}
`;

const HeaderLink = styled(Link)`
	&:not(:last-child) {
		margin-right: 30px;
	}
`;

const ME = gql`
	{
		me {
			username
		}
	}
`;

export default withRouter(({ history }) => {
	const search = useInput('');
	const meQuery = useQuery(ME);
	const onSearchSubmit = evt => {
		evt.preventDefault();
		history.push(`/search?term=${ search.value }`);
	};
	return (
		<Header>
			<HeaderWrapper>
				<HeaderColumn>
					<Link to="/">
						<Logo />
					</Link>
				</HeaderColumn>
				<HeaderColumn>
					<form onSubmit={ onSearchSubmit } >
						<SearchInput { ...search } placeholder="Search" type="text"/>
					</form>
				</HeaderColumn>
				<HeaderColumn>
					<HeaderLink to="/explore">
						<Compass />
					</HeaderLink>
					<HeaderLink to="/notifications">
						<HeartEmpty />
					</HeaderLink>
					<HeaderLink to="/username">
						<User />
					</HeaderLink>
				</HeaderColumn>
			</HeaderWrapper>
		</Header>
	);
});
