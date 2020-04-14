import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from 'react-apollo-hooks';

import PostPresenter from './PostPresenter';
import useInput from '../../Hooks/useInput';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';
import { ME } from '../../SharedQueries';
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
	const [selfComments, setSelfComments] = useState([]);
	const comment = useInput('');
	const { data: meQuery } = useQuery(ME);
	const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
		variables: { postId: id }
	});
	const [addCommentMutation] = useMutation(ADD_COMMENT, {
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
		return () => {

		};
	}, [currentItem]);

	const toggleLike = () => {
		setLikeCount(likeCountInState + (isLikedInState ? -1 : 1));
		setIsLiked(!isLikedInState);
		toggleLikeMutation();
	};

	const onKeyPress = async evt => {
		const { which } = evt;
		if (which === 13) {
			evt.preventDefault();
			try {
				const { data: { addComment }} = await addCommentMutation();
				setSelfComments([...selfComments, addComment]);
				comment.setValue('');
			} catch (err) {
				toast.error(`Can't send comment`);
			}
			
		}
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
			selfComments={ selfComments }
			createdAt={ createdAt }
			newComment={ comment }
			setLikeCount={ setLikeCount }
			setIsLiked={ setIsLiked }
			currentItem={ currentItem }
			toggleLike={ toggleLike }
			onKeyPress={ onKeyPress }
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