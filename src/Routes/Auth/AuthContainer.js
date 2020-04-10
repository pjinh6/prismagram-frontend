import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { toast } from 'react-toastify';

import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { LOG_IN, CREATE_ACCOUNT } from './AuthQueries';
import { delay } from '../../Helper/util';

export default () => {
	const [action, setAction] = useState('logIn');
	const username = useInput('');
	const firstName = useInput('');
	const lastName = useInput('');
	const email = useInput('');
	
	const [requestSecret] = useMutation(LOG_IN, {
		variables: { email: email.value },
		update: async (_, { data }) => {
			const { requestSecret } = data;
			if (!requestSecret) {
				toast.error(`You don't have an account yet, create one`);
				await delay(3000);
				setAction('signUp');
			}
		},
	});

	const [createAccount] = useMutation(CREATE_ACCOUNT, {
		variables: {
			username: username.value,
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
		},
	});

	const logIn = () =>
		!email.value
		? toast.error(`Email is required`)
		: requestSecret();

	const signUp = () =>
		(
			!!username.value
			&& !!firstName.value
			&& !!lastName.value
			&& !!email.value
		)
		? createAccount()
		: toast.error(`All field are required`);


	const onSubmit = evt => {
		evt.preventDefault();
		if (action === 'logIn') {
			logIn();
		} else {
			signUp();
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
			onSubmit={ onSubmit }
		/>
	);
}