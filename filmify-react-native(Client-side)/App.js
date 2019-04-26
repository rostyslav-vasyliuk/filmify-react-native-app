import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Root } from "native-base";
import { Ionicons, AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import Sentry from 'sentry-expo';
import SentryKey from './sentry-key';

Sentry.enableInExpoDevelopment = true;

Sentry.config(SentryKey).install();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontsLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
      ...FontAwesome.font,
      ...Entypo.font,
      ...AntDesign.font,
    });
    await Asset.loadAsync([
      require('./assets/images/genresImages/action.jpg'),
      require('./assets/images/genresImages/adventure.jpg'),
      require('./assets/images/genresImages/animation.jpg'),
      require('./assets/images/genresImages/comedy.jpg'),
      require('./assets/images/genresImages/crime.jpg'),
      require('./assets/images/genresImages/documentary.jpg'),
      require('./assets/images/genresImages/drama.jpg'),
      require('./assets/images/genresImages/family.jpg'),
      require('./assets/images/genresImages/fantasy.jpg'),
      require('./assets/images/genresImages/history.jpg'),
      require('./assets/images/genresImages/horror.jpg'),
      require('./assets/images/genresImages/music.jpg'),
      require('./assets/images/genresImages/mystery.jpg'),
      require('./assets/images/genresImages/romance.jpg'),
      require('./assets/images/genresImages/science-fiction.jpg'),
      require('./assets/images/genresImages/thriller.jpg'),
      require('./assets/images/genresImages/war.jpg'),
      require('./assets/images/genresImages/western.jpg'),
    ])
    this.setState({ fontsLoaded: true })
  }

  render() {
    if (!this.state.isLoadingComplete && !this.state.fontsLoaded) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Root>
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <AppNavigator />
          </View>
        </Root>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17191c',
  },
});
