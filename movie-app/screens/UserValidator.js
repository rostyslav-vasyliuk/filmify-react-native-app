import React from 'react';
import { StyleSheet, AsyncStorage, Alert, Text, View, ActivityIndicator } from 'react-native';
import { Permissions, Notifications } from 'expo'
import Top10Movies from './TopTenMovies';
import UpcomingMovies from './UpcomingMovies';
import TopRatedMovies from './TopRatedMovies';
import NowPlaying from './NowPlaying';
import axios from 'axios';
import BASE_URL from '../base-url'

export default class UserValidator extends React.Component {
  static navigationOptions = {
    title: 'Trending',
    headerTintColor: 'white',
    headerStyle: {
      color: 'fff',
      backgroundColor: '#17191c',
      borderBottomColor: '#000000',
    },
    headerTitleStyle: {
      fontSize: 18,
      color: '#fff',
    },
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');
    this.validateUser(token);
    this.registerForPushNotifications();
    // await AsyncStorage.setItem('userID', this.state.user._id);
  }

  async registerForPushNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    console.log('got here')
    let pushToken = await Notifications.getExpoPushTokenAsync();
    console.log('push', pushToken)
    this.subscription = Notifications.addListener(this.handleNotification);

    const user_id = await AsyncStorage.getItem('userID');

    axios.post(`${BASE_URL}/api/auth/set-push-token`, {
      user_id,
      pushToken,
    })
  }

  handleNotification = ({ origin, data }) => {
    console.log('on push ', origin, data);
    if (data.movie_id) {
      this.props.navigation.navigate('MovieItem', { movie_id: data.movie_id })
    }
  }

  validateUser = async (userToken) => {
    axios.get(`${BASE_URL}/api/auth/get-user/${userToken}`).then(
      async (res) => {
        await AsyncStorage.setItem('userID', res.data._id);
        this.props.navigation.navigate('App');
        return res.data;
      }
    ).catch(async (err) => {
      Alert.alert('Something went wrong', 'Please login to your account');
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
