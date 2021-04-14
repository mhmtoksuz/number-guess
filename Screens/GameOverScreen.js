import React from 'react';
import {View, Text, StyleSheet, Button, Image, Dimensions} from 'react-native';
import MainButton from '../components/MyButton';
import GameScreen from './GameScreen';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Game Over</Text>
            <View style={styles.imageContainer}>
            <Image 
            //source={require('../assets/success.png')} 
            source={{uri: 'https://via.placeholder.com/300/09f/fff.png'}} 
            style={styles.image} 
            resizeMode="cover"
            />
            </View>
              <Text style={styles.textArea}> Number of rounds {props.roundsNumber}</Text>
              <Text style={styles.textArea}>Number was: {props.userNumber}</Text>
            <MainButton onPress={props.onRestart}> New Game</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer:{
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
        borderRadius: Dimensions.get('window').width * 0.8/ 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image:{
        width:'100%',
        height: '100%'
    },
    textArea:{
        fontSize: Dimensions.get('window').height < 200 ? 16 : 20
    }
});

export default GameOverScreen;