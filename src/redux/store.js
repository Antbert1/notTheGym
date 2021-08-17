import { createStore } from 'redux';
import rootReducer from './indexReducer';

const store = createStore(rootReducer);

export default store;
