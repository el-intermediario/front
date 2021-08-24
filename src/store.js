import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducers'
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const middleware = [thunk];

const persistConfig = { // configuration object for redux-persist
  key: 'root',
  storage, // define which storage to use,
  whitelist: ['user'] // Define persis objects.
}

const persistedReducer = persistReducer(
  persistConfig, 
  rootReducer
) // create a persisted reducer

const store = createStore(
  persistedReducer, // pass the persisted reducer instead of rootReducer to createStore,
  applyMiddleware(...middleware), // add any middlewares here
)

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export {store, persistor}