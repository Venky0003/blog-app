import React from 'react';

function Pagination(props) {
  const { articlesCount, articlesPerPage, activePage, updateCurrentPageIndex } =
    props;
  let numberOfPages = Math.ceil(articlesCount / articlesPerPage);
  let pagesArray = [];

  let startPage = Math.max(activePage - 1, 1);
  let endPage = Math.min(activePage + 9, numberOfPages);

  for (let i = startPage; i <= endPage; i++) {
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
          disabled={activePage === 1}
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
          disabled={activePage === numberOfPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Pagination;
