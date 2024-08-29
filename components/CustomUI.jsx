import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import TradingViewWidget from './TradingViewWidget';
import LinkWithIframe from './LinkWithIframe';
import AIChatInput from './AIChatInput';
import HeaderSection from './HeaderSection';
import QuoteCard from './QuoteCard';
import LinkPreviewCard from './LinkPreviewCard';

const CustomUI = ({ profileImage, cardTitle, previewData, randomQuote, urls, titles, showTV, gradient, previewLink }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paper</Text>

      {profileImage && cardTitle && (
        <HeaderSection
          profileImage={profileImage}
          cardTitle={cardTitle}
        />
      )}

      {showTV && (
        <View style={styles.tradingViewContainer}>
          <TradingViewWidget />
        </View>
      )}

      {previewData && <LinkPreviewCard previewData={previewData} />}

      {randomQuote && <QuoteCard quote={randomQuote} />}

      {urls && urls.length > 0 && urls.map((url, index) => (
        <LinkWithIframe key={index} url={url} title={titles[index]} />
      ))}

      <AIChatInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 16,
  },
  tradingViewContainer: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
});

export default CustomUI;