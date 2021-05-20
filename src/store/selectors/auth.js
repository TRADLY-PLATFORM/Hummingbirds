import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const currentUserId = (state) =>
  state.auth && state.auth.token ? state.auth.token.replace(/^"(.*)"$/, '$1') : '';
const userInfo = (state) => state.auth;

const selectUserId = createSelector([currentUserId], (currentUserId) => currentUserId);
const selectTenantData = createSelector(userInfo, (state) => fromJS(state.tenantData || {}));

export {
  selectUserId,
  selectTenantData,
};
