import React from 'react';
import Posts from './Posts';
import Pagination from './Pagination';
import FeedNav from './FeedNav';
import Sidebar from './Sidebar';
import { articlesUrl } from '../utils/constant';
class Home extends React.Component {
  state = {
    articles: null,
    error: '',
    articlesCount: 0,
    articlesPerPage: 10,
    activePage: 1,
    activeTab: '',
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
    // console.log({prevProps,prevState})
    if (
      prevState.activePage !== this.state.activePage ||
      prevState.activeTab !== this.state.activeTab
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    let limit = this.state.articlesPerPage;
    let offset = (this.state.activePage - 1) * limit;
    let tag = this.state.activeTab;

    fetch(
      articlesUrl + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`)
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) =>
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
          error: '',
        })
      )
      .catch((err) => {
        console.error('Error fetching article', err);
        this.setState({ error: 'Not able to fetch articles' });
      });
  };

  updateCurrentPageIndex = (index) => {
    this.setState({ activePage: index });
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
          <div className='flex-70'>
            <FeedNav activeTab={activeTab} removeTab={this.removeTab} />
            <Posts articles={articles} error={error} />
            <Pagination
              articlesCount={articlesCount}
              articlesPerPage={articlesPerPage}
              activePage={activePage}
              updateCurrentPageIndex={this.updateCurrentPageIndex}
            />
          </div>
          <div className='flex-25'>
          <Sidebar addTab={this.addTab} />
          </div>
        </section>
      </main>
    );
  }
}

export default Home;
