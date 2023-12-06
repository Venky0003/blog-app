import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTag: null,
    };
  }
  handleTagClick = (event, tag) => {
    event.preventDefault();
    this.props.handleTagSelect(tag);
  };

  render() {
    return (
      <div className="tags m-top-30">
        <h2 className="fs-16 fw-600">Popular Tags</h2>
        {this.props.tagList
          .filter((tag, index, self) => self.indexOf(tag) === index)
          //   .slice(0, 10)
          .map((tag, i) => (
            <div style={{ display: 'inline-block', margin: '5px' }} key={i}>
              <a href="/" onClick={(event) => this.handleTagClick(event, tag)}>
                {tag}
              </a>
            </div>
          ))}
      </div>
    );
  }
}

export default Sidebar;
