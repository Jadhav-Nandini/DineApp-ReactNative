import { db } from '@/config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


const FindSlots = ({
    date,
    selectedNumber,
    slots,
    selectedSlot,
    setSelectedSlot,
}) => {

    const [slotsVisible, setSlotsVisible] = useState(false)
    const handlePress = () => {
        setSlotsVisible(!slotsVisible)
    }
    const handleBooking = async () => {
        const userEmail = await AsyncStorage.getItem("userEmail");

        if (userEmail) {
            try {
                await addDoc(collection(db, "bookings"), {
                    email: userEmail,
                    slot: selectedSlot,
                    date: date.toISOString(),
                    guests: selectedNumber
                })
                console.log("success");
                alert("Booking successfully Done!")
            } catch (error) {
                console.log(error);

            }
        }

    }

    const handleSlotPress = (slot) => {
        let prevSlot = selectedSlot;
        if (prevSlot == slot) {
            setSelectedSlot(null)
        } else {
            setSelectedSlot(slot)
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

        </View>
    )
}

export default FindSlots
