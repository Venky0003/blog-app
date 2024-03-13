import React from 'react';
import { articlesUrl } from '../utils/constant';
import { withRouter } from 'react-router-dom';

class EditArticles extends React.Component {
  state = {
    title: '',
    description: '',
    body: '',
    tagList: '',
    errors: '',
  };
  // }

  // componentDidMount() {
  //   const { article } = this.props;
  //   if (article) {
  //     let { title, description, body, tagList } = article;
  //     this.setState({
  //       title: title || '',
  //       description: description || '',
  //       tagList: tagList ? tagList.toString() : '',
  //       body: body || '',
  //     });
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.article !== this.props.article) {
      const { title, description, body, tagList } = this.props.article;
      this.setState({
        title: title || '',
        description: description || '',
        body: body || '',
        tagList: tagList ? tagList.toString() : '',
      });
    }
  }

  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    const { article } = this.props;
    if (!article) return;
    let slug = article.slug;
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
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((article) => {
        console.log(article);
        this.props.history.push(`/articles/${article.slug}`);
      })
      .catch((error) => {  
        console.error('Error fetching articles:', error);
        this.setState({ errors: 'Failed to fetch articles.', articles: [] });
      });
  };
  componentDidMount() {
    const { article } = this.props;
    if (article) {
      let { title, description, body, tagList } = article;
      this.setState({
        title: title || '',
        description: description || '',
        tagList: tagList ? tagList.toString() : '',
        body: body || '',
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
