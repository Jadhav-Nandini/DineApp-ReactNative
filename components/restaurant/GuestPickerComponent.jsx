import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const GuestPickerComponent = ({selectedNumber,setSelectedNumber}) => {
    const decrement = () =>{
        if(selectedNumber > 0) setSelectedNumber(selectedNumber -1)
    }
    const increment = () => {
        if(selectedNumber < 12) setSelectedNumber(selectedNumber + 1)

    }
  return (
    <View className=" flex flex-row items-center rouonded-lg text-white text-xl">
        <TouchableOpacity onPress={decrement}>
            <Text className="text-white text-2xl border  border-[#f49b33] px-3 rounded-l-lg ">
                -
            </Text>
        </TouchableOpacity>
        <Text className=" px-3 text-white bg-[#474747] text-lg border border-[#474747] ">
            {selectedNumber}
            
        </Text>
        <TouchableOpacity onPress={increment}>
            <Text className="text-white text-2xl border  border-[#f49b33]  rounded-r-lg px-3 ">
                +
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default GuestPickerComponent

const styles = StyleSheet.create({})



