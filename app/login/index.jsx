import { View, Text, Image, Pressable, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import Colors from './../../constants/Colors'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth, useSignIn } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Link } from 'expo-router'; // Import Link để điều hướng
import { Ionicons } from '@expo/vector-icons'


export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()


export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        if (setActive) {
          setActive({ session: createdSessionId });
        } else {
          console.warn('setActive is undefined, session could not be set');
        }
      } else {
        // Sử dụng signIn hoặc signUp để tiếp tục (MFA nếu có)
      }
      
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <ScrollView style={{
      backgroundColor: Colors.WHITE,
      flexGrow: 1,
    }}>
      <Image source={require('./../../assets/images/login.png')}
        style={{
          width: '100%',
          height: 500,
        }}
      />

      <View style={{
        padding: 20,
        display: 'flex',
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          textAlign: 'center'
        }}>Ready to make a new friend</Text>
        
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 18,
          textAlign: 'center',
          color: Colors.GRAY
        }}>Let's adopt the pet which you like and make their life happy again</Text>

        <Pressable
          onPress={onPress}
          style={{
            padding: 14,
            marginTop: 100,
            backgroundColor: Colors.PRIMARY,
            width: '100%',
            borderRadius: 14,
          }}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 20,
            textAlign: 'center',
            flexDirection:'row',
            display:'flex',
            justifyContent:'space-between'
          }}>Sign in with Google 
          
            </Text>
        </Pressable>

        {/* Nút điều hướng đến màn hình đăng nhập với email/password */}
        <View style={{ marginTop: 20 }}>
          <Link href="/login/LoginWithEmailScreen">
            <Text style={{ color: Colors.GRAY, textDecorationLine: 'underline' }}>
              Or, sign in with email and password
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

