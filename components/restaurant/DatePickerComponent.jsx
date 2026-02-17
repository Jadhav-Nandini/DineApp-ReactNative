import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'

const DatePickerComponent = ({ date, setDate }) => {

    const [show, setShow] = useState(false)
  

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate)
    }

    const handlePress = () => {
        setShow(true)
    }

    return (
        <View className="flex flex-row">
            <TouchableOpacity
                className={"rounded-lg text-white text-base ml-3  p-3  justify-center bg-[#474747]"}
                onPress={handlePress}>
                <Text
                    className='text-white text-xl bg-[#474747]   rounded-xl'>
                    {date.toLocaleDateString()}
                </Text>
                {show && (
                <DateTimePicker
                    value={date}
                    accentColor='#f49b33'
                    textColor='#f49b33'
                    mode='date'
                    onChange={onChange}
                    display='default'
                    minimumDate={new Date()}
                    maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                />
                )}
            </TouchableOpacity>
        </View>
    )
}

export default DatePickerComponent

const styles = StyleSheet.create({})



