import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../Config/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function UpdatePet() {
  const router = useRouter();
  const { id } = router.params; // Lấy ID của con vật từ params
  const [pet, setPet] = useState(null); // State để lưu thông tin con vật

  // State cho các trường dữ liệu
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [category, setCategory] = useState('');
  const [about, setAbout] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [petgender, setPetGender] = useState('');
  const [userImage, setUserImage] = useState('');
  const [username, setUsername] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    const fetchPetData = async () => {
      if (!id) {
        console.error('Pet ID is undefined');
        return; // Nếu ID không có, không thực hiện truy vấn
      }

      try {
        const petRef = doc(db, 'Pets', id);
        const petSnapshot = await getDoc(petRef); // Lấy dữ liệu con vật từ Firestore

        if (petSnapshot.exists()) {
          const petData = petSnapshot.data();
          setPet(petData);
          setName(petData.name || ''); // Cung cấp giá trị mặc định
          setAge(petData.age || ''); // Cung cấp giá trị mặc định
          setBreed(petData.breed || ''); // Cung cấp giá trị mặc định
          setCategory(petData.category || ''); // Cung cấp giá trị mặc định
          setAbout(petData.about || ''); // Cung cấp giá trị mặc định
          setEmail(petData.email || ''); // Cung cấp giá trị mặc định
          setImageUrl(petData.imageUrl || ''); // Cung cấp giá trị mặc định
          setPetGender(petData.petgender || ''); // Cung cấp giá trị mặc định
          setUserImage(petData.userImage || ''); // Cung cấp giá trị mặc định
          setUsername(petData.username || ''); // Cung cấp giá trị mặc định
          setWeight(petData.weight || ''); // Cung cấp giá trị mặc định
        } else {
          console.error('No such pet document!');
        }
      } catch (error) {
        console.error('Error fetching pet data: ', error);
      }
    };

    fetchPetData(); // Gọi hàm lấy dữ liệu con vật
  }, [id]);

  const handleSave = async () => {
    try {
      const petRef = doc(db, 'Pets', id);
      await updateDoc(petRef, {
        name,
        age,
        breed,
        category,
        about,
        email,
        imageUrl,
        petgender,
        userImage,
        username,
        weight,
      });
      router.back(); // Điều hướng về trang trước sau khi lưu
    } catch (error) {
      console.error('Error updating pet data: ', error);
    }
  };

  if (!pet) {
    return <Text>Loading...</Text>; // Trạng thái tải
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Pet</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
      <TextInput style={styles.input} value={breed} onChangeText={setBreed} placeholder="Breed" />
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Category" />
      <TextInput style={styles.input} value={about} onChangeText={setAbout} placeholder="Description" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} placeholder="Image URL" />
      <TextInput style={styles.input} value={petgender} onChangeText={setPetGender} placeholder="Pet Gender" />
      <TextInput style={styles.input} value={userImage} onChangeText={setUserImage} placeholder="User Image URL" />
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Username" />
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} placeholder="Weight" keyboardType="numeric" />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
