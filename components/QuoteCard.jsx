import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ConfettiCannon from 'react-native-confetti-cannon';

function QuoteCard({ quote }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setShowConfetti(true);
    // setTimeout(() => setShowConfetti(false), 3000);
  };
  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [showConfetti]);

  return (
    <View style={styles.card}>
      <Text style={styles.quote}>{quote}</Text>
      <TouchableOpacity onPress={handleLikeClick} style={styles.likeButton}>
        <Icon name="heart" size={24} color={isLiked ? 'red' : 'gray'} />
      </TouchableOpacity>
      {showConfetti && <ConfettiCannon count={70} origin={{ x: 0, y: 0.6 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    padding: 16,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  quote: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  likeButton: {
    marginTop: 10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#f8f8f8',
  },
});

export default QuoteCard;