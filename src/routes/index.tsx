import 'react-native-gesture-handler';

import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from '@screens/home'
import {Splash, Login, Register} from '@screens/auth'

import {useSelector} from 'react-redux';
import EditTodo from 'screens/home/edit-todo';
import {EDIT_TODO_SCREEN, HOME_SCREEN, LOGIN_SCREEN, REGISTER_SCREEN, SPLASH_SCREEN} from '@constants/routes'

function Routes() {
  const StackNav = createStackNavigator();
  const SplashStack = createStackNavigator();
  const AuthStack = createStackNavigator();

  const {user} = useSelector((state: any) => state.auth);
  const {isSplashing} = useSelector((state: any) => state.apps);

  if (isSplashing) {
    return (
      <NavigationContainer>
        <SplashStack.Navigator
          initialRouteName={SPLASH_SCREEN}
          headerMode="none">
          <SplashStack.Screen name={SPLASH_SCREEN} component={Splash} />
        </SplashStack.Navigator>
      </NavigationContainer>
    );
  }

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack.Navigator
          screenOptions={TransitionPresets.ScaleFromCenterAndroid}
          headerMode="none"
          initialRouteName={LOGIN_SCREEN}>
          <AuthStack.Screen name={LOGIN_SCREEN} component={Login} />
          <AuthStack.Screen name={REGISTER_SCREEN} component={Register} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <StackNav.Navigator
        screenOptions={TransitionPresets.SlideFromRightIOS}
        initialRouteName={HOME_SCREEN}>
        <StackNav.Screen 
          name={HOME_SCREEN} 
          component={Home} 
          options={{ 
            title: "All Tasks",
            headerStyle:{
              elevation: 0,
              shadowOpacity: 0,
            }
          }} />
        <StackNav.Screen 
          name={EDIT_TODO_SCREEN} 
          component={EditTodo} 
          options={{title: "Edit Task" }}
        />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
