import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from '@settings/redux/reducers'
import { watcherSaga } from '@settings/redux/sagas'

declare var window: any

const sagaMiddleware = createSagaMiddleware()
const reduxDevTools =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : compose
const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware), reduxDevTools))

sagaMiddleware.run(watcherSaga)

const history = createBrowserHistory({})

export { store, history }
