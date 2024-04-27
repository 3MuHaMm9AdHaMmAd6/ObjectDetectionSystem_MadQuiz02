import React, { useState } from 'react';
import { Pressable, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import classifyUsingMobilenet from './objectDetectionScreen';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

export default function ImagePickerExample() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [showWarning, setShowWarning] = useState(false); // State to manage warning visibility

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveToJSON = async (imageUri, identifiedObjects) => {
    try {

      const jsonUri = `${FileSystem.documentDirectory}detectedObjects.json`;

      //await FileSystem.writeAsStringAsync(jsonUri, '[]');


      console.log(imageUri);
      console.log(identifiedObjects[0].className);

      const newDataEntry = [imageUri, identifiedObjects[0].className];


      // Check if the file exists
    const fileExists = await FileSystem.getInfoAsync(jsonUri);

    if (fileExists.exists) 
    {
      console.log("file exists")
      // File exists, so read existing data
      let existingData = await FileSystem.readAsStringAsync(jsonUri);
      existingData = JSON.parse(existingData);
    
      // Append new data entry to existing data
      existingData.push(newDataEntry);

      // Write updated data back to JSON file
      await FileSystem.writeAsStringAsync(jsonUri, JSON.stringify(existingData));

      console.log(existingData);

    } 
  }
    catch (error) {
      console.error('Error saving JSON file:', error);
    }
  };

  const handlePress = async () => {
    if (image) {
      const resizedPhoto = await manipulateAsync(
        image,
        [{ resize: { width: 600, height: 600 } }],
        { compress: 0, format: 'jpeg' }
      );

      const identifiedObjects = await classifyUsingMobilenet(resizedPhoto.uri);
      saveToJSON(image, identifiedObjects);
      navigation.navigate('ImageViewInSelectImage', { imageUri: image, identifiedObjects });
      //navigation.navigate('History',{});
    } else {
      setShowWarning(true); // Show warning if no image is selected
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an Image</Text>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
      {showWarning && (
        <Text style={styles.warningText}>Please select an image first.</Text>
      )}
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.pickImageButton]} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an image</Text>
        </Pressable>
        <View style={{ height: 10 }} /> 
        <Pressable style={[styles.button, styles.classifyButton]} onPress={handlePress}>
          <Text style={styles.buttonText}>Classify Objects</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    width: "80%",
    fontWeight: '500',
    marginBottom: 10,
    color: 'white',
    marginBottom: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingBottom: 17,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  buttonContainer: {
    alignItems: 'center', // Center horizontally
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    width: '80%', // Adjusted width
  },
  pickImageButton: {
    marginTop: 35,
    paddingHorizontal: 50,
    backgroundColor: '#aaf0d1',
  },
  classifyButton: {
    marginTop: 30,
    paddingHorizontal: 40,
    backgroundColor: '#d4a5ff', // Light purple color for Classify button
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  warningText: {
    color: 'red',
    marginTop: 10,
  },
});
