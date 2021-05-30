import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

// const currentUserId = (state) =>
//   state.auth && state.auth.userData ? state.auth.userData.id.replace(/^"(.*)"$/, '$1') : '';
const userInfo = (state) => state.auth;
//createSelector([currentUserId], (currentUserId) => currentUserId);
const selectUserId = createSelector(userInfo, (state) => fromJS(state?.userData?.id || ''));
const selectTenantData = createSelector(userInfo, (state) => fromJS(state.tenantData || {}));
const selectUserData = createSelector(userInfo, (state) => fromJS(state.userData || {}));

export { selectUserId, selectTenantData, selectUserData };
