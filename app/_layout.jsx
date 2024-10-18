import { Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store'
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error('SecureStore save item error: ', err);
    }
  },
  clearToken(key) {
    try {
      SecureStore.deleteItemAsync(key);
    } catch (err) {
      console.error('SecureStore clear item error: ', err);
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

export default function RootLayout() {

  
  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf')
  })

  return (
    <ClerkProvider 
    
    tokenCache={tokenCache}
    publishableKey={publishableKey}>
      <ClerkLoaded>
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)"
      options={{headerShown: false}} />
      <Stack.Screen name="login/index"
      options={{headerShown: false}}/>
      <Stack.Screen name="login/SignUpScreen" options={{ headerShown: false }} />
      <Stack.Screen name="login/LoginWithEmailScreen" options={{ headerShown: true }}/>
      <Stack.Screen name="login/admin" options={{ headerShown: false }}/>
      <Stack.Screen name="admin/addPet" options={{ headerShown: false }}/>
     
    </Stack>
    </ClerkLoaded>
    </ClerkProvider>
    
  );
}
