import React from 'react';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import NoMatch from './NoMatch';
import SinglePsot from './SinglePost';
import FullPageSpinner from './FullPageSpinner';
import NewPost from './NewPost';
import Profile from './Profile';
import Settings from './Settings';
import { Switch, Route } from 'react-router-dom';
import { localStorageKey, userVerifyURL } from '../utils/constant';


class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };

  componentDidMount() {
    let storageKey = localStorage[localStorageKey];
    if (storageKey) {
      fetch(userVerifyURL, {
        method: 'GET',
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then((user) => this.updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  }

  updateUser = (user) => {
    this.setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem(localStorageKey, user.token);
  };

  render() {
    if (this.state.isVerifying) {
      return (
        <>
          <FullPageSpinner />;
        </>
      );
    }
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp />
        ) : (
          <UnauthenticatedApp updateUser={this.updateUser} />
        )}
      </>
    );
  }
}

function AuthenticatedApp() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/new-post">
          <NewPost />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/article/:slug" component={SinglePsot} />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
}

function UnauthenticatedApp(props) {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login updateUser={props.updateUser} />
        </Route>
        <Route path="/signup">
          <Signup updateUser={props.updateUser} />
        </Route>
        <Route path="/article/:slug" component={SinglePsot} />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
}
export default App;
