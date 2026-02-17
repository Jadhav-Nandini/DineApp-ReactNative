import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const GuestPickerComponent = ({selectedNumber}) => {
    const decrement = () =>{}
    const increment = () => {}
  return (
    <View className=" flex flex-row items-center rouonded-lg text-white text-xl">
        <TouchableOpacity onPress={decrement}>
            <Text className="text-white text-2xl border  border-[#f49b33] p-1 rounded-l-lg ">
                -
            </Text>
        </TouchableOpacity>
        <Text className=" p-2 text-white bg-[#474747] text-lg  ">
            {selectedNumber}
            
        </Text>
        <TouchableOpacity onPress={increment}>
            <Text className="text-white text-2xl border  border-[#f49b33]  rounded-r-lg p-1 ">
                +
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default GuestPickerComponent

const styles = StyleSheet.create({})