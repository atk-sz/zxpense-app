import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import openEventReducer from './slices/event';
import eventsReducer from './slices/events';

const rootReducer = combineReducers({
  user: userReducer,
  openEvent: openEventReducer,
  events: eventsReducer,
});

export default rootReducer;
