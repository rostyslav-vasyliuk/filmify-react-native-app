import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

import BASE_URL from '../../base-url'

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
    headerTintColor: 'white',
    headerStyle: {
      color: 'fff',
      backgroundColor: '#17191c',
      borderBottomColor: '#000000',
    },
    headerTitleStyle: {
      fontSize: 18,
      color: '#fff',
    },
  };
  state = {
    movieData: null,
    loading: false,
    searchValue: '',
    notFound: false,
    searchInitialized: false,
  }
  navigate = () => {
    this.props.navigation.navigate('SearchResult');
  }

  debounce = (func, wait, immediate) => {
    var timeout;

    return function executedFunction() {
      var context = this;
      var args = arguments;

      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  };

  onSearch = (text) => {
    if (text.length > 0) {
      this.setState({ loading: true, searchValue: text, searchInitialized: true });
      axios.get(`${BASE_URL}/api/movies/search/${text}`).then(
        res => {
          if (res.data.results.length < 1) {
            return this.setState({ notFound: true, loading: false });
          }
          this.setState({ movieData: res.data.results, loading: false, notFound: false });
        }
      )
    }
    if (text.length === 0) {
      this.setState({ searchInitialized: false, searchValue: text });
    }
  }

  getYear = (releaseDate) => {
    return releaseDate.slice(0, 4);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SearchBar
          placeholder='Search...'
          inputContainerStyle={styles.input}
          containerStyle={styles.inputContainer}
          cancelButtonTitle
          cancelIcon
          onChangeText={(text) => this.debounce(this.onSearch(text), 1000)}
          value={this.state.searchValue}
          returnKeyType="search"
        />
        {!this.state.searchInitialized ?
          <View style={styles.messageContainer}>
            <FontAwesome name='search' size={50} color='#808080' />
            <Text style={styles.textMessage}>Type something to search...</Text>
          </View>
          :
          <View>
            {this.state.loading ?
              <View style={styles.loaderStyle}>
                <ActivityIndicator size='large' color="#fff" />
              </View>
              :
              <View>
                {this.state.notFound ?
                  <View style={styles.messageContainer}>
                    <FontAwesome name='frown-o' size={50} color='#808080' />
                    <Text style={styles.textMessage}>Sorry, we couldn't find this for you(</Text>
                  </View>
                  :
                  <View>
                    {this.state.movieData.map((elem) => (
                      <TouchableOpacity style={styles.movieItem} key={elem.id} onPress={() => this.props.navigation.navigate('MovieItem', { movie_id: elem.id })}>
                        <ImageBackground source={{ uri: 'https://image.tmdb.org/t/p/w500/' + elem.backdrop_path }} style={styles.imageItem} imageStyle={{ borderRadius: 15 }} />
                        <View style={styles.movieInfo}>
                          <Text style={styles.title}>{elem.title}</Text>
                          <Text style={styles.year}>{this.getYear(elem.release_date)}</Text>
                        </View>
                      </TouchableOpacity>

                    ))}
                  </View>
                }
              </View>
            }
          </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#030405',
  },
  inputStyle: {
    paddingLeft: 10,
    color: '#fff'
  },
  loaderStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 200,
  },
  year: {
    color: '#fff'
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    paddingTop: 5,
    alignSelf: 'flex-start',
  },
  imageItem: {
    width: 120,
    height: 120,
  },
  movieItem: {
    flexDirection: 'row',
    margin: 10,
    height: 120,
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150,
  },
  textMessage: {
    paddingTop: 20,
    fontSize: 20,
    color: '#808080'
  }
});
