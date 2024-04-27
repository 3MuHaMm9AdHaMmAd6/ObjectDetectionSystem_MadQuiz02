import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ImageViewAndIdentifiedObjects = ({ route }) => {
  const { imageUri, identifiedObjects } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input Image</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View style={styles.objectsContainer}>
        <Text style={styles.heading}>Identified Objects:</Text>
        {identifiedObjects.map((object, index) => (
          <View key={index} style={styles.objectContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.object}>
              {object.className.split(', ').join(', ')}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    // paddingLeft: 35,
    // paddingRight: 35
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
  objectsContainer: {
    width: "80%",
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  objectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bullet: {
    fontSize: 16,
    marginRight: 5,
    color: '#666666',
  },
  object: {
    fontSize: 18,
    color: '#666666',
  },
});

export default ImageViewAndIdentifiedObjects;
