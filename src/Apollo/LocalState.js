export const defaults = {
	isLoggedIn: !!localStorage.getItem('token') || false,
};

export const resolvers = {
	Mutation: {
		logUserIn: (_, { token }, { cache }) => {
			localStorage.setItem('token', token);
			cache.writeData({
				data: {
					isLoggedIn: true,
				}
			});
			return;
		},
		logUserOut: () => {
			localStorage.removeItem('token');
			window.location = '/';
			return;
		},
	},
};