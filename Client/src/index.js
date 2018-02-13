import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import { Router, Route, Switch } from 'react-router-dom';
import InputUrlWords from './containers/input_url_words';
import CountList from './containers/count_list';
import LoginPage from './containers/login';
import Register from './containers/register';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import { createBrowserHistory } from "history";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={history}>
      <div>
        <Alert stack={{limit: 1}} timeout={2000} />
        <Switch>
          <Route path="/Register" component={Register}/>
          <Route path='/countList' component={CountList} />
          <Route path='/InputUrlWords' component={InputUrlWords} />
          <Route path="/" component={LoginPage}/>
        </Switch>
      </div>
    </Router>
  </Provider>
  , document.querySelector('.container'));
