import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import openEventReducer from './slices/event';
import eventsReducer from './slices/events';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

// persistent config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // All reducers will be persisted by default
  // If you want to exclude any, use blacklist: ['reducerName']
  // whitelist: ['user', 'openEvent', 'events'], // Optional: explicitly whitelist
};

const rootReducer = combineReducers({
  user: userReducer,
  openEvent: openEventReducer,
  events: eventsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
