import React from 'react';
import { Link } from 'react-router-dom';
import validate from '../utils/validate';
// import { articlesUrl } from '../utils/constant';
import { ROOT_URL } from '../utils/constant';
// const loginData = {
//   email: 'example@email.com',
//   password: 'yourpassword'
// }

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
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

  login = () => {
    //  e.preventDefault();
    // const { email, password } = this.state;

    // console.log(email);
    fetch(ROOT_URL + `/users/login`, {
      method: 'POST',
      hedaers: {
        'Content-Type': 'application/json',
        // Authorization:`Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        user: {
          email:this.state.email,
          password:this.state.password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      // window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error:', error); // Handle errors
      });
    window.location.href = '/';
  };

  render() {
    const { email, password, errors } = this.state;
    this.login();
    return (
      <div className="container ">
        {' '}
        <ul></ul>
        <form className="form text-center" onSubmit={this.login}>
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
