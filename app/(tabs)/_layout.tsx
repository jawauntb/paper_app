import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AddCardModal from '@/components/AddCardModal';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddPress = () => {
    setModalVisible(true);
  };

  const handleCreateCard = (newCard) => {
    // Add card creation logic here
    setModalVisible(false);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Custom "+" button in the tab bar */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handleAddPress}>
          <Ionicons name="add-circle-outline" size={50} color={Colors[colorScheme ?? 'light'].tint} />
        </TouchableOpacity>
      </View>

      {/* The modal to create a new card */}
      <AddCardModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreateCard}
      />
    </>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    position: 'absolute',
    bottom: 25,
    left: '50%',
    marginLeft: -30, // Half of button size to center it
    backgroundColor: 'transparent',
    zIndex: 10,
  },
});