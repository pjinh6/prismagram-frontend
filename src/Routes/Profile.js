import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';

import Loader from '../Components/Loader';
import Avatar from '../Components/Avatar';

const GET_USER = gql`
	query seeUser($username: String!) {
		seeUser(username: $username) {
			id
			avatar
			username
			fullName
			isFollowing
			isSelf
			bio
			followersCount
			followingCount
			postsCount
			posts {
				id
				files {
					url
				}
				likeCount
				commentCount
			}
		}
	}
`;

const Wrapper = styled.div`
	min-height: 60vh;
`;

const Header = styled.header``;

const HeaderColumn = styled.div`

`;

export default withRouter(({ match: { params: { username }}}) => {
	const { data, loading } = useQuery(GET_USER, {
		variables: { username },
		// skip: true,
	});
	if (loading) return (
		<Wrapper>
			<Loader />
		</Wrapper>
	);
	const { seeUser } = data;
	const {
		avatar,
		fullName,
		isFollowing,
		isSelf,
		bio,
		followersCount,
		followingCount,
		postsCount,
		posts,
	} = seeUser;
	return (
		<Wrapper>
			<Header>
				<HeaderColumn>
					<Avatar size={ 'lg' } url={ avatar } />
				</HeaderColumn>
			</Header>
		</Wrapper>
	);
});