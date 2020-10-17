import React from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {
  Avatar,
  Caption,
  useTheme,
  Card,
  Paragraph,
  Title,
} from 'react-native-paper';

const LeftContent = (props) => <Avatar.Icon {...props} icon="camera" />;

const HomeScreen = (props) => {
  const colors = useTheme();
  return (
    <View>
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.image}>
            <Avatar.Image size={120} source={require('../assets/hlogo.png')} />

            <Card style={[styles.text, {color: colors.text}]} elevation={0}>
              <Card.Content>
                <Paragraph>
                  Begin Scanning and Listening , Upload a pdf or capture images
                  to start
                </Paragraph>
              </Card.Content>
            </Card>
          </View>

          <Card elevation={20} style={styles.card}>
            <Card.Content>
              <Title>Scan Images</Title>
              <Paragraph>
                Capture Images to be converted to audiobooks!
              </Paragraph>
            </Card.Content>
            <Card.Cover source={require('../assets/camera.png')} />
          </Card>


          <Card elevation={20} style={styles.card} onPress={()=>props.navigation.navigate("FileUpload")}>
            <Card.Content>
              <Title>Upload a PDF</Title>
              <Paragraph>
                The pdfs in your phone will be directly converted to audiobooks.
                What are you waiting for?
              </Paragraph>
            </Card.Content>
            <Card.Cover source={require('../assets/pdf.png')} />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent:'space-around',
  },
  text: {
    fontSize: 25,
    marginLeft: 80,
    marginRight: 80,
    height: 90,
    justifyContent: 'center',
    borderColor: 'black',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // flex: 1,
    alignItems: 'center',
  },
  card: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom : 25,
  },
});
