import React from 'react';
import { Route } from 'react-router';

export default (
  <Route>
    <Route path="/sign-up" />
    <Route path="/sign-in" />
    <Route path="/logout" />
    <Route path="/listings" />

    <Route path="/" />
    <Route path="/product-details/:id/:name" />
    <Route path="/store" />
    <Route path="/create-store" />
    <Route path="/store-details/:id/:name" />
    <Route path="/all-categories" />
    <Route path="/profile" />
    <Route path="/group" />
    <Route path="/mygroup" />
    <Route path="/noproduct" />
    <Route path="/withproduct" />
    <Route path="/addproduct" />
    <Route path="/reviewpage" />
    <Route path="/detailorder" />
  </Route>
);
