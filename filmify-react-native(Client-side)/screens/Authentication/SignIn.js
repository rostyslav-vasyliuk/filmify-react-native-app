import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import axios from 'axios';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toast } from 'native-base';

import BASE_URL from '../../base-url'

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: '',
    password: '',
    buttonLoader: false,
  }
  onSignIn = () => {
    const { email, password } = this.state;
    Keyboard.dismiss();
    if (email.length === 0 || password.length === 0) {
      Toast.show(({
        text: 'You should fill all fields!',
        buttonText: 'Okay',
        type: 'warning'
      }))
    } else {
      this.setState({ buttonLoader: true });
      axios.post(`${BASE_URL}/api/auth/signin`, { email, password }).then(
        res => {
          this.setState({ buttonLoader: false });
          AsyncStorage.setItem('userToken', res.data.token);
          this.props.navigation.navigate('App');
        }
      ).catch((err) => {
        Toast.show(({
          text: err.response.data.message,
          buttonText: 'Try again',
          type: 'danger',
        }))
        this.setState({ buttonLoader: false });
      });
    }
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <ImageBackground source={require('../../assets/images/logo-black.png')} style={{ width: 200, height: 100 }} />
        <Input
          placeholder='Email'
          autoCapitalize="none"
          autoCorrect={false}
          ref={(input) => { this.firstTextInput = input; }}
          inputContainerStyle={{ borderWidth: 1, borderColor: '#808080', borderBottomWidth: 1, borderRadius: 10, marginTop: 15, marginRight: 20, marginLeft: 20 }}
          inputStyle={{ color: '#fff' }}
          placeholderTextColor='#808080'
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          onSubmitEditing={() => { this.secondTextInput.focus(); }}
          leftIcon={
            <Icon
              name='envelope-o'
              size={22}
              color='white'
              style={{ paddingRight: 10 }}
            />
          }
        />
        <Input
          ref={(input) => { this.secondTextInput = input; }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder='Password'
          inputContainerStyle={{ borderWidth: 1, borderColor: '#808080', borderBottomWidth: 1, borderRadius: 10, marginTop: 15, marginRight: 20, marginLeft: 20 }}
          inputStyle={{ color: '#fff' }}
          secureTextEntry
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholderTextColor='#808080'
          leftIcon={
            <Icon
              name='lock'
              size={22}
              color='white'
              style={{ paddingRight: 10 }}
            />
          }
        />
        <Button
          onPress={() => this.onSignIn()}
          title='Login'
          type="outline"
          buttonStyle={styles.authButton}
          loading={this.state.buttonLoader}
          loadingProps={{ color: 'fff' }}
          titleStyle={{ color: '#fff' }} />
        <TouchableOpacity>
          <Button
            onPress={() => this.props.navigation.navigate('SignUp')}
            title='Sign Up'
            type="clear"
            buttonStyle={styles.additionalButton}
            titleStyle={{ color: '#808080', fontSize: 14 }}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030405',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  authButton: {
    marginTop: 20,
    width: 150,
    borderRadius: 10,
    borderColor: '#808080',
  },
  additionalButton: {
    marginTop: 10,
    width: 150,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600'
  }
})
