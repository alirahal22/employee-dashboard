import { combineReducers, Reducer } from "redux";

import { coreReducer } from "&features/core/core.slice";
import { loginReducer } from "&features/login/login.slice";
import { landingReducer } from "&features/landing/landing.slice";
import { accountReducer } from "&features/account/account.slice";
import { departmentsReducer } from "&features/departments/departments.slice";
import { branchesReducer } from "&features/branches/branches.slice";

/**
 * Combines reducers of all slices and router into one root reducer
 *
 * @param routerReducer router reducer for redux first history
 */
const createRootReducer = (routerReducer: Reducer) =>
  combineReducers({
    router: routerReducer,
    core: coreReducer,
    login: loginReducer,
    landing: landingReducer,
    account: accountReducer,

    departments: departmentsReducer,
    branches: branchesReducer,
  });
export default createRootReducer;
