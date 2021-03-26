import 'react-native-gesture-handler';

import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from "../screens/home"

import {connect} from 'react-redux';

function Routes() {
  const StackNav = createStackNavigator();
  return (
    <NavigationContainer>
      <StackNav.Navigator
        screenOptions={TransitionPresets.SlideFromRightIOS}
        initialRouteName="Home"
          >
        <StackNav.Screen name="Home" component={Home} 
          options={{ 
            headerTitle:"ALL TASKS",
            headerStyle:{
              elevation: 0,
              shadowOpacity: 0,
            }
          }} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

export default connect()(Routes);
