import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { applyMiddleware, compose, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// All redux reducers (rolled into one mega-reducer)
import rootReducer from '@redux/index';

// Consts and Libs
import { AppStyles } from '@theme/';
import AppWithNavigationState from '@nav/index'

class Root extends Component {
  constructor() {
    super()

    // Load middleware
    let middleware = [
      thunk, // Allows action creators to return functions (not just plain objects)
    ];

    if (__DEV__) {
      // Dev-only middleware
      middleware = [
        ...middleware,
        createLogger(), // Logs state changes to the dev console
      ];
    }

    const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
    this.store = composeEnhancers(
      applyMiddleware(...middleware),
    )(createStore)(rootReducer)
  }

  render() {
    return(
      <Provider store={this.store}>
        <AppWithNavigationState/>
      </Provider>
    )
  }
}

export default Root