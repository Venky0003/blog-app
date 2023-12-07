import React from 'react';
import Posts from './Posts';
import Pagination from './Pagination';
// import Loader from './Loader';

import Sidebar from './Sidebar';
import { articlesUrl } from '../utils/constant';
class Home extends React.Component {
  
  state = {
    articles: null,
 
    error: '',
    articlesCount: 0,
    articlesPerPage: 10,
    activePage: 1,
  };

  componentDidMount() {
   this.fetchData()
  }

  componentDidUpdate(_prevProps,prevState){
    // console.log({prevProps,prevState})
    if(prevState.activePage !== this.state.activePage){
      this.fetchData();
    }
  }

  fetchData = () => {
    let limit = this.state.articlesPerPage;
    let offset = (this.state.activePage - 1) * limit;
    fetch(articlesUrl + `/?offset=${offset}&limit=${limit}`)
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
    
    const { articles, error, articlesCount, articlesPerPage, activePage } =
      this.state;
    return (
      <main>
        <div>
          <section>
            <Posts articles={articles} error={error} />
            <Pagination
              articlesCount={articlesCount}
              articlesPerPage={articlesPerPage}
              activePage={activePage}
              updateCurrentPageIndex = {this.updateCurrentPageIndex}
            />
          </section>
          <Sidebar />
        </div>
      </main>
    );
  }
}

export default Home;
