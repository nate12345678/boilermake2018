import '../../css/login/CreateUserForm.css';
import React from 'react';
import {Button, TextField} from '@material-ui/core';

class CreateUserForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			password: ''
		}
	}


	onFormSubmit = (event) => {
		event.preventDefault();
		let strippedEmail = this.state.email.replace(/\s+/g, '');
		let strippedUsername = this.state.username.replace(/\s+/g, '');

		this.props.onSubmit(strippedEmail, strippedUsername, this.state.password);
	}


	render() {
		return (
			<form id="createUserForm">
				<TextField className="createUserField" label="Email" type="email" onChange={(event) => this.setState({ email: event.target.value })} />
				<TextField className="createUserField" label="Username" type="text" onChange={(event) => this.setState({ username: event.target.value })} />
				<TextField className="createUserField" label="Password" type="password" onChange={(event) => this.setState({ password: event.target.value })} />
				<Button id="createUserSubmitButton" color="primary" onClick={this.onFormSubmit}>Submit</Button>
			</form>
		);
	}
}

export default CreateUserForm;
