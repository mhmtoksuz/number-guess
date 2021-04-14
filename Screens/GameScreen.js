import React, {useState, useRef, useEffect} from 'react';
import {Text,View, StyleSheet, Alert, ScrollView, Dimensions} from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MyButton';
import NumberContainer from '../components/NumberContainer';
import {Ionicons} from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum= Math.floor(Math.random()* (max - min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min, max ,exclude);
    }else{
        return rndNum;
    }
};
const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
    <Text>#{numOfRound}</Text>
       <Text>{value}</Text>
    </View>);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1,100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuess, setPasGuess] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props;
    useEffect(()=>{
        if(currentGuess === userChoice){
            onGameOver(pastGuess.length);
        }
    },[currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'Lower' && currentGuess < props.userChoice) || (direction === 'Greater' && currentGuess > props.userChoice)){
            Alert.alert('Wrong choice', [{text: 'Sorry', style: 'cancel'}]);
            return;
        }
        if (direction === 'Lower') {
            currentHigh.current= currentGuess;
        }else{
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds=> curRounds+1);
        setPasGuess(curPasGuess => [nextNumber, ...curPasGuess]);

    };

    let listContainerStyle = styles.listContainer;
    if (Dimensions.get('window').width< 350) {
        listContainerStyle = styles.listContainerBig;
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this , 'Lower')}>
                    <Ionicons name={'md-remove'} size={24} color="white"></Ionicons>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this , 'Greater')}>
                    <Ionicons name={'md-add'} size={24} color="white"></Ionicons>
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
            <ScrollView contentContainerStyle={styles.list} >{
            pastGuess.map((guess, index) =>renderListItem(guess, pastGuess.length- index))}
            </ScrollView>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: '90%'
    },
    listContainer:{
        flex: 1,
        width: '60%'
    },
    listContainerBig:{
        width: '80%'
    },
    list:{
        flexGrow:1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    }

});

export default GameScreen;