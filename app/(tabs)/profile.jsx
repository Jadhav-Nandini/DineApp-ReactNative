import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { getAuth, signOut } from 'firebase/auth'

import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
  const router = useRouter()
  const auth = getAuth()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail")
      setUserEmail(email)
    }

    fetchUserEmail()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      await AsyncStorage.removeItem("userEmail")
      setUserEmail(null)

      Alert.alert(
        "Logged out",
        "You have been logged out",
      )
      router.push("/signin")

    } catch (error) {

      Alert.alert(
        "Logged Error",
        "Error while logging out",
      )
      console.log(error);
      

    }
  }
  const handlelSignup = () => {
    router.push('/signup')
  }

  return (

    <View className="flex-1 justify-center items-center  bg-[#2b2b2b] ">
      <Text className='text-2xl text-[#f49b33] font-semibold mb-4 '>User Profile</Text>

      {
        userEmail ?
          (<>
            <Text className='text-white text-lg mb-6'>Email: {userEmail} </Text>
            <TouchableOpacity
              onPress={handleLogout}
              className="p-3 my-3 bg-[#f49b33] text-black rounded-lg">

              <Text className="text-lg font-semibold text-center ">Logout</Text>
            </TouchableOpacity>
          </>)
          : (<>
            <TouchableOpacity
              onPress={handlelSignup}
              className="p-3 my-3 bg-[#f49b33] text-black rounded-lg">

              <Text className="text-lg font-semibold text-center ">SignUp</Text>
            </TouchableOpacity>
          </>)

      }

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})