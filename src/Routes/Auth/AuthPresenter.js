import React from 'react';
import styled from 'styled-components';

import { getThemeVal } from '../../Helper/util';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

const Wrapper = styled.div`
	min-height: 80vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Box = styled.div`
	${ getThemeVal('whiteBox') };
	border-radius: 0px;
	width: 100%;
	max-width: 350px;
`;

const StateChanger = styled(Box)`
	text-align: center;
	padding: 20px 0px;
`;

const Link = styled.span`
	color: ${ getThemeVal('blueColor') };
	cursor: pointer;
`;

const Form = styled(Box)`
	padding: 40px;
	padding-bottom: 30px;
	margin-bottom: 15px;
	form {
		width: 100%;
		input {
			width: 100%;
			&:not(last-child) {
				margin-bottom: 7px;
			}
		}
		button {
			margin-top: 10px;
		}
	}
`;

export default ({
	setAction,
	action,
	username,
	firstName,
	lastName,
	email,
	onLogin,
}) => (
	<Wrapper>
		<Form>
			{
				action === 'logIn'
				? (
					<form onSubmit={ onLogin } >
						<Input placeholder={ 'Email' } { ...email } type="email" />
						<Button text={ "Log In" }/>
					</form>
				)
				: (
					<form onSubmit={ onLogin } >
						<Input placeholder={ 'First name' } { ...firstName } />
						<Input placeholder={ 'Last name' } { ...lastName } />
						<Input placeholder={ 'Email' } { ...email } type="email" />
						<Input placeholder={ 'Username' } { ...username } />
						<Button text={ "Sign Up" }/>
					</form>
				)
			}
		</Form>
		<StateChanger>
			{ 
				action === 'logIn'
				? (
					<>
						Don't have an account?{ ' ' }
						<Link onClick={ () => setAction('signUp') }>Sign up</Link>
					</>
				)
				: (
					<>
						Have an account?{ ' ' }
						<Link onClick={ () => setAction('logIn') }>Log in</Link>
					</>
				) }
		</StateChanger>
	</Wrapper>
);