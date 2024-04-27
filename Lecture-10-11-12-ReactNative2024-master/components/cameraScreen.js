import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icon styling
import { useNavigation } from '@react-navigation/native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import classifyUsingMobilenet from './objectDetectionScreen';

const CameraWithCaptureButton = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Original Photo:', photo); // Log the original captured image

        // Resize the image to a height and width of 500 pixels
        const resizedPhoto = await manipulateAsync(
          photo.uri,
          [{ resize: { width: 500, height: 500 } }],
        );
        console.log('Resized Photo:', resizedPhoto); // Log the resized image

        const identifiedObjects = await classifyUsingMobilenet(resizedPhoto.uri); // Example identified objects
        navigation.navigate('ImageView', { imageUri: resizedPhoto.uri, identifiedObjects });
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to capture image.');
      }
    }
  };

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={cameraType} ref={cameraRef} />
      </View>
      {/* Capture Button Container */}
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
          <Ionicons name="camera-reverse" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Ionicons name="camera" size={50} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraContainer: {
    flex: 3, // Take up 3/4th of the available space
    justifyContent: 'flex-end', // Align camera to bottom
  },
  camera: {
    ...StyleSheet.absoluteFillObject, // Fill the camera container
  },
  captureButtonContainer: {
    flex: 1, // Take up 1/4th of the available space
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
    paddingHorizontal: 20, // Add horizontal padding for space around buttons
  },
  flipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white
    borderRadius: 50,
    padding: 15,
    position: 'absolute', // Position the flip button absolutely
    left: 20, // Set left position
    top: '50%', // Center vertically
    transform: [{ translateY: -25 }], // Adjust vertically for button size
  },
  captureButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white
    borderRadius: 50,
    padding: 20,
  },
});

export default CameraWithCaptureButton;
