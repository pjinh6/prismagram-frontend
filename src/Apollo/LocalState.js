export const defaults = {
	isLoggedIn: !!localStorage.getItem('token') ? true : false,
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
		logUserOut: (_, __, { cache }) => {
			localStorage.removeItem('token');
			window.location.reload();
			return;
		},
	},
};