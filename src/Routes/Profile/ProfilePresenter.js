import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { map } from 'fxjs/Strict';

import Loader from '../../Components/Loader';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/FatText';
import FollowButton from '../../Components/FollowButton';
import SquarePost from '../../Components/SquarePost';
import Button from '../../Components/Button';

const Wrapper = styled.div`
	min-height: 100vh;
`;

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 80%;
	margin: 0 auto;
	margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
	display: flex;
	align-items: center;
`;

const Username = styled.span`
	font-size: 26px;
	display: block;
	margin-right: 10px;
`;

const Counts = styled.ul`
	display: flex;
	margin: 15px 0;
`;

const Count = styled.li`
	font-size: 16px;
	&:not(:last-child) {
		margin-right: 10px;
	}
`;

const FullName = styled(FatText)`
	font-size: 16px;
`;

const Bio = styled.p`
	margin: 10px 0;
`;

const Posts = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 300px);
	grid-template-rows: 300px;
	grid-auto-rows: 300px;
`;

export default ({ loading, data, logOut }) => {
	if (loading) return (
		<Wrapper>
			<Loader />
		</Wrapper>
	);
	if (!data || !data.seeUser) return 'Not Found User';
	const { seeUser } = data;
	const {
		id,
		avatar,
		username,
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
			<Helmet>
				<title>{ username } | Prismagram</title>
			</Helmet>
			<Header>
				<HeaderColumn>
					<Avatar size={ 'lg' } url={ avatar } />
				</HeaderColumn>
				<HeaderColumn>
					<UsernameRow>
						<Username>{ username }</Username>
						{
							isSelf
							? <Button onClick={ logOut } text={ 'Log Out' } />
							: <FollowButton id={ id } isFollowing={ isFollowing } />
						}
					</UsernameRow>
					<Counts>
						<Count>
							<FatText text={ `${postsCount}` } /> posts
						</Count>
						<Count>
							<FatText text={ `${followersCount}` } /> followers
						</Count>
						<Count>
							<FatText text={ `${followingCount}` } /> following
						</Count>
					</Counts>
					<FullName text={ fullName } />
					<Bio>{ bio }</Bio>
				</HeaderColumn>
			</Header>
			<Posts>
				{
					posts
					&& (
						map(post => {
							return <SquarePost
								key={ post.id }
								id={ post.id }
								likeCount={ post.likeCount }
								commentCount={ post.commentCount }
								file={ post.files[0].url }
							/>;
						}, posts)
					)
				}
			</Posts>
		</Wrapper>
	);
};