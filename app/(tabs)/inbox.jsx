import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { query } from 'firebase/database'
import { db } from '../../Config/firebaseConfig'
import { collection, documentId, getDocs, where } from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import UserItem from '../../components/Inbox/UserItem'
export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] =useState([]);
  const [loader, setLoader]=useState(false);
  useEffect(()=>{
    user&&GetUserList();

  },[user])
  //Get user list depends on current user email
const GetUserList=async()=>{
  setLoader(true)
  setUserList([])
  const q=query(collection(db, 'Chat'),
where('userIds', 'array-contains',user?.primaryEmailAddress?.emailAddress
));

const querySnapshot = await getDocs(q);
querySnapshot.forEach(doc=>{
  
  setUserList(prevList=>[...prevList, doc.data()])
})
setLoader(false);
}


  ///filter the list of other User in one state

  const MapOtherUserList=()=>{
    const list = [];
    userList.forEach((record)=>{
      const otherUser=record.users?.filter(user=>user?.email!=user?.primaryEmailAddress?.emailAddress);
      const result = {
        docId:record.id,
        ...otherUser[1]
      }

      list.push(result)
    })
    return list;
  }
  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Inbox</Text>

      <FlatList
      data={MapOtherUserList()}
      refreshing={loader}
      onRefresh={GetUserList}
      style={{
        marginTop:20
      }}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />} 
      renderItem={({item, index})=>(
        <UserItem
        userInfo={item} key={index}/>
      )}
      
      />
      
    </View>
  )
}