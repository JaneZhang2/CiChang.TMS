import React from 'react';
import {Router, Route, IndexRoute, Redirect} from 'react-router'
import {Provider} from 'react-redux'

import App from './App.jsx'
import Layout from './Layout'
import Home from './Home'
import Students from './Students'
import Student from './Student'
import Books from './Books'

const Root = (props) => {
  let {store, history} = props;

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" components={App}>
          <Route components={Layout}>
            <IndexRoute components={Home}/>
            <Route path='students' components={Students}/>
          </Route>
        </Route>
        <Route path='books/:studentId' components={Books}/>
        <Route path='students/:studentId' components={Student}/>
        <Route path='students/:studentId/:bookId' components={Student}/>
      </Router>
    </Provider>
  );
};

export default Root