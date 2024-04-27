import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CustomComponent = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./Object-Detection.jpg')}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
      <View style={styles.card}>
          <Text style={styles.cardText}>Mad Quiz 02</Text>
        </View>
      <View style={styles.card}>
          <Text style={styles.cardText}>Object Detection thorugh tensorFlow</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Features included:</Text>
          <Text style={styles.bulletPoint}>• Input image through Camera</Text>
          <Text style={styles.bulletPoint}>• Input image through device</Text>
          <Text style={styles.bulletPoint}>• History</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  image: {
    width: 380,
    height: 320,
    borderRadius: 20,
    marginBottom: 20,
    marginTop : 1,
    borderColor: '#ffffff',
    borderWidth: 14
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'vertical',
    justifyContent: 'center',
    marginTop:1,
    marginBottom:1
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
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
  cardText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:20,
    marginBottom: 10,
  },
  bulletPoint: {
    marginLeft: 27,
    fontSize: 18,
  },
});

export default CustomComponent;
