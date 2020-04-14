import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { map } from 'fxjs/Strict';

import FatText from '../../Components/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';
import SquarePost from '../../Components/SquarePost';

const Wrapper = styled.div`
	height: 50vh;
`;

const Section = styled.div`
	margin-bottom: 50px;
	display: grid;
	grid-gap: 25px;
	grid-template-columns: repeat(4, 160px);
	grid-template-rows: 160px;
	grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
	grid-template-columns: repeat(4, 200px);
	grid-template-rows: 200px;
	grid-auto-rows: 200px;
`;

const SearchPresenter = ({
	searchTerm,
	loading,
	data,
}) => {
	if (!searchTerm) {
		return (
			<Wrapper>
				<FatText text={ `Search for somthing` } />
			</Wrapper>
		);
	} else if (loading) {
		return (
			<Wrapper>
				<Loader />
			</Wrapper>
		);
	} else if (data && data.searchUser && data.searchPost) {
		return (
			<Wrapper>
				<Section>
					{
						data.searchUser.length === 0
						? (<FatText text={ 'No Users found' } />)
						: (
							map(user => {
								return <UserCard
									key={ user.id }
									id={ user.id }
									username={ user.username }
									isFollowing={ user.isFollowing }
									url={ user.avatar }
									isSelf={ user.isSelf }
								/>
							},data.searchUser)
						)
					}
				</Section>
				<PostSection>
					{
						data.searchPost.length === 0
						? (<FatText text={ 'No Posts found' } />)
						: (
							map(post => {
								return <SquarePost
									key={ post.id }
									id={ post.id }
									likeCount={ post.likeCount }
									commentCount={ post.commentCount }
									file={ post.files[0].url }
								/>;
							},data.searchPost)
						)
					}
				</PostSection>
			</Wrapper>
		);
	}
};

SearchPresenter.propTypes = {
	searchTerm: PropTypes.string,
	loading: PropTypes.bool,
};

export default SearchPresenter;