export const getThemeVal = key => ({ theme }) => theme[key];
export const delay = (time, val) =>
	new Promise(resolve => setTimeout(() => resolve(val), time));