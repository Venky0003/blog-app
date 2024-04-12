import React from 'react';
import { Link } from 'react-router-dom';
import FavArticles from './FavArticles';
import MyArticles from './MyArticles';
import { fetchArticles } from '../utils/fetch';
import { ROOT_URL, articlesUrl, localStorageKey } from '../utils/constant';

class Profile extends React.Component {
  state = {
    myarticles: null,
    myfavarticles: null,
    selectedTab: 'myFeed',
    error: null,
    limit: 10,
    offset: '',
    articlesCount: 0,
    activePage: 1,
    articlesPerPage: 10,
    userData: '',
    currentUsername: '',
    author: null,
  };

  componentDidMount() {
    if (this.state.userData) {
      const { username } = this.state.userData;
      this.fetchFollowStatus(username);
    }
    const { username } = this.props.match.params;
    this.fetchUserData(username);

    this.fetchMyArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUsername = prevProps.match.params.username;
    const currentUsername = this.props.match.params.username;

    if (
      prevState.selectedTab !== this.state.selectedTab ||
      prevState.activePage !== this.state.activePage
    ) {
      if (this.state.selectedTab === 'myFeed') {
        this.fetchMyArticles(currentUsername);
      } else {
        this.fetchMyFav(currentUsername);
      }
    }

    if (prevUsername !== currentUsername) {
      this.fetchUserData(currentUsername);
    }
  }

  fetchUserData = (username, callback) => {
    fetch(ROOT_URL + 'profiles/' + username)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // console.log('User details:', data);
        if (data && data.profile) {
          const currentUsername = data.profile.username;
          this.setState(
            {
              userData: data.profile,
              currentUsername,
              author: data.profile,
              error: null,
            },
            () => {
             
              if (this.state.selectedTab === 'myFeed') {
                this.fetchMyArticles(currentUsername);
              } else {
                this.fetchMyFav(currentUsername);
              }
            }
          );
        } else {
          this.setState({ error: 'User profile data not found' });
        }
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        this.setState({ error: 'Error fetching user details' });
      });
  };

  fetchMyArticles = (currentUsername) => {
    let { limit, offset } = this.state;
    offset = (this.state.activePage - 1) * limit;
    let storageKey = localStorage.getItem(localStorageKey);

    fetchArticles(
      offset,
      limit,
      null,
      currentUsername,
      storageKey,
      'author',
      articlesUrl
    )
      .then((data) => {
        if (data && data.articles) {
          this.setState({
            myarticles: data.articles,
            articlesCount: data.articlesCount,
            error: null,
          });
        } else {
          this.setState({
            error: 'No articles found for this user.',
            myarticles: [],
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        this.setState({ error: 'Failed to fetch articles.', myarticles: [] });
      });
  };

  fetchMyFav = (currentUsername) => {
    let { limit, offset } = this.state;
    offset = (this.state.activePage - 1) * limit;

    fetchArticles(
      offset,
      limit,
      null,
      currentUsername,
      null,
      'favorited',
      articlesUrl
    )
      .then((data) => {
        if (data && data.articles) {
          this.setState({
            myfavarticles: data.articles,
            articlesCount: data.articlesCount,
            error: null,
          });
        } else {
          this.setState({
            error: 'No articles found for this user.',
            myfavarticles: [],
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
        this.setState({
          error: 'Failed to fetch articles.',
          myfavarticles: [],
        });
      });
  };

  updateCurrentPageIndex = (index) => {
    this.setState({ activePage: index });
  };

  handleTabClick = (tabName) => {
    this.setState({ selectedTab: tabName });
  };

  tabContent = () => {
    const { selectedTab } = this.state;

    if (selectedTab === 'myFeed') {
      return (
        <MyArticles
          myarticles={this.state.myarticles}
          articlesCount={this.state.articlesCount}
          articlesPerPage={this.state.articlesPerPage}
          activePage={this.state.activePage}
          updateCurrentPageIndex={this.updateCurrentPageIndex}
        />
      );
    } else if (selectedTab === 'favoritedArticles') {
      return (
        <FavArticles
          myfavarticles={this.state.myfavarticles}
          articlesCount={this.state.articlesCount}
          articlesPerPage={this.state.articlesPerPage}
          activePage={this.state.activePage}
          updateCurrentPageIndex={this.updateCurrentPageIndex}
        />
      );
    }
    return null;
  };

  followAuthor = () => {
    const { user } = this.props;
    const { author } = this.state;
    if (!user) {
      alert('You have to log in first');
      return;
    }

    if (!author) {
      console.error('Author is not defined');
      return;
    }
    fetch(`${ROOT_URL}/profiles/${author.username}/follow`, {
      method: author.following ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't follow author");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          author: data.profile,
        });
        console.log(data.profile);
      })
      .catch((error) => {
        this.setState({
          error: "Can't follow author. Please try again later.",
        });
      });
  };

  render() {
    const { userData, author } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div className="hero text-center">
          <img className="profile-img" src={userData.image} alt="user" />

          <h2>{userData.username}</h2>
          {user?.username === userData.username && (
            <Link to="/settings">
              <button>Edit Profile Settings</button>
            </Link>
          )}

          {this.props.user?.username !== userData.username && (
            <button onClick={this.followAuthor}>
              {author && author.following ? 'Unfollow Author' : 'Follow Author'}
            </button>
          )}
        </div>
        <div className="container">
          <div className="flex m-top-15 m-bottom-15">
            <h2
              className={`m-right-15 text-light ${
                this.state.selectedTab === 'myFeed' ? 'active-2' : ''
              }`}
              onClick={() => this.handleTabClick('myFeed')}
            >
              MyFeed
            </h2>
            <h2
              onClick={() => this.handleTabClick('favoritedArticles')}
              className={`text-light ${
                this.state.selectedTab === 'favoritedArticles' ? 'active-2' : ''
              }`}
            >
              Favorited Articles
            </h2>
          </div>
          {this.tabContent()}
        </div>
      </div>
    );
  }
}

export default Profile;
