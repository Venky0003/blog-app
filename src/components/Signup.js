import React from 'react';
import { Link } from 'react-router-dom';
import validate from '../utils/validate';
import { signupURL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

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

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    fetch(signupURL, {
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
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({ username: '', password: '', email: '' });
        this.props.history.push('/');
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { username, email, password, errors } = this.state;

    return (
      <div className="container text-center">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="fs-18 fw-500">Create Account</h2>
          <Link to="/login">
            <p className="fs-14">Have an account ?</p>
          </Link>
          <input
            name="username"
            type="text"
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

export default withRouter(Signup);
