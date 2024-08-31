import auth from '@react-native-firebase/auth';

const signInWithEmail = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    console.log('User signed in!');
  } catch (error) {
    console.error(error);
  }
};

const signUpWithEmail = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    console.log('User account created & signed in!');
  } catch (error) {
    console.error(error);
  }
};

import firestore from '@react-native-firebase/firestore';

const createUserProfile = async (userId, data) => {
  try {
    await firestore().collection('users').doc(userId).set(data);
    console.log('User profile created!');
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
};

const getUserProfile = async (userId) => {
  try {
    const userProfile = await firestore().collection('users').doc(userId).get();
    if (userProfile.exists) {
      console.log('User profile:', userProfile.data());
    } else {
      console.log('No user profile found');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};