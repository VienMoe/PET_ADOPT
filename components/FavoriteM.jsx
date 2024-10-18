import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Share from './../Share/Share'
import { useUser } from '@clerk/clerk-expo';

export default function FavoriteM({ pet, color='black' }) {
    const { user } = useUser();
    const [favList, setFavList] = useState([]);

    useEffect(() => {
        if (user) {
            GetFav();
        }
    }, [user]);

    const GetFav = async () => {
        const result = await Share.GetFavList(user);
        setFavList(result?.Favorite || []);
    };

    const AddToFav = async () => {
        try {
            const updatedFavList = [...favList, pet?.id];
            await Share.UpdateFav(user, updatedFavList);
            setFavList(updatedFavList); // Update the state immediately
        } catch (e) {
            console.error("Error adding to favorites: ", e);
        }
    };

    const RemoveFromFav = async () => {
        try {
            const updatedFavList = favList.filter(favId => favId !== pet?.id);
            await Share.UpdateFav(user, updatedFavList);
            setFavList(updatedFavList); // Update the state immediately
        } catch (e) {
            console.error("Error removing from favorites: ", e);
        }
    };

    const isFavorite = favList.includes(pet.id);

    return (
        <View>
            {isFavorite ? (
                <Pressable onPress={RemoveFromFav}>
                    <Ionicons name="heart" size={30} color="red" />
                </Pressable>
            ) : (
                <Pressable onPress={AddToFav}>
                    <Ionicons name="heart-outline" size={30} color={color} />
                </Pressable>
            )}
        </View>
    );
}
