import React from 'react';
import {Router, Route, IndexRedirect} from 'react-router'
import {Provider} from 'react-redux'

import App from './App.jsx'
import Students from './Students'
import Student from './Student'
import Books from './Books'

const Root = (props) => {
  let {store, history} = props;

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" components={App}>
          <IndexRedirect to="rankings/users"/>
          <Route path='rankings/:category' components={Students}/>
          <Route path='books/:studentId' components={Books}/>
          <Route path='students/:studentId' components={Student}/>
          <Route path='students/:studentId/:bookId' components={Student}/>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root