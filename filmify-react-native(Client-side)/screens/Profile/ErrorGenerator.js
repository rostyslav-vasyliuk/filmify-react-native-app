import React from 'react';
import { StyleSheet, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Button, Text } from 'native-base';
import { Overlay } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

export default class ErrorGenerator extends React.Component {
  state = {
    overlayVisible: false,
  }

  generateError = () => {
    const obj = {};
    let breaksHere = obj.fakeProperty[0];
    this.setState({ overlayVisible: false });
  }

  hideOverlay = () => {
    this.setState({ overlayVisible: false });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ overlayVisible: true })}
          style={{ paddingLeft: 10 }}
        >
          <Entypo name='bug' size={24} color='#fff' />
        </TouchableOpacity >

        <Overlay isVisible={this.state.overlayVisible} height={120}>
          <View>
            <Text style={styles.textStyle}>Crash this app?</Text>
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
                onPress={() => this.generateError()}
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