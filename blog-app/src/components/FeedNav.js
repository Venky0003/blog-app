import React from 'react';
import { Link } from 'react-router-dom';

function FeedNav(props) {
  return (
    <nav>
      <ul>
        <li onClick={props.removeTab}>
          <Link className={props.activeTab === '' && 'active-1'} to="/">
            Global Feed
          </Link>
        </li>
        {props.activeTab && (
          <li >
            <Link className={props.activeTab  && 'active-1'} to="/">
              #{props.activeTab}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default FeedNav;
