import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ActivityIndicator, AsyncStorage, RefreshControl } from 'react-native';
import GenresData from '../../components/data/GenresData';
import { Icon, List, ListItem, Button, SwipeRow, Toast } from 'native-base';
import { Avatar, Header, Text, Divider } from 'react-native-elements';

export default class FavoriteFilms extends React.Component {
  static navigationOptions = {
    title: 'Profile',
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
    loading: this.props.loading,
    movieData: this.props.movieData,
  }

  getYear = (releaseDate) => {
    return releaseDate.slice(0, 4);
  }

  getGenre = (genre_id) => {
    return GenresData.find((item) => item.movieDB_id === genre_id).name;
  }

  render() {
    return (
      <View style={styles.favoritesMovies}>
        {this.props.loading ?
          <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
          :
          <View>
            {!this.props.movieData.length ?
              <View style={styles.messageContainer}>
                <Icon name='frowno' type='AntDesign' active style={{ color: '#808080', fontSize: 40 }} />
                <Text style={styles.textMessage}>Your list seems to be empty!</Text>
                <Text style={styles.textMessage}>Your favourite films will display here!</Text>
              </View>
              : (
                <View>
                  <Text style={styles.favoriteFilmsTitle}>Your films</Text>
                  <Text style={styles.favoriteFilmsSubtitle}>To remove some film just swipe it left</Text>
                  {this.props.movieData.map((elem, i) =>
                    <SwipeRow
                      key={elem.id}
                      rightOpenValue={-75}
                      style={styles.swiperowStyle}
                      disableRightSwipe
                      body={
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MovieItem', { movie_id: elem.id })} style={styles.myfilmsContainer}>
                          <View style={styles.myfilmInfo}>
                            <Image source={{ uri: 'https://image.tmdb.org/t/p/w500/' + elem.backdrop_path }} style={styles.movieImage} />
                            <View style={styles.info}>
                              <Text style={styles.movieTitle}>{elem.title}</Text>
                              <Text style={styles.movieInfo}>
                                {`${this.getYear(elem.release_date)}, ${this.getGenre(elem.genres[0].id)}`}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      }
                      right={
                        <Button danger onPress={() => this.props.removeMovie(elem.id)}>
                          <Icon active name="trash" />
                        </Button>
                      }
                    />
                  )}
                </View>
              )}
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperowStyle: {
    backgroundColor: '#030405',
  },
  favoritesMovies: {
    flex: 1,
    paddingBottom: 25,
  },
  myfilmsContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  myfilmInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  movieImage: {
    height: 50,
    width: 50,
    borderRadius: 5,
    marginLeft: 10,
  },
  movieTitle: {
    color: '#fff',
    overflow: 'hidden',
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: '700',
    fontSize: 16,
    minWidth: 200,
  },
  movieInfo: {
    color: '#ffa',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 13,
  },
  info: {
    width: '90%',
  },
  favoriteFilmsTitle: {
    paddingTop: 10,
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  favoriteFilmsSubtitle: {
    textAlign: 'center',
    paddingTop: 5,
    color: '#808080',
    fontWeight: '500',
    fontSize: 12,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  textMessage: {
    paddingTop: 20,
    fontSize: 20,
    color: '#808080'
  }
});
