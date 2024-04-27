import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator , } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from "./components/cameraScreen";
import SignUpScreen from "./components/signUpScreen";
import SignInScreen from "./components/signInScreen";
import ImageScreen from "./components/imageScreen";
//import ImageClassifier from "./components/objectDetectionScreen";
//import BottomNavigator from "./components/MainScreen";
import CameraWithCaptureButton from './components/cameraScreen';
import ImageViewAndIdentifiedObjects from './components/sectionAfterCameraScreen';
import PickImage from './components/selectImage';
import HistoryComponent from './components/history.js';
import MainScreen from './components/MainScreen.js';
import Ionicons from '@expo/vector-icons/Ionicons';

import ImagePickerExample from './components/selectImage';

const Stack = createStackNavigator();

const TakeImageSection = () => {
  return (
      <Stack.Navigator
        initialRouteName="Camera"
        screenOptions={{
          headerTitleAlign: 'center', // Align title to the center
          headerStyle: {
            backgroundColor: '#444', // Header background color
          },
          headerTintColor: '#fff', // Text color
          headerTitleStyle: {
            fontWeight: 'bold', // Title text style
          },
        }}>
        <Stack.Screen
          name="Camera"
          component={CameraWithCaptureButton}
        />
        <Stack.Screen
          name="ImageView"
          component={ImageViewAndIdentifiedObjects}
          options={{
            title: 'Image View', // Set title for the screen
          }}
        />
      </Stack.Navigator>
  );
};


const SelectImageFromDevice = () => {
  return (
      <Stack.Navigator
        initialRouteName="SelectImage"
        screenOptions={{
          headerTitleAlign: 'center', // Align title to the center
          headerStyle: {
            backgroundColor: '#444', // Header background color
          },
          headerTintColor: '#fff', // Text color
          headerTitleStyle: {
            fontWeight: 'bold', // Title text style
          },
        }}>
        <Stack.Screen
          name="SelectImage"
          component={PickImage}
          options={{
            title: 'Select Image', // Set title for the screen
          }}
        />
        <Stack.Screen
          name="ImageViewInSelectImage"
          component={ImageViewAndIdentifiedObjects}
          options={{
            title: 'Image View', // Set title for the screen
          }}
        />
      </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home" // Set the initial route name to "Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CaptureImage') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'UploadImage') {
            iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => { return null; },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" options={{
            headerTitleAlign: 'center', // Align the header title to the center
            headerStyle: {
              backgroundColor: '#444', // Header background color
            },
            headerTintColor: '#fff', // Text color
            headerTitleStyle: {
              fontWeight: 'bold', // Title text style
              color: '#fff', // Text color
            },
          }} component={MainScreen} />
      <Tab.Screen name="CaptureImage" options={{ headerShown: false,headerTransparent: true  }} component={TakeImageSection} />
      <Tab.Screen name="UploadImage" options={{ headerShown: false,headerTransparent: true  }} component={SelectImageFromDevice} />
      <Tab.Screen name="History" options={{
            headerTitleAlign: 'center', // Align the header title to the center
            headerStyle: {
              backgroundColor: '#444', // Header background color
            },
            headerTintColor: '#fff', // Text color
            headerTitleStyle: {
              fontWeight: 'bold', // Title text style
              color: '#fff', // Text color
            },
          }}component={HistoryComponent} />
    </Tab.Navigator>
    </NavigationContainer>
  );
};
const App = () => {
  return (
    // <TakeImageSection/>
    <BottomTabNavigator/>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="SignIn" component={SignInScreen} />
    //     <Stack.Screen name="SignUp" component={SignUpScreen} />
    //     <Stack.Screen
    //       name="CameraScreen"
    //       component={CameraScreen}
    //       options={{ title: "Camera" }}
    //     />
    //     <Stack.Screen
    //       name="ImageScreen"
    //       component={ImageScreen}
    //       options={{ title: "Image" }}
    //     />
    //     <Stack.Screen
    //       name="ImageClassifier"
    //       component={ImageClassifier}
    //       options={{ title: "Object Detection Classifier" }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;
