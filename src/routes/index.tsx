import 'react-native-gesture-handler';

import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from '@screens/home'
import {Splash, Login, Register} from '@screens/auth'

import {useSelector} from 'react-redux';

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
          initialRouteName="Splash"
          headerMode="none">
          <SplashStack.Screen name="Splash" component={Splash} />
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
          initialRouteName="Splash">
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <StackNav.Navigator
        screenOptions={TransitionPresets.SlideFromRightIOS}
        initialRouteName="Home">
        <StackNav.Screen name="Home" component={Home} 
          options={{ 
            headerTitle: "ALL TASKS",
            headerStyle:{
              elevation: 0,
              shadowOpacity: 0,
            }
          }} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
