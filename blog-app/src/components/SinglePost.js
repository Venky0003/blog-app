import React from 'react';
import { Link } from 'react-router-dom';
import { articlesUrl } from '../utils/constant';
import Loader from './Loader';

class SinglePsot extends React.Component {
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
        <article className='container'>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
          <p className='fs-28 m-top-30'>{article.author.username}</p>
        </article>
      </>
    );
  }
}

export default SinglePsot;
