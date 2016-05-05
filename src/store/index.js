import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import fetch from '../middleware/fetch'

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  fetch
)(createStore);

export default createStoreWithMiddleware(()=> {
})

// export default ()=>createStoreWithMiddleware(()=> {
// })