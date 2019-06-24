import * as React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import Redbox from 'redbox-react'

import App from '@modules/index'
import { history, store } from '@settings/redux'

declare var module: any

const root: any = document.querySelector('app')

render(
  <AppContainer errorReporter={Redbox}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </AppContainer>,
  root
)

if (module.hot) {
  module.hot.accept('./modules', () => {
    render(
      <AppContainer errorReporter={Redbox}>
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
      </AppContainer>,
      root
    )
  })
}
