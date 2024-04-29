import React from 'react';
import { articlesUrl } from '../utils/constant';
import { withRouter } from 'react-router';
import validateForm from '../utils/validateForm';

class EditArticles extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      body: '',
      tagList: [],
      errors: {
        title: '',
        description: '',
        body: '',
        tagList: '',
      },
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validateForm(errors, name, value);
    this.setState({ [name]: value });
  };
  handleTagsChange = (event) => {
    const { value } = event.target;
    const tagList = value.split(',').map((tag) => tag.trim());
    this.setState({ tagList });
  };
  checkInput = () => {
    let { title, description, tagList, body } = this.state;
    if (!title || !description || !tagList || !body) {
      this.setState({
        error: 'all fields are required*',
      });
    }
  };

  editArticle = () => {
    const { title, description, body, tagList } = this.state;

    let slug = this.props.match.params.slug;
    const { article } = this.props;
    if (!article) return;

    // console.log(articlesUrl);
    fetch(articlesUrl + '/' + slug, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tagList,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't edit article");
        }
        return res.json();
      })
      .then((article) => {
        // console.log('Article updated:', article);
        this.props.history.push(`/`);
      })
      .catch((errors) => {
        this.setState({ errors });
        console.error('Error fetching articles:', errors);
      });
  };
  componentDidMount() {
    const { article } = this.props;
    if (article) {
      let { title, description, body, tagList } = article;
      this.setState({
        title: title,
        description: description,
        body: body,
        tagList: tagList ? tagList.toString() : '',
      });
    }
  }
  render() {
    const { title, description, body, tagList, errors } = this.state;

    const { article } = this.props;
    if (!article) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <div>
          <div className="container text-center">
            <form
              className="form-add-article"
              onSubmit={(event) => {
                event.preventDefault();
                this.checkInput();
                this.editArticle();
              }}
            >
              <input
                name="title"
                type="text"
                className="form-control-1 fs-18"
                value={title}
                // required
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
                onChange={this.handleTagsChange}
                className="form-control-1 fs-15"
                placeholder="Enter Tags"
              />
              <input
                type="submit"
                className="pull-right add-btn"
                value="Update Artricle"
              />
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(EditArticles);
