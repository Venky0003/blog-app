import React from 'react';
import { tagsUrl } from '../utils/constant';
import Loader from './Loader';
class Sidebar extends React.Component {
  state = {
    tags: null,
    error: '',
  };

  componentDidMount() {
    fetch(tagsUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(({ tags }) => {
        this.setState({ tags, error: '' });
      })
      .catch((err) => {
        console.error('Error fetching article', err);
        this.setState({ error: 'Not able to fetch tags' });
      });
  }

  render() {
    const { tags, error } = this.state;
    if (error) {
      return <p>{error}.</p>;
    }

    if (!tags) {
      return (
        <div className="height-100">
          <Loader />
        </div>
      );
    }

    return (
      <>
        <div>
          <div className="tags m-top-30">
            <h2 className="fs-16 fw-600">Popular Tags</h2>

            {tags.map((tag) => {
              return (
                <span
                  style={{ display: 'inline-block', margin: '5px' }}
                  key={tag}
                  onClick={() => this.props.addTab(tag)}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Sidebar;
