// import validationSchema from '@/utils/signupSchema'
import validationSchema from '@/utils/authSchema'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { Formik } from 'formik'
import React from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const logo = require('@/assets/images/dinetimelogo.png')
const frame = require('@/assets/images/Frame.png')
const SignUp = () => {

    const router = useRouter();

    const auth = getAuth();
    const db = getFirestore()

    const handleGuest = async () => {
        await AsyncStorage.setItem("isGuest", "true")
        router.push('/home')
    }

    const handleSignup = async (values) => {

        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth, values.email, values.password
            )
            const user = userCredentials.user

            await setDoc(doc(db, "users", user.uid), {
                email: values.email,
                createdAt: new Date()
            })

            await AsyncStorage.setItem("userEmail", values.email)
            await AsyncStorage.setItem("isGuest", "false")
            // console.log(user,AsyncStorage.getItem("userEmail"));
            router.push("/home")

        } catch (error) {
            console.log("Error white signup", error);
            if (error.code === "auth/email-already-in-use") {
                Alert.alert(
                    "Signup Failed!",
                    "This email address is already in use. Please use a different email.",
                    [{ text: "OK" }]
                )
            } else {
                Alert.alert(
                    "Signup Error!",
                    "An unexpected error occurred. Please try again later.",
                    [{ text: "OK" }]
                )
            }

        }

    }
    // const handleGusest = () => {}


    return (
        <SafeAreaView className={`bg-[#2b2b2b]`}>
            <ScrollView contentContainerStyle={{ height: '100%', width: '100%' }}>
                <View
                    className=" m-2 flex  items-center justify-center"
                >
                    <Image source={logo} style={{ height: 100, width: 200, }} />
                    <Text className="text-lg text-white font-bold text-center mb-6">
                        Let's get you started
                    </Text>
                    <View className='w-5/6'>

                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={validationSchema}
                            onSubmit={handleSignup}>
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                errors,
                                touched
                            }) => (
                                <View className='w-full'>
                                    <Text className='text-[#f49b33] text-lg mt-3 mb-3'>Email</Text>
                                    <TextInput
                                        className='h-12 border border-white text-white rounded px-2 text-md'
                                        keyboardType='email-address'
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                        onBlur={handleBlur('email')}
                                    />

                                    {touched.email && errors.email && (<Text className='text-red-500 text-xs' >{errors.email} </Text>
                                    )}


                                    <Text className='text-[#f49b33] text-lg  mt-3 mb-3'>Password</Text>
                                    <TextInput
                                        className='h-12 border border-white text-white rounded px-2 text-md'
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        onBlur={handleBlur('password')}
                                    />

                                    {touched.password && errors.password && (<Text className='text-red-500 text-xs' >{errors.password} </Text>
                                    )}

                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        className="p-3 my-3 bg-[#f49b33] text-black rounded-lg">

                                        <Text className="text-lg font-semibold text-center ">SignUp</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>


                        <View className="flex justify-center items-center">
                            <TouchableOpacity
                                className="flex flex-row justify-center mt-5 p-2 items-center"
                                onPress={() => router.push("/signin")}
                            >
                                <Text className="text-white font-semibold">
                                    Already a User?{" "}
                                </Text>
                                <Text className="text-base font-semibold underline text-[#f49b33]">
                                    Sign in
                                </Text>
                            </TouchableOpacity>

                            <Text className="text-center text-base  font-semibold mb-4 text-white">
                                <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />{" "}
                                or{" "}
                                <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
                            </Text>

                            <TouchableOpacity
                                className="flex flex-row justify-center mb-5 p-3 items-center"
                                onPress={handleGuest}
                            >
                                <Text className="text-white font-semibold">Be a </Text>
                                <Text className="text-base font-semibold underline text-[#f49b33]">
                                    {" "}
                                    Guest User
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="flex-1">
                    <Image
                        source={frame}
                        className="w-full h-full"
                        resizeMode="contain"
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp

const styles = StyleSheet.create({})