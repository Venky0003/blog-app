import React from 'react';
import { ROOT_URL, articlesUrl } from '../utils/constant';
import Loader from './Loader';
import Comments from './Comments';
import { withRouter, Link } from 'react-router-dom';

import EditArticles from './EditArticles';

class SinglePost extends React.Component {
  state = {
    article: null,
    author: null,
    error: '',
    comments: [],
    isEditMode: false,
  };

  updateComments = (comment) => {
    this.setState((prevState) => ({
      comments: [...prevState.comments, comment],
    }));
  };

  componentDidMount() {
    let slug = this.props.match.params.slug;
    fetch(articlesUrl + '/' + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          article: data.article,
          author: data.article.author,
          error: '',
        });
      })
      .catch((err) => {
        console.error('Error fetching article', err);
        this.setState({ error: 'Not able to fetch articles' });
      });
  }

  deleteArticle = () => {
    let slug = this.props.match.params.slug;
    fetch(articlesUrl + '/' + slug, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't delete article");
        }
        this.props.history.push(`/`);
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };

  followAuthor = () => {
    if (!this.props.user) {
      alert('You have to log in first');
      return; // Exit the function if the user is not logged in
    }
    if (!this.state.author) {
      console.error('Author is not defined');
      return;
    }
    fetch(`${ROOT_URL}/profiles/${this.state.author.username}/follow`, {
      method: this.state.author.following ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
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

  favoriteArticle = () => {
    if (!this.props.user) {
      alert('You have to log in first');
      return; // Exit the function if the user is not logged in
    }
    let slug = this.props.match.params.slug;
    fetch(articlesUrl + '/' + slug + '/favorite', {
      method: this.state.article.favorited ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Can't mark as favorite Article");
        }
        return res.json();
      })
      .then((article) => {
        console.log(article);
        this.setState({
          article: article.article,
          // console.log(article);
        });
        console.log(article);
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };

  render() {
    const { article, error, comments } = this.state;
    if (error) {
      return <p>{error}</p>;
    }

    if (!article) {
      return <Loader />;
    }

    const isAuthor =
      this.props.user && this.props.user.username === article.author.username;
    return (
      <>
        <article className="m-bottom-100">
          {!this.state.isEditMode && (
            <div className="bg width-full text-white padding-all flex">
              <div className="flex-75">
                <h2 className="text-capitalize fs-25 fw-600">
                  {article.title}
                </h2>
                <p className="fs-14 m-top-10">{article.author.username}</p>

                <button onClick={this.followAuthor}>
                  {this.state.author && this.state.author.following
                    ? 'Unfollow Author'
                    : 'Follow Author'}
                </button>
              </div>
              <div className={isAuthor ? '' : 'display-none'}>
                <button
                  className="m-right-5"
                  onClick={() => {
                    this.setState({ isEditMode: true }, () => {
                      this.props.history.push({
                        pathname: `/article/${article.slug}/edit-article`,
                        state: {
                          article: article,
                        },
                      });
                    });
                  }}
                >
                  <i className="mr-1 fa-solid fa-pen-to-square"></i>Edit Article
                </button>

                <button onClick={this.deleteArticle}>
                  <i className="mr-1 fa-solid fa-trash"></i>Delete Article
                </button>
              </div>
              <div>
                <button
                  className="btn m-left-10 m-top-5"
                  onClick={() => {
                    this.favoriteArticle(article.slug);
                  }}
                >
                  {article.favorited ? `❤️ ` : `💚 `}
                  <span>{article.favoritesCount}</span>
                </button>
              </div>
            </div>
          )}
          {!this.state.isEditMode && (
            <section className="container">
              <p className="m-top-15 fs-18 fw-600">{article.description}</p>
              <p className="m-top-25">{article.body}</p>

              <p className="m-top-30">
                {article.tagList.map((tag, index) => (
                  <span key={index} className="tag-list fs-16 m-right-15 ">
                    {tag}
                  </span>
                ))}
              </p>
            </section>
          )}
          {this.props.user === null ? (
            <footer className="container m-top-50 text-center">
              <div>
                <p className="fs-18">
                  <Link className="active" to="/login">
                    Sign in
                  </Link>{' '}
                  or
                  <Link className="active" to="/signup">
                    {' '}
                    Sign up
                  </Link>{' '}
                  to add comments on this article
                </p>
              </div>
            </footer>
          ) : (
            !this.state.isEditMode && (
              <div className="container">
                <Comments
                  updateComments={this.updateComments}
                  comments={comments}
                  user={this.props.user}
                />
              </div>
            )
          )}
          {isAuthor && this.state.isEditMode && (
            <EditArticles article={article} user={this.props.user} />
          )}
        </article>
      </>
    );
  }
}

export default withRouter(SinglePost);
