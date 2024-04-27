import React from 'react';
import Loader from './Loader';
import Posts from './Posts';
import Pagination from './Pagination';

class MyArticles extends React.Component {

  render() {
    const {
      myarticles,
      error,
      articlesCount,
      articlesPerPage,
      activePage,
      updateCurrentPageIndex,
    } = this.props;

    if (error) {
      console.error('Error:', error);
      return <p>{error}</p>;
    }

    if (!myarticles) {
      return <Loader />;
    }

    if (myarticles.length < 1) {
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
        <Posts articles={myarticles} />
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

export default MyArticles;
