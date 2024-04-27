import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo-vector-icons
import * as FileSystem from 'expo-file-system';

const ImageIdentificationComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to fetch data from JSON file
    const fetchData = async () => {
      try {
        const jsonUri = `${FileSystem.documentDirectory}detectedObjects.json`;
        const fileContent = await FileSystem.readAsStringAsync(jsonUri);
        const jsonData = JSON.parse(fileContent);
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error('Error reading data from JSON file: ', error);
        setData(null); // Set data to null if there's an error
      }
    };

    // Call the function to fetch data when component mounts
    fetchData();
  }, []);

  const handleRefresh = async () => {
    // Function to refresh data
    try {
      const jsonUri = `${FileSystem.documentDirectory}detectedObjects.json`;
      const fileContent = await FileSystem.readAsStringAsync(jsonUri);
      const jsonData = JSON.parse(fileContent);
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error('Error refreshing data: ', error);
    }
  };

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.headerContainer}>
      </View>
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item[0] }} style={styles.image} />
            <Text style={styles.sectionTitle}>Identified Object:</Text>
            <View style={styles.objectsContainer}>
              <Text style={styles.objectText}>{item[1]}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#222',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20, // Adjusted marginTop to move the header down
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24, // Increased text size
    color: '#333',
    textAlign: 'center',
  },
  refreshButton: {
    padding: 5,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 20, // Added marginBottom to separate each item
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
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  objectsContainer: {
    alignItems: 'center',
  },
  objectText: {
    marginVertical: 5,
    fontSize: 16,
    color: '#555',
  },
});

export default ImageIdentificationComponent;
