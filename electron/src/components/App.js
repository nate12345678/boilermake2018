import '../css//App.css';
import React from 'react';
import youfree from '../api/Youfree';
import Dashboard from './Dashboard';
import Header from './Header';
import IntervalManagement from './IntervalManagement';
import Authentication from './login/Authentication';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			token: null,
			userId: null,
			schedule: null
		}
	}


	createUserAndLogin = async (email, username, password) => {
		// Create user
		let user = null;
		try {
			const createUserReq = await youfree.post('/user', {
				email: email,
				username: username,
				password: password
			});

			user = createUserReq.data;
			console.log("Created new user");
		} catch (error) {
			if (error.response !== undefined) {
				console.log(error.response);
				// TODO: pop up with error message
				return;
			}

			console.log("An unknown error has occurred");
			// TODO: pop up with error message
			return;
		}

		// Login
		let token = null;
		try {
			const loginReq = await youfree.get('/login', {
				headers: {
					email: email,
					password: password
				}
			});

			user = loginReq.data;
			token = loginReq.headers.token;
			console.log("Logged in");
		} catch (error) {
			if (error.response !== undefined) {
				console.log(error.response);
				// TODO: pop up with error message
				// TODO: indicate user was created but couldn't log in
				return;
			}

			console.log("An unknown error has occurred");
			// TODO: pop up with error message
			// TODO: indicate user was created but couldn't log in
			return;
		}

		this.setState(() => {
			return {
				token: token,
				userId: user.id
			}
		});

		await this.getSchedule(user.id);
	}


	login = async (email, password) => {
		// Login
		let token = null;
		let user = null;
		try {
			const loginReq = await youfree.get('/login', {
				headers: {
					email: email,
					password: password
				}
			});

			user = loginReq.data;
			token = loginReq.headers.token;
			console.log("Logged in");
		} catch (error) {
			if (error.response !== undefined) {
				console.log(error.response);
				// TODO: pop up with error message
				// TODO: indicate user was created but couldn't log in
				return;
			}

			console.log("An unknown error has occurred");
			// TODO: pop up with error message
			// TODO: indicate user was created but couldn't log in
			return;
		}

		this.setState(() => {
			return {
				token: token,
				userId: user.id
			}
		});

		await this.getSchedule(user.id);
	}


	addInterval = async (dayOfWeek, startMin, endMin) => {
		let schedule = null;
		try {
			const addIntervalReq = await youfree.put('/schedule', {
				dayOfWeek: dayOfWeek,
				startMin: startMin,
				endMin: endMin
			}, {
				headers: {
					token: this.state.token
				}
			});

			console.log("Added interval");
			schedule = addIntervalReq.data;
		} catch (error) {
			if (error.response !== undefined) {
				console.log(error.response);
				// TODO: pop up with error message
				return;
			}

			console.log("An unknown error has occurred");
			// TODO: pop up with error message
			return;
		}

		this.setState(() => {
			return {
				schedule: schedule
			}
		});
		console.log(this.state.schedule);
	}


	getSchedule = async (userId) => {
		let schedule = null;
		try {
			const getScheduleReq = await youfree.get(`/schedule/${userId}`, {
				headers: {
					token: this.state.token
				}
			}); // TODO: add token header
			schedule = getScheduleReq.data;
			console.log("Got own schedule");
		} catch (error) {
			if (error.response !== undefined) {
				console.log(error.response);
				// TODO: pop up with error message
				return;
			}

			console.log("An unknown error has occurred");
			// TODO: pop up with error message
			return;
		}

		this.setState(() => {
			return {
				schedule: schedule
			}
		});
	}


	render() {
		let content = null;
		if (this.state.token == null) {
			content = <Authentication onLoginSubmit={this.login} onCreateUserSubmit={this.createUserAndLogin}/>;
		} else {
			content = (
				<div>
					<IntervalManagement onSubmit={this.addInterval} />
					<Dashboard schedule={this.state.schedule}/>
				</div>
			);
		}

		return (
			<div>
				<Header />
				<div id="content">
					{content}
				</div>
			</div>
		);
	}
}

export default App;