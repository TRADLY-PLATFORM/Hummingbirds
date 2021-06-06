import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const productDetails = (state) => state.product;
const selectProductDetails = createSelector(productDetails, (state) =>
  fromJS(state.productDetails || {})
);
const selectCategoryLists = createSelector(productDetails, (state) =>
  fromJS(state.categoryLists || [])
);
const selectSupplierLists = createSelector(productDetails, (state) =>
  fromJS(state.supplierLists || [])
);
const selectListings = createSelector(productDetails, (state) => fromJS(state.listings || []));
export { selectProductDetails, selectCategoryLists, selectSupplierLists, selectListings };
