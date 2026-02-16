// import logo from '@/assets/images/Untitled_design__2_-removebg-preview.png';
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {


  const logo = require('@/assets/images/dinetimelogo.png')

  const frame = require('@/assets/images/Frame.png')

  const router = useRouter();

  return (


    <SafeAreaView className={`bg-[#2b2b2b]`}>
      <ScrollView contentContainerStyle={{ height: '100%', width: '100%' }}>
        <View className=" m-2 flex  items-center justify-center  ">
          <Image
            source={logo}
            style={{ height: 300, width: 300, }}
          />
          <View className="w-3/4 ">
            <TouchableOpacity
              className="p-3 my-3 bg-[#f49b33] text-black rounded-lg"
              onPress={() => router.push('/signup')}
            >
              <Text className="text-lg font-semibold text-center ">SignUp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="p-3 my-3 bg-[#2b2b2b] border border-[#f49b33] rounded-lg"
              onPress={() => router.push('/home')}
            >
              <Text className="text-lg text-[#f49b33] font-semibold text-center ">Guest User</Text>
            </TouchableOpacity>
          </View>

          <View >
            <Text className="text-center text-base font-semibold my-6 text-white">
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-20" />    or{" "}
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-20" />
            </Text>

            <TouchableOpacity
              className="flex flex-row items-center justify-center gap-2 "
              onPress={() => router.push('/signin')}>
              <Text className="text-white  font-semibold ">Already a User?</Text>
              <Text className="text-base font-semibold underline text-[#f49b33] ">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1">
          <Image source={frame} className="w-full h-full" resizeMode="contain" />
        </View>

      </ScrollView>
    </SafeAreaView>


  );
}
