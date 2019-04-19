import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Top10Movies from './TopTenMovies';
import UpcomingMovies from './UpcomingMovies';
import TopRatedMovies from './TopRatedMovies';
import NowPlaying from './NowPlaying';
import axios from 'axios';

export default class TrendingScreen extends React.Component {
  static navigationOptions = {
    title: 'Trending',
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
    Top10MoviesLoading: true,
    NowPlayingLoading: true,
    UpcomingMoviesLoading: true,
    TopRatedMoviesLoading: true,
  }

  checkForTopTenMovies = () => {
    this.setState({ Top10MoviesLoading: false })
  }

  checkForNowPlaying = () => {
    this.setState({ NowPlayingLoading: false })
  }

  checkForUpcomingMovies = () => {
    console.log('uploaded beatch')
    this.setState({ UpcomingMoviesLoading: false })
  }

  checkForTopRatedMovies = () => {
    this.setState({ TopRatedMoviesLoading: false })
  }

  render() {
    const { Top10MoviesLoading, NowPlayingLoading, TopRatedMoviesLoading, UpcomingMoviesLoading } = this.state;
    const isEveryComponentUploaded = Top10MoviesLoading || NowPlayingLoading || TopRatedMoviesLoading || UpcomingMoviesLoading;
    return (
      <View style={styles.container}>
        {(isEveryComponentUploaded)
          &&
          (
            <ActivityIndicator size='large' color='#fff' />
          )
        }

        <ScrollView
          style={(isEveryComponentUploaded) ? styles.hideTillLoad : null}
        >
          <View style={styles.Top10MoviesBlock}>
            <Top10Movies
              navigation={this.props.navigation}
              loadingChecker={this.checkForTopTenMovies}
            />
          </View>

          <View style={styles.topRatedBlock}>
            <Text style={styles.upcomingTitle}>Now in Cinema:</Text>
            <NowPlaying
              navigation={this.props.navigation}
              loadingChecker={this.checkForNowPlaying}
            />
          </View>

          <View style={styles.upcomingBlock}>
            <Text style={styles.upcomingTitle}>Upcoming movies:</Text>
            <UpcomingMovies
              navigation={this.props.navigation}
              loadingChecker={this.checkForUpcomingMovies}
            />
          </View>

          <View style={styles.topRatedBlock}>
            <Text style={styles.upcomingTitle}>Top Rated Movies:</Text>
            <TopRatedMovies
              navigation={this.props.navigation}
              loadingChecker={this.checkForTopRatedMovies}
            />
          </View>

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    color: '#fff',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hideTillLoad: {
    display: 'none',
  },
  upcomingTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    paddingBottom: 10,
  },
  Top10MoviesBlock: {
    padding: 10,
  },
  upcomingBlock: {
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
  },
  topRatedBlock: {
    padding: 10,
    marginBottom: 10,
  }
});
