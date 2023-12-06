import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Article from './Article';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route
          path="/article/:slug"
          render={(props) => <Article {...props} />}
        ></Route>
        <Route>
          <Home path="/" exact />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
