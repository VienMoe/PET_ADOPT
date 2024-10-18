import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
export default function Profile() {
  const Menu=[
    {
      id:1,
      name:'Favorite',
      icon:'heart',
      path:'/(tabs)/favor'
    },
    {
      id:2,
      name:'Inbox',
      icon:'chatbubble',
      path:'/(tabs)/inbox'
    },
    {
      id:3,
      name:'Logout',
      icon:'exit',
      path:'logout'
    }
  ]
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();
  const onPressMenu=(menu)=>{
    if(menu.path === 'logout')
    {
      signOut();
      router.push('/login'); 
      
    }
    else{
      router.push(menu.path)
    }
    
  }
  
  return (
    <View style={{
      marginTop:20,
      padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Profile</Text>

      <View style={{
        display:'flex',
        alignItems:'center',
        marginVertical:25
      }}>
        <Image source={{uri:user?.imageUrl}} 
        style={{
          width:60,
          height:60,
          borderRadius:99,
          
        }}
        />

        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:20,
          marginTop:6
        }}>{user?.fullName}</Text>
        <Text style={{
          fontFamily:'outfit',
          fontSize:16,
          color:Colors.GRAY
        }}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>


      <FlatList
      data={Menu}
      renderItem={({item, index})=>(
        <TouchableOpacity 
        onPress={()=>onPressMenu(item)}
        key={item.id}
        style={{
          marginVertical:10,
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          gap:10,
          backgroundColor:Colors.WHITE,
          padding:10,
          borderRadius:10
        }}>
          <Ionicons name={item?.icon} size={30} 
          color={Colors.PRIMARY}
          style={{
            padding:10,
            backgroundColor:Colors.LIGHT_PRIMARY,
            borderRadius:10
          }} />
          <Text style={{
            fontFamily:'outfit',
            fontSize:20
          }}>{item.name}</Text>
        </TouchableOpacity>
      )}
      />


    </View>
  )
}