import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {useNavigationParam} from 'react-navigation-hooks';
import PlayerScreen from '../src/PlayerScreen';

const Player = (props) => {
//   const title = props.navigation.route.params.name;
  const song = {
    title: 'notes',
    url: require('../src/static/crop.mp3'), //"https://drive.google.com/uc?export=download&id=1bmvPOy2IVbkUROgm0dqiZry_miiL4OqI"
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#030303" />
      <PlayerScreen audio={song} />
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030303',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
