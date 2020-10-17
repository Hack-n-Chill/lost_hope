import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const FileUpload = () => {
  return (
    <View style={styles.container}>
      <Text>File Upload Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default FileUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
