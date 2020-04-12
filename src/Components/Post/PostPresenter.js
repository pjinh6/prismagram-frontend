import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import { go, range, map } from 'fxjs/Strict';

import { getThemeVal } from '../../Helper/util';
import FatText from '../FatText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Comment as CommentIcon } from '../Icons';

const Post = styled.div`
	${ getThemeVal('whiteBox') }
	width: 100%;
	max-width: 600px;
	margin-bottom: 25px;
	user-select: none;
`;

const Header = styled.header`
	padding: 15px;
	display: flex;
	align-items: center;
`;

const UserColumn = styled.div`
	margin-left: 10px;
`;

const Location = styled.span`
	display: block;
	margin-top: 5px;
	font-size: 12px;
`;

const Files = styled.div`
	position: relative;
	padding-bottom: 100%;
`;

const File = styled.div`
	max-width: 100%;
	width: 100%;
	height: 600px;
	position: absolute;
	top: 0;
	background-image: url(${ ({ src }) => src });
	background-size: cover;
	background-position: center;
	opacity: ${ ({ showing }) => (showing ? 1 : 0) };
	transition: opacity .5s linear;
`;

const Button = styled.span`
	cursor: pointer;
`;

const Meta = styled.div`
	padding: 15px;
`;

const Buttons = styled.div`
	${ Button } {
		&:first-child {
			margin-right: 10px;
		}
	}
	margin-bottom: 10px;
`;

const Timestamp = styled.span`
	font-weight: 400;
	text-transform: uppercase;
	opacity: .5;
	display: block;
	font-size: 12px;
	margin: 10px 0;
	padding-bottom: 10px;
	border-bottom: ${ getThemeVal('lightGreyColor') } 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
	border: none;
	width: 100%;
	resize: none;
	font-size: 14px;
	&:focus {
		outline: none;
	}
`;

const Comments = styled.ul`
	margin-top: 10px;
`;

const Comment = styled.li`
	margin-bottom: 7px;
	span {
		margin-right: 5px;
	}
`;

export default ({
	user: { username, avatar },
	location,
	files,
	isLiked,
	likeCount,
	createdAt,
	newComment,
	currentItem,
	toggleLike,
	onKeyPress,
	comments,
	selfComments,
}) => (
	<Post>
		<Header>
			<Avatar size="sm" url={ avatar } />
			<UserColumn>
				<FatText text={ username } />
				<Location>{ location }</Location>
			</UserColumn>
		</Header>
		<Files>
			{
				go(
					range(files.length || 0),
					map(idx => {
						const { id, url } = files[idx];
						return (<File key={ id } id={ id } src={ url } showing={ idx === currentItem }/>);
					})
				)
			}
		</Files>
		<Meta>
			<Buttons>
				<Button onClick={ toggleLike }>
					{ isLiked ? <HeartFull /> : <HeartEmpty /> }
				</Button>
				<Button>
					<CommentIcon />
				</Button>
			</Buttons>
			<FatText
				text={
					likeCount === 1
					? '1 like'
					: `${ likeCount } likes`
				}
			/>
			{
				comments && (<Comments>
					{
						map(comment => (
							<Comment key={comment.id}>
								<FatText text={ comment.user.username } />
								{ comment.text }
							</Comment>
						), comments)
					}
				</Comments>)
			}
			{
				selfComments && (<Comments>
					{
						map(comment => (
							<Comment key={comment.id}>
								<FatText text={ comment.user.username } />
								{ comment.text }
							</Comment>
						), selfComments)
					}
				</Comments>)
			}
			<Timestamp>{ createdAt }</Timestamp>
			<form>
				<Textarea
					placeholder="Add a comment..."
					value={ newComment.value }
					onChange={ newComment.onChange }
					onKeyPress={ onKeyPress }
				/>
			</form>
		</Meta>
	</Post>
);