import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
const articleData = ['one', 'two', 'three', 'four', 'five'];
export default function App() {
  const [liked, setLiked] = useState([]);
  return (
    <View style={styles.container}>
      {articleData.map((article, index) => (
        <TouchableOpacity
          onPress={() => {
            console.log(liked);
            if (liked.includes(index)) {
              let unlike = liked.filter((elem) => elem !== index);
              setLiked(unlike);
            } else {
              setLiked([...liked, index]);
            }
          }}>
          <View style={styles.list}>
            <Text>{article}</Text>
            <FontAwesome
              name="heart"
              size={20}
              style={{ color: liked.includes(index) ? 'red' : 'black' }}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  list: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white"
  },
});