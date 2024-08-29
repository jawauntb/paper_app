import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ConfettiCannon from 'react-native-confetti-cannon';
import Share from 'react-native-share';

export default function HeaderSection({ profileImage, cardTitle }) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleLike = () => {
    setShowConfetti(true);
    // setTimeout(() => setShowConfetti(false), 3000);
  };

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [showConfetti]);

  const handleShareClick = () => {
    Share.open({
      title: cardTitle,
      message: "Check out this amazing content!",
      url: 'https://example.com', // replace with the actual URL or remove if not needed
    }).catch((err) => console.error(err));
  };

  return (
    <View style={styles.header}>
      {/* Profile Picture */}
      <Image source={{ uri: profileImage }} style={styles.profileImage} />

      {/* Card Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{cardTitle}</Text>
      </View>

      {/* Icons for Like and Share */}
      <View style={styles.icons}>
        <TouchableOpacity onPress={handleLike}>
          <Icon name="heart" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShareClick}>
          <Icon name="share-alt" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {showConfetti && <ConfettiCannon count={70} origin={{ x: 10, y: -500 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    marginVertical: 10,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
  },
});