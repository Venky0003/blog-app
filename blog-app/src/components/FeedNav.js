import React from 'react';
import { Link } from 'react-router-dom';

function FeedNav(props) {
  return (
    <nav>
      <ul className='m-top-30 m-bottom-10 flex'>
        <li className='fs-18 fw-600 text-black' onClick={props.removeTab}>
          <Link className={props.activeTab === '' ? 'active':'text-black'} to="/">
            Global Feed
          </Link>
        </li>
        {props.activeTab && (
          <li className='m-left-15 fs-18 fw-600 text-black'>
            <Link className={props.activeTab  && 'active'} to="/">
              #{props.activeTab}
            </Link>
          </li>
        )}
      </ul>
      <hr/>
    </nav>
    
  );
}

export default FeedNav;
