import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <FontAwesome
        name={this.props.name}
        size={this.props.focused ? 30 : 24}
        style={{ marginBottom: -4}}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}