import reducer from './reducer'

const redux = require('redux')
const createStore = redux.createStore

const store = createStore(reducer);
export default store;