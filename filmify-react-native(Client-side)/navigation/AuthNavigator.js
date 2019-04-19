import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createSwitchNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignIn from '../screens/Authentication/SignIn';
import SignUp from '../screens/Authentication/SignUp';
import AuthLoading from '../screens/Authentication/AuthLoading';
import UserValidator from '../screens/UserValidator';

const AuthStack = createSwitchNavigator({
  SignIn: SignIn,
  SignUp: SignUp
},
  {
    initialRouteName: 'SignIn',
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Validator: UserValidator,
    App: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
