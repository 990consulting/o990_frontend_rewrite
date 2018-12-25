import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import rootReducer from 'reducers';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
    key: 'root',
    storage: storage
};

const storeEnhancer =
  process.env.NODE_ENV === 'production'
    ? compose(
        applyMiddleware(sagaMiddleware)
    ) :
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    );

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    const store = createStore(persistedReducer, storeEnhancer);
    let persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);
    return { store, persistor };
}
