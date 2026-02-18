import { db } from '@/config/firebaseConfig';
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection } from 'firebase/firestore';
import { Formik } from 'formik';
import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import validationSchema from '../../utils/guestFormSchema';



const FindSlots = ({
    date,
    selectedNumber,
    slots,
    selectedSlot,
    setSelectedSlot,
    restaurant,
}) => {

    const [slotsVisible, setSlotsVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [formVisible, setFormVisible] = useState(false)

    const handlePress = () => {
        setSlotsVisible(!slotsVisible)
    }
    const handleBooking = async () => {
        const userEmail = await AsyncStorage.getItem("userEmail");
        const guestStatus = await AsyncStorage.getItem("isGuest")

        if (userEmail) {
            try {
                await addDoc(collection(db, "bookings"), {
                    email: userEmail,
                    slot: selectedSlot,
                    date: date.toISOString(),
                    guests: selectedNumber,
                    restaurant: restaurant
                })
                console.log("success");
                alert("Booking successfully Done!")
            } catch (error) {
                console.log(error);
            }
        }
        else if (guestStatus === 'true') {
            setFormVisible(true);
            setModalVisible(true)
        }
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }


    const handleSlotPress = (slot) => {
        let prevSlot = selectedSlot;
        if (prevSlot == slot) {
            setSelectedSlot(null)
        } else {
            setSelectedSlot(slot)
        }
    }

    const handleFormSubmit = async (values) => {

        try {
            await addDoc(collection(db, "bookings"), {
                ...values,
                slot: selectedSlot,
                date: date.toISOString(),
                guests: selectedNumber,
                restaurant: restaurant
            })
            console.log("success");
            alert("Booking successfully Done!")
            setModalVisible(false)
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <View className="flex-1" >
            <View className={`flex ${selectedSlot != null && 'flex-row'}`}>
                <View className={`flex ${selectedSlot != null && 'flex-1'}`}>
                    <TouchableOpacity onPress={handlePress}>
                        <Text className='text-center text-lg font-semibold  bg-[#f49b33] rounded-lg mx-3 my-2 p-3'>
                            Find Slots
                        </Text>
                    </TouchableOpacity>
                </View>
                {selectedSlot != null && (
                    <View className='flex-1'>
                        <TouchableOpacity onPress={handleBooking}>
                            <Text className='text-center text-lg font-semibold text-white bg-[#f49b33] rounded-lg mx-3 my-2 p-3'>
                                Book Slot
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>

            {slotsVisible && (
                <View className="flex-wrap flex-row mx-3 p-3  bg-[#474747] rounded-lg  ">
                    {slots.map((slot, index) => (
                        <TouchableOpacity
                            key={index}
                            className={`m-2 p-4 bg-[#f49b33] rounded-lg justify-center items-center   ${selectedSlot && selectedSlot !== slot ? 'opacity-55' : ''}`}
                            onPress={() => handleSlotPress(slot)}
                            disabled={
                                selectedSlot == slot || selectedSlot == null ? false : true
                            }
                        >
                            <Text className="text-white font-bold">
                                {slot}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='slide'
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    margin: 0,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}>
                <View className="flex-1 bg-[#00000080] justify-end">
                    <View className="bg-[#444444] mx-2 p-4  pb-5 rounded-t-3xl ">
                        {formVisible &&
                            (<Formik
                                initialValues={{ fullName: "", phoneNumber: "" }}
                                validationSchema={validationSchema}
                                onSubmit={handleFormSubmit}>
                                {({
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    values,
                                    errors,
                                    touched
                                }) => (
                                    <View className='w-full'>
                                        <View>
                                            <Ionicons
                                                name='close-sharp'
                                                size={27}
                                                color="#f49b33"
                                                onPress={handleCloseModal}
                                            />
                                        </View>
                                        <Text className='text-[#f49b33] text-xl mt-3 mb-3'>Name</Text>
                                        <TextInput
                                            className='h-12 border border-white text-white rounded-xl px-2 text-md'
                                            onChangeText={handleChange('fullName')}
                                            value={values.fullName}
                                            onBlur={handleBlur('fullName')}
                                        />

                                        {touched.fullName && errors.fullName && (<Text className='text-red-500 text-xs' >{errors.fullName} </Text>
                                        )}


                                        <Text className='text-[#f49b33] text-xl  mt-3 mb-3'>Phone Number</Text>
                                        <TextInput
                                            className='h-12 border border-white text-white rounded-xl px-2 text-md'
                                            onChangeText={handleChange('phoneNumber')}
                                            value={values.phoneNumber}
                                            onBlur={handleBlur('phoneNumber')}
                                        />

                                        {touched.phoneNumber && errors.phoneNumber && (<Text className='text-red-500 text-xs' >{errors.phoneNumber} </Text>
                                        )}

                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            className="p-3 my-3 bg-[#f49b33] text-black rounded-lg">

                                            <Text className="text-lg font-semibold text-center ">Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Formik>
                            )}
                    </View>

                </View>

            </Modal>


        </View>
    )
}

export default FindSlots
