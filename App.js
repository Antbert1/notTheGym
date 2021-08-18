import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/redux/store';
import { StyleSheet, View } from 'react-native';
import Home from './src/components/Home';

const App = () => {

  return (
    <StoreProvider store={store}>
      <View style={styles.container}>
        <Home />
      </View>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default App;
