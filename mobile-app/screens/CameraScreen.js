import React, {Component} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Card, Title, Paragraph} from 'react-native-paper';

export default class CamerScreen extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
    };
  }
  pickSingleWithCamera(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);
        // this.setState({
        //   image: {
        //     uri: image.path,
        //     width: image.width,
        //     height: image.height,
        //     mime: image.mime,
        //   },
        //   images: null,
        // });
        let a = [
          ...this.state.images,
          {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
        ];

        this.setState({images: a});
      })
      .catch((e) => alert(e));
  }

  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    })
      .then((image) => {
        console.log('received base64 image');
        this.setState({
          image: {
            uri: `data:${image.mime};base64,` + image.data,
            width: image.width,
            height: image.height,
          },
          images: null,
        });
      })
      .catch((e) => alert(e));
  }

  cleanupImages() {
    ImagePicker.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch((e) => {
        alert(e);
      });
  }

  cleanupSingleImage() {
    let image =
      this.state.image ||
      (this.state.images && this.state.images.length
        ? this.state.images[0]
        : null);
    console.log('will cleanup image', image);

    ImagePicker.cleanSingle(image ? image.uri : null)
      .then(() => {
        console.log(`removed tmp image ${image.uri} from tmp directory`);
      })
      .catch((e) => {
        alert(e);
      });
  }

  cropLast() {
    if (!this.state.image) {
      return Alert.alert(
        'No image',
        'Before open cropping only, please select image',
      );
    }

    ImagePicker.openCropper({
      path: this.state.image.uri,
      width: 200,
      height: 200,
    })
      .then((image) => {
        console.log('received cropped image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  pickSingle(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then((images) => {
        this.setState({
          // image: null,
          images: images.map((i) => {
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        });
      })
      .catch((e) => alert(e));
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  renderImage(image) {
    return (
      <Col>
        <Image
          style={{width: 300, height: 300, resizeMode: 'contain'}}
          source={image}
        />
      </Col>
    );
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  render() {
    const RenderImgs = () => {
      // let b=[];
      let b = [];
      let i = 0;
      for (i = 0; i < this.state.images.length - 1; i += 2) {
        b.push(
          <Row>
            {this.renderAsset(this.state.images[i])}
            {this.renderAsset(this.state.images[i + 1])}
          </Row>
        );
      }
      for (; i < this.state.images.length; i++) {
        b.push(this.renderAsset(this.state.images[i]));
      }
      return b;
    };

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.images ? (
            <View style={{flex:1}}>
              <Grid>
                <RenderImgs />
              </Grid>
            </View>
          ) : (
            <View></View>
          )}
          <View>
            <Text>Camera / Upload</Text>
          </View>
          <Card
            style={styles.card}
            elevation={20}
            onPress={() => this.pickSingleWithCamera(false)}>
            <Card.Content>
              <Title>Scan Images</Title>
              <Paragraph>Capture Images on with camera</Paragraph>
            </Card.Content>
          </Card>
          <Card
            style={styles.card}
            elevation={20}
            onPress={this.pickMultiple.bind(this)}>
            <Card.Content>
              <Title>Choose from Gallery</Title>
              <Paragraph>
                Choose multiple images from gallery to form the pdf
              </Paragraph>
            </Card.Content>
          </Card>
          <Card
            style={styles.card}
            elevation={20}
            onPress={this.cleanupImages.bind(this)}>
            <Card.Content>
              <Title>Clear</Title>
              <Paragraph>Clear up selected images</Paragraph>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  card: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    marginBottom: 25,
  },
});
