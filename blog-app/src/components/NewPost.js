import React from 'react';
import { addArticleURL, localStorageKey } from '../utils/constant';
import { withRouter } from 'react-router';

class NewPost extends React.Component {
  state = {
    title: '',
    description: '',
    body: '',
    tagList: '',
    errors: '',
  };
  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    let authToken = localStorage[localStorageKey];
    fetch(addArticleURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tagList.split(',').map((tag) => tag.trim()),
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
      .then((response) => {
        if (response.article && response.article.slug) {
          this.props.history.push(`/article/${response.article.slug}`);
        } else {
          console.error('Error creating article: Slug not found');
        }
      })

      .catch((error) => {
        console.log('Error creating article:', error);
      });
  };

  render() {
    const { title, description, body, tagList } = this.state;
    return (
      <>
        <div className="container text-center">
          <form className="form-add-article" onSubmit={this.handleSubmit}>
            <input
              name="title"
              type="text"
              className="form-control-1 fs-18"
              value={title}
              required
              onChange={this.handleChange}
              placeholder="Article Title"
            />
            <input
              name="description"
              type="text"
              value={description}
              required
              onChange={this.handleChange}
              className="form-control-1 fs-15"
              placeholder="What's this article about"
            />
            <textarea
              name="body"
              rows="10"
              cols="30"
              type="text"
              value={body}
              required
              onChange={this.handleChange}
              className="form-control-1 height-30 fs-15"
              placeholder="Write about your article(in markdown)"
            ></textarea>
            <input
              name="tagList"
              type="text"
              value={tagList}
              onChange={this.handleChange}
              className="form-control-1 fs-15"
              placeholder="Enter Tags"
            />
            <input
              type="submit"
              className="pull-right add-btn"
              value="Publish Artricle"
            />
          </form>
        </div>
      </>
    );
  }
}
export default withRouter(NewPost);
