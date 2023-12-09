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

    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="container ">
        <form className="form text-center">
          <h2>Signin</h2>
          <Link to="/signup">
            <p className="fs-15">Need an account ?</p>
          </Link>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={this.handleChange}
            value={email}
          />
          <span className="error fs-14">{errors.email}</span>
          <input
            name="password"
            type="password"
            required
            className="form-control"
            placeholder="Enter Password"
            onChange={this.handleChange}
            value={password}
          />
          <span className="error fs-14">{errors.password}</span>
          <input
            type="submit"
         
            disabled={errors.email || errors.password}
            value="Signin"
            className="m-top-15 fs-16 btn-primary"
        
          />
        </form>
      </div>
    );
  }
}

export default Login;
