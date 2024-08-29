import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import TradingViewWidget from './TradingViewWidget';
import LinkWithIframe from './LinkWithIframe';
import QuoteCard from './QuoteCard';
import LinkPreviewCard from './LinkPreviewCard';

const AddCardModal = ({ visible, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [text, setText] = useState('');
  const [showTV, setShowTV] = useState(false);
  const [ticker, setTicker] = useState('');
  const [media, setMedia] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [isPreviewLink, setIsPreviewLink] = useState(false);

  const handleAddLink = () => {
    setLinks([...links, { url, customTitle: '', preview: isPreviewLink }]);
    setUrl('');
    setIsPreviewLink(false);
  };

  const handleAddMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newMedia = { uri: result.uri, isCover: false, type: result.type };
      setMedia([...media, newMedia]);
    }
  };

  const handleSetCoverImage = (uri) => {
    setCoverImage(uri);
    const updatedMedia = media.map(item => ({
      ...item,
      isCover: item.uri === uri
    }));
    setMedia(updatedMedia);
  };

    const handleCreate = () => {
    const newCard = {
        title,
        text,
        showTV,
        ticker,
        urls: links.map(link => link.url), // Extract URLs from the links array
        titles: links.map(link => link.customTitle || ''), // Extract titles from the links array
        media,
        coverImage,
        previewLink: isPreviewLink ? url : '', // Set the previewLink if it's a preview link
        // gradient: grad, // If you want to use the default gradient
        previewData: {} // Fetch preview data if required
    };
    onCreate(newCard);
        onClose();
        console.log('Card created', newCard);
    };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <Text style={styles.modalTitle}>Create New Card</Text>

        {coverImage && (
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
        )}

        <TextInput
          placeholder="Card Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        {media.map((item, index) => (
          <View key={index} style={styles.mediaContainer}>
            <Image source={{ uri: item.uri }} style={styles.mediaImage} />
            <TouchableOpacity
              onPress={() => handleSetCoverImage(item.uri)}
              style={styles.checkboxContainer}
            >
              <Ionicons
                name={item.isCover ? "checkbox" : "square-outline"}
                size={24}
                color="blue"
              />
              <Text style={styles.checkboxLabel}>Set as Cover Image</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Button title="Add Media" onPress={handleAddMedia} />

        <TextInput
          placeholder="Additional Text"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />

        <View style={styles.linkSection}>
          <TextInput
            placeholder="Add a URL"
            value={url}
            onChangeText={setUrl}
            style={styles.input}
          />

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              onPress={() => setIsPreviewLink(true)}
              style={[
                styles.toggleButton,
                isPreviewLink && styles.activeToggleButton,
              ]}
            >
              <Text style={styles.toggleButtonText}>Preview Link</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsPreviewLink(false)}
              style={[
                styles.toggleButton,
                !isPreviewLink && styles.activeToggleButton,
              ]}
            >
              <Text style={styles.toggleButtonText}>Iframe with Title</Text>
            </TouchableOpacity>
          </View>

          {!isPreviewLink && (
            <TextInput
              placeholder="Custom Title"
              value={links.customTitle}
              onChangeText={(text) => {
                const newLinks = [...links];
                newLinks.customTitle = text;
                setLinks(newLinks);
              }}
              style={styles.input}
            />
          )}

          <Button title="Add Link" onPress={handleAddLink} />

          {links.map((link, index) => (
            <View key={index} style={styles.linkContainer}>
              <Text>{link.url}</Text>
              {!link.preview && (
                <TextInput
                  placeholder="Custom Title"
                  value={link.customTitle}
                  onChangeText={(text) => {
                    const newLinks = [...links];
                    newLinks[index].customTitle = text;
                    setLinks(newLinks);
                  }}
                  style={styles.input}
                />
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={() => setShowTV(!showTV)} style={styles.checkboxContainer}>
          <Ionicons name={showTV ? "checkbox" : "square-outline"} size={24} color="blue" />
          <Text style={styles.checkboxLabel}>Add TradingView Widget</Text>
        </TouchableOpacity>

        {showTV && (
          <TextInput
            placeholder="Ticker Symbol"
            value={ticker}
            onChangeText={setTicker}
            style={styles.input}
          />
        )}

        <Button title="Create" onPress={handleCreate} />
        <Button title="Cancel" onPress={onClose} color="red" />
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  linkSection: {
    marginBottom: 20,
  },
  linkContainer: {
    marginVertical: 10,
  },
  mediaContainer: {
    marginVertical: 10,
  },
  mediaImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeToggleButton: {
    backgroundColor: '#d3d3d3',
  },
  toggleButtonText: {
    fontSize: 16,
  },
  coverImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
});

export default AddCardModal;