import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const productDetails = (state) => state.product;
const selectProductDetails = createSelector(productDetails, (state) =>
  fromJS(state.productDetails || {})
);
export { selectProductDetails };
