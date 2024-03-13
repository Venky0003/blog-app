import React from 'react';
import { withRouter } from 'react-router-dom';
import { addArticleURL } from '../utils/constant';

class PostComments extends React.Component {
  state = {
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

    // if (this.props.user && this.props.user.token) {
    //   headers.Authorization = `Token ${this.props.user.token}`;
    // }

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

  render() {
    const { comments } = this.state;
    const { user } = this.props;
    return (
      <>
        <div>
          {comments && comments.length > 0 ? (
            // <ul>
            //   {comments.map((comment, i) => {
            //     return (
            //       <SingleComment
            //         handleDelete={this.handleDelete}
            //         user={this.props.user}
            //         key={i}
            //         comment={comment}
            //       />
            //     );
            //   })}
            // </ul>

            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <div>
                    <p className="blue text-base">{comment.body}</p>
                    <address className="text-xs capitalize">
                      {comment.author.username}
                    </address>
                    <span className="text-xs -mt-4">
                      {comment.createdAt.slice(0, 10)}
                    </span>
                  </div>
                  {user && user.username === comment.author.username ? (
                    <button
                      onClick={() => {
                        this.handleDelete(comment.id);
                      }}
                      className="text-red-500 m-left-15 text-xs hover:scale-125"
                    >
                      <i className="fa-solid fa-trash"></i>
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

export default withRouter(PostComments);
