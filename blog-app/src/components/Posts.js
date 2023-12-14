import React from 'react';
import Loader from './Loader';

import Post from './Post';
function Posts(props) {
  const { articles, error } = props;
  if (error) {
    return <div>{error}.</div>;
  }

  if (!articles) {
    return (
      <div className="height-100">
        <Loader />
      </div>
    );
  }

  if (articles.length < 1) {
    return <h2>No Element found</h2>;
  }
  return articles.map((article) => <Post key={article.slug} {...article} />);
}

export default Posts;
