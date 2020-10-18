import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';


export default function Controller() {
  const playbackState = usePlaybackState();
  const [isPlaying,setplaying] = useState("paused");//useRef('paused'); //paused play loading

  useEffect(() => {
    // console.log('Player State', playbackState);

    //set the player state 
    if (playbackState === 'playing' || playbackState === 3) {
      setplaying("playing")
      // isPlaying.current = 'playing';
    } else if (playbackState === 'paused' || playbackState === 2) {
      setplaying("paused")
      // isPlaying.current = 'paused';
    } else {
        setplaying("loading")
      // isPlaying.current = 'loading'
    }
  }, [playbackState]);

  const returnPlayBtn = () => {
    switch (isPlaying) {
      case 'playing':
        return <Icon color="#93A8B3" name="pause" size={32} />;
      case 'paused':
        return <Icon color="#93A8B3" name="play" size={32} style={{marginLeft:10}}/>;
      default:
        return <ActivityIndicator size={32} color="#93A8B3"/>;
    }
  };

  const onPlayPause = () => {
    if (isPlaying === 'playing') {
      TrackPlayer.pause();
    } else if (isPlaying === 'paused') {
      TrackPlayer.play();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style = {styles.playbutton} onPress={onPlayPause}>
        {returnPlayBtn()}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
  },
  playbutton:{
    backgroundColor: "#FFF",
    borderColor: "gold",
    borderWidth:16,
    borderRadius:64,
    height: 110,
    width:110,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:30,

  }
});
