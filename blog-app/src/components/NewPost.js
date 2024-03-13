import React from 'react';
import { addArticleURL, localStorageKey } from '../utils/constant';
import { withRouter } from 'react-router';
import validateForm from '../utils/validateForm';

class NewPost extends React.Component {
  state = {
    title: '',
    description: '',
    body: '',
    tagList: '',
    errors: {
      title: '',
      description: '',
      body: '',
      tagList: '',
    },
  };
  handleChange = (event) => {
    let { name, value} = event.target;
    let errors = { ...this.state.errors };
    validateForm(errors, name, value);
    this.setState({ [name]: value, errors });
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
      .then(({ article }) => {
        console.log(article);
        this.setState({
          title: '',
          description: '',
          body: '',
          tagList: '',
        });
        this.props.history.push('/');
      })
      .catch((errors) => {
        this.setState({ errors });
        console.log('Error creating article:', errors);
      });
  };

  render() {
    const { title, description, body, tagList, errors } = this.state;
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
            <span className="error fs-14">{errors.title}</span>

            <input
              name="description"
              type="text"
              value={description}
              required
              onChange={this.handleChange}
              className="form-control-1 fs-15"
              placeholder="What's this article about"
            />
            <span className="error fs-14">{errors.description}</span>
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
            <span className="error fs-14">{errors.body}</span>
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
