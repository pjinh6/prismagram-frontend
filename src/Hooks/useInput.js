import { useState } from 'react';

export default (defaultValue) => {
	const [value, setValue] = useState(defaultValue);
	const onChange = evt => {
		const { target: { value } } = evt;
		setValue(value);
	};
	return { value, onChange, setValue };
};