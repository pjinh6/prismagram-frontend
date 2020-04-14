import React from 'react';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';

import ProfilePresenter from './ProfilePresenter';

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

export default withRouter(({ match: { params: { username }}}) => {
	const { data, loading } = useQuery(GET_USER, {
		variables: { username },
		// skip: true,
	});
	return (
		<ProfilePresenter loading={ loading } data={ data } />
	);
});