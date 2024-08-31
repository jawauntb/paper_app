import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import CardUI from '../../components/CardUI';
import AddCardModal from '../../components/AddCardModal';

const Index = () => {
  const [previewData, setPreviewData] = useState(null);
  // const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current card index

  const grad = "4";
  const url1 = "https://docs.google.com/document/d/1OtU7x2TQsLyTUb-2Z7Bd2qYeHRWoUS3RDPZRMDK2Xp8/edit?usp=sharing";
  const url2 = "https://x.com/Vivek4real_/status/1828391050387345847";
  const t1 = "The Coming Optics Shortage & Telecom Suppliers' New Dawn";
  const t2 = "What Happens To Bitcoin After Every Election?";
  const titles = [t1, t2];
  const urls = [url1, url2];
  const randomQuote = "Heraclitus says \"To fight with desire is hard: whatever it wishes, it buys at the price of soul.\"";
  const previewLink = "https://open.substack.com/pub/gammafy/p/the-underlying-005?r=4fecb&utm_medium=ios";

  useEffect(() => {
    fetch(`https://api.linkpreview.net/?key=e9cfaa0ab764d189563522fd59f1ac1b&q=${previewLink}`)
      .then(response => response.json())
      .then(data => setPreviewData(data))
      .catch(error => console.error("Error fetching link preview:", error));
  }, []);

    const [cards, setCards] = useState([
    {
      title: "Things You Might Like",
      urls: urls,
      titles: titles,
      text: randomQuote,
      showTV: true,
      gradient: grad,
      previewLink: previewLink,
    },
    // Add more cards here
    ]);
  
  const handleCreateCard = (newCard) => {
    // Use the previous state to add the new card correctly
    setCards(prevCards => [...prevCards, newCard]);
    setModalVisible(false);
    console.log('created', newCard, 'curr cards', cards);
  };

  const handleSwipe = (index) => {
    setCurrentIndex(index);
  };

  const handleSwipeBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={cards}
        cardIndex={currentIndex}
        renderCard={(card) => (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <CardUI
              profileImage={require('../../assets/images/cardlogo.jpg')}
              cardTitle={card.title || "Things You Might Like"}
              previewData={previewData}
              randomQuote={card.text || "Default quote text."}
              urls={card.urls} // Pass the array of URLs
              titles={card.titles} // Pass the array of titles
              showTV={card.showTV || false}
              gradient={card.gradient || grad}
              previewLink={card.previewLink || ""}
            />
          </ScrollView>
        )}
        onSwiped={(cardIndex) => handleSwipe(cardIndex + 1)}
        onSwipedRight={(cardIndex) => handleSwipe(cardIndex + 1)}
        onSwipedLeft={handleSwipeBack}
        onSwipedAll={() => { console.log('All cards swiped!') }}
        backgroundColor={'#f4f4f4'}
        stackSize={3}
        swipeBackCard
      />
      <AddCardModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreateCard} // Pass the handleCreateCard function to the modal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
});

export default Index;

