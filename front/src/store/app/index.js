import { createAction, handleActions } from 'redux-actions';

import { createSelector } from 'reselect';

export const SET_CONTRACTS = '@APP/SET_CONTRACTS';
export const SET_ALARMS = '@APP/SET_ALARMS';
export const SET_INDICATORS = '@APP/SET_INDICATORS';
export const SET_FEED = '@APP/SET_FEED';
export const SET_IB = '@APP/SET_IB';

/*
 * INITIAL STATE
 **/
const initialState = {
  ib: {},
  contracts: [],
  alarms: [],
  feed: [],
  indicators: []
};

/*
 * REDUCERS
 **/
export default handleActions(
  {
    [SET_CONTRACTS]: (state, { payload }) => ({ ...state, contracts: payload }),
    [SET_ALARMS]: (state, { payload }) => ({ ...state, alarms: payload }),
    [SET_INDICATORS]: (state, { payload }) => ({ ...state, indicators: payload }),
    [SET_FEED]: (state, { payload }) => ({ ...state, feed: payload }),
    [SET_IB]: (state, { payload }) => ({ ...state, ib: payload })
  },
  initialState
);

/*
 * SELECTORS
 **/
export const appSelector = state => state.app;

export const contractsSelector = createSelector(appSelector, ({ contracts }) => contracts);
export const alarmsSelector = createSelector(appSelector, ({ alarms }) => alarms);
export const indicatorsSelector = createSelector(appSelector, ({ indicators }) => indicators);
export const ibSelector = createSelector(appSelector, ({ ib }) => ib);
export const feedSelector = createSelector(appSelector, ({ feed }) => feed);

/*
 * ACTIONS
 **/
export const setContracts = createAction(SET_CONTRACTS);
export const setAlarms = createAction(SET_ALARMS);
export const setIndicators = createAction(SET_INDICATORS);
export const setIb = createAction(SET_IB);
export const setFeed = createAction(SET_FEED);
