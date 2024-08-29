import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Linking } from 'react-native';

function LinkPreviewCard({ previewData }) {
  return (
    <View style={styles.card}>
      {previewData ? (
        <TouchableOpacity onPress={() => Linking.openURL(previewData.url)} style={styles.fullWidth}>
          <Image
            source={{ uri: previewData.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.title}>{previewData.title}</Text>
          <Text style={styles.description}>{previewData.description}</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    padding: 16,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  fullWidth: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default LinkPreviewCard;