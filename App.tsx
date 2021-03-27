import React from 'react';

import Routes from './src/routes';

import {StatusBar} from "react-native"

import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from "react-native-flash-message";

import {store, persistor} from '@store/store';
import { theme } from '@utils/theme';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <StatusBar 
            backgroundColor={theme.colors.white} 
            barStyle="dark-content" />
          <FlashMessage position="top" />
          <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
