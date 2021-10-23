import React from 'react';
import { Route } from 'react-router';

export default (
  <Route>
    <Route path="/" />
    <Route path="/listings" />
    <Route path="/lc/:categoryName" />
    <Route path="/categories"/>
    <Route path="/l/:id" />
    <Route path="/store" />
     <Route path="/stores"/>
     <Route path="/a/:id" />
    <Route path="/all-categories" />
    <Route path="/profile" />
    <Route path="/group" />
    <Route path="/mygroup" />
    <Route path="/noproduct" />
    <Route path="/withproduct" />
    <Route path="/reviewpage" />
   </Route>
);
