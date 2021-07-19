import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const storeDetails = (state) => state.store;

const selectStoreDetails = createSelector(storeDetails, (state) =>
  fromJS(state.storeDetails || {})
);

export { selectStoreDetails };
