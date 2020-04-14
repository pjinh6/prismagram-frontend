import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';

import { FOLLOW, UNFOLLOW } from './FollowButtonQueries';
import FollowButtonPresenter from './FollowButtonPresenter';

const FollowButtonContainer = ({ id, isFollowing }) => {
	const [isFollowingInState, setIsFollowing] = useState(isFollowing);

	const [followMutation] = useMutation(FOLLOW, {
		variables: { id },
	});

	const [unfollowMutation] = useMutation(UNFOLLOW, {
		variables: { id },
	});

	const onClick = async evt => {
		try {
			if (isFollowingInState) {
				setIsFollowing(false);
				unfollowMutation();
			} else {
				setIsFollowing(true);
				followMutation()
			}
		} catch (err) {}
	};

	return (
		<FollowButtonPresenter
			onClick={ onClick }
			isFollowing={ isFollowingInState }
		/>
	);
};

FollowButtonContainer.propTypes = {
	id: PropTypes.string.isRequired,
	isFollowing: PropTypes.bool.isRequired,
};

export default FollowButtonContainer;