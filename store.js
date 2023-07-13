import {createStore} from 'redux';
import cardReducer from './reducers/index';

const store = createStore(cardReducer);

export default store;
