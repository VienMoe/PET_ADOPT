import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../../Config/firebaseConfig';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function ListPets() {
  const [pets, setPets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsCollection = collection(db, 'Pets');
        const petsSnapshot = await getDocs(petsCollection);
        const petsList = petsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPets(petsList);
      } catch (error) {
        console.error('Error fetching pets data: ', error);
      }
    };

    fetchPets();
  }, []);

  const handleDelete = async (petId) => {
    Alert.alert(
      "Delete Pet",
      "Are you sure you want to delete this pet?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: async () => {
          try {
            await deleteDoc(doc(db, 'Pets', petId));
            setPets((prevPets) => prevPets.filter(pet => pet.id !== petId)); // Cập nhật lại danh sách sau khi xóa
          } catch (error) {
            console.error('Error deleting pet: ', error);
          }
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <View key={pet.id} style={styles.petItem}>
              <TouchableOpacity onPress={() => router.push({ pathname: '/admin/updatePet', params: { id: pet.id } })}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text>Age: {pet.age}</Text>
                <Text>Breed: {pet.breed}</Text>
                <Text>Category: {pet.category}</Text>
                <Text>Description: {pet.about}</Text>
                <Text>Email: {pet.email}</Text>
                <Text>ID: {pet.id}</Text>
                <Text>Image URL: {pet.imageUrl}</Text>
                <Text>Pet Gender: {pet.petgender}</Text>
                <Text>User Image: {pet.userImage}</Text>
                <Text>Username: {pet.username}</Text>
                <Text>Weight: {pet.weight}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(pet.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No pets available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 70,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  petItem: {
    marginBottom: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
