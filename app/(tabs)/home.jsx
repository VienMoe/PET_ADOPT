import { View, Text } from 'react-native'
import React from 'react'
import  Header  from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PetListByCategory from '../../components/Home/PetListByCategory'

export default function Home() {
  return (
    <View style={{
      padding:20, marginTop:20
    }}>
      {/*Header*/}
          <Header/>
{/*slide*/}
      <Slider/>

{/*categori*/}



{/*list*/}

      <PetListByCategory/>


{/*add new*/}
       
    </View>
  )
}