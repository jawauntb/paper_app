import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ConfettiCannon from 'react-native-confetti-cannon';
import WebView from 'react-native-webview';

function LinkWithIframe({ url, title }) {
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const isGoogleDoc = url.includes("docs.google.com") || url.includes("lovebutton") || url.includes("archive");

  const handleButtonClick = () => {
    if (isGoogleDoc) {
      setIsIframeVisible(!isIframeVisible); // Toggle iframe visibility
    } else {
      Linking.openURL(url).catch(err => Alert.alert('Failed to open page', err.message));
    }
  };
  
  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [showConfetti]);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setShowConfetti(true);
    // setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <TouchableOpacity onPress={handleLikeClick} style={styles.iconButton}>
          <Icon name="heart" size={24} color={isLiked ? 'red' : 'gray'} />
        </TouchableOpacity>
        <Text onPress={() => Linking.openURL(url)} style={styles.title}>
          {title}
        </Text>
        {isGoogleDoc && (
          <TouchableOpacity onPress={handleButtonClick} style={styles.iconButton}>
            <Icon name={isIframeVisible ? 'minus' : 'plus'} size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {isIframeVisible && isGoogleDoc && (
        <View style={styles.webViewContainer}>
          <WebView source={{ uri: url }} style={styles.webView} />
        </View>
      )}

      {showConfetti && <ConfettiCannon count={70} origin={{ x: 20, y: 0 }} />}
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginHorizontal: 8,
  },
  iconButton: {
    padding: 8,
  },
  webViewContainer: {
    marginTop: 16,
    height: 200,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
  },
});

export default LinkWithIframe;