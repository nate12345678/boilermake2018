import youfree from '../api/Youfree';
import {
	addFriendSuccess,
	createUserBegin,
	createUserSuccess,
	deleteFriendSuccess,
	fetchFriendSchedulesBegin,
	fetchFriendSchedulesSuccess,
	fetchMyScheduleBegin,
	fetchMyScheduleSuccess,
	getFriendsBegin,
	getFriendsSuccess,
	getPendingRequestsBegin,
	getPendingRequestsSuccess,
	loginBegin,
	loginSuccess,
	logoutBegin,
	logoutSuccess,
	searchUsersBegin,
	searchUsersSuccess,
	setError,
	setSelf,
	setThemeSuccess,
	setToken
} from './Actions';

const handleError = (dispatch, error) => {
	if (error.response !== undefined) {
		console.log(error.response);
		dispatch(setError(error.response.data));
		return;
	}

	console.log('An unknown error has occurred');
	dispatch(setError('An unknown error has occurred'));
};

export const initApp = () => async (dispatch) => {
	// Auto-login
	const token = localStorage.getItem('token');
	const self = JSON.parse(localStorage.getItem('self'));
	if (token && self) {
		dispatch(setToken(token));
		dispatch(setSelf(self));
	}

	// Load theme
	const theme = localStorage.getItem('theme');
	if (theme) {
		dispatch(setThemeSuccess(theme));
	}
};

export const setTheme = (theme) => async (dispatch, getState) => {
	const from = getState().theme;
	const to = theme;

	document.body.classList.replace(from, to);
	localStorage.setItem('theme', to);
	dispatch(setThemeSuccess(to));
};

export const createUser = (email, username, password, remember) => async (dispatch) => {
	dispatch(createUserBegin());

	try {
		const response = await youfree.createUser(email, username, password);
		const token = response.headers.token;
		const self = response.data;

		if (remember) {
			localStorage.setItem('token', token);
			localStorage.setItem('self', JSON.stringify(self));
		}

		dispatch(createUserSuccess(token, self));
	} catch (error) {
		handleError(dispatch, error);
	}
};

export const login = (email, password, remember) => async (dispatch) => {
	dispatch(loginBegin());

	try {
		const response = await youfree.login(email, password);
		const token = response.headers.token;
		const self = response.data;

		if (remember) {
			localStorage.setItem('token', token);
			localStorage.setItem('self', JSON.stringify(self));
		}

		dispatch(loginSuccess(token, self));
	} catch (error) {
		handleError(dispatch, error);
	}
};

export const logout = () => async (dispatch, getState) => {
	dispatch(logoutBegin());

	try {
		await youfree.logout(getState().token);
		localStorage.clear();

		dispatch(logoutSuccess());
	} catch (error) {
		handleError(dispatch, error);
	}
};

export const fetchMySchedule = () => async (dispatch, getState) => {
	dispatch(fetchMyScheduleBegin());

	try {
		const response = await youfree.getSchedule(getState().token, getState().self.id);
		dispatch(fetchMyScheduleSuccess(response.data));
	} catch (error) {
		handleError(dispatch, error);
	}
};

export const getFriendSchedules = () => async (dispatch, getState) => {
	dispatch(fetchFriendSchedulesBegin());

	try {
		const response = await youfree.getFriendSchedules(getState().token);
		dispatch(fetchFriendSchedulesSuccess(response.data));
	} catch (error) {
		console.log(error);
		handleError(dispatch, error);
	}
};

export const getFriends = () => async (dispatch, getState) => {
	console.log('begin');
	dispatch(getFriendsBegin());

	try {
		console.log('sending request...');
		const response = await youfree.getFriends(getState().token);
		console.log(response);
		dispatch(getFriendsSuccess(response.data));
		console.log('dispatched');
	} catch (error) {
		handleError(dispatch, error);
	}
};

export const addFriend = (user) => async (dispatch, getState) => {
	try {
		const response = await youfree.addFriend(getState().token, user.id);
		dispatch(addFriendSuccess(user));
	} catch (error) {
		handleError(dispatch, error);
	}
}

export const deleteFriend = (user) => async (dispatch, getState) => {
	try {
		const response = await youfree.deleteFriend(getState().token, user.id);
		dispatch(deleteFriendSuccess(user));
	} catch (error) {
		handleError(dispatch, error);
	}
}

export const getPendingRequests = () => async (dispatch, getState) => {
	dispatch(getPendingRequestsBegin());

	try {
		const response = await youfree.getPending(getState().token);
		dispatch(getPendingRequestsSuccess(response.data));
	} catch (error) {
		handleError(dispatch, error);
	}
};

export const searchUsers = (query) => async (dispatch, getState) => {
	dispatch(searchUsersBegin());

	try {
		const searchUsersResponse = await youfree.searchUsers(getState().token, query);
		const userRelationships = searchUsersResponse.data.map(result => ({
			...result.user,
			relationship: result.relationship
		}));
		dispatch(searchUsersSuccess(userRelationships));
	} catch (error) {
		handleError(dispatch, error);
	}
};
