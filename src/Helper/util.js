export const getThemeVal = key => ({ theme }) => {
	if (!theme) return;
	return theme[key];
};