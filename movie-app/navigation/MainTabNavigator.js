import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TrendingScreen from '../screens/TrendingScreen';
import GenresScreen from '../screens/GenresScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GenresFilmListScreen from '../screens/GenresFilmListScreen';
import GenreBlock from '../components/block-views/GenreBlock';
import MovieItem from '../screens/MovieItem';

const TrendingStack = createStackNavigator({
  Trending: TrendingScreen,
  MovieItem: MovieItem,
});

TrendingStack.navigationOptions = {
  tabBarLabel: 'Trending',
  tabBarOptions: {
    activeTintColor: '#fff',
    style: {
      backgroundColor: '#17191c',
    },
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'globe'}
    />
  ),
};

const GenresStack = createStackNavigator({
  Genres: GenresScreen,
  GenresFilmList: GenresFilmListScreen,
  MovieItem: MovieItem
});

GenresStack.navigationOptions = {
  tabBarLabel: 'Genres',
  tabBarOptions: {
    activeTintColor: '#fff',
    style: {
      backgroundColor: '#17191c',
    },
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'tag'}
    />
  ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  MovieItem: MovieItem
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarOptions: {
    activeTintColor: '#fff',
    style: {
      backgroundColor: '#17191c',
    },
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'search'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  MovieItem: MovieItem,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarOptions: {
    activeTintColor: '#fff',
    style: {
      backgroundColor: '#17191c',
    },
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'user'}
    />
  ),
};
const Tabs = createBottomTabNavigator({
  TrendingStack,
  GenresStack,
  SearchStack,
  ProfileStack,
}, {
    initialRouteName: 'TrendingStack',
  }
);

export default Tabs;
