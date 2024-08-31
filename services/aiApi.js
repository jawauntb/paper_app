// apiService.js
import { Alert } from 'react-native';

export async function makeAPIRequest(payload) {
  try {
    const response = await fetch('https://emojipt-jawaunbrown.replit.app/promptly', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
    });

    const data = await response.json();
    if (data && data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      console.error('Unexpected API response:', data);
      return '';
    }
  } catch (error) {
    console.error('Error processing request:', error);
    Alert.alert('Error', 'Failed to process request');
  }
}