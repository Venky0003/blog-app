import React from 'react';
import { Link } from 'react-router-dom';
import validate from '../utils/validate';

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: {
      username: '',
      email: '',
      password: '',
    },
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors,name,value)
    this.setState({ [name]: value, errors });
  }
 

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { username, email, password, errors } = this.state;

    return (
      <div className="container height-90 text-center">
        <form className="signup login p-top-30 height-50">
          <h2>Create Account</h2>
          <Link to="/login">Have an account ?</Link>
          <input
            name="username"
            type="username"
            value={username}
            onChange={this.handleChange}
            className="login-inputs"
            placeholder="Enter Username"
          />
          <span>{errors.username}</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
            className="login-inputs"
            placeholder="Enter Email"
          />
          <span>{errors.email}</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            className="login-inputs"
            placeholder="Enter Password"
          />
          <span>{errors.password}</span>

          <input type='submit'className="btn-primary" value="Sign-Up" disabled={errors.username || errors.password || errors.email} />
        </form>
      </div>
    );
  }
}

export default Signup
