import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Category from './Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../Config/firebaseConfig';
import PetListItem from './PetListItem';

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  const GetPetList = async (category) => {
    setPetList([]);
    setLoader(true);
    const q = query(collection(db, 'Pets'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    const pets = [];
    querySnapshot.forEach(doc => {
      pets.push(doc.data());
    });
    setPetList(pets);
    setLoader(false);
  };

  // Reload when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      GetPetList('Cats'); // Or your desired default category
    }, [])
  );

  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        data={petList}
        style={{ marginTop: 10 }}
        horizontal={true}
        refreshing={loader}
        onRefresh={() => GetPetList('Cats')}
        renderItem={({ item }) => (
          <PetListItem pet={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
