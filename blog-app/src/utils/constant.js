const ROOT_URL = 'https://api.realworld.io/api/';

const articlesUrl = ROOT_URL + 'articles';
const tagsUrl = ROOT_URL + 'tags';
const signupURL = ROOT_URL + '/users';
const loginURL = ROOT_URL + '/users/login';
const userVerifyURL = ROOT_URL + '/user';

const localStorageKey = 'app_user';

export {
  ROOT_URL,
  articlesUrl,
  tagsUrl,
  signupURL,
  loginURL,
  userVerifyURL,
  localStorageKey,
};
