import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Camera Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
