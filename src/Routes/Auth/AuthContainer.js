import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';

import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { LOG_IN } from './AuthQueries';

export default () => {
	const [action, setAction] = useState('logIn');
	const username = useInput('');
	const firstName = useInput('');
	const lastName = useInput('');
	const email = useInput('');
	
	const [requestSecret, { loading }] = useMutation(LOG_IN, {
		variables: { email: email.value }
	});

	const onLogin = evt => {
		evt.preventDefault();
		if (!email.value) return;
		requestSecret();
	};

	return (
		<AuthPresenter
			setAction={ setAction }
			action={ action }
			username={ username }
			firstName={ firstName }
			lastName={ lastName }
			email={ email }
			onLogin={ onLogin }
		/>
	);
}