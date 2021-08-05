import React from 'react';
import { Route } from 'react-router';

export default (
  <Route>
    <Route path="/sign-up" />
    <Route path="/sign-in" />
    <Route path="/logout" />
    <Route path="/listings" />

    <Route path="/" />
    <Route path="/l/:id" />
    <Route path="/store" />
    <Route path="/create-store" />
    <Route path="/a/:id" />
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
