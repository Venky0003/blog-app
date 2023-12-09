import React from 'react';

function Pagination(props) {
  const { articlesCount, articlesPerPage, activePage, updateCurrentPageIndex } =
    props;
  let numberOfPages = Math.ceil(articlesCount / articlesPerPage);
  let pagesArray = [];

  for (let i = 1; i <= numberOfPages; i++) {
    pagesArray.push(i);
  }

  return (
    <>
      <div className="m-top-50 m-bottom-100 text-center">
        <button
          className="m-right-10 btn btn-tertiary"
          onClick={() =>
            updateCurrentPageIndex(activePage - 1 < 1 ? 1 : activePage - 1)
          }
        >
          Prev
        </button>
        {pagesArray.map((page) => (
          <button
            key={page}
            onClick={() => updateCurrentPageIndex(page)}
            className={`btn fw-600 text-gray ${
              activePage === page ? 'active-1' : ''
            }`}
          >
            {page}
          </button>
        ))}
        <button
          className="m-left-10 btn btn-tertiary"
          onClick={() =>
            updateCurrentPageIndex(
              activePage + 1 > numberOfPages ? numberOfPages : activePage + 1
            )
          }
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Pagination;
