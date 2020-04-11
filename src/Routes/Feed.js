import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { go, takeAll } from 'fxjs/Strict';
import { map } from 'fxjs/Lazy';

import Loader from '../Components/Loader';
import Post from '../Components/Post';

const FEED_QUERY = gql`
{
	seeFeed {
		id
		location
		caption
		user {
			id
			avatar
			username
		}
		files {
			id
			url
		}
		likeCount
		isLiked
		comments {
			id
			text
			user {
				id
				username
			}
		}
		createdAt
	}
}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 50vh;
`;

export default () => {
	const { data, loading } = useQuery(FEED_QUERY);
	return (
		<Wrapper>
			{ loading && <Loader /> }
			{
				!loading
				&& !!data
				&& !!data.seeFeed
				&& go(
					data.seeFeed,
					map(post => (
						<Post
							key={ post.id }
							id={ post.id }
							user={ post.user }
							files={ post.files }
							likeCount={ post.likeCount }
							isLiked={ post.isLiked }
							comments={ post.comments }
							createdAt={ post.createdAt }
						/>
					)),
					takeAll
				)
			}
		</Wrapper>
	);
};