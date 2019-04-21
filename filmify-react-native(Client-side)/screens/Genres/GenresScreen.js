import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import GenreBlock from '../../components/block-views/GenreBlock';
import GenresData from '../../components/data/GenresData';
export default class GenresScreen extends React.Component {
  static navigationOptions = {
    title: 'Genres',
    headerTintColor: 'white',
    headerStyle: {
      color: 'fff',
      backgroundColor: '#17191c',
      borderBottomColor: '#000000',
    },
    headerTitleStyle: {
      fontSize: 18,
      color: '#fff'
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.genresContainer} >
          <View>
            {GenresData.map((elem, index) => (
              <View style={styles.rowBlock} key={elem.id}>
                <GenreBlock genre={index} navigation={this.props.navigation} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#030405',
  },
  genresContainer: {
    flexDirection: 'column',
    margin: 3,
    marginBottom: 20,
  },
  rowBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
});
