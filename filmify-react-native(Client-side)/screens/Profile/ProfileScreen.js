import React from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, AsyncStorage, RefreshControl } from 'react-native';
import axios from 'axios';
import { Toast } from 'native-base';
import { Divider, Text } from 'react-native-elements';
import AvatarComponent from './AvatarComponent';
import LogoutConfirm from './LogoutConfirm';
import FavoriteFilms from './FavoriteFilms';

import BASE_URL from '../../base-url'

export default class ProfileScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Profile',
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
			headerRight: (
				<LogoutConfirm navigation={navigation} />
			)
		}
	};

	state = {
		user: null,
		refreshing: false,
		movieData: null,
		loading: true,
	}

	async componentDidMount() {
		const token = await AsyncStorage.getItem('userToken');
		await this.getList();
		axios.get(`${BASE_URL}/api/auth/get-user/${token}`).then(
			res => {
				this.setState({ user: res.data })
			}
		)
	}

	getList = async () => {
		const user_id = await AsyncStorage.getItem('userID');
		axios.post(`${BASE_URL}/api/movies/get-favorite-movie-list`, { user_id }).then(
			res => {
				this.setState({ movieData: res.data, loading: false })
			}
		)
	}

	removeMovie = async (movie_id) => {
		const user_id = await AsyncStorage.getItem('userID');
		axios.post(`${BASE_URL}/api/movies/remove-from-movie-list`, { movie_id, user_id }).then(
			res => {
				Toast.show({ text: 'Film was successfully deleted!', buttonText: 'Okay' });
			}
		)
		const updatedArray = this.state.movieData.filter((elem) => elem.id !== movie_id);
		this.setState({ movieData: updatedArray });
	}

	render() {
		return (
			<View style={styles.container}>
				{!this.state.user ?
					<View style={styles.loaderStyle}>
						<ActivityIndicator color='white' size='large' />
					</View>
					:
					<ScrollView refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.getList}
						/>
					}
					>
						<View style={styles.userInfoContainer}>
							<AvatarComponent user={this.state.user} />
							<Text style={styles.textStyle}>
								{`${this.state.user.firstname} ${this.state.user.lastname}`}
							</Text>
						</View>

						<Divider style={{ backgroundColor: '#808080', margin: 15 }} />

						<FavoriteFilms
							navigation={this.props.navigation}
							movieData={this.state.movieData}
							loading={this.state.loading}
							removeMovie={this.removeMovie}
						/>
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
	},
	loaderStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	userInfoContainer: {
		flex: 1,
		paddingTop: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textStyle: {
		fontSize: 20,
		color: '#fff',
		marginTop: 5,
	},
});
