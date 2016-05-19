import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import Root from './containers/Root'
import store from './store'
import {hashHistory} from 'react-router'
import './index.scss'

render(
  <Root store={store} history={hashHistory}/>,
  document.getElementById('root')
);
