import { View, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../Config/firebaseConfig';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    GetSliders();
  }, []);

  useEffect(() => {
    if (sliderList.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [sliderList]);

  useEffect(() => {
    if (sliderList.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex, sliderList]);

  const GetSliders = async () => {
    const snapshot = await getDocs(collection(db, 'Slider'));
    const sliders = [];
    snapshot.forEach((doc) => {
      sliders.push(doc.data());
    });
    setSliderList(sliders);
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        ref={flatListRef}
        data={sliderList}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles.sliderImage}
            />
            {/* Dot container positioned on top of the image */}
            <View style={styles.dotContainer}>
              {sliderList.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    { backgroundColor: currentIndex === index ? '#000' : '#ccc' }
                  ]}
                />
              ))}
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get('screen').width * 0.9,
    height: 170,
    borderRadius: 15,
    marginRight: 15,
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
