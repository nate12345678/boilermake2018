import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        email: '',
        password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let user = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
    }

    this.props.submitAction(user);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{width:'200px'}}>
        <label>
          Username:
          <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <input type='text' name='email' value={this.state.email} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type='text' name='password' value = {this.state.password} onChange={this.handleChange} />
        </label>
        <br />
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default SignUp;