import React from 'react';
import styled from 'styled-components';
import { go, takeAll } from 'fxjs/Strict';
import { map } from 'fxjs/Lazy';

import { getThemeVal } from '../../Helper/util';
import FatText from '../FatText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Comment } from '../Icons';

const Post = styled.div`
	${ getThemeVal('whiteBox') }
	width: 100%;
	max-width: 600px;
	margin-bottom: 25px;
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

const Files = styled.div``;

const File = styled.img`
	max-width: 100%;
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

export default ({
	user: { username, avatar },
	location,
	files,
	isLiked,
	likeCount,
	createdAt,
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
					files || [],
					map(({ id, url }) => (
						<File id={ id } src={ url }/>
					)),
					takeAll
				)
			}
		</Files>
		<Meta>
			<Buttons>
				<Button>
					{ isLiked ? <HeartFull /> : <HeartEmpty /> }
				</Button>
				<Button>
					<Comment />
				</Button>
			</Buttons>
			<FatText
				text={
					likeCount === 1
					? '1 like'
					: `${ likeCount } likes`
				}
			/>
			<Timestamp>{ createdAt }</Timestamp>
		</Meta>
	</Post>
);