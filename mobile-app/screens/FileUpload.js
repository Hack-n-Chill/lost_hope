import React from 'react';
import {useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Surface} from 'react-native-paper';
var RNFS = require('react-native-fs');
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'react-native-fetch-blob';

const FileUpload = () => {
  const [pdf, setpdf] = useState(null);
  const uploadUrl = 'http://34.123.55.155/predict';

  const getPdfFile = async () => {
    var name;
    var realPath;
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      console.log(res.uri);
      console.log(res.type);
      console.log(res.name);
      console.log(res.size);

      const split = res.uri.split('/');
      name = split.pop();
      const inbox = split.pop();
      realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
      RNFetchBlob.fs
        .stat(res.uri)
        .then((stats) => {
          realPath = stats.path;
        })
        .catch((err) => {
          console.log(err);
        });
      // realPath = res.uri;
      console.log(realPath);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }

    let dirs = RNFetchBlob.fs.dirs;
    // let name_w_ext = name.split('.')[0];

    RNFetchBlob.fs
      .mkdir(dirs.DocumentDir + '/recordings')
      .then(() => console.log('Directory recordings created'))
      .catch((err) => console.log('Directory already exists or ', err));

    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      path: dirs.DocumentDir + '/recordings/' + name + '.wav',
    })
      .fetch('POST', uploadUrl, {'Content-Type': 'multipart/form-data'}, [
        {name: 'pdf', data: JSON.stringify(RNFetchBlob.wrap(realPath))},
      ])
      .then((res) => {
        console.log('Recording saved at', res.path);
      });
  };

  return (
    <View style={styles.container}>
      <Surface elevation={20} style={{margin: 10}}>
        <TouchableOpacity onPress={() => getPdfFile()}>
          <Text style={styles.text}>
            Select the pdf file to be converted to an audiobook
          </Text>
          <Image
            style={{width: 300, height: 300, resizeMode: 'contain'}}
            source={require('../assets/fup2.png')}
          />
        </TouchableOpacity>
      </Surface>
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
  text: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    fontSize: 20,
    color: 'orange',
  },
});
