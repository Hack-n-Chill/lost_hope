import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme, Avatar} from 'react-native-paper';
import ProfileScreen from './ProfileScreen';
import CameraScreen from './CameraScreen';
import HomeScreen from './HomeScreen';
import FileUpload from './FileUpload';
import RecordingScreen from './RecordingScreen';
import Player from './PlayerScreen';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
const ProfileStack = createStackNavigator();
const CameraStack = createStackNavigator();
const HomeStack = createStackNavigator();
const RecordingsStack = createStackNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#FF6347',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraStackScreen}
        options={{
          tabBarLabel: 'Camera',
          tabBarColor: '#FF6347',
          tabBarIcon: ({color}) => (
            <Icon name="camera" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Recordings"
        component={RecordingsStackScreen}
        options={{
          tabBarLabel: 'Recordings',
          tabBarColor: '#FF6347',
          tabBarIcon: ({color}) => (
            <Icon name="md-recording-sharp" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CameraStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <CameraStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <CameraStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          title: '',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          // headerRight: () => (
          //   <View style={{marginRight: 10}}>
          //     <MaterialCommunityIcons.Button
          //       name="account-edit"
          //       size={25}
          //       backgroundColor={colors.background}
          //       color={colors.text}
          //       onPress={() => navigation.navigate('EditCamera')}
          //     />
          //   </View>
          // ),
        }}
      />
      {/* <CameraStack.Screen
        name="EditCamera"
        options={{
          title: 'Edit Camera',
        }}
        component={EditCameraScreen}
      /> */}
    </CameraStack.Navigator>
  );
};

const HomeStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <HomeStack.Screen
        name="Home"
        component={(props) => <HomeScreen {...props} />}
        options={{
          title: '',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="FileUpload"
        component={(props) => <FileUpload {...props} />}></HomeStack.Screen>
      <HomeStack.Screen
        name="Camera"
        component={(props) => <CameraScreen {...props} />}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          // headerRight: () => (
          //   <View style={{marginRight: 10}}>
          //     <MaterialCommunityIcons.Button
          //       name="account-edit"
          //       size={25}
          //       backgroundColor={colors.background}
          //       color={colors.text}
          //       onPress={() => navigation.navigate('EditProfile')}
          //     />
          //   </View>
          // ),
        }}
      />
      {/* <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfileScreen}
      /> */}
    </ProfileStack.Navigator>
  );
};


const RecordingsStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <RecordingsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <RecordingsStack.Screen
        name="Recordings"
        component={(props) => <RecordingScreen {...props} />}
        options={{
          title: '',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <RecordingsStack.Screen
        name="Player"
        component={(props) => (
          <Player {...props} />
        )}></RecordingsStack.Screen>
    </RecordingsStack.Navigator>
  );
};
