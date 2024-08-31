import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { makeAPIRequest } from '../../services/aiApi.js'

function AIChatInput() {
  const [typedText, setTypedText] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleSubmit() {
    setIsLoading(true);

    const textInput = `${typedText}`;
    const rawContent = await makeAPIRequest({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful AI" },
        { role: "user", content: textInput }
      ]
    });

    setGeneratedContent(rawContent);
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask the AI about this card..."
        value={typedText}
        onChangeText={(text) => setTypedText(text)}
      />
      <Button
        title={isLoading ? 'Loading...' : 'Ask AI'}
        onPress={handleSubmit}
        disabled={isLoading}
      />
      {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
      {generatedContent && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>{generatedContent}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  outputContainer: {
    marginTop: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
  },
  outputText: {
    color: '#333',
  },
});

export default AIChatInput;