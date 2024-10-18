import { View, Text, FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Share from './../../Share/Share';
import { useUser } from '@clerk/clerk-expo';
import { collection, query, where, getDocs } from 'firebase/firestore';
import PetListItem from './../../components/Home/PetListItem';
import { db } from '../../Config/firebaseConfig';

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  const GetFavPetIds = async () => {
    try {
      setLoader(true);
      const result = await Share.GetFavList(user);
      const favoriteIds = result?.Favorite || [];
      setFavIds(favoriteIds);

      if (favoriteIds.length > 0) {
        await GetFavPetList(favoriteIds);
      } else {
        setFavPetList([]);
      }
    } catch (error) {
      console.error('Error fetching favorite IDs:', error);
    } finally {
      setLoader(false);
    }
  };

  const GetFavPetList = async (favIds_) => {
    if (!Array.isArray(favIds_) || favIds_.length === 0) return;

    try {
      setLoader(true);
      const q = query(collection(db, 'Pets'), where('id', 'in', favIds_));
      const querySnapshot = await getDocs(q);

      const pets = [];
      querySnapshot.forEach((doc) => {
        pets.push(doc.data());
      });
      setFavPetList(pets);
    } catch (error) {
      console.error('Error fetching favorite pets:', error);
    } finally {
      setLoader(false);
    }
  };

  // Refresh data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      GetFavPetIds();
    }, [])
  );

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>Favorites</Text>

      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={GetFavPetIds}
        refreshing={loader}
        renderItem={({ item }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
