import React from 'react';
import { Link } from 'react-router-dom';

function FeedNav(props) {
  return (
    <nav>
      <ul className="m-top-30 m-bottom-10 flex">
        {props.username && (
          <li
            className="fs-18 fw-600 m-right-15 text-black"
            onClick={props.handleYourFeedClick}
          >
            <Link
              className={
                props.activeTab === 'your-feed' ? 'active' : 'text-black'
              }
              to="/"
            >
              Your Feed
            </Link>
          </li>
        )}
        <li
          className="fs-18 fw-600 text-black"
          onClick={() => {
            props.removeTab();
          }}
        >
          <Link
            className={props.activeTab === '' ? 'active' : 'text-black'}
            to="/"
          >
            Global Feed
          </Link>
        </li>
        {props.activeTab && props.activeTab !== 'your-feed' && (
          <li className="m-left-15 fs-18 fw-600 text-black">
            <Link className={props.activeTab && 'active'} to="/">
              #{props.activeTab}
            </Link>
          </li>
        )}
      </ul>
      <hr />
    </nav>
  );
}

export default FeedNav;
