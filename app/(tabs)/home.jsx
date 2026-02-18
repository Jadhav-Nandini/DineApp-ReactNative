import logo from '@/assets/images/dinetimelogo.png';
import banner from '@/assets/images/homeBanner.png';
// import restaurants from '@/store/restaurants';
import { db } from '@/config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Home = () => {
  const [restaurants, setRestaurants] = useState([])
  const router = useRouter();
  const temp = async () => {
    const value = await AsyncStorage.getItem("isGuest");
    const email = await AsyncStorage.getItem("userEmail");
    console.log(value, email);
    
  }
  

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/restaurant/${item.name}`)}
      className="bg-[#5f5f5f] max-h-64 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow-md"
    >
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        className="h-28 mt-2 mb-1 rounded-lg"
      />
      <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
      <Text className="text-white text-base mb-2">{item.address}</Text>
      <Text className="text-white text-base mb-2">
        Open: {item.opening} - Close: {item.closing}
      </Text>
    </TouchableOpacity>
  );


  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);

    res.forEach((item) => {
      setRestaurants((prev) => [...prev, item.data()]);
    });
  };
  useEffect(() => {
    getRestaurants();
    temp();
  }, []);


  return (
    <SafeAreaView style={{ backgroundColor: "#2b2b2b", paddingBottom: 80 }}>
      <View className='flex items-center'>
        <View className='bg-[#5f5f5f]  w-11/12  rounded-lg shadow-lg justify-between items-center flex flex-row '>
          <View className='flex flex-row '>
            <Text className='text-2xl text-white h-16 pt-[15] align-middle '>  welcome to {""}</Text>
            <Image
              resizeMode='cover'
              className={'w-28 h-20'}
              source={logo}
            />
          </View>
        </View>
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground resizeMode='cover'
          className='mb-4 w-full h-52 items-center justify-center bg-[#2b2b2b] '
          source={banner}>

          <BlurView intensity={50} tint='dark'
            className='w-full p-4 ' >
            <Text className='text-center text-3xl font-bold text-white'>Dine with your loved ones</Text>
          </BlurView>
        </ImageBackground>

        <View className='p-4  bg-[#2b2b2b] flex-row items-center '>
          <Text className='text-3xl text-white mr-2 font-semibold'> Special Discount %</Text>
        </View>

        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (<ActivityIndicator animating color={'#fb9b33'} />
        )}

        <View className='p-4  bg-[#2b2b2b] flex-row items-center '>
          <Text className='text-3xl text-[#fb9b33] mr-2 font-semibold'> Our Restaurants</Text>
        </View>

        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (<ActivityIndicator animating color={'#fb9b33'} />
        )}

      </ScrollView>

    </SafeAreaView>

  )
}

export default Home








// 3.4.40