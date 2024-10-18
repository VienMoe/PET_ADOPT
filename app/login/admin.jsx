// app/AdminScreen.js
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth'; // Import signOut from Firebase Auth

export default function AdminScreen() {
  const navigation = useNavigation();
  const auth = getAuth();

  // Function to handle adding a new pet
  const handleAddPet = () => {
    navigation.navigate('admin/addPet'); // Navigate to the Add Pet screen
  };

  // Function to handle editing a pet
  const handleEditPet = () => {
    navigation.navigate('admin/editPet'); // Navigate to the Edit Pet screen
  };

  // Function to handle sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Successful sign out, navigate to the login screen
        navigation.navigate('login/LoginWithEmailScreen'); // Ensure this route exists in your app
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      
      <Pressable style={styles.addButton} onPress={handleAddPet}>
        <Text style={styles.buttonText}>Add Pet</Text>
      </Pressable>

      <Pressable style={styles.editButton} onPress={handleEditPet}>
        <Text style={styles.buttonText}>Edit Pet</Text>
      </Pressable>

      <Pressable style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  editButton: {
    backgroundColor: '#FFC107', // Use a different color for the Edit button
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  signOutButton: {
    backgroundColor: '#FF5733', // Change color to make the sign out button distinct
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
