import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { toast } from 'react-toastify';
import { delay, goS, stop } from 'fxjs/Strict';
import {  } from 'fxjs/Lazy';

import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from './AuthQueries';

export default () => {
	const [action, setAction] = useState('logIn');
	const username = useInput('');
	const firstName = useInput('');
	const lastName = useInput('');
	const email = useInput('');
	const secret = useInput('');
	const [inProgress, setInProgress] = useState(false);
	
	const [requestSecretMutation] = useMutation(LOG_IN, {
		variables: { email: email.value },
	});

	const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
		variables: {
			username: username.value,
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
		},
	});

	const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
		variables: {
			email: email.value,
			secret: secret.value,
		},
	});

	const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

	const logIn = async () => await goS(
		email.value,
		a => !a ? (toast.error(`Email is required`), stop) : '',
		async _ => {
			try {
				const { data: { requestSecret } } = await requestSecretMutation();
				return requestSecret;
			} catch (err) {
				toast.error(`Can't request secret, try again`);
				return stop();
			}
		},
		async requestSecret => {
			if (!requestSecret) {
				toast.error(`You don't have an account yet, create one`);
				await delay(3000);
				return setAction('signUp');
			}
			toast.success(`Check your inbox for your login secret`);
			setAction('confirm');
		},
	);

	const signUp = async () => goS(
		'',
		_ => !username.value
			|| !firstName.value
			|| !lastName.value
			|| !email.value
			? (toast.error(`All field are required`), stop)
			: '',
		async _ => {
			try {
				const { data: { createAccount } } = await createAccountMutation();
				return createAccount;
			} catch (err) {
				toast.error(err.message);
				return stop();
			}
		},
		async createAccount => {
			if (!createAccount) return toast.error(`Can't create account`);
			toast.success(`Account created! Log in now`);
			await delay(3000);
			setAction('logIn');
		},
	);

	const confirm = async () => {
		try {
			if (!secret.value) return;
			const { data } = await confirmSecretMutation();
			const { confirmSecret: token } = data;
			if (!token) throw Error();
			localLogInMutation({
				variables: { token }
			});
		} catch (err) {
			toast.error(`Can't confirm secret, check again`);
		}
	};


	const onSubmit = async evt => {
		evt.preventDefault();
		if (inProgress) return;
		setInProgress(true);
		switch (action) {
		case 'logIn':
			await logIn();
			break; 
		case 'signUp':
			await signUp();
			break; 
		case 'confirm':
			await confirm();
			break; 
		default:
		}
		setInProgress(false);
	};

	return (
		<AuthPresenter
			setAction={ setAction }
			action={ action }
			username={ username }
			firstName={ firstName }
			lastName={ lastName }
			email={ email }
			secret={ secret }
			onSubmit={ onSubmit }
		/>
	);
}