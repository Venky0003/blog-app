import React from 'react';
import { Link } from 'react-router-dom';
import validate from '../utils/validate';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };

    validate(errors,name,value)
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="container height-90 text-center">
        <form className="login p-top-30">
          <h2>Enter Login Details</h2>
          <Link to="/signup">Need an account ?</Link>
          <input
            name="email"
            type="email"
            // required
            className="login-inputs"
            placeholder="Enter Email"
            onChange={this.handleChange}
            value={email}
          />
          <span className="error">{errors.email}</span>
          <input
            name="password"
            type="password"
            required
            // minlength="6"
            className="login-inputs"
            placeholder="Enter Password eg 123ghn"
            onChange={this.handleChange}
            value={password}
          />
          <span className="error">{errors.password}</span>
          <input
            type="submit"
            disabled={errors.email || errors.password}
            value="Login"
            className="btn-primary"
          />
        </form>
      </div>
    );
  }
}

export default Login;
