import React from 'react';
// import { Link } from 'react-router-dom';

function Post(props) {
  const { author, createdAt, title, description, body,tagList } = props; //add it to favouritesCount

 
  return (
    <article>
      <div className="height-100">
        <div className="width-full bg padding">
          <h2 className=" fs-22 fw-600 font-playfair text-white padding-30">
            {title}
          </h2>
          <h4 className="fs-18 line-ht font-playfair text-white">
            {author.username}
          </h4>
          <time className="fs-14 line-ht font-playfair text-white p-bottom-20" dateTime=''>
            
            {createdAt}
          </time>
        </div>
        <div className="container">
          <p className="m-top-30 fs-18 fw-600 font-playfair">
            {description}
          </p>
          <p className="m-top-20 fs-15 font-playfair">{body}</p>
          <p className="m-top-50 fs-14 font-playfair p-bottom-80">
            {tagList.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </p>
        </div>
      </div>
    </article>
  );
}


export default Post;