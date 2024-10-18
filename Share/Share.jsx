import { getDoc, updateDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";

export const GetFavList = async (user) => {
    const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // Create document with an empty favorite list
        await setDoc(docRef, {
            email: user?.primaryEmailAddress?.emailAddress,
            Favorite: []
        });
        // Return an empty favorite array
        return { Favorite: [] };
    }
};

export const UpdateFav = async (user, Favorite) => {
    const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
    try {
        await updateDoc(docRef, {
            Favorite: Favorite
        });
    } catch (e) {
        console.error("Error updating favorites: ", e);
    }
};

export default {
    GetFavList,
    UpdateFav
};
