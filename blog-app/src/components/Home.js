import React from 'react';
import Posts from './Posts';
import Pagination from './Pagination';
import FeedNav from './FeedNav';
import Sidebar from './Sidebar';
import { fetchArticles } from '../utils/fetch';
import { articlesUrl, localStorageKey } from '../utils/constant';
class Home extends React.Component {
  state = {
    articles: null,
    error: '',
    articlesCount: 0,
    articlesPerPage: 10,
    activePage: 1,
    activeTab: '',
    tag: '',
    limit:10,
    offset:'',
  };

  removeTab = () => {
    this.setState({ activeTab: '' });
  };

  addTab = (value) => {
    this.setState({ activeTab: value });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.activePage !== this.state.activePage ||
      prevState.activeTab !== this.state.activeTab
    ) {
      if (this.state.activeTab === 'your-feed') {
        this.fetchMyArticles();
      } else {
        this.fetchData();
      }
    }
  }

  fetchData = () => {
    let limit = this.state.articlesPerPage;
    let offset = (this.state.activePage - 1) * limit;
    let tag = this.state.activeTab;

    fetchArticles(offset, limit, tag, null, null, null, articlesUrl)
      .then((data) => {
        // console.log('Fetched articles:', data);
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
          error: '',
        });
      })
      .catch((err) => {
        console.error('Error fetching article', err);
        this.setState({ error: 'Not able to fetch articles' });
      });
  };

  fetchMyArticles = () => {
    let { limit, offset, activeTab } = this.state;
    offset = (this.state.activePage - 1) * limit;

    if (activeTab === 'your-feed') {
    
      let username = this.props.user.username;
      let storageKey = localStorage.getItem(localStorageKey);
      let tag = null;
   
      fetchArticles(
        offset,
        limit,
        tag,
        username,
        storageKey,
        'author',
        articlesUrl
      )
        .then((data) => {
          if (data) {
            this.setState({
              articles: data.articles,
              articlesCount: data.articlesCount,
            });
            // console.log('articles', this.state.articles);
          } else {
            this.setState({
              error: 'No articles found for this user.',
              articles: [],
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching articles:', error);
          this.setState({ error: 'Failed to fetch articles.', articles: [] });
        });
  
    }
  };
  updateCurrentPageIndex = (index) => {
    this.setState({ activePage: index });
  };

  handleYourFeedClick = () => {
    if (this.state.activeTab !== 'your-feed') {
      this.removeTab();
      this.addTab('your-feed');
    }
  };

  render() {
    const {
      articles,
      error,
      articlesCount,
      articlesPerPage,
      activePage,
      activeTab,
    } = this.state;
    return (
      <main>
        <section className="flex justify-between container">
          <div className="flex-70">
            <FeedNav
              activeTab={activeTab}
              removeTab={this.removeTab}
              addTab={this.addTab}
              addTab1={this.addTab1}
              handleYourFeedClick={this.handleYourFeedClick}
              username={this.props.user ? this.props.user.username : null}
            />
            <Posts articles={articles} error={error} />
            <Pagination
              articlesCount={articlesCount}
              articlesPerPage={articlesPerPage}
              activePage={activePage}
              updateCurrentPageIndex={this.updateCurrentPageIndex}
            />
          </div>
          <div className="flex-25">
            <Sidebar addTab={this.addTab} />
          </div>
        </section>
      </main>
    );
  }
}

export default Home;
