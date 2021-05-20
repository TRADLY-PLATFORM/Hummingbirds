import React from 'react';
import ReactDOM from 'react-dom';
import {Map} from "immutable";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthReducer from './store/reducers/auth';
import HomeReducer from './store/reducers/home';
import ProductReducer from './store/reducers/product';
import StoreReducer from './store/reducers/store';
import GroupReducer from './store/reducers/group'
// import * as Sentry from "@sentry/browser";

// Sentry.init({
//     dsn: "http://3f99218da0aa4b1ab32e13029b3b8895@ec2-54-175-98-88.compute-1.amazonaws.com/1"
// });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth : AuthReducer,
    home : HomeReducer,
    product: ProductReducer,
    store : StoreReducer,
    group : GroupReducer
});

const store = createStore(rootReducer, Map(), composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render( app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
