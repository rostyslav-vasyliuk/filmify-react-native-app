import React from 'react';
import { StyleSheet, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Button, Text } from 'native-base';
import { Overlay } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

export default class LoginConfirm extends React.Component {
  state = {
    overlayVisible: false,
  }

  onLogout = () => {
    this.props.navigation.navigate('Auth');
    AsyncStorage.clear();
  }

  hideOverlay = () => {
    this.setState({ overlayVisible: false })
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ overlayVisible: true })}
          style={{ paddingRight: 10 }}
        >
          <AntDesign name='logout' size={24} color='#fff' />
        </TouchableOpacity >

        <Overlay isVisible={this.state.overlayVisible} height={120}>
          <View>
            <Text style={styles.textStyle}>Do you really want to logout?</Text>
            <View style={styles.buttonGroup}>
              <Button
                style={styles.buttonContainer}
                onPress={() => this.hideOverlay()}
                dark
              >
                <Text>
                  No
                </Text>
              </Button>
              <Button
                style={styles.buttonContainer}
                onPress={() => this.onLogout()}
                dark
              >
                <Text>
                  Yes
                </Text>
              </Button>
            </View>
          </View>
        </Overlay>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 15,
  },
  buttonContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
})