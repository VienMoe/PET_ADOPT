import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Config/firebaseConfig'; // Import Firebase Auth
import Colors from './../../constants/Colors';
import { Link, useNavigation } from 'expo-router';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const onSignUpPress = useCallback(async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);

      // Save user details to Firestore (add this part)
      const db = getFirestore();
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName,
        lastName,
        email,
        role: 'user', // Assign a default role
      });

      // Navigate to login or home after successful registration
      navigation.navigate('login/LoginWithEmailScreen');
    } catch (err) {
      setError(err.message);
    }
  }, [email, password, confirmPassword, firstName, lastName]);

  return (
    <ScrollView style={{ backgroundColor: Colors.WHITE, flexGrow: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, textAlign: 'center' }}>
          Create your account
        </Text>

        {error && (
          <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>{error}</Text>
        )}

        <TextInput
          placeholder="First Name"
          style={{
            borderWidth: 1,
            borderColor: Colors.GRAY,
            padding: 14,
            marginVertical: 10,
            borderRadius: 10,
          }}
          onChangeText={setFirstName}
          value={firstName}
        />

        <TextInput
          placeholder="Last Name"
          style={{
            borderWidth: 1,
            borderColor: Colors.GRAY,
            padding: 14,
            marginVertical: 10,
            borderRadius: 10,
          }}
          onChangeText={setLastName}
          value={lastName}
        />

        <TextInput
          placeholder="Email address"
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

        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: Colors.GRAY,
            padding: 14,
            marginVertical: 10,
            borderRadius: 10,
          }}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />

        <Pressable
          onPress={onSignUpPress}
          style={{
            padding: 14,
            marginTop: 20,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 14,
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>Continue</Text>
        </Pressable>

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text>Already have an account?</Text>
          <Link href="/login/LoginWithEmailScreen" asChild>
            <Pressable>
              <Text style={{ color: Colors.PRIMARY }}>Sign In</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
