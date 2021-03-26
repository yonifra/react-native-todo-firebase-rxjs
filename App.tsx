import React from 'react';

import Routes from './src/routes';

import {StatusBar} from "react-native"

import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './src/store/store';
import { theme } from './src/utils/theme';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <StatusBar backgroundColor={theme.colors.white} barStyle="dark-content" />
          <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
