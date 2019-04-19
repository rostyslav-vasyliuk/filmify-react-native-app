import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';
import GenresData from '../components/data/GenresData';
import BASE_URL from '../base-url'

export default class UpcomingMovies extends React.Component {
	static navigationOptions = {
		title: 'Trending',
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
		axios.get(`${BASE_URL}/api/movies/get-upcoming`).then(
			res => {
				this.props.loadingChecker();
				this.setState({ movieData: res.data.results, loading: false })
			}
		)
	}

	getYear = (releaseDate) => {
		return releaseDate.slice(0, 4);
	}

	getGenre = (genre_id) => {
		if (GenresData.find((item) => item.movieDB_id === genre_id)) {
			return GenresData.find((item) => item.movieDB_id === genre_id).name;
		} else {
			return '';
		}
	}

	navigate = (current_id) => {
		this.props.navigation.navigate('MovieItem', {
			movie_id: current_id
		})
	}

	getGenres = (genres) => {
		let finalString = '';
		genres.map((elem, index) => { if (index < 3) finalString += `${elem.name}, ` });
		finalString = finalString.slice(0, finalString.length - 2);
		return finalString;
	}

	render() {
		return (
			<View>
				{this.state.loading ?
					<View style={styles.loaderStyle}>
						<ActivityIndicator size='large' color="#fff" />
					</View>
					:
					<ScrollView horizontal>
						{this.state.movieData.map((elem) =>
							<View key={elem.id}>
								<TouchableOpacity style={styles.similarMovieContainer} onPress={() => this.navigate(elem.id)}>
									<ImageBackground source={{ uri: 'https://image.tmdb.org/t/p/w500/' + elem.backdrop_path }} style={styles.movieImageStyle} imageStyle={{ borderRadius: 15 }}>
									</ImageBackground>
									<View style={styles.textContainer}>
										<Text style={styles.movieTitle}>{elem.title}</Text>
										<Text style={styles.movieInfo}>
											{`${this.getYear(elem.release_date)}, ${this.getGenre(elem.genre_ids[0])}`}
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						)}
					</ScrollView>
				}
			</View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#030405',
		color: '#fff'
	},
	loaderStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		flex: 1,
		height: 280
	},
	movieTitle: {
		alignSelf: 'flex-start',
		color: '#fff',
		fontWeight: '700',
		fontSize: 16,
	},
	movieInfo: {
		color: '#ffa',
		fontSize: 12,
	},
	movieImageStyle: {
		width: 150,
		height: 180,
	},
	similarMovieContainer: {
		width: 150,
		marginRight: 10,
	}
});