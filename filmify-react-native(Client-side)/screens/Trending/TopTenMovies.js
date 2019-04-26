import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native';
import { Image } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import GenresData from '../Genres/data/GenresData';
import BASE_URL from '../../base-url'

export default class TopTenMovies extends React.Component {
	state = {
		top10MoviesData: null,
		dividedArray: null,
		loading: true,
		photo: null,
	}

	componentDidMount() {
		axios.get(`${BASE_URL}/api/movies/get-top-ten`).then(
			res => {
				const top10MoviesData = res.data.results.slice(0, 10);
				let dividedArray = [];
				for (let i = 0, j = 0; i < top10MoviesData.length / 2; i++ , j += 2) {
					dividedArray.push([top10MoviesData[j], top10MoviesData[j + 1]]);
				}
				this.props.loadingChecker();
				this.setState({ top10MoviesData, dividedArray, loading: false, photo: top10MoviesData[0] })
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
					<View>
						{
							this.state.dividedArray.map((elem, index) =>
								<View key={elem[0].id} style={styles.twoMovieContainer}>
									<TouchableOpacity style={styles.movieContainer} onPress={() => this.navigate(elem[0].id)}>
										{elem[0].backdrop_path ?
											<Image
												placeholderStyle={{ backgroundColor: '#3a3d42' }}
												PlaceholderContent={<ActivityIndicator size='small' color="#fff" />}
												source={{ uri: 'https://image.tmdb.org/t/p/w500/' + elem[0].backdrop_path }}
												style={styles.movieImageStyle}
											/>
											:
											<Image
												placeholderStyle={{ backgroundColor: '#3a3d42' }}
												PlaceholderContent={<Entypo name='image' size={40} color='#8c939e' />}
												style={styles.movieImageStyle}
											/>
										}
										<View style={styles.textContainer}>
											<Text style={styles.movieTitle}>{elem[0].title}</Text>
											<Text style={styles.movieInfo}>
												{`${this.getYear(elem[0].release_date)}, ${this.getGenre(elem[0].genre_ids[0])}`}
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity style={styles.movieContainer} onPress={() => this.navigate(elem[1].id)}>
										{elem[1].backdrop_path ?
											<Image
												placeholderStyle={{ backgroundColor: '#3a3d42' }}
												PlaceholderContent={<ActivityIndicator size='small' color="#fff" />}
												source={{ uri: 'https://image.tmdb.org/t/p/w500/' + elem[1].backdrop_path }}
												style={styles.movieImageStyle}
											/>
											:
											<Image
												placeholderStyle={{ backgroundColor: '#3a3d42' }}
												PlaceholderContent={<Entypo name='image' size={40} color='#8c939e' />}
												style={styles.movieImageStyle}
											/>
										}
										<Text style={styles.movieTitle}>{elem[1].title}</Text>
										<Text style={styles.movieInfo}>
											{`${this.getYear(elem[1].release_date)}, ${this.getGenre(elem[1].genre_ids[0])}`}
										</Text>
									</TouchableOpacity>
								</View>
							)
						}
					</View>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		color: '#fff',
	},
	trendingHeader: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center'
	},
	movieImageStyle: {
		flex: 1,
		height: 180,
		borderRadius: 15,
	},
	twoMovieContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		margin: 5,
	},
	movieContainer: {
		flex: 1,
		marginLeft: 4,
		marginRight: 4,
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
	textContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
	}
});
