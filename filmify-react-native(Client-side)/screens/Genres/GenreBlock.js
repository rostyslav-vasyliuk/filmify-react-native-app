import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    ImageBackground,
    Alert
} from 'react-native';
import GenresData from './data/GenresData';
import { createStackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';


export default class GenreBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null,
        }
    }
    componentDidMount() {
        let url;
        if (this.props.genre === 0) {
            url = require('../../assets/images/genresImages/action.jpg');
        }
        if (this.props.genre === 1) {
            url = require('../../assets/images/genresImages/adventure.jpg');
        }
        if (this.props.genre === 2) {
            url = require('../../assets/images/genresImages/animation.jpg');
        }
        if (this.props.genre === 3) {
            url = require('../../assets/images/genresImages/comedy.jpg');
        }
        if (this.props.genre === 4) {
            url = require('../../assets/images/genresImages/crime.jpg');
        }
        if (this.props.genre === 5) {
            url = require('../../assets/images/genresImages/documentary.jpg');
        }
        if (this.props.genre === 6) {
            url = require('../../assets/images/genresImages/drama.jpg');
        }
        if (this.props.genre === 7) {
            url = require('../../assets/images/genresImages/family.jpg');
        }
        if (this.props.genre === 8) {
            url = require('../../assets/images/genresImages/fantasy.jpg');
        }
        if (this.props.genre === 9) {
            url = require('../../assets/images/genresImages/history.jpg');
        }
        if (this.props.genre === 10) {
            url = require('../../assets/images/genresImages/horror.jpg');
        }
        if (this.props.genre === 11) {
            url = require('../../assets/images/genresImages/music.jpg');
        }
        if (this.props.genre === 12) {
            url = require('../../assets/images/genresImages/mystery.jpg');
        }
        if (this.props.genre === 13) {
            url = require('../../assets/images/genresImages/romance.jpg');
        }
        if (this.props.genre === 14) {
            url = require('../../assets/images/genresImages/science-fiction.jpg');
        }
        if (this.props.genre === 15) {
            url = require('../../assets/images/genresImages/thriller.jpg');
        }
        if (this.props.genre === 16) {
            url = require('../../assets/images/genresImages/war.jpg');
        }
        if (this.props.genre === 17) {
            url = require('../../assets/images/genresImages/western.jpg');
        }
        this.setState({ path: url })
    }
    navigate = () => {
        this.props.navigation.navigate('GenresFilmList',
            {
                data: GenresData[this.props.genre]
            }
        );
    }

    render() {
        return (
            <TouchableOpacity style={styles.images} onPress={() => this.navigate()}>
                <ImageBackground source={this.state.path} style={styles.itemContainer} imageStyle={{ borderRadius: 15 }}>
                    <Text style={styles.textStyle}>
                        {GenresData[this.props.genre].name}
                    </Text>
                </ImageBackground>
            </TouchableOpacity >
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        height: 180,
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#aaa',
        borderRadius: 20,
        marginBottom: 15,
        justifyContent: 'flex-end'
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5
    },
    images: {
        flex: 1,
    }
});