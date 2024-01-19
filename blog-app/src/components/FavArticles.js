import React from 'react';
import Loader from './Loader';
import Posts from './Posts';
import Pagination from './Pagination';

class FavArticles extends React.Component {
  render() {
    const {
      myfavarticles,
      error,
      articlesCount,
      articlesPerPage,
      activePage,
      updateCurrentPageIndex,
    } = this.props;

    if (error) {
      return <p>{error}</p>;
    }

    if (!myfavarticles) {
      return <Loader />;
    }

    if (myfavarticles.length < 1) {
      return (
        <>
          <div className="container">
            <p>No articles are here... yet.</p>
          </div>
        </>
      );
    }
    return (
      <div>
        <Posts articles={myfavarticles} />
        <Pagination
          articlesCount={articlesCount}
          articlesPerPage={articlesPerPage}
          activePage={activePage}
          updateCurrentPageIndex={updateCurrentPageIndex}
        />
      </div>
    );
  }
}

export default FavArticles;
