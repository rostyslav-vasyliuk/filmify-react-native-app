import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default class TrendingBlock extends React.Component {
    render() {
        return (
            <View style={styles.itemContainer}>
                <Text>
                    Block here
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: '#aaa',
      borderRadius: '50%'
    }
  });