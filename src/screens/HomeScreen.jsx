import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";

export default function HomeScreen() {
  const [activeCategory, setactiveCategory] = useState("Beef");
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="pt-14 space-y-6"
      >
        {/* heading  */}
        <View className="mx-4 flex-row justify-between mb-2 items-center">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: wp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greetings  */}
        <View className="mx-4">
          <Text className="text-gray-600" style={{ fontSize: hp(2) }}>
            Hello, Prajwal!
          </Text>
          <View>
            <Text
              className="text-gray-600 font-semibold"
              style={{ fontSize: hp(3.8) }}
            >
              Make your food now,
            </Text>
          </View>
          <Text
            className="text-gray-600 font-semibold"
            style={{ fontSize: hp(3.8) }}
          >
            staying at <Text className=" text-amber-400">home</Text>
          </Text>
        </View>

        {/* search bar  */}
        <View className="mx-4 flex-row items-center bg-black/5 p-[6px] rounded-full ">
          <TextInput
            placeholder="Seacrh for recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base pl-3 mb-2 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              strokeWidth={3}
              color={"gray"}
              size={hp(2.5)}
            />
          </View>
        </View>

        {/* categories  */}
        <View className="mx-4">
          <Categories
            activeCategory={activeCategory}
            setactiveCategory={setactiveCategory}
          />
        </View>
      </ScrollView>
    </View>
  );
}
