import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { toast } from 'react-toastify';
import { delay } from 'fxjs/Strict';
import {} from 'fxjs/Lazy';

import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { LOG_IN, CREATE_ACCOUNT } from './AuthQueries';

export default () => {
	const [action, setAction] = useState('logIn');
	const username = useInput('');
	const firstName = useInput('');
	const lastName = useInput('');
	const email = useInput('');
	const secret = useInput('');
	
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

	const logIn = async () => {
		try {
			if (!email.value) {
				toast.error(`Email is required`);
			} else {
				const { data: { requestSecret } } = await requestSecretMutation();
				if (!requestSecret) {
					toast.error(`You don't have an account yet, create one`);
					await delay(3000);
					setAction('signUp');
				} else {
					toast.success(`Check your inbox for your login secret`);
					setAction('confirm');
				}
			}
		} catch (err) {
			toast.error(`Can't request secret, try again`);
		}
	};

	const signUp = async () => {
		try {
			if (
				!!username.value
				&& !!firstName.value
				&& !!lastName.value
				&& !!email.value
			) {
				const { data: { createAccount } } = await createAccountMutation();
				if (!createAccount) {
					toast.error(`Can't create account`);
				} else {
					toast.success(`Account created! Log in now`);
					await delay(3000);
					setAction('logIn');
				}
			} else {
				toast.error(`All field are required`);
			}
		} catch (err) {
			toast.error(err.message);
		}
	};


	const onSubmit = async evt => {
		evt.preventDefault();
		console.log(456)
		if (action === 'logIn') {
			await logIn();
		} else if (action === 'signUp') {
			await signUp();
		}
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