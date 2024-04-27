export function fetchArticles(
  offset,
  limit,
  tag,
  username,
  storageKey,
  articleType,
  endPoint
) {
  let url = `${endPoint}/?offset=${offset}&limit=${limit}`;
  if (tag) {
    url += `&tag=${tag}`;
  }

  if (articleType === 'author' || articleType === 'favorited') {
    url += `&${articleType === 'author' ? 'author' : 'favorited'}=${username}`;
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  if (storageKey) {
    headers.authorization = `Token ${storageKey}`;
  }

  return fetch(url, {
    method: 'GET',
    headers,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Network response was not ok: ${res.status} ${res.statusText}`
        );
      }
      return res.json();
    })
    .catch((error) => {
      console.error('Error fetching articles:', error);
      throw new Error('Failed to fetch articles');
    });
}
