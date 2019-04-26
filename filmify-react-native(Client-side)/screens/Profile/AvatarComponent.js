import React from 'react';
import { ImageEditor, View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';
import { ActionSheet } from 'native-base'
import BASE_URL from '../../base-url'

var BUTTONS = ["Take a Photo", "Choose from Gallery", "Delete", "Cancel"];
export default class AvatarComponent extends React.Component {
  state = {
    image: `${BASE_URL}/uploads/${this.props.user.image}` || null,
    clicked: null,
  };

  onActionSheetButton = (index) => {
    if (index === 0) {
      this.takePicture();
    };
    if (index === 1) {
      this.pickImage();
    };
    if (index === 2) {
      this.setState({ image: null })
    }
  }

  render() {
    let { image } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() =>
          ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: 3,
              destructiveButtonIndex: 2,
              title: "Set new Photo"
            },
            buttonIndex => {
              this.onActionSheetButton(buttonIndex);
            }
          )}>
          <Avatar
            rounded
            size='xlarge'
            icon={{ name: 'user', type: 'font-awesome' }}
            source={{ uri: image }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  takePicture = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: {
            width: 640 * (result.width > result.height ? 1 : result.width / result.height),
            height: 640 * (result.height > result.width ? 1 : result.height / result.width),
          },
          resizeMode: 'cover',
        },
        (uri) => resolve(uri),
        () => reject(),
      );
    });

    this.setState({ image: resizedUri });

    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append('avatar', { uri: localUri, name: filename, type });
    formData.append('id', this.props.user._id);

    return await fetch(`${BASE_URL}/api/auth/upload`, {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  pickImage = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        return;
      }
    }

    result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) return;

    this.setState({ image: result.uri });

    let resizedUri;
    await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: {
            width: 640 * (result.width > result.height ? 1 : result.width / result.height),
            height: 640 * (result.height > result.width ? 1 : result.height / result.width),
          },
          resizeMode: 'cover',
        },
        (uri) => resolve(resizedUri = uri),
        () => reject(),
      );
    });

    this.setState({ image: resizedUri });

    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append('avatar', { uri: localUri, name: filename, type });
    formData.append('id', this.props.user._id)
    return await fetch(`${BASE_URL}/api/auth/upload`, {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    });
  };
}
