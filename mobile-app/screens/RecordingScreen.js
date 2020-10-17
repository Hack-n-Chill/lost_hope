import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const RecordingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Recording Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default RecordingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
