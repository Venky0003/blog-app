import React from 'react';
import Loader from './Loader';
import { withRouter } from 'react-router-dom';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { slug } = match.params;
    let articleUrl = `https://api.realworld.io/api/articles/${slug}`;

    fetch(articleUrl)
     
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) =>
        this.setState({ article: data.article, isLoading: false })
      )
      .catch((error) => {
        console.error('Error fetching article', error);
        this.setState({ isLoading: false });
      });
  }

  formatDate(isDate) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(isDate).toLocaleDateString(undefined, options);
  }
  render() {
    const { article, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <div className="height-100">
          <Loader />
        </div>
      );
    }

    if (error || !article) {
      return (
        <div className={!article ? 'none' : ''}>Something went wrong...</div>
      );
    }

    return (
      <div className="height-100">
        <div className='width-full bg padding'>
          <h2 className=" fs-22 fw-600 font-playfair text-white padding-30">{article.title}</h2>
          <h4 className="fs-18 line-ht font-playfair text-white">{article.author.username}</h4>
          <p className="fs-14 line-ht font-playfair text-white p-bottom-20">
            {this.formatDate(article.createdAt)}
          </p>
        </div>
        <div className='container'>
        <p className="m-top-30 fs-18 fw-600 font-playfair">{article.description}</p>
        <p className="m-top-20 fs-15 font-playfair">{article.body}</p>
        <p className="m-top-50 fs-14 font-playfair p-bottom-80">
          {article.tagList.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Article);

