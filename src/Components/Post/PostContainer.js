import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PostPresenter from './PostPresenter';
import useInput from '../../Hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';
import { toast } from 'react-toastify';

const PostContainer = ({
	id,
	location,
	caption,
	user,
	files,
	likeCount,
	isLiked,
	comments,
	createdAt,
}) => {
	const [likeCountInState, setLikeCount] = useState(likeCount);
	const [isLikedInState, setIsLiked] = useState(isLiked);
	const [currentItem, setCurrentItem] = useState(0);
	const comment = useInput('');
	const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
		variables: { postId: id }
	});
	const [addComment] = useMutation(ADD_COMMENT, {
		variables: {
			postId: id,
			text: comment.value
		}
	});

	const slide = () => {
		const totalFiles = files.length;
		setTimeout(() => {
			if (currentItem === totalFiles - 1) {
				setCurrentItem(0);
			} else {
				setCurrentItem(currentItem + 1);
			}
		}, 3000);
	};
	useEffect(() => {
		slide();
	}, [currentItem]);

	const toggleLike = () => {
		setLikeCount(likeCountInState + (isLikedInState ? -1 : 1));
		setIsLiked(!isLikedInState);
		toggleLikeMutation();
	};

	return (
		<PostPresenter
			location={ location }
			caption={ caption }
			user={ user }
			files={ files }
			likeCount={ likeCountInState }
			isLiked={ isLikedInState }
			comments={ comments }
			createdAt={ createdAt }
			newComment={ comment }
			setLikeCount={ setLikeCount }
			setIsLiked={ setIsLiked }
			currentItem={ currentItem }
			toggleLike={ toggleLike }
		/>
	);
};

PostContainer.propTypes = {
	id: PropTypes.string.isRequired,
	location: PropTypes.string,
	caption: PropTypes.string.isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		avatar: PropTypes.string,
		username: PropTypes.string.isRequired,
	}).isRequired,
	files: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
	})).isRequired,
	likeCount: PropTypes.number.isRequired,
	isLiked: PropTypes.bool.isRequired,
	comments: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		user: PropTypes.shape({
			id: PropTypes.string.isRequired,
			username: PropTypes.string.isRequired,
		}).isRequired,
	})).isRequired,
	createdAt: PropTypes.string.isRequired,
};

export default PostContainer;