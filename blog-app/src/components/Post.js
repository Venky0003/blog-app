import React from 'react';
import { Link } from 'react-router-dom';

function Post(props) {
  const { author, createdAt, description, title, slug, favoritesCount } = props; //add it to favoritesCount

  return (
    <article className="m-top-25">
      <div className="height-100">
        <Link className="text-black" to={`/article/${slug}`}>
          <div className="width-full padding">
            <div className="flex justify-between align-center">
              <div className="m-bottom-15">
                <div className="flex align-center">
                  <div className="m-right-5 m-top-10">
                    <img
                      src={author.image}
                      alt="author pic"
                      className="box-1"
                    />
                  </div>
                  <div>
                    <h4 className="fs-16 m-top-10 ">{author.username}</h4>
                    <time className="fs-14 p-bottom-20" dateTime="">
                      {createdAt}
                    </time>
                  </div>
                </div>
              </div>
              <p className="btn btn-secondary">
                <i class="fa-solid fa-heart m-right-5"></i>
                <span className="fs-14 fw-600">
                  {favoritesCount}
                </span>
              </p>
            </div>
            <h2 className=" fs-22 fw-600  padding-30 two-line-limit height">
              {title}
            </h2>
            <p className="text-gray fs-15 two-line-limit">{description}</p>
          </div>
        </Link>
        <Link className="links" to={`/article/${slug}`}>
          <p className="m-top-10 fs-15 m-bottom-15">ReadMore</p>
        </Link>
        <hr />
      </div>
    </article>
  );
}

export default Post;
