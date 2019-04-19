import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';
import GenresData from '../../components/data/GenresData';
import BASE_URL from '../../base-url'

export default class TopRatedMovies extends React.Component {
	state = {
		movieData: null,
		loading: true,
	}

	componentDidMount() {
		axios.get(`${BASE_URL}/api/movies/get-top-rated`).then(
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
		return GenresData.find((item) => item.movieDB_id === genre_id).name;
	}

	navigate = (current_id) => {
		this.props.navigation.navigate('MovieItem', {
			movie_id: current_id
		})
	}

	render() {
		return (
			<View>
				{this.state.loading ? <ActivityIndicator size="large" color="#fff" /> :
					<ScrollView horizontal>
						{
							this.state.movieData.map((elem, index) =>
								<TouchableOpacity style={styles.movieContainer} onPress={() => this.navigate(elem.id)} key={elem.id}>
									<ImageBackground source={{ uri: 'https://image.tmdb.org/t/p/w500/' + elem.backdrop_path }} style={styles.movieImageStyle} imageStyle={{ borderRadius: 15 }}>
									</ImageBackground>
									<View>
										<Text style={styles.movieTitle}>{elem.title}</Text>
										<Text style={styles.movieInfo}>
											{`${this.getYear(elem.release_date)}, ${this.getGenre(elem.genre_ids[0])}`}
										</Text>
									</View>
								</TouchableOpacity>
							)
						}
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
	country: {
		color: '#fff',
		fontSize: 14,
	},
	movieImageStyle: {
		width: 150,
		height: 180,
	},
	movieContainer: {
		width: 150,
		marginRight: 10,
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
});