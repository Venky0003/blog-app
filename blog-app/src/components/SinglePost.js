import React from 'react';
import { articlesUrl } from '../utils/constant';
import Loader from './Loader';
import { withRouter, Link } from 'react-router-dom';

class SinglePost extends React.Component {
  state = {
    article: null,
    error: '',
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
      .then((data) =>
        this.setState({
          article: data.article,

          error: '',
        })
      )
      .catch((err) => {
        console.error('Error fetching article', err);
        this.setState({ error: 'Not able to fetch articles' });
      });
  }

  render() {
    const { article, error } = this.state;
    if (error) {
      return <p>{error}</p>;
    }

    if (!article) {
      return <Loader />;
    }
    return (
      <>
        <article className="m-bottom-100">
          <div className="bg width-full text-white padding-all">
            <h2 className=" fs-25 fw-600">{article.title}</h2>
            <p className="fs-14 m-top-10">{article.author.username}</p>
          </div>
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
          {this.props.user === null ? (
            <footer className='container m-top-50 text-center'>
              <div>
                <p className='fs-18'>
                  <Link className='active' to="/login">Sign in</Link> or
                   <Link className='active' to="/signup"> Sign up</Link> to add comments on this
                  article
                </p>
              </div>
            </footer>
          ) : (
            ''
          )}
        </article>
      </>
    );
  }
}

export default withRouter(SinglePost);
