import React from 'react';
import { Link } from 'react-router-dom';
import validate from '../utils/validate';
import { ROOT_URL } from '../utils/constant';

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
    people: [],
  };

  
  handleSubmit = (event) => {
    event.preventDefault();
   
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  signup = () => {
    const { username, email, password } = this.state;
    fetch(ROOT_URL + `/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
      .then((res) => res.json)
      .then(console.log)
      .catch((error) => {
        console.error('Error:', error); // Handle errors
      });
      window.location.href = '/';
  };

  render() {
    const { username, email, password, errors } = this.state;
    // this.signup();
    // console.log(username,email,password)
    return (
      <div className="container text-center">
        <form className="form" onSubmit={this.signup}>
          <h2 className="fs-18 fw-500">Create Account</h2>
          <Link to="/login">
            <p className="fs-14">Have an account ?</p>
          </Link>
          <input
            name="username"
            type="username"
            value={username}
            onChange={this.handleChange}
            className="form-control"
            placeholder="Enter Username"
          />
          <span className="error fs-14">{errors.username}</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
            className="form-control"
            placeholder="Enter Email"
          />
          <span className="error fs-14">{errors.email}</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            className="form-control"
            placeholder="Enter Password"
          />
          <span className="error fs-14">{errors.password}</span>

          <input
            type="submit"
            className="btn-primary  m-top-15"
            value="Sign-Up"
            disabled={errors.username || errors.password || errors.email}
          />
        </form>
      </div>
    );
  }
}

export default Signup;
