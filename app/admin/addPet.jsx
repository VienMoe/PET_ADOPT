import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../../Config/firebaseConfig'; // Adjust the import path as necessary
import { Picker } from '@react-native-picker/picker'; // Updated Picker import

export default function AddPetScreen() {
  const db = getFirestore();
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [category, setCategory] = useState('Dogs');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Text input for imageUrl
  const [userImage, setUserImage] = useState(''); // Text input for userImage
  const [petgender, setPetgender] = useState('Male'); // Gender picker
  const [username, setUsername] = useState(''); // Owner's username
  const [weight, setWeight] = useState(''); // Weight
  const [error, setError] = useState('');

  // Function to handle adding a new pet
  const handleAddPet = async () => {
    try {
      // Validate age to be a number
      if (isNaN(age)) {
        setError('Age must be a number.');
        return;
      }

      const petData = {
        name,
        about,
        age: Number(age),
        breed,
        category,
        email,
        id,
        imageUrl, // Pet image URL from text input
        userImage, // User image URL from text input
        petgender, // Pet gender
        username, // Pet owner name
        weight, // Pet weight
        ownerId: auth.currentUser.uid, // Add ownerId to relate the pet to the user
      };
      await addDoc(collection(db, 'Pets'), petData);
      alert('Pet added successfully!');
      // Reset the form
      setName('');
      setAbout('');
      setAge('');
      setBreed('');
      setCategory('Dogs');
      setEmail('');
      setId('');
      setImageUrl('');
      setUserImage('');
      setPetgender('Male');
      setUsername('');
      setWeight('');
    } catch (err) {
      setError(err.message);
      console.error('Error adding pet:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Add New Pet</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          placeholder="Pet Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="About"
          style={styles.textArea}
          value={about}
          onChangeText={setAbout}
          multiline={true}
        />

        <TextInput
          placeholder="Age (numbers only)"
          style={styles.input}
          value={age}
          onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ''))} // Allow only numbers
        />

        <TextInput
          placeholder="Breed"
          style={styles.input}
          value={breed}
          onChangeText={setBreed}
        />

        <Text style={styles.label}>Category:</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Dogs" value="Dogs" />
          <Picker.Item label="Cats" value="Cats" />
          <Picker.Item label="Birds" value="Bird" />
          <Picker.Item label="Fish" value="Fish" />
        </Picker>

        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={petgender}
          style={styles.picker}
          onValueChange={(itemValue) => setPetgender(itemValue)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>

        <TextInput
          placeholder="Owner's Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Weight"
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="ID"
          style={styles.input}
          value={id}
          onChangeText={setId}
        />

        <TextInput
          placeholder="Pet Image URL"
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        <TextInput
          placeholder="Owner's Image URL"
          style={styles.input}
          value={userImage}
          onChangeText={setUserImage}
        />

        <Pressable style={styles.addButton} onPress={handleAddPet}>
          <Text style={styles.buttonText}>Add Pet</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top', // Align text to the top
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

