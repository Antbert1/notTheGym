import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/redux/store';
import { View } from 'react-native';
import { createAppContainer, NavigationContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/components/Home';
import Auth from './src/components/Auth';
import Register from './src/components/Register';
import RegisterType from './src/components/RegisterType';
import Profile from './src/components/Profile';
import TeacherProfile from './src/components/TeacherProfile';

const RootStack = createStackNavigator({
  Auth: { screen: Auth },
  Home: { screen: Home },
  RegisterType: { screen: RegisterType },
  Register: { screen: Register },
  Profile: { screen: Profile },
  TeacherProfile: { screen: TeacherProfile }
});

const Navigation = createAppContainer(RootStack);

const App = () => {

  return (
    <StoreProvider store={store}>
      <Navigation />
    </StoreProvider>
  );
};


export default App;
