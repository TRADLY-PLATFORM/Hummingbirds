import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
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
import GroupReducer from './store/reducers/group';
import wishListReducer from './store/reducers/wishList';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { dsn } from './shared/constants';
import SearchReducer from './store/reducers/Search';
import PaymentReducer from './store/reducers/payment';
import CartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import * as Sentry from "@sentry/browser";

// Sentry.init({
//     dsn: "http://3f99218da0aa4b1ab32e13029b3b8895@ec2-54-175-98-88.compute-1.amazonaws.com/1"
// });
 Sentry.init({
  dsn: dsn,
  integrations: [new Integrations.BrowserTracing()],

  environment: 'production',
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options listed below
});

 const stripePromise = loadStripe(
   'pk_test_51HPL2tIRWtZLg0gEHG08IMqnNrLeZDRd8M9fSnqQ5Sqj3NIfghpC6pMthvLb6ccwg7h8SECQUDqxlCYU35lxHexJ00qhCHpODu'
 );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
  product: ProductReducer,
  store: StoreReducer,
  group: GroupReducer,
  wishList: wishListReducer,
  Search: SearchReducer,
  payment: PaymentReducer,
  cart: CartReducer,
  order: orderReducer
});

const store = createStore(
  rootReducer,
  Map(),
  composeEnhancers(applyMiddleware(thunk), sentryReduxEnhancer)
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
