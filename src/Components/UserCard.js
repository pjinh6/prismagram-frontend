import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getThemeVal } from '../Helper/util';
import Avatar from './Avatar';
import FatText from './FatText';
import FollowButton from './FollowButton';
import { Link } from 'react-router-dom';

const Card = styled.div`
	${ getThemeVal('whiteBox') }
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
`;

const ExtAvatar = styled(Avatar)`
	margin-bottom: 15px;
`;

const ExtLink = styled(Link)`
	color: inherit;
	margin-bottom: 10px;
`;

const UserCard = ({
	id,
	username,
	isFollowing,
	url,
	isSelf,
}) => (
	<Card>
		<ExtAvatar url={ url } size={ 'md' }/>
		<ExtLink to={ `/u/${ username }` }>
			<FatText text={ username } />
		</ExtLink>
		{
			!isSelf
			&& <FollowButton id={ id } isFollowing={ isFollowing } />
		}
	</Card>
);

UserCard.propTypes = {
	id: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	isFollowing: PropTypes.bool.isRequired,
	url: PropTypes.string.isRequired,
	isSelf: PropTypes.bool.isRequired,
};

export default UserCard;