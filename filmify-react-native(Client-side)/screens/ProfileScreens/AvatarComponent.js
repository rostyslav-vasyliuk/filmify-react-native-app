import React from 'react';
import { ImageEditor, Button, View, Text, TouchableOpacity, Platform, CameraRoll, Alert } from 'react-native';
import { Avatar, Image } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';
import { ActionSheet } from 'native-base'
import Axios from 'axios';
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
      this._pickImage();
    };
    if (index === 2) {
      // logic for deletingPhoto
      this.setState({ image: null })
    }
  }

  render() {
    let { image } = this.state;
    console.log(image)
    const name = 'NM';
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
          {image ?
            <Avatar
              rounded
              size='xlarge'
              source={{ uri: image }}
            /> :
            <Avatar
              rounded
              icon={{ name: 'user', type: 'font-awesome' }}
              size='xlarge'
            />}
        </TouchableOpacity>
      </View>
    );
  }

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
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
    console.log(filename, ' - filename')
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    console.log(this.props.user)
    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('avatar', { uri: localUri, name: filename, type });
    formData.append('id', this.props.user._id)
    // console.log(this.props.user.id)
    return await fetch(`${BASE_URL}/api/auth/upload`, {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    });

  };
  
  _pickImage = async () => {
    // const result1 = await Permissions.getAsync(Permissions.CAMERA);
    let result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      console.log('got here');
      return;
    }
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
    console.log(resizedUri)
    // this gives you a rct-image-store URI or a base64 image tag that
    // you can use from ImageStore
    this.setState({ image: resizedUri });

    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    console.log(filename, ' - filename')
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    console.log(this.props.user)
    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('avatar', { uri: localUri, name: filename, type });
    formData.append('id', this.props.user._id)
    // console.log(this.props.user.id)
    return await fetch(`${BASE_URL}/api/auth/upload`, {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
      },
    });
  };
}
