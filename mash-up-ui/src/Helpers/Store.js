import { createStore, compose,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../Reducers/index';

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunkMiddleware
        )
    )
);