import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Surface} from 'react-native-paper';
import RNFetchBlob from 'react-native-fetch-blob';
import {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from 'react-navigation-hooks';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Recording 1 ',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Sociology  notes',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Recording three',
  },
];



const RecordingScreen = (props) => {
  let dirs = RNFetchBlob.fs.dirs;
  // const {navigate} = useNavigation();
  const [recs, setrec] = useState([]);
  useEffect(() => {
    console.log(dirs.DocumentDir + '/recordings');
    RNFetchBlob.fs
      .ls(dirs.DocumentDir + '/recordings')
      .then((files) => setrec(files));

    console.log(recs);
  }, []);

  
  const renderItem = ({item}) => <Item title={item.title} />

  const Item = ({title}) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Player')}>
        <Surface elevation={10} style={styles.title}>
          <Icon name="md-musical-notes" size={26} />
          <Text style={styles.text}>{title}</Text>
        </Surface>
      </TouchableOpacity>
    </View>
  );
  
  
  return (
    <View>
      <Text style={{padding: 10, fontSize:16}}>Recording Screen</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  item: {
    backgroundColor: '#ffe4bf',
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 8,
  },
  title: {
    padding: 20,
    fontSize: 52,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    // padding: 20,
    fontSize: 20,
  },
});
