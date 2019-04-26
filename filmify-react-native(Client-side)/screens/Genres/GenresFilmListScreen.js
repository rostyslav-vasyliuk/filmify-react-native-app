import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native';
import { Image } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import BASE_URL from '../../base-url'

export default class GenresFilmListScreen extends React.Component {
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
			color: '#fff',
		},
	};

	state = {
		movieData: null,
		loading: true,
	}

	componentDidMount() {
		const { navigation } = this.props;
		const dataObject = navigation.getParam('data', null);
		axios.get(`${BASE_URL}/api/movies/get-by-genres/${dataObject.movieDB_id}`).then(
			res => {
				this.setState({ movieData: res.data.results, loading: false })
			}
		)
	}

	getYear = (releaseDate) => {
		return releaseDate.slice(0, 4);
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.loading ?
					<View style={styles.loaderStyle}>
						<ActivityIndicator size='large' color="#fff" />
					</View>
					: (
						<ScrollView>
							{this.state.movieData.map((elem) => (
								<TouchableOpacity style={styles.movieItem} key={elem.id} onPress={() => this.props.navigation.navigate('MovieItem', { movie_id: elem.id })}>
									{elem.backdrop_path ?
										<Image
											placeholderStyle={{ backgroundColor: '#3a3d42' }}
											PlaceholderContent={<ActivityIndicator size='small' color="#fff" />}
											source={{ uri: 'https://image.tmdb.org/t/p/w500/' + elem.backdrop_path }}
											style={styles.imageItem}
										/>
										:
										<Image
											placeholderStyle={{ backgroundColor: '#3a3d42' }}
											PlaceholderContent={<Entypo name='image' size={40} color='#8c939e' />}
											style={styles.imageItem}
										/>
									}
									<View style={styles.movieInfo}>
										<Text style={styles.title}>{elem.title}</Text>
										<Text style={styles.year}>{this.getYear(elem.release_date)}</Text>
									</View>
								</TouchableOpacity>
							))}
						</ScrollView>
					)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: '#030405',
		color: '#fff'
	},
	loaderStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
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
		borderRadius: 15,
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
});
