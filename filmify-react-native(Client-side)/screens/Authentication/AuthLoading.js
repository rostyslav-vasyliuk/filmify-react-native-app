import React from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, View } from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const { navigate } = this.props.navigation;

    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      navigate('Validator', userToken)
    } else {
      navigate('Auth')
    }
  };

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
