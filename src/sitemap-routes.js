import React from 'react';
import { Route } from 'react-router';

export default (
  <Route>
    <Route path="/sign-up" />
    <Route path="/sign-in" />
    <Route path="/logout" />
    <Route path="/listings" />
    <Route path="/verification/:verifyID" />
    <Route path="/" />
    <Route path="/product-details/:id/:name" />
    <Route path="/store" />
    <Route path="/create-store" />
    <Route path="/store-details/:id/:name" />
    <Route path="/all-categories" />
    <Route path="/wishlist" />
    <Route path="/my-transaction" />
    <Route path="/profile" />
    <Route path="/cart" />
    <Route path="/editprofile" />
    <Route path="/group" />
    <Route path="/mygroup" />
    <Route path="/groupadded" />
    <Route path="/groupsuccess" />
    <Route path="/transactionsuccess" />
    <Route path="/myorder" />
    <Route path="/storesuccess" />
    <Route path="/productsuccess" />
    <Route path="/noproduct" />
    <Route path="/withproduct" />
    <Route path="/addproduct" />
    <Route path="/reviewpage" />
    <Route path="/detailorder" />
  </Route>
);
