import 'react-native-gesture-handler';

import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from "../screens/home"
import AddTodo from "../screens/home/add-todo"
import EditTodo from "../screens/home/edit-todo"

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
            headerTitle:"My Todo"
          }} />
        <StackNav.Screen name="AddTodo" component={AddTodo} />
        <StackNav.Screen name="EditTodo" component={EditTodo} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

export default connect()(Routes);
