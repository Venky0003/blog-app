import React from 'react';
import { withRouter } from 'react-router';
import { addArticleURL } from '../utils/constant';

class Comments extends React.Component {
  state = {
    body: '',
    errors: '',
    comments: [],
  };

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = () => {
    let slug = this.props.match.params.slug;

    if (!slug || typeof slug !== 'string') {
      console.error('Invalid or missing slug:', slug);
      return;
    }
    let headers = {
      'Content-type': 'application/json',
    };

    if (this.props.user && this.props.user.token) {
      headers.Authorization = `Token ${this.props.user.token}`;
    }

    fetch(addArticleURL + '/' + slug + '/comments', {
      method: 'GET',
      headers: headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data.comments);
        const comments = data.comments;
        this.props.updateComments(comments);
        this.setState({ comments: data.comments, errors: '' });
      })
      .catch((errors) => {
        console.error('Error fetching comments:', errors);
        this.setState({ errors: 'Failed to fetch comments' });
      });
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { body } = this.state;
    let slug = this.props.match.params.slug;

    fetch(addArticleURL + '/' + slug + '/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body: body,
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
      .then(({ comment }) => {
        console.log(comment);
        const updatedComments = [...this.state.comments, comment];
        console.log(updatedComments);
        this.setState({
          body: '',
          errors: '',
          comments: updatedComments,
        });
      })
      .catch((errors) => {
        this.setState({ errors });
        console.error('Error adding comment:', errors);
      });
  };

  handleDelete = (commentId) => {
    let slug = this.props.match.params.slug;
    // let commentId = comment.id
    fetch(`${addArticleURL}/${slug}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          const updatedComments = this.state.comments.filter(
            (comment) => comment.id !== commentId
          );

          this.setState({ comments: updatedComments });
        } else {
          throw new Error('Failed to delete comment');
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  render() {
    const { body, comments } = this.state;
    const { user } = this.props;

    return (
      <>
        <div>
          <h4 className="m-top-30 fs-18 fw-600">Comments</h4>
          {user && user.token && (
            <fieldset className="m-bottom-10">
              <form onSubmit={this.handleSubmit}>
                <input
                  name="body"
                  type="text"
                  value={body}
                  onChange={this.handleChange}
                  placeholder="Add a comment"
                />
                <button type="submit">Add Comment</button>
              </form>
            </fieldset>
          )}
          {comments && comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="m-bottom-10">
                  <div>
                    <address className="fs-12">
                      {comment.author.username}
                    </address>

                    <p className="fs-14 ">{comment.body}</p>
                  </div>
                  {user && user.username === comment.author.username ? (
                    <button
                      onClick={() => {
                        this.handleDelete(comment.id);
                      }}
                      className="btn btn-danger"
                    >
                      <i className="fs-10 fa-solid fa-trash"></i>
                    </button>
                  ) : (
                    ''
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(Comments);
