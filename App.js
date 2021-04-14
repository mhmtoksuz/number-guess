import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import Header from './components/Header';
import GameOverScreen from './Screens/GameOverScreen';
import GameScreen from './Screens/GameScreen';
import StartGameScreen from './Screens/StartGameScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return (<AppLoading 
    startAsync={fetchFonts} 
    onFinish={()=> setDataLoaded(true)}
    onError={err=> console.log(err)} />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRound(0);
    setUserNumber(null);
  };
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    
  };

  const gameOverHandler = numOfRounds=> {
    setGuessRound(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={ startGameHandler}/>;
  if (userNumber && guessRound <=0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  }else if(guessRound > 0){
    content = <GameOverScreen roundsNumber={guessRound} userNumber={userNumber} onRestart={configureNewGameHandler}></GameOverScreen>;
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess a number"></Header>
      {content}
    
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
