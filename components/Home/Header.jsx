import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function Header() {
    const { user, isLoaded, isSignedIn } = useUser();
    useEffect(() => {
      console.log(user); // Log dữ liệu người dùng để kiểm tra sau khi đăng nhập
    }, [user]);
    if (!isLoaded) {
      // Show a loading indicator while the user data is being loaded
      return (
          <View>
              <ActivityIndicator size="small" color="#0000ff" />
          </View>
      );
  }
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }}>
      <View>
            <Text style={{
                fontFamily: 'outfit',
                fontSize:18
            }}>Welcome,</Text>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 25,
            }}>{user?.fullName}</Text>
      </View>
      <Image source={{uri:user?.imageUrl}}
      style={{
        width:40,
        height:40,
        borderRadius:99,
      }} 
      />
    </View>
  )
}