import React from 'react';

import Article from './Article';
import Tags from './Sidebar';
import Loader from './Loader';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      tagList: [],
      singleArticle: false,
      selectedTag: 'global',
      limit: 10,
      offset: 0,
      totalArticles: 0,
      currentPage: 1,
      signup: false,
    };
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    const { selectedTag, currentPage, limit } = this.state;
    const offset = (currentPage - 1) * limit;

    let articleUrl = `https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}${
      selectedTag !== 'global' ? `&tag=${selectedTag}` : ''
    }`;
    fetch(articleUrl)
      .then((res) => res.json())
      .then(({ articles, articlesCount }) => {
        const tagList = articles.map((article) => article.tagList).flat();

        // console.log(articles, articlesCount, 'articles');
        this.setState({ articles, tagList, totalArticles: articlesCount });
      });
  };

  handleState = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleTagSelect = (tag) => {
    this.setState({ selectedTag: tag, currentPage: 1 }, () =>
      this.fetchArticles()
    );
  };

  formatDate(isDate) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(isDate).toLocaleDateString(undefined, options);
  }
  handlePageChange = (pageNumber) => {
    const { limit } = this.state;
    const newOffset = (pageNumber - 1) * limit;
    this.setState({ currentPage: pageNumber, offset: newOffset }, () => {
      this.fetchArticles();
      console.log(`Page changed to ${pageNumber}`);
    });
  };
  renderPagination() {
    const { limit, totalArticles, currentPage } = this.state;
    console.log(totalArticles, 'count of articles');
    const totalPages = Math.ceil(totalArticles / limit);

    if (totalPages <= 1) {
      return null;
    }
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
    return (
      <div className="pagination">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => this.handlePageChange(pageNumber)}
            className={`btn ${pageNumber === currentPage ? 'active' : ''}`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  }

  render() {
    const { selectedTag, articles } = this.state;

    if (!articles) {
      return (
        <div className="m-top-50">
          <Loader />
        </div>
      );
    }
    const filteredArticles = articles.filter((article, index) => {
      return selectedTag === 'global' || article.tagList.includes(selectedTag);
    });

    return (
      <div>
        {!this.state.singleArticle ? (
          <div className="container p-bottom-80">
            <div className="flex justify-between">
              <div style={{ flex: '0 1 72%' }}>
                <div>
                  <ul className="flex">
                    <li className="m-top-30">
                      <a
                        className="text-black fs-16 fw-600"
                        href="/"
                        onClick={() => this.handleTagSelect('global')}
                      >
                        Global Feed
                      </a>
                    </li>
                    {selectedTag !== 'global' && (
                      <li className="m-top-30">
                        <i className="fa-solid fa-hashtag icon-hash"></i>
                        <a
                          className="text-black fs-16 fw-600"
                          href="/"
                          onClick={() => this.handleTagSelect(selectedTag)}
                        >
                          {selectedTag}
                        </a>
                      </li>
                    )}
                  </ul>
                  <hr />
                </div>
                {filteredArticles.map((article, index) => {
                  return (
                    <div key={article.id}>
                      {article && (
                        <div>
                          <div className="flex justify-between m-top-30">
                            <div className="">
                              <h2 className="fs-18 line-ht">
                                {article.author.username}
                              </h2>
                              <span className="fs-14 line-ht">
                                {this.formatDate(article.createdAt)}
                              </span>
                            </div>
                            <div className="flex justify-between align-center like-btn padding-10">
                              <div>
                                <i className="fa-regular fa-heart like "></i>
                              </div>
                              <div>
                                <span>likes</span>
                              </div>
                            </div>
                          </div>

                          <h1 className="fs-22 fw-600">{article.title}</h1>
                          <p
                            onClick={() =>
                              this.handleState('singleArticle', true)
                            }
                            className="text"
                          >
                            <Link to={`/article/${article.slug}`}>
                              Read More
                            </Link>
                          </p>
                          <hr />
                        </div>
                      )}
                    </div>
                  );
                })}
                <div>{this.renderPagination()}</div>
              </div>

              <div style={{ flex: '0 1 25%' }}>
                <Tags
                  tagList={this.state.tagList}
                  handleTagSelect={this.handleTagSelect}
                />
              </div>
            </div>
          </div>
        ) : (
          <Article
            formatDate={this.formatDate}
            handleState={this.handleState}
          />
        )}
      </div>
    );
  }
}

export default Home;
