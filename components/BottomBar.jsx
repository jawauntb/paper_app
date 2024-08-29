import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomBar = ({ onAddPress, onHomePress }) => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity onPress={onHomePress} style={styles.button}>
        <Ionicons name="home-outline" size={30} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={50} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="ellipsis-horizontal-outline" size={30} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  button: {
    padding: 10,
  },
  addButton: {
    padding: 10,
  },
});

export default BottomBar;