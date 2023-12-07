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
      <div>
        <button
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
            className={`btn ${activePage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
        <button
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
