import React from 'react';
import { ROOT_URL, localStorageKey } from '../utils/constant';
import { withRouter } from 'react-router-dom';

class Settings extends React.Component {
  state = {
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
    error: '',
  };

  componentDidMount() {
    let storageKey = localStorage[localStorageKey];
    fetch(ROOT_URL + 'user', {
      headers: {
        Authorization: `Token ${storageKey}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Failed to fetch user data' + res.status);
      })
      .then((userData) => {
        const { image, username, bio, email } = userData.user;
        this.setState({ image, username, bio, email });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let storageKey = localStorage[localStorageKey];
    fetch(ROOT_URL + 'user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${storageKey}`,
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          email: this.state.email,
          image: this.state.image,
          bio: this.state.bio,
          password: this.state.password,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(({ errors }) => {
          return Promise.reject(errors);
        });
      })
      .then((user) => {
        this.props.updateUser(user.user);
        console.log('User updated successfully:', user);
      })
      .catch((error) => {
        console.log('Error updating user:', error);
      });
  };

  logout = () => {
    localStorage.removeItem(localStorageKey);
    this.setState({ isLoggedIn: false });
    this.props.history.push('/login');
    window.location.reload(true);
  };
  render() {
    return (
      <>
        <div className="m-center text-center">
          <h2 className="m-top-50 fs-28 fw-600 text-center">Your Settings</h2>
          <form className="form-add-article" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="imageurl"
              className="form-control-1 width-55  m-center"
              onChange={this.handleChange}
              value={this.state.image}
            ></input>
            <input
              type="text"
              name="username"
              className="form-control-1 width-55"
              onChange={this.handleChange}
              value={this.state.username}
            ></input>
            <textarea
              type="text"
              name="bio"
              className="form-control-1 height-200 width-55"
              value={this.state.bio}
              onChange={this.handleChange}
              placeholder="Bio of you"
            ></textarea>
            <input
              type="email"
              name="email"
              className="form-control-1 width-55"
              onChange={this.handleChange}
              value={this.state.email}
            ></input>
            <input
              type="password"
              className="form-control-1 width-55"
              name="password"
              placeholder="New Password"
              value={this.state.password}
              onChange={this.handleChange}
            ></input>
            <input type="submit" value="Update" />
          </form>
          <button onClick={this.logout}>Logout</button>
        </div>
      </>
    );
  }
}

export default withRouter(Settings);
