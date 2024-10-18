import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import PetInfo from '../../components/PetDetails/petinfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import About from '../../components/PetDetails/About';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../Config/firebaseConfig';


export default function PetDetails() {
    const pet = useLocalSearchParams();
    const navigation = useNavigation();
    const {user}=useUser();
    const router = useRouter();
    useEffect(()=>{
        navigation.setOptions({
            headerTransparent:true,
            headerTitle:''

        })
    },[])


    /**
     * Used to Initiate the chat between two Users
     */
    const InitiateChat=async()=>{
      const docId1=user?.primaryEmailAddress?.emailAddress+'_'+pet?.email;
      const docId2=pet?.email+'_'+user?.primaryEmailAddress?.emailAddress;

      const q=query(collection(db,'Chat'), where('id','in',[docId1,docId2]));

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc=>{
        console.log(doc.data());
        router.push({
          pathname:'/chat',
          params:{id:doc.id}
        })
      })
      if(querySnapshot.docs?.length==0){
        await setDoc(doc(db, 'Chat', docId1),{
          id:docId1,
          users:[
            {
              email:user?.primaryEmailAddress?.emailAddress,
              imageUrl:user?.imageUrl,
              name:user?.fullName
            },
            {
              email:pet?.email,
              imageUrl:pet?.userImage,
              name:pet?.username
            }
          ],
          userIds:[user?.primaryEmailAddress?.emailAddress, pet?.email]
        });
        router.push({
          pathname:'/chat',
          params:{id:docId1}
        })
      }

    }

  return (
    <View>
        <ScrollView>
      {/* <Text>{JSON.stringify(pet)}</Text> */}

      {/* Pet info */}
        <PetInfo pet={pet}/>
      {/* pet properties */}
        <PetSubInfo pet={pet}/>

      {/* about */}

        <About pet={pet}/>
      {/* owner details */}
        <OwnerInfo pet={pet}/>
          <View style={{height:70}}>
            
          </View>
          
      {/* adope me button */}
      </ScrollView>
      <View style={styles?.bottomContainer}>
      <TouchableOpacity 
      onPress={InitiateChat}
      style={styles.adoptBtn}>
        <Text style={{
          fontFamily:'outfit-medium',
          textAlign:'center',
          fontSize:20
        }}>
          Adopt Me
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  adoptBtn:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
  },
  bottomContainer:{
    position:'absolute',
    width:'100%',
    bottom:0,
    
  }
})