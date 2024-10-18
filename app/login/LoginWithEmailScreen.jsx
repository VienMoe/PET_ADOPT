import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore
import { useNavigation } from 'expo-router'; // Import navigation hook
import { auth } from '../../Config/firebaseConfig'; // Import the auth instance from Firebase
import Colors from './../../constants/Colors';


export default function LoginWithEmailScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  const onSignInPress = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the user's role from Firestore
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', user.uid)); // Assuming you store user roles in a 'users' collection
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;

        // Navigate to the appropriate screen based on the user role
        if (userRole === 'admin') {
          navigation.navigate('login/admin'); // Navigate to admin screen
        } else {
          navigation.navigate('Home'); // Navigate to home screen for regular users
        }
      } else {
        setError('User data not found!');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.WHITE, flexGrow: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, textAlign: 'center' }}>
          Sign In
        </Text>

        {error && (
          <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>{error}</Text>
        )}

        <TextInput
          placeholder="Email"
          style={{
            borderWidth: 1,
            borderColor: Colors.GRAY,
            padding: 14,
            marginVertical: 10,
            borderRadius: 10,
          }}
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: Colors.GRAY,
            padding: 14,
            marginVertical: 10,
            borderRadius: 10,
          }}
          onChangeText={setPassword}
          value={password}
        />

        <Pressable
          onPress={onSignInPress}
          style={{
            padding: 14,
            marginTop: 20,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 14,
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>Sign In</Text>
        </Pressable>

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('login/SignUpScreen')} style={{ padding: 14 }}>
            <Text style={{ color: Colors.PRIMARY }}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
