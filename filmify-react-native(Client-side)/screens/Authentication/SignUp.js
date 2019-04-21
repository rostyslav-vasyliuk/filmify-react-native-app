import React from 'react';
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toast } from 'native-base';
import axios from 'axios';
import BASE_URL from '../../base-url'

export default class SignUp extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    buttonLoader: false,
  }

  onSignUp = () => {
    const { firstname, lastname, email, password, confirmPassword } = this.state;
    Keyboard.dismiss();

    if (firstname === '' || lastname === '' || email === '' || password === '' || confirmPassword === '') {
      Toast.show(({
        text: 'You should fill all fields!',
        buttonText: 'Okay',
        type: 'warning'
      }))
    } else {
      if (password !== confirmPassword) {
        return (
          Toast.show(({
            text: 'Passwords dont match!',
            buttonText: 'Okay',
            type: 'danger'
          }))
        )
      }
      this.setState({ buttonLoader: true });
      axios.post(`${BASE_URL}/api/auth/signup`, { firstname, lastname, email, password }).then(
        res => {
          this.setState({ buttonLoader: false });
          Toast.show(({
            text: 'You was succesfully registered!',
            buttonText: 'Okay',
            type: 'success'
          }))
          this.props.navigation.navigate('SignIn');
        }
      ).catch((err) => {
        this.setState({ buttonLoader: false });
        Toast.show(({
          text: err.response.data.message,
          buttonText: 'Try again',
          type: 'danger',
        }))
      })
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ImageBackground source={require('../../assets/images/logo-black.png')} style={{ width: 200, height: 100 }} />
        <Input
          placeholder='Firstname'
          inputContainerStyle={{ borderWidth: 1, borderColor: '#808080', borderBottomWidth: 1, borderRadius: 10, marginTop: 10, marginRight: 20, marginLeft: 20 }}
          inputStyle={{ color: '#fff' }}
          placeholderTextColor='#808080'
          value={this.state.firstname}
          onChangeText={(firstname) => this.setState({ firstname })}
          onSubmitEditing={() => { this.secondTextInput.focus(); }}
          leftIcon={
            <Icon
              name='user'
              size={22}
              color='white'
              style={{ paddingRight: 10 }}
            />
          }
        />
        <Input
          placeholder='Lastname'
          ref={(input) => { this.secondTextInput = input; }}
          onSubmitEditing={() => { this.thirdTextInput.focus(); }}
          inputContainerStyle={{ borderWidth: 1, borderColor: '#808080', borderBottomWidth: 1, borderRadius: 10, marginTop: 10, marginRight: 20, marginLeft: 20 }}
          inputStyle={{ color: '#fff' }}
          placeholderTextColor='#808080'
          value={this.state.lastname}
          onChangeText={(lastname) => this.setState({ lastname })}
          onSubmitEditing={() => { this.thirdTextInput.focus(); }}
          leftIcon={
            <Icon
              name='user'
              size={22}
              color='white'
              style={{ paddingRight: 10 }}
            />
          }
        />
        <Input
          placeholder='Email'
          keyboardType='email-address'
          autoCapitalize="none"
          autoCorrect={false}
          ref={(input) => { this.thirdTextInput = input; }}
          inputContainerStyle={{ borderWidth: 1, borderColor: '#808080', borderBottomWidth: 1, borderRadius: 10, marginTop: 10, marginRight: 20, marginLeft: 20 }}
          inputStyle={{ color: '#fff' }}
          placeholderTextColor='#808080'
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          onSubmitEditing={() => { this.fourthTextInput.focus(); }}
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
          ref={(input) => { this.fourthTextInput = input; }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder='Password'
          inputContainerStyle={{ borderWidth: 1, borderColor: '#808080', borderBottomWidth: 1, borderRadius: 10, marginTop: 10, marginRight: 20, marginLeft: 20 }}
          inputStyle={{ color: '#fff' }}
          placeholderTextColor='#808080'
          secureTextEntry
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          onSubmitEditing={() => { this.fifthTextInput.focus(); }}
          leftIcon={
            <Icon
              name='lock'
              size={22}
              color='white'
              style={{ paddingRight: 10 }}
            />
          }
        />
        <Input
          placeholder='Confirm password'
          autoCapitalize="none"
          autoCorrect={false}
          ref={(input) => { this.fifthTextInput = input; }}
          inputContainerStyle={{ borderWidth: 1, borderColor: '#808080', borderBottomWidth: 1, borderRadius: 10, marginTop: 10, marginRight: 20, marginLeft: 20 }}
          inputStyle={{ color: '#fff' }}
          placeholderTextColor='#808080'
          secureTextEntry
          value={this.state.confirmPassword}
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          returnKeyType='done'
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
          onPress={() => this.onSignUp()}
          title='Sign Up'
          type="outline"
          loading={this.state.buttonLoader}
          loadingProps={{ color: 'fff' }}
          buttonStyle={styles.authButton}
          titleStyle={{ color: '#fff' }}
        />
        <Button
          onPress={() => this.props.navigation.navigate('SignIn')}
          title='Login'
          type="clear"
          buttonStyle={styles.additionalButton}
          titleStyle={{ color: '#808080', fontSize: 14 }}
        />
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
    marginBottom: 10,
  }
})